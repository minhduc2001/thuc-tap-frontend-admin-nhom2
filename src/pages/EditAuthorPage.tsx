import {
	DeleteOutlined,
	PlusOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import {
	Button,
	Cascader,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Input,
	InputNumber,
	Modal,
	Radio,
	Row,
	Select,
	Slider,
	Spin,
	Switch,
	TreeSelect,
	Upload,
	UploadProps,
	message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useNavigate, useParams } from 'react-router-dom';
import AudioBookApi from '../api/audioBookApi';
import { toast } from 'react-toastify';
import { toastOption } from '../configs/notification.config';
import GenreApi from '../api/genreApi';
import ReactPlayer from 'react-player';
import { useAppDispatch } from '../redux/hooks';
import {
	saveAudioBook,
	updateAudioBook,
} from '../redux/features/audiobookSlice';
import AuthorApi from '../api/authorApi';
import { saveAuthor, updateAuthor } from '../redux/features/authorSlice';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function EditAuthor() {
	const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState(null);

	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [title, setTitle] = useState<string>('Thêm nội dung');
	const [author, setAuthor] = useState<any>(null);
	const [spinning, setSpinning] = useState<boolean | undefined>(false);

	let { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id) {
			if (Number(id)) {
				setTitle('Sửa nội dung');
				setComponentDisabled(true);
				fetchData(Number(id));
			} else navigate('/404');
		} else {
			setLoading(false);
			setError(null);
		}
	}, [id]);

	const fetchData = async (id: number) => {
		setLoading(true);
		const resp: any = await AuthorApi.getAuthor(id);
		if (resp.success) {
			setAuthor(resp.data);

			if (resp.data?.image) {
				setFileList([
					{
						uid: '-1',
						name: 'image.png',
						status: 'done',
						url: resp.data.image,
					},
				]);
			}

			setLoading(false);
		} else {
			toast.error(resp.message, toastOption);
			setError(resp.message);
		}
	};

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const options = [
		{ label: 'free', value: '1' },
		{ label: 'vip', value: '0' },
	];

	const onFinish = (values: any) => {
		setSpinning(true);
		// Xử lý khi form được submit

		values.image = values.image.file;

		const formData = new FormData();
		Object.keys(values).map((key) => {
			if (key !== 'image') formData.append(key, values[key]);
		});
		if (fileList) formData.append('image', fileList[0].originFileObj as Blob);

		if (title == 'Sửa nội dung') {
			dispatch(updateAuthor({ id: id, formData: formData }))
				.unwrap()
				.then((originalPromiseResult) => {
					console.log(originalPromiseResult);
					navigate('/author');
				})
				.catch((rejectedValueOrSerializedError) => {
					setSpinning(false);
					toast.error(rejectedValueOrSerializedError.message, toastOption);
				});
		} else {
			dispatch(saveAuthor(formData))
				.unwrap()
				.then((originalPromiseResult) => {
					console.log(originalPromiseResult);
					navigate('/author');
				})
				.catch((rejectedValueOrSerializedError) => {
					setSpinning(false);
					// handle error here
					toast.error(rejectedValueOrSerializedError.message, toastOption);
				});
		}
	};

	const onPreviewImage = async (file: UploadFile<any>) => {
		let src = file.url;
		if (!src) {
			src = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsDataURL(file.originFileObj as Blob);
				reader.onload = () => resolve(reader.result as string);
			});
		}
		const image: any = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow?.document.write(image.outerHTML);
	};
	const onChangeImage: UploadProps['onChange'] = ({
		fileList: newFileList,
	}) => {
		setFileList(newFileList);
	};

	const handleBtnSubmit = (e: any) => {
		const text = e.target.innerText;
		if (text == 'Sửa') {
			e.preventDefault();
			setComponentDisabled(false);
		} else if (text == 'Lưu') {
		} else if (text == 'Cập nhật') {
		}
	};
	return (
		<AsyncWrapper
			loading={loading}
			error={error}
			fulfilled={id ? Boolean(author) : true}
		>
			<div className='text-center w-full h-[40px] font-bold text-xl'>
				{title}
			</div>
			<Spin tip='Loading...' size='large' spinning={spinning}>
				<Form
					{...layout}
					onFinish={onFinish}
					disabled={componentDisabled}
					initialValues={{
						...author,
					}}
				>
					<Row gutter={16}>
						{/* Phần trái cho điền thông tin về sách */}
						<Col span={12}>
							<Form.Item
								label='Tên tác giả'
								name='name'
								rules={[
									{ required: true, message: 'Vui lòng nhập tên tác giả!' },
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item label='Mô tả' name='description'>
								<TextArea rows={4} />
							</Form.Item>
							{/* Thêm các trường thông tin khác về sách tại đây */}
						</Col>

						{/* Phần phải cho upload ảnh và âm thanh */}
						<Col span={12}>
							<Form.Item
								label='Ảnh tác giả'
								name='image'
								rules={[{ required: true, message: 'Bạn cần tải lên ảnh' }]}
							>
								<Upload
									action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
									listType='picture-card'
									defaultFileList={fileList}
									onChange={onChangeImage}
									onPreview={onPreviewImage}
								>
									{fileList.length < 1 && (
										<div>
											<PlusOutlined />
											<div style={{ marginTop: 8 }}>Upload</div>
										</div>
									)}
								</Upload>
							</Form.Item>

							{/* Thêm các trường upload khác tại đây */}
						</Col>
					</Row>

					<Form.Item {...tailLayout}>
						<Button
							htmlType='submit'
							onClick={handleBtnSubmit}
							disabled={false}
						>
							{title == 'Thêm nội dung'
								? 'Lưu'
								: componentDisabled
								? 'Sửa'
								: 'Cập nhật'}
						</Button>
					</Form.Item>
				</Form>
			</Spin>
		</AsyncWrapper>
	);
}

export default EditAuthor;

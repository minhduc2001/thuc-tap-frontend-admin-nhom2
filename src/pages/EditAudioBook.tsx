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

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function EditAudioBook() {
	const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState(null);
	const [audioFileURL, setAudioFileURL] = useState<string | null>(null);
	const [audioFile, setAudioFile] = useState<any>([]);
	const [searchedAuthors, setSearchedAuthors] = useState<any>([]);
	const [selectedAuthor, setSelectedAuthor] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const [title, setTitle] = useState<string>('Thêm nội dung');
	const [audioBook, setAudioBook] = useState<any>(null);
	const [genres, setGenres] = useState<IGenre[]>([]);
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
				fetchDataGenre();
			} else navigate('/404');
		} else {
			fetchDataGenre();
			setLoading(false);
			setError(null);
		}
	}, [id]);

	const fetchData = async (id: number) => {
		setLoading(true);
		const resp: any = await AudioBookApi.getAudioBook(id);
		// const respGenre = await GenreApi.getListGenre({});
		if (resp.success) {
			setAudioBook(resp.data);
			if (resp.data?.author) {
				setSearchedAuthors(resp.data?.author);
				setSelectedAuthor(resp.data?.author?.[0]?.id);
			}

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
			if (resp.data?.url) {
				setAudioFileURL(resp.data?.url);
			}
			setLoading(false);
			// console.log(audioBook);
		} else {
			toast.error(resp.message, toastOption);
			setError(resp.message);
		}
		// if (respGenre.success) {
		// 	setGenres(respGenre.data?.results);
		// 	setLoading(false);
		// }
	};

	const fetchDataGenre = async () => {
		setLoading(true);
		const respGenre = await GenreApi.getListGenre({});
		if (respGenre.success) {
			setGenres(respGenre.data?.results);
			setLoading(false);
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
		values.audio = audioFile;
		values.image = values.image.file;
		delete values.selectedAuthor;
		delete values.inputAuthor;
		values.author = [selectedAuthor];

		const formData = new FormData();
		Object.keys(values).map((key) => {
			if (key !== 'audio' && key !== 'image') formData.append(key, values[key]);
		});
		if (audioFile) formData.append('audio', audioFile);
		if (fileList) formData.append('image', fileList[0].originFileObj as Blob);

		if (title == 'Sửa nội dung') {
			dispatch(updateAudioBook({ id: id, formData: formData }))
				.unwrap()
				.then((originalPromiseResult) => {
					console.log(originalPromiseResult);
					navigate('/audio-book');
				})
				.catch((rejectedValueOrSerializedError) => {
					setSpinning(false);
					toast.error(rejectedValueOrSerializedError.message, toastOption);
				});
		} else {
			dispatch(saveAudioBook(formData))
				.unwrap()
				.then((originalPromiseResult) => {
					console.log(originalPromiseResult);
					navigate('/audio-book');
				})
				.catch((rejectedValueOrSerializedError) => {
					setSpinning(false);
					// handle error here
					toast.error(rejectedValueOrSerializedError.message, toastOption);
				});
		}
	};

	const handleAudioChange = (info: any) => {
		const audioURL = URL.createObjectURL(info.file.originFileObj);
		setAudioFileURL(audioURL);

		setAudioFile(info.file.originFileObj);
	};

	const handleSearchAuthor = async (value: any) => {
		const authors = await AuthorApi.getListAuthor({ search: value });
		setSearchedAuthors(authors.data?.results);
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

	const onRemoveAudio = (e: any) => {
		setAudioFileURL('');
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
			fulfilled={id ? Boolean(audioBook) : true}
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
						...audioBook,
						genre: audioBook?.genre?.id,
						author: audioBook?.author[0]?.id,
						free: !audioBook?.free,
					}}
				>
					<Row gutter={16}>
						{/* Phần trái cho điền thông tin về sách */}
						<Col span={12}>
							<Form.Item
								label='Tên sách'
								name='title'
								rules={[{ required: true, message: 'Vui lòng nhập tên sách!' }]}
							>
								<Input />
							</Form.Item>
							<Form.Item
								label='Thể loại'
								name='genre'
								rules={[{ required: true, message: 'Vui lòng chọn thể loại!' }]}
							>
								<Select>
									{genres?.map((genre: IGenre, index: number) => {
										return (
											<Select.Option key={index} value={genre?.id}>
												{genre?.name}
											</Select.Option>
										);
									})}
								</Select>
							</Form.Item>

							<Form.Item
								label='Gói'
								name='free'
								rules={[{ required: true, message: 'Vui lòng chọn gói!' }]}
							>
								<Checkbox checked={!audioBook?.free}>Vip</Checkbox>
							</Form.Item>

							<Row
								gutter={16}
								style={{ display: 'flex', justifyContent: 'space-between' }}
							>
								<Col span={24}>
									<Form.Item
										label='Tác giả'
										name='inputAuthor'
										labelCol={{ span: 8 }}
										wrapperCol={{ span: 16 }}
									>
										<Input
											onChange={(e) => handleSearchAuthor(e.target.value)}
											placeholder='Nhập tên tác giả'
										/>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label='Chọn tác giả'
										name='author'
										rules={[
											{ required: true, message: 'Vui lòng nhập tác giả!' },
										]}
										labelCol={{ span: 8 }}
										wrapperCol={{ span: 16 }}
									>
										<Select
											showSearch
											value={selectedAuthor}
											onChange={(value) => {
												setSelectedAuthor(value);
											}}
											notFoundContent={null}
										>
											{searchedAuthors.map((author: any) => (
												<Select.Option key={author.id} value={author.id}>
													{author.name}
												</Select.Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Form.Item
								label='Năm xuất bản'
								name='publishDate'
								rules={[
									{ required: true, message: 'Vui lòng nhập năm sản xuất!' },
								]}
							>
								<Input />
							</Form.Item>

							<Form.Item label='Mô tả' name='desc'>
								<TextArea rows={4} />
							</Form.Item>
							{/* Thêm các trường thông tin khác về sách tại đây */}
						</Col>

						{/* Phần phải cho upload ảnh và âm thanh */}
						<Col span={12}>
							<Form.Item
								label='Ảnh bìa sách'
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
							<Form.Item
								label='File âm thanh'
								name='audio'
								rules={[
									{
										required: audioFileURL ? false : true,
										message: 'Bạn cần tải lên âm thanh!',
									},
								]}
							>
								<div className='flex'>
									<Upload
										name='audioFile'
										action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
										accept='.mp3'
										defaultFileList={audioFile}
										showUploadList={false}
										onChange={handleAudioChange}
									>
										<Button
											icon={<UploadOutlined />}
											disabled={Boolean(audioFileURL)}
										>
											Tải lên file âm thanh
										</Button>
									</Upload>
									<Button
										icon={<DeleteOutlined />}
										disabled={!Boolean(audioFileURL) || componentDisabled}
										onClick={onRemoveAudio}
										className='ml-[20px]'
									>
										Xóa âm thanh
									</Button>
								</div>
							</Form.Item>
							{/* Thêm các trường upload khác tại đây */}
							{/* Hiển thị trình phát âm thanh */}
							{audioFileURL && (
								// <Row gutter={16}>
								// 	<Col span={24} offset={1}>
								<div className='w-full'>
									{/* <audio src={audioFileURL} controls className='w-full' /> */}
									<ReactPlayer
										url={audioFileURL}
										controls
										width='100%'
										height='40px'
									/>
								</div>

								// 	</Col>
								// </Row>
							)}
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

export default EditAudioBook;

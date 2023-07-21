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
	Switch,
	TreeSelect,
	Upload,
	UploadProps,
	message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import { RcFile, UploadFile } from 'antd/es/upload';
import { useParams } from 'react-router-dom';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

function EditAudioBook() {
	const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
	const [audioFileURL, setAudioFileURL] = useState<string | null>(null);
	const [audioFile, setAudioFile] = useState<any>([]);
	const [searchedAuthors, setSearchedAuthors] = useState<any>([]);
	const [selectedAuthor, setSelectedAuthor] = useState('');
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	let { id } = useParams();

	useEffect(() => {
		if (id) setComponentDisabled(false);
		console.log(id);
	}, [id]);

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 16 },
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 16 },
	};

	const onFinish = (values: any) => {
		// Xử lý khi form được submit
		console.log('Form data: ', values);
	};

	const handleAudioChange = (info: any) => {
		const audioURL = URL.createObjectURL(info.file.originFileObj);
		setAudioFileURL(audioURL);
		setAudioFile(info.file);
		console.log(audioFile);
	};

	const handleSearchAuthor = (value: any) => {
		const mockData = ['Author A', 'Author B', 'Author C', 'Author D'];

		setSearchedAuthors(
			mockData.filter((author) =>
				author.toLowerCase().includes(value.toLowerCase()),
			),
		);
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
	return (
		<AsyncWrapper loading={false} error={null} fulfilled={Boolean(true)}>
			<Form {...layout} onFinish={onFinish} disabled={componentDisabled}>
				<Row gutter={16}>
					{/* Phần trái cho điền thông tin về sách */}
					<Col span={12}>
						<Form.Item
							label='Tên sách'
							name='bookName'
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
								<Select.Option value='demo'>Demo</Select.Option>
							</Select>
						</Form.Item>

						<Row
							gutter={16}
							style={{ display: 'flex', justifyContent: 'space-between' }}
						>
							<Col span={24}>
								<Form.Item
									label='Tác giả'
									name='author'
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
									name='selectedAuthor'
									rules={[
										{ required: true, message: 'Vui lòng nhập tác giả!' },
									]}
									labelCol={{ span: 8 }}
									wrapperCol={{ span: 16 }}
								>
									<Select
										showSearch
										value={selectedAuthor}
										// onChange={(value) => setSelectedAuthor(value)}
										notFoundContent={null}
									>
										{searchedAuthors.map((author: any) => (
											<Select.Option key={author} value={author}>
												{author}
											</Select.Option>
										))}
									</Select>
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							label='Ngày xuất bản'
							name='publishDate'
							// rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
						>
							<DatePicker />
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
							// rules={[{ required: true, message: 'Bạn cần tải lên ảnh' }]}
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
							name='audioFile'
							// rules={[{ required: true, message: 'Bạn cần tải lên âm thanh!' }]}
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
									disabled={!Boolean(audioFileURL)}
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
								<audio src={audioFileURL} controls className='w-full' />
							</div>

							// 	</Col>
							// </Row>
						)}
					</Col>
				</Row>

				<Form.Item {...tailLayout}>
					<Button htmlType='submit'>Submit</Button>
				</Form.Item>
			</Form>
		</AsyncWrapper>
	);
}

export default EditAudioBook;

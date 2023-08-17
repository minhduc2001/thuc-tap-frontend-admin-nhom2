import React, { useEffect, useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Space,
	Typography,
	Upload,
	UploadFile,
	UploadProps,
} from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from '../redux/hooks';
import { getMe } from '../redux/features/authSlice';
import { IUser } from '../interfaces/user.interface';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { toastOption } from '../configs/notification.config';

function ProfilePage() {
	const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(true);
	const state = useSelector((state: RootState) => state.auth);
	const user = state?.currentUser;

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getMe())
			.unwrap()
			.then(() => {
				if (state.error?.message) {
					toast.error(state.error.message, toastOption);
				}
				setLoading(false);
			});
	}, []);

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

	const handleBtnSubmit = (e: any) => {
		const text = e.target.innerText;
		if (text == 'Sửa') {
			e.preventDefault();
			setComponentDisabled(false);
		} else {
		}
	};

	return (
		<AsyncWrapper
			loading={loading}
			error={state?.error}
			fulfilled={Boolean(user)}
		>
			<div className='flex w-full h-full justify-around items-center flex-row'>
				<div className='bg-white w-[30%] rounded-[25px] h-[400px] flex justify-center flex-col items-center'>
					<label className='flex justify-center mb-3'>
						<img
							className='avatar-image rounded-full w-[250px] h-[250px] object-cover'
							src={
								user?.avatar ??
								'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'
							}
							alt='Avatar'
						/>
						<Upload
							action='URL_CUA_API_UPLOAD'
							showUploadList={false}
							// onChange={handleUpload}
						></Upload>
					</label>

					<Typography.Text className='text-center'>
						Đây là tài khoản admin! Tài khoản có tất cả các quyền trên hệ thống
					</Typography.Text>
					{/* </Space> */}
				</div>
				<div className='bg-white rounded-[25px] h-[400px] w-[60%] flex justify-center flex-col items-center'>
					<Form
						{...layout}
						onFinish={onFinish}
						disabled={componentDisabled}
						className='w-full'
						initialValues={{ ...user }}
					>
						<Row gutter={16}>
							<Col span={12}>
								<Form.Item
									label='Họ và tên'
									name='username'
									rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
								>
									<Input />
								</Form.Item>
								<Form.Item
									label='Số điện thoại'
									name='phone'
									// rules={[
									// 	{ required: true, message: 'Vui lòng nhập số điện thoại!' },
									// ]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label='Email'
									name='email'
									rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
								>
									<Input disabled />
								</Form.Item>

								<Form.Item
									label='Sinh nhật'
									name='birthday'
									// rules={[{ required: true, message: 'Vui lòng nhập tác giả!' }]}
								>
									<DatePicker />
								</Form.Item>

								{/* Thêm các trường thông tin khác về sách tại đây */}
							</Col>

							{/* Phần phải cho upload ảnh và âm thanh */}
							<Col span={12}></Col>
						</Row>

						<Form.Item {...tailLayout}>
							<Button
								htmlType='submit'
								onClick={handleBtnSubmit}
								disabled={false}
							>
								{componentDisabled ? 'Sửa' : 'Cập nhật'}
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</AsyncWrapper>
	);
}

export default ProfilePage;

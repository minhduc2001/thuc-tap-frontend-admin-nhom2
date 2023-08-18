import {
	Row,
	Col,
	Card,
	Typography,
	Image,
	Tag,
	Table,
	Button,
	Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import supportApi from '../api/supportApi';
import { toast } from 'react-toastify';
import { toastOption } from '../configs/notification.config';
import { Support } from '../redux/features/supportSlice';
import { EPrioritySuport, EResloved } from '../enums/enum';
import { render } from 'react-dom';

const { Title, Text } = Typography;
function RequestDetailPage() {
	let { id } = useParams();
	const [request, setRequest] = useState<Support | any>({});

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!id) navigate('/404');
		else
			supportApi.getSupport(id ?? 'REQ001').then((resp) => {
				if (resp.message) {
					toast.warn(resp.message, toastOption);
					navigate('/support');
				} else {
					setRequest(resp.data as Support);
				}
			});
	}, []);

	const [cancelModalVisible, setCancelModalVisible] = useState(false);
	const handleCancelConfirm = () => {
		// Xử lý hủy bỏ yêu cầu
		setCancelModalVisible(false);
	};

	const showCancelModal = () => {
		setCancelModalVisible(true);
	};

	const hideCancelModal = () => {
		setCancelModalVisible(false);
	};

	const dataSource = [
		{ label: 'Mã', value: request?.code },
		{ label: 'Chủ đề', value: request?.subject?.title },
		{
			label: 'Người tạo',
			value: (
				<Table
					pagination={false}
					dataSource={[
						{
							label: 'Tên người dùng',
							value: request?.user?.username ?? 'unknow god???',
						},
						{ label: 'email', value: request?.user?.email },
					]}
					columns={[
						{
							title: 'Thuộc tính',
							dataIndex: 'label',
							key: 'label',
							width: '30%',
							render: (text: string) => <strong>{text}</strong>,
						},
						{
							title: 'Giá trị',
							dataIndex: 'value',
							key: 'value',
						},
					]}
				></Table>
			),
		},
		{ label: 'Tên', value: request?.title },
		{ label: 'Nội dung', value: request?.content },
		{ label: 'Thời gian tạo', value: request?.createdAt },
		{
			label: 'Mức độ',
			value: <Tag color='error'>{EPrioritySuport[request?.priority]}</Tag>,
		},
		{
			label: 'Đã giải quyết',
			value: EResloved[request?.resolved],
		},
	];

	const columns = [
		{
			title: 'Thuộc tính',
			dataIndex: 'label',
			key: 'label',
			width: '20%',
			render: (text: string) => <strong>{text}</strong>,
		},
		{
			title: 'Giá trị',
			dataIndex: 'value',
			key: 'value',
		},
	];

	return (
		<Row gutter={16} style={{ maxHeight: '80vh' }}>
			<Col span={12}>
				<Card style={{ height: '100%' }}>
					<Title level={4}>Thông tin yêu cầu</Title>
					<Table
						dataSource={dataSource}
						columns={columns}
						pagination={false}
						size='small'
					/>
					<div className='mt-4 flex justify-center'>
						<Button
							className='ml-2'
							onClick={() => {
								/* Xử lý hoàn thành yêu cầu */
							}}
						>
							Hoàn thành
						</Button>
						<Button danger className='ml-2' onClick={showCancelModal}>
							Hủy bỏ
						</Button>
					</div>
					<Modal
						title='Xác thực hủy bỏ yêu cầu'
						open={cancelModalVisible}
						onOk={handleCancelConfirm}
						onCancel={hideCancelModal}
						okText='Xác nhận'
						cancelText='Hủy'
						centered
					>
						<p>Bạn có chắc chắn muốn hủy bỏ yêu cầu này?</p>
					</Modal>
				</Card>
			</Col>
			<Col span={12}>
				<Card style={{ height: '100%' }}>
					<Title level={4}>Hình ảnh kèm theo</Title>
					{/* {request?.images?.map((image, index) => (
						<Image
							key={index}
							src={image}
							alt={`Hình ảnh ${index}`}
							className='mb-2'
						/>
					))} */}
					<div className='flex flex-wrap justify-evenly'>
						{request?.images?.map((src: string, index: number) => {
							return (
								<Image
									src={
										src ??
										'https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg'
									}
									alt={`Hình ảnh ${index}`}
									className='mb-2 mx-2'
									width='300px'
									key={index}
								/>
							);
						})}
					</div>
				</Card>
			</Col>
		</Row>
	);
}

export default RequestDetailPage;

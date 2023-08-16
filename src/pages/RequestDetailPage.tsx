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
import React, { useState } from 'react';

const { Title, Text } = Typography;
function RequestDetailPage() {
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
	const [request, setRequest] = useState({
		code: 'REQ001',
		subject: 'Hỗ trợ kỹ thuật',
		name: 'Nguyễn Văn A',
		content:
			'Không thể kết nối mạng bjhsfgjsdh asughfusagh uhgaudg sajagduyags uhgdgauysgd ua aydg a7ygdaysdgaiy d g8a7gd ahbdaug dahgda8uhd a sygd8ay8s gdiuasjhgd8asuygd aisjhghdayugd aiusugdasydgua sygdiua duiausyhd8asudh akdjadghiuwq diasjhdaygd asud8ad8q wdiauwhgdiaw hdkasjhd iawshdaisug kán kasncsajgdccauisgcjzhg xcjkajkbdcauisygdai sjbdausygd asiudhiasuhg xcjashgdasuygdia hxcjahsbdaiusiugdawuysgdkja  dausygdiuashgd uabd ajgdauygdaisugd asidbiasuhdoiashdfsaibdkjashduwqhdsakjbdiashu dcaksjhdcaisuhdciaus hdijasgd iuauhdasiuhd asjuhgdisuagduiah dasuyhgdaushdiuashd askjdbiausgduias dfikaghhfdiusahdfiou ah d iuashdfuawiysgdfjuisahd bsaiuh daisohfdiuesagdfjiwegfr dsjachf basuihfc aksjgfiajsk fhjsadgfcu asjhgfskhf aslughfjkasdbckjasjhgfuyawefusahbf uywssge dfjsaghhdf uahsbdf ukywegd jkAJHDBuyhuaygduw ey',
		createdAt: '2023-08-10 09:30',
		priority: <Tag color='error'>Cao</Tag>,
		resolved: 1,
	});
	const dataSource = [
		{ label: 'Mã', value: request.code },
		{ label: 'Chủ đề', value: request.subject },
		{
			label: 'Người tạo',
			value: (
				<Table
					pagination={false}
					dataSource={[
						{ label: 'Tên người dùng', value: 'jaj' },
						{ label: 'email', value: 'minhduc@gmail.com' },
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
		{ label: 'Tên', value: request.name },
		{ label: 'Nội dung', value: request.content },
		{ label: 'Thời gian tạo', value: request.createdAt },
		{ label: 'Mức độ', value: request.priority },
		{ label: 'Đã giải quyết', value: request.resolved ? 'Có' : 'Không' },
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
						<Image
							src={
								'https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg'
							}
							alt={`Hình ảnh`}
							className='mb-2 mx-2'
							width='300px'
						/>
						<Image
							src={
								'https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg'
							}
							alt={`Hình ảnh`}
							className='mb-2 mx-2'
							width='300px'
						/>
						<Image
							src={
								'https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg'
							}
							alt={`Hình ảnh`}
							className='mb-2 mx-2'
							width='300px'
						/>
						<Image
							src={
								'https://gamek.mediacdn.vn/133514250583805952/2022/4/6/be1-164922643669587606129.jpg'
							}
							alt={`Hình ảnh`}
							className='mb-2 mx-2'
							width='300px'
						/>
					</div>
				</Card>
			</Col>
		</Row>
	);
}

export default RequestDetailPage;

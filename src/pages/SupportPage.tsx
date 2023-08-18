import React, { useEffect, useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import {
	Button,
	Checkbox,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Space,
	Table,
	Tag,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { EPrioritySuport, EResloved, LoadingStatus } from '../enums/enum';
import { Support, getSupport } from '../redux/features/supportSlice';

function SupportPage() {
	const navigate = useNavigate();
	const state = useAppSelector((state: RootState) => state.support);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getSupport({}));
	}, []);

	const optionsOperation = [
		'Tất cả',
		'Đã giải quyết',
		'Chưa giải quyết',
		'Đã hủy',
	];

	const columns = [
		{
			title: 'Mã',
			dataIndex: 'code',
			key: 'code',
		},
		{
			title: 'Chủ đề',
			dataIndex: 'subject',
			key: 'subject',
		},
		{
			title: 'Tên',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Nội dung',
			dataIndex: 'content',
			key: 'content',
		},
		{
			title: 'Thời gian tạo',
			dataIndex: 'createdAt',
			key: 'createdAt',
		},
		{
			title: 'Mức độ',
			dataIndex: 'priority',
			key: 'priority',
			render: (priority: number) => (
				<Tag color='error'>{EPrioritySuport[priority]}</Tag>
			),
		},
		{
			title: 'Đã giải quyết',
			dataIndex: 'resolved',
			key: 'resolved',
			render: (resolved: number) => EResloved[resolved],
		},
	];
	return (
		<AsyncWrapper
			loading={state.loading == LoadingStatus.Pedding}
			error={state.error}
			fulfilled={Boolean(state.supports)}
		>
			<div className='p-8'>
				<div className='mb-4'>
					<Select className='mr-2 w-[150px]' placeholder='Lọc theo mức độ'>
						<Select.Option value='high'>Cao</Select.Option>
						<Select.Option value='medium'>Trung bình</Select.Option>
						<Select.Option value='low'>Thấp</Select.Option>
					</Select>
					<Select className='mr-2  w-[200px]' placeholder='Lọc theo chủ đề'>
						<Select.Option value='technical'>Hỗ trợ kỹ thuật</Select.Option>
						<Select.Option value='billing'>Hỏi về thanh toán</Select.Option>
					</Select>
					<Select
						className='mr-2  w-[200px]'
						defaultValue={optionsOperation[0]}
					>
						{optionsOperation.map((value, index: number) => {
							return (
								<Select.Option key={index} value={index}>
									{value}
								</Select.Option>
							);
						})}
					</Select>
				</div>
				<Table
					dataSource={state.supports}
					columns={columns}
					onRow={(record) => ({
						onDoubleClick: (e) => {
							navigate('/support/' + record.code);
						},
					})}
				/>
			</div>
		</AsyncWrapper>
	);
}

export default SupportPage;

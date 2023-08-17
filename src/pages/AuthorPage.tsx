import React, { useEffect, useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import Helmet from '../components/Helmet';
import { Button, Input, Pagination, PaginationProps, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import CardBook from '../components/CardBook';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AudioBookApi from '../api/audioBookApi';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getAllAuthor } from '../redux/features/authorSlice';
import { LoadingStatus } from '../enums/enum';
import AuthorCard from '../components/CardAuthor';

function AuthorPage() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalBooks, setTotalBooks] = useState<number | undefined>(100);
	const [booksToShow, setBooksToShow] = useState<number>(10);
	const [sortingMethod, setSortingMethod] = useState<string | null>(null);

	const state = useAppSelector((state: RootState) => state.author);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			getAllAuthor({
				page: currentPage,
				limit: booksToShow,
			}),
		).then(() => {
			setTotalBooks(state?.metadata?.totalItems);
		});
	}, [currentPage, booksToShow]);

	const navigate = useNavigate();

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleSortingChange = (value: string) => {
		setSortingMethod(value);
	};

	const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
		current,
		pageSize,
	) => {
		// console.log(current, pageSize);
		setBooksToShow(pageSize);
	};

	return (
		<AsyncWrapper
			loading={state.loading == LoadingStatus.Pedding}
			error={state.error}
			fulfilled={Boolean(state.authors)}
		>
			<Helmet title='Author Page' description='Quản lý tác giả' />
			{Boolean(state.authors) && (
				<>
					<div>
						<h1>Quản lý tác giả</h1>
						<div style={{ marginBottom: 10, marginTop: 10 }}>
							<Input
								style={{ width: 200, marginRight: 10 }}
								placeholder='Tìm kiếm theo tên'
								allowClear
							></Input>

							<Select
								style={{ width: 200, marginRight: '40%' }}
								placeholder='Sắp xếp'
								onChange={handleSortingChange}
								allowClear
							>
								<Option value='title-asc'>Tên A-Z</Option>
								<Option value='title-desc'>Tên Z-A</Option>
								{/* <Option value='views-asc'>Lượt xem tăng dần</Option>
								<Option value='views-desc'>Lượt xem tăng dần</Option>
								<Option value='trending'>Xu hướng</Option> */}
							</Select>
							<Button
								type='default'
								style={{
									color: '#3399FF',
									width: '150px',
								}}
								onClick={() => navigate('/author/create')}
							>
								Thêm Tác giả
							</Button>
						</div>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{state?.authors.map((author: any) => (
								<AuthorCard
									id={author.id}
									name={author.name}
									image={author.image}
								/>
							))}
						</div>
						<Pagination
							current={currentPage}
							onChange={handlePageChange}
							total={totalBooks}
							pageSize={booksToShow}
							onShowSizeChange={onShowSizeChange}
							style={{ marginTop: 20, textAlign: 'center' }}
						/>
					</div>
				</>
			)}
		</AsyncWrapper>
	);
}

export default AuthorPage;

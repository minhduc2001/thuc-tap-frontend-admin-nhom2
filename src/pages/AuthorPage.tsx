import React, { useEffect, useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import Helmet from '../components/Helmet';
import { Button, Input, Pagination, PaginationProps, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import CardBook from '../components/CardBook';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AudioBookApi from '../api/audioBookApi';

function AuthorPage() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalBooks, setTotalBooks] = useState<number | undefined>(100);
	const [booksToShow, setBooksToShow] = useState<number>(10);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [sortingMethod, setSortingMethod] = useState<string | null>(null);

	const [loading, setLoading] = useState<boolean>(true);
	const [audioBooks, setAudioBooks] = useState<any>([]);

	useEffect(() => {
		fetchData();
	}, [currentPage, booksToShow]);

	const fetchData = async () => {
		const resp = await AudioBookApi.getListAudioBook({
			page: currentPage,
			limit: booksToShow,
		});
		if (resp.success) {
			setAudioBooks(resp.data?.results);
			setTotalBooks(resp?.data?.meta?.totalItems);
			setLoading(false);
		}
	};

	const navigate = useNavigate();

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const handleCategoryChange = (value: string) => {
		setSelectedCategory(value);
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
			loading={loading}
			error={null}
			fulfilled={Boolean(audioBooks)}
		>
			<Helmet title='Homepage' description='Thống kê' />
			{Boolean(audioBooks) && (
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
								onClick={() => navigate('/audio-book/create')}
							>
								Thêm Tác giả
							</Button>
						</div>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{audioBooks.map((book: any) => (
								<CardBook
									id={book.id}
									title={book.title}
									author={book.author}
									image={book.image}
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

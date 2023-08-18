import React, { useEffect, useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import Helmet from '../components/Helmet';
import { Button, Input, Pagination, PaginationProps, Select, Spin } from 'antd';
import { Option } from 'antd/es/mentions';
import CardBook from '../components/CardBook';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AudioBookApi from '../api/audioBookApi';
import { useAppDispatch } from '../redux/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { getAllAudioBook } from '../redux/features/audiobookSlice';
import { listGenre } from '../redux/features/genreSlice';

function AudioBookPage() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [booksToShow, setBooksToShow] = useState<number>(12);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [sortingMethod, setSortingMethod] = useState<string | null>(null);
	const [spinning, setSpinning] = useState<boolean>(false);

	const [loading, setLoading] = useState<boolean>(true);
	const listAudioBooks = useSelector((state: RootState) => state.audiobook);
	const genres = useSelector((state: RootState) => state.genre.genres);

	const dispatch = useAppDispatch();
	useEffect(() => {
		// const config: Query = { page: currentPage, limit: booksToShow };
		// if (selectedCategory) {
		// 	config.filter = `{ "genre.id": "${selectedCategory}"}`;
		// }
		setSpinning(true);

		dispatch(getAllAudioBook({ page: currentPage, limit: booksToShow })).then(
			() => fetchData(),
		);
	}, [currentPage, booksToShow]);

	useEffect(() => {
		dispatch(listGenre({}));
	}, []);

	const fetchData = async () => {
		if (loading == true) setLoading(false);
		setSpinning(false);
	};

	const navigate = useNavigate();

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};

	const handleCategoryChange = (value: string) => {
		setSelectedCategory(value);
		console.log(value);

		const config: Query = { page: currentPage, limit: booksToShow };
		if (value) {
			config.filter = `{ "genre.id": "${value}"}`;
		}

		setSpinning(true);
		dispatch(getAllAudioBook(config)).then(() => setSpinning(false));
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
			error={listAudioBooks.error}
			fulfilled={Boolean(listAudioBooks.audioBooks)}
		>
			<Helmet title='Audio Book page' description='liệt kê sách nói' />
			{Boolean(listAudioBooks.audioBooks) && (
				<>
					<div>
						<h1>Quản lý sách nói</h1>
						<div style={{ marginBottom: 10, marginTop: 10 }}>
							<Input
								style={{ width: 200, marginRight: 10 }}
								placeholder='Tìm kiếm theo tác giả'
								allowClear
							></Input>
							<Select
								style={{ width: 200, marginRight: 10 }}
								placeholder='Chọn thể loại'
								onChange={handleCategoryChange}
								allowClear
								defaultValue={selectedCategory}
							>
								{genres.map((genre: any) => (
									<Option key={genre.id} value={genre.id}>
										{genre.name}
									</Option>
								))}
							</Select>
							<Select
								style={{ width: 200, marginRight: '20%' }}
								placeholder='Sắp xếp'
								onChange={handleSortingChange}
								allowClear
							>
								<Option value='title-asc'>Tên A-Z</Option>
								<Option value='title-desc'>Tên Z-A</Option>
								<Option value='views-asc'>Lượt xem tăng dần</Option>
								<Option value='views-desc'>Lượt xem tăng dần</Option>
								<Option value='trending'>Xu hướng</Option>
							</Select>
							<Button
								type='default'
								style={{
									color: '#3399FF',
									width: '150px',
								}}
								onClick={() => navigate('/audio-book/create')}
							>
								Thêm sách nói
							</Button>
						</div>
						<Spin tip='Loading...' size='large' spinning={spinning}>
							<div style={{ display: 'flex', flexWrap: 'wrap' }}>
								{listAudioBooks.audioBooks.map((book: any, index: number) => (
									<CardBook
										key={index}
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
								total={listAudioBooks.metadata.totalItems}
								pageSize={booksToShow}
								onShowSizeChange={onShowSizeChange}
								style={{ marginTop: 20, textAlign: 'center' }}
							/>
						</Spin>
					</div>
				</>
			)}
		</AsyncWrapper>
	);
}

export default AudioBookPage;

import React, { useState } from 'react';
import AsyncWrapper from '../layouts/AsyncWrapper';
import Helmet from '../components/Helmet';
import { Button, Input, Pagination, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import CardBook from '../components/CardBook';
import { PlusOutlined } from '@ant-design/icons';

const PAGE_SIZE = 6;
function AudioBookPage() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalBooks, setTotalBooks] = useState(100);
	const [booksToShow, setBooksToShow] = useState<any>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [sortingMethod, setSortingMethod] = useState<string | null>(null);
	const isFetching = false;
	const data: any = [
		{
			id: 1,
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: 2,
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://staticg.sportskeeda.com/editor/2023/07/b33b5-16885253576097-1920.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
		{
			id: Math.floor(Math.random() * 100000),
			title: 'My new waifu',
			author: 'Author 1',
			image:
				'https://anime.atsit.in/l/wp-content/uploads/2023/03/anime-the-girl-i-like-forgot-her-glasses-tiet-lo-video-quang-cao-dau-tien-hinh-anh-nhan-vien-dien-vien.jpg',
		},
	];
	const error = null;

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	const handleCategoryChange = (value: string) => {
		setSelectedCategory(value);
	};

	const handleSortingChange = (value: string) => {
		setSortingMethod(value);
	};

	return (
		<AsyncWrapper loading={isFetching} error={error} fulfilled={Boolean(data)}>
			<Helmet title='Homepage' description='Thống kê' />
			{Boolean(data) && (
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
							>
								<Option value='fiction'>Fiction</Option>
								<Option value='non-fiction'>Non-Fiction</Option>
							</Select>
							<Select
								style={{ width: 200, marginRight: '20%' }}
								placeholder='Lọc'
								onChange={handleSortingChange}
								allowClear
							>
								<Option value='title'>Title</Option>
								<Option value='views'>Views</Option>
							</Select>
							<Button
								type='default'
								style={{
									color: '#3399FF',
									width: '150px',
								}}
							>
								Thêm sách
							</Button>
						</div>
						<div style={{ display: 'flex', flexWrap: 'wrap' }}>
							{data.map((book: any) => (
								<CardBook
									key={book.id}
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
							pageSize={PAGE_SIZE}
							style={{ marginTop: 20, textAlign: 'center' }}
						/>
					</div>
				</>
			)}
		</AsyncWrapper>
	);
}

export default AudioBookPage;

import React from 'react';
import {
	DeleteOutlined,
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
export interface IAudioBook {
	title: string;
	image: string;
	author: IAuthor;
	desc?: string;
	id: number;
}

export interface IAuthor {
	id: number;
	name: string;
	image: string;
	desc?: string;
}

function CardBook(audioBook: IAudioBook) {
	const navigate = useNavigate();

	const handleBtnEdit = (e: any) => {
		navigate('/audio-book/edit/' + audioBook.id);
	};

	const handleBtnDelete = (e: any) => {};
	return (
		<Card
			style={{ width: 240, margin: 10 }}
			cover={
				<img
					alt={audioBook?.title}
					src={audioBook?.image}
					className='w-full h-[200px] object-cover'
				/>
			}
			hoverable
			actions={[
				<EditOutlined key='edit' onClick={handleBtnEdit} />,
				<DeleteOutlined key='delete' />,
			]}
		>
			<Meta
				avatar={
					<Avatar
						src={
							audioBook?.author?.image ??
							'https://i.pravatar.cc/300?u=fake@pravatar.com'
						}
					/>
				}
				title={audioBook?.title}
				description={audioBook?.desc ?? 'Đây là câu chuyện ...'}
			/>
		</Card>
	);
}

export default CardBook;

import React from 'react';
import {
	DeleteOutlined,
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { IAuthor } from './CardBook';

const { Meta } = Card;

function AuthorCard(author: IAuthor) {
	const navigate = useNavigate();

	const handleBtnEdit = (e: any) => {
		navigate('/author/edit/' + author.id);
	};

	const handleBtnDelete = (e: any) => {};
	return (
		<Card
			style={{ width: 240, margin: 10 }}
			cover={
				<img
					alt={author?.name}
					src={author?.image}
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
				title={author?.name}
				description={author?.name ?? 'Đây là tac gia ...'}
			/>
		</Card>
	);
}

export default AuthorCard;

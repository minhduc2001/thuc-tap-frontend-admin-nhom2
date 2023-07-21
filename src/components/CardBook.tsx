import React from 'react';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;
export interface IAudioBook {
	title: string;
	image: string;
	author: IAuthor;
	desc?: string;
	key: number;
}

export interface IAuthor {
	id: number;
	name: string;
	image: string;
	desc?: string;
}

function CardBook(audioBook: IAudioBook) {
	return (
		<Card
			style={{ width: 240, margin: 10 }}
			cover={
				<img
					alt={audioBook?.title}
					src={audioBook?.image}
					className='w-full h-[300px] object-cover'
				/>
			}
			hoverable
			actions={[
				<SettingOutlined key='setting' />,
				<EditOutlined key='edit' />,
				<EllipsisOutlined key='ellipsis' />,
			]}
		>
			<Meta
				avatar={<Avatar src={audioBook?.author?.image} />}
				title={audioBook?.title}
				description={audioBook?.desc}
			/>
		</Card>
	);
}

export default CardBook;

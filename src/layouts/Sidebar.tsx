import {
	BulbOutlined,
	FormOutlined,
	FundOutlined,
	HomeOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import favicon from '../assets/images/icons/favicon.png';

const items: MenuItem[] = [
	{
		label: <NavLink to='/'>Home</NavLink>,
		key: '/',
		icon: <HomeOutlined />,
	},
	{
		label: <NavLink to='/audio-book'>Audio Book</NavLink>,
		key: '/audio-book',
		icon: <HomeOutlined />,
	},
	{
		label: <NavLink to='/profile'>Profile</NavLink>,
		key: '/profile',
		icon: <UserOutlined />,
	},
	{
		label: <NavLink to='/author'>Author</NavLink>,
		key: '/author',
		// icon: <></>,
	},
	{
		label: <NavLink to='support'>Support</NavLink>,
		key: 'support',
	},
];

function Sidebar() {
	const { pathname } = useLocation();
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout.Sider
			collapsible
			collapsed={collapsed}
			theme='dark'
			width={250}
			onCollapse={(value) => setCollapsed(value)}
			breakpoint='md'
		>
			<Link className='flex items-center justify-center my-5' to='/'>
				<Avatar src={favicon} size='large' alt='audio book' />
				{!collapsed && (
					<h4 className='transition-all duration-300 text-white ml-4 text-2xl'>
						Audio Book
					</h4>
				)}
			</Link>

			<Menu
				defaultSelectedKeys={[pathname]}
				theme='dark'
				mode='inline'
				items={items}
			/>
		</Layout.Sider>
	);
}

export default Sidebar;

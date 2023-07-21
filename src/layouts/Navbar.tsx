import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {
	Alert,
	Avatar,
	Dropdown,
	Layout,
	Menu,
	MenuProps,
	Select,
	Spin,
} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
	const navigateTo = useNavigate();
	const data: any = [{ data: { coin: { name: 'asjhdsj' } } }];
	const isFetching = false;

	const error = null;

	const [options, setOptions] = useState<AutoCompleteOption[]>([]);

	useEffect(() => {
		setOptions(
			data?.data?.coins.map((coin: Coin) => ({
				value: coin.name,
				label: coin.name,
				reset: { ...coin },
			})),
		);
	}, [data]);

	const onSelect = (_value: string, option: AutoCompleteOption) => {
		navigateTo(`/audio-book/edit/${option.reset.uuid}`);
	};

	const handleMenuClick = ({ key }: any) => {
		if (key === 'profile') {
			// Xử lý khi nhấp vào xem thông tin
			console.log('View Profile');
		} else if (key === 'logout') {
			// Xử lý khi nhấp vào logout
			console.log('Logout');
		}
	};

	const items: MenuProps['items'] = [
		{
			label: (
				<Menu.Item key='profile'>
					<UserOutlined style={{ fontSize: '20px', marginRight: '5px' }} />
					<span>View Profile</span>
				</Menu.Item>
			),
			key: 'profile',
		},
		{
			label: (
				<Menu.Item key='logout'>
					<LogoutOutlined style={{ fontSize: '20px', marginRight: '5px' }} />
					<span>Logout</span>
				</Menu.Item>
			),
			key: 'logout',
		},
	];

	if (isFetching) {
		return <Spin size='small' />;
	} else if (error) {
		return <Alert showIcon message={JSON.stringify(error)} type='warning' />;
	} else if (data) {
		return (
			<Layout.Header className='p-0 bg-white md:grid grid-cols-5'>
				<div className='mx-5 col-span-2 items-center'>
					<Select
						showSearch
						onSelect={onSelect}
						className='w-full'
						placeholder='Search for audio book ?'
						filterOption={(inputValue, option) =>
							option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
							-1
						}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								.toLowerCase()
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={options}
					/>
				</div>
				<div className='col-span-1'></div>
				<div className='col-span-2 flex justify-center'>
					<Dropdown
						menu={{
							items: items,
							onClick: handleMenuClick,
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								cursor: 'pointer',
							}}
						>
							<Avatar
								style={{ fontSize: '20px', marginRight: '5px' }}
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7hBVxwYgBX3U3o5Lu3dLQuzQngHKHcmNqyUdJhqali9eEub8JFyDEdMzEctZezWsLzM&usqp=CAU'
							/>
							<span className='text-sky-500 ml-4'>{'Minh Duc'}</span>
						</div>
					</Dropdown>
				</div>
			</Layout.Header>
		);
	} else {
		return <></>;
	}
}

export default Navbar;

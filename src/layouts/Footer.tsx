import { Layout } from 'antd';

function Footer() {
	return (
		<Layout.Footer>
			<div className='text-center'>
				Developed by{'  '}
				<a
					href='https://github.com/minhduc2001'
					target='_blank'
					rel='noopener noreferrer'
				>
					Ngô Minh Đức
				</a>
			</div>
		</Layout.Footer>
	);
}

export default Footer;

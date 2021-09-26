import React, { useState } from 'react';
import { MenuItem, Typography, MenuList } from '@mui/material';
import Link from 'next/link';
import styles from './Navbar.module.css';
import {
	ChatBubbleOutlined,
	FoundationOutlined,
	HomeOutlined,
	MoneyOutlined,
} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {
	const [drawer, setDrawer] = useState(false);
	const [showLinks, setShowLinks] = useState(true);
	const matches = useMediaQuery('(max-width:1020px)');
	const drawerHandler = () => {
		setDrawer(!drawer);
		setShowLinks(!showLinks);
	};

	return (
		<div className={matches ? styles.navbar : styles.sidebar}>
			<div className={styles.logo_container}>
				<Typography className={styles.logo}>
					<Link  passHref={true} href="/">CryptoNews</Link>
				</Typography>
			</div>

			<div
				className={matches ? styles.rightSide : styles.sidebar}
				id={showLinks ? 'hidden' : 'active'}
			>
				<MenuList className={!matches ? styles.sidebar_menu : ''} variant={'menu'}>
					<Link  passHref={true} href="/">
						<MenuItem>
							<HomeOutlined sx={{ marginRight: 1 }} />
							Home
						</MenuItem>
					</Link>
					<Link  passHref={true} href="/cryptocurrencies">
						<MenuItem sx={{ marginTop: 1 }}>
							<FoundationOutlined sx={{ marginRight: 1 }} />
							Cryptocurrencies
						</MenuItem>
					</Link>
					<Link passHref={true}  href="/exchanges">
						<MenuItem sx={{ marginTop: 1 }}>
							<MoneyOutlined sx={{ marginRight: 1 }} />
							Exchanges
						</MenuItem>
					</Link>
					<Link  passHref={true} href="/news">
						<MenuItem sx={{ marginTop: 1 }}>
							<ChatBubbleOutlined sx={{ marginRight: 1 }} />
							News
						</MenuItem>
					</Link>
				</MenuList>
			</div>
			{matches && (
				<div className={styles.icon}>
					{!drawer ? (
						<MenuIcon onClick={drawerHandler}></MenuIcon>
					) : (
						<MenuOpenIcon onClick={drawerHandler} />
					)}
				</div>
			)}
		</div>
	);
};

export default Navbar;

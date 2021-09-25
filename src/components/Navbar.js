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
					<Link href="/">CryptoNews</Link>
				</Typography>
			</div>

			<div className={matches ? styles.rightSide : styles.sidebar} id={showLinks ? 'hidden' : 'active'}>
				<MenuList className={!matches && styles.sidebar_menu} variant={'menu'}>
					<MenuItem>
						<HomeOutlined sx={{ marginRight: 1 }} />
						<Link href="/">Home</Link>
					</MenuItem>
					<MenuItem sx={{ marginTop: 1 }}>
						<FoundationOutlined sx={{ marginRight: 1 }} />
						<Link href="/cryptocurrencies">Cryptocurrencies</Link>
					</MenuItem>
					<MenuItem sx={{ marginTop: 1 }}>
						<MoneyOutlined sx={{ marginRight: 1 }} />
						<Link href="/exchanges">Exchanges</Link>
					</MenuItem>
					<MenuItem sx={{ marginTop: 1 }}>
						<ChatBubbleOutlined sx={{ marginRight: 1 }} />
						<Link href="/news">News</Link>
					</MenuItem>
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

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
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';

const Navbar = (props) => {
	const [drawer, setDrawer] = useState(false);
	const [darkMode, setDarkMode] = useState('dark');
	const [showLinks, setShowLinks] = useState(true);
	const matches = useMediaQuery('(max-width:1020px)');
	const drawerHandler = () => {
		setDrawer(!drawer);
		setShowLinks(!showLinks);
	};
	const darkModeHandler = () => {
		setDarkMode(darkMode === 'light' ? 'dark' : 'light');
		props.onToggleMode(darkMode);
	};

	return (
		<div className={matches ? styles.navbar : styles.sidebar}>
			<div className={styles.logo_container}>
				<Typography className={styles.logo}>
					<Link passHref={true} href="/">
						CryptoNews
					</Link>
				</Typography>
				<IconButton style={{marginLeft: 10}} onClick={darkModeHandler}>
					{darkMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
			</div>

			<div
				className={matches ? styles.rightSide : styles.sidebar}
				id={showLinks ? 'hidden' : 'active'}
			>
				<MenuList
					className={!matches ? styles.sidebar_menu : ''}
					variant={'menu'}
				>
					<Link passHref={true} href="/">
						<MenuItem>
							<HomeOutlined sx={{ marginRight: 1 }} />
							Home
						</MenuItem>
					</Link>
					<Link passHref={true} href="/cryptocurrencies">
						<MenuItem sx={{ marginTop: 1 }}>
							<FoundationOutlined sx={{ marginRight: 1 }} />
							Cryptocurrencies
						</MenuItem>
					</Link>
					<Link passHref={true} href="/exchanges">
						<MenuItem sx={{ marginTop: 1 }}>
							<MoneyOutlined sx={{ marginRight: 1 }} />
							Exchanges
						</MenuItem>
					</Link>
					<Link passHref={true} href="/news">
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

import React, { useState } from 'react';
import {
	Button,
	Menu,
	MenuItem,
	Typography,
	Avatar,
	MenuList,
} from '@mui/material';
import Link from 'next/link';
import styles from './Navbar.module.css';
import {
	ChatBubbleOutlined,
	FoundationOutlined,
	HomeOutlined,
	MoneyOutlined,
} from '@mui/icons-material';

const Navbar = () => {
	return (
		<div className={styles.nav_container}>
			<div className={styles.logo_container}>
				<Typography className={styles.logo}>
					<Link href="/">Cryptoverse</Link>
				</Typography>
				<Button className={styles.menu_control_container}></Button>
			</div>
			<MenuList className={styles.menu} variant={'menu'}>
				<MenuItem >
					<HomeOutlined sx={{ marginRight: 1}} />
					<Link href="/" >Home</Link>
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
	);
};

export default Navbar;

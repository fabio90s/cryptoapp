import React from 'react';
import Navbar from './Navbar';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Box } from '@mui/system';
import styles from './Layout.module.css'

function ScrollTop(props) {
	const { children, window } = props;

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 600,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector(
			'#back-to-top-anchor'
		);

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
			>
				{children}
			</Box>
		</Zoom>
	);
}

const Layout = (props) => {

	return (
		<>
			<Navbar darkModeHandler={props.darkModeHandler} />
			<ScrollTop {...props}>
				<Fab
					className={styles.fab}
					color="secondary"
					size="small"
					aria-label="scroll back to top"
				>
					<KeyboardArrowUpIcon sx={{ marginRight: 'unset' }} />
				</Fab>
			</ScrollTop>
			{props.children}
		</>
	);
};

export default Layout;

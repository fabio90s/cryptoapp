import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useGetCryptosQuery } from '../services/cryptoApi';

export default function NewsSelect(props) {
	const { data: cryptosList, isFetching } = useGetCryptosQuery(100);
	const [placeholder, setPlaceholder] = React.useState('');

	const handleChange = (event) => {
		setPlaceholder(event.target.value);
		props.onClick(placeholder);
	};

	return (
		<>
			{isFetching && null}
			{!isFetching && (
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' },
					}}
					noValidate
					autoComplete="off"
				>
					<div style={{ marginLeft: 10 }}>
						<TextField
							id="outlined-select-currency"
							select
							value={placeholder.length > 0 ? placeholder : ''}
							label="Select"
							onChange={handleChange}
							onClick={props.onClick}
							helperText="Please select your crypto"
						>
							<MenuItem key={1990} value={'All'}>
								{'All'}
							</MenuItem>
							{cryptosList?.data?.coins?.map((item) => (
								<MenuItem key={item.name} value={item.name}>
									{item.name}
								</MenuItem>
							))}
						</TextField>
					</div>
				</Box>
			)}
		</>
	);
}

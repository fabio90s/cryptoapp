import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useGetAllCryptosQuery } from '../services/cryptoApi';

export default function NewsSelect(props) {
	const { data: cryptosList, isFetching } = useGetAllCryptosQuery();
	const [placeholder, setPlaceholder] = useState('');

	const handleChange = (event) => {
		setPlaceholder(event.target.value);
		props.onClick(placeholder);
	};
	let sortedList = [];

	for (let i in cryptosList?.data.coins) {
		let temp = {
			name: cryptosList?.data.coins[i].name,
		};
		sortedList.push(temp);
	}

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
							<MenuItem style={{ display: 'flex' }} key={1990} value={'All'}>
								{'All'}
							</MenuItem>
							{sortedList
								.sort((a, b) => (a.name > b.name ? 1 : -1))
								.map((item) => (
									<MenuItem
										style={{ display: 'flex' }}
										key={item.name}
										value={item.name}
									>
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

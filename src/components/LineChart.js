import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = (props) => {
	const data = {
		labels: props.labels,
		datasets: [
			{
				label: props.title,
				data: props.data,
				fill: false,
				backgroundColor: '#0071bd',
				borderColor: '#0071bd',
			},
		],
	};

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true,
					},
				},
			],
		},
	};

	return (
		<>
			<div className="header">
				<div className="links"></div>
			</div>
			<Line data={data} options={options} />
		</>
	);
};

export default LineChart;

import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from "victory";
import "../App.css";
import { useHistory } from "react-router-dom";

export default function Reports() {
	const getLocalStorageUserInformation = JSON.parse(localStorage.getItem("token"));
	const [chartData, setChartData] = useState([]);
	const history = useHistory();

	useEffect(() => {
		getChartDataFromServer();
		// eslint-disable-next-line
	}, []);

	const getChartDataFromServer = async () => {
		try {
			const res = await fetch("/vacations/chart-data", {
				method: "GET",
				headers: {
					authorization: getLocalStorageUserInformation.access_token,
				},
			});
			const data = await res.json();
			setChartData(data.chart_data);
			if (data.err) {
				history.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="reports-chart">
			<VictoryChart theme={VictoryTheme.material} domainPadding={15} height={175}>
				<VictoryLabel
					textAnchor="middle"
					verticalAnchor="start"
					x={165}
					y={10}
					dy={10}
					style={{ fill: "#f4a261" }}
					text="Followed Vacations Report"
				/>
				<VictoryAxis
					style={{
						axis: { stroke: "#f94144" },
						axisLabel: { fontSize: 5, padding: 10 },
						ticks: { stroke: "white", size: 5 },
						tickLabels: { fontSize: 10, padding: 5, angle: 20, fill: "#f77f00" },
						grid: { stroke: "white" },
					}}
				/>
				<VictoryAxis
					domain={[8]}
					style={{
						axis: { stroke: "#f94144" },
						axisLabel: { fontSize: 10, padding: 30 },
						grid: { stroke: "#f94144" },
						ticks: { stroke: "grey", size: 5 },
						tickLabels: { fontSize: 10, padding: 5, fill: "#f77f00" },
					}}
					dependentAxis
					tickFormat={(x) => x}
				/>
				<VictoryBar
					data={chartData}
					x="vacation_destination"
					y="number_of_followers"
					style={{
						data: { fill: "#ffca3a" },
					}}
				/>
			</VictoryChart>
		</div>
	);
}

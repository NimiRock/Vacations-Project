import React, { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
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
			const res = await fetch("http://localhost:1000/vacations/chart-data", {
				method: "GET",
				headers: {
					authorization: getLocalStorageUserInformation.access_token,
				},
			});
			const data = await res.json();
            setChartData(data.chart_data);
            if(data.err){
                history.push("/");
            }
		} catch (error) {
			console.log(error);

		}
	};

	return (
		<div className="reports-chart">
			<VictoryChart theme={VictoryTheme.material} domainPadding={15} height={150}>
				<VictoryAxis
					style={{
						axis: { stroke: "#756f6a" },
						axisLabel: { fontSize: 5, padding: 10 },
						ticks: { stroke: "grey", size: 5 },
						tickLabels: { fontSize: 10, padding: 5 },
					}}
					tickValues={chartData && chartData.map((destination) => destination.number_of_followers)}
					tickFormat={chartData && chartData.map((destination) => destination.vacation_destination)}
				/>
				<VictoryAxis
					style={{
						axis: { stroke: "#756f6a" },
						axisLabel: { fontSize: 20, padding: 30 },
						grid: { stroke: ({ tick }) => (tick > 0.5 ? "red" : "grey") },
						ticks: { stroke: "grey", size: 5 },
						tickLabels: { fontSize: 10, padding: 5 },
					}}
					dependentAxis
					tickFormat={(x) => x}
				/>
				<VictoryBar data={chartData} x="vacation_destination" y="number_of_followers" />
			</VictoryChart>
		</div>
	);
}

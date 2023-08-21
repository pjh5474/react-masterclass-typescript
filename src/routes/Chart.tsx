import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<Array<number[]>>(
		["CoinHistory", coinId],
		() => fetchCoinHistory(coinId)
		//{ refetchInterval: 10000 }
	);
	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<ApexChart
					type="line"
					series={[
						{
							name: "Price",
							data: data?.map((ohlc) => ohlc[1]) as number[],
						},
					]}
					options={{
						xaxis: {
							categories: data?.map((ohlc) => {
								const date = new Date(ohlc[0]);
								return date.toLocaleDateString();
							}),
							axisBorder: { show: true },
							axisTicks: { show: true },
							labels: { show: true },
							type: "datetime",
						},
						yaxis: {
							labels: { formatter: (value) => `$ ${value.toFixed(3)}` },
						},
						theme: { mode: "dark" },
						chart: { height: 500, width: 500, toolbar: { show: false } },
						stroke: { curve: "smooth", width: 3 },
						fill: {
							type: "gradient",
							gradient: {
								gradientToColors: ["#0be881"],
								stops: [0, 100],
							},
						},
						colors: ["#0fbcf9"],
						tooltip: {
							y: {
								formatter: (value) => `$ ${value.toFixed(3)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;

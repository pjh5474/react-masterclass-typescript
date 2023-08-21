import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistoricalData {
	time_open: number;
	time_close: number;
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
	market_cap: number;
}
interface ChartProps {
	coinId: string;
}

function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<IHistoricalData[]>(
		["CoinHistory", coinId],
		() => fetchCoinHistory(coinId),
		{ refetchInterval: 10000 }
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
							data: data
								?.slice(7, 21)
								.map((price) => parseFloat(price.close)) as number[],
						},
					]}
					options={{
						xaxis: {
							categories: data?.slice(7, 21).map((price) => {
								const time = new Date(price.time_close * 1000);
								return time.toISOString();
							}),
							axisBorder: { show: true },
							axisTicks: { show: true },
							labels: { show: true },
							type: "datetime",
						},
						theme: { mode: "dark" },
						chart: { height: 500, width: 500, toolbar: { show: false } },
						stroke: { curve: "smooth", width: 4 },
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
								formatter: (value) => `$${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}

export default Chart;

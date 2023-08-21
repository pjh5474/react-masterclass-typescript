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
		() => fetchCoinHistory(coinId)
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
								return time.toLocaleDateString();
							}),
						},
						theme: { mode: "dark" },
						chart: { height: 500, width: 500, toolbar: { show: false } },
						stroke: { curve: "smooth", width: 4 },
					}}
				/>
			)}
		</div>
	);
}

export default Chart;

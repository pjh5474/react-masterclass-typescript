import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
	coinId: string;
}

interface ICandlestickData {
	x: Date;
	y: number[];
}

function Price({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<number[][]>(
		["CoinPrice", coinId],
		() => fetchCoinHistory(coinId)
		// { refetchInterval: 10000 }
	);
	return (
		<div>
			{isLoading ? (
				"Loading chart..."
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							name: "Price",
							data: data?.map((ohlc) => {
								return {
									x: new Date(ohlc[0]),
									y: [ohlc[1], ohlc[2], ohlc[3], ohlc[4]],
								};
							}) as ICandlestickData[],
						},
					]}
					options={{
						chart: {
							height: 500,
							width: 500,
							type: "candlestick",
						},
						xaxis: {
							categories: data?.map((ohlc) => {
								const time = new Date(ohlc[0]);
								return time.toISOString();
							}),
							type: "datetime",
							labels: {
								style: {
									colors: "#f3f4f5",
								},
							},
						},
						yaxis: {
							labels: {
								style: {
									colors: "#f3f4f5",
								},
								formatter: (value) => `$ ${value.toFixed(3)}`,
							},
						},
						theme: { mode: "dark" },
					}}
				/>
			)}
		</div>
	);
}

export default Price;

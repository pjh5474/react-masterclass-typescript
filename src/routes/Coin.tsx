import { useQuery } from "react-query";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { styled } from "styled-components";
import { fetchCoinInfo } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;

const Description = styled.p`
	margin: 20px 0px;
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ isactive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.isactive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
	}
`;

interface RouteParams {
	coinId: string;
}

interface RouteState {
	name: string;
}

interface IInfoData {
	id: string;
	name: string;
	symbol: string;
	coingecko_rank: number;
	description: { en: string };
	market_data: {
		current_price: {
			usd: number;
		};
		max_supply: number;
		total_supply: number;
		circulating_supply: number;
	};
}

interface ITickersData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Coin() {
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteState>();
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");
	const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId),
		{
			retry: false,
		}
	);
	// const { isLoading: tickersLoading, data: tickersData } =
	// 	useQuery<ITickersData>(
	// 		["tickers", coinId],
	// 		() => fetchCoinTickers(coinId),
	// 		{
	// 			retry: false,
	// 		}
	// 		// {
	// 		// 	refetchInterval: 5000,
	// 		// }
	// 	);
	const loading = infoLoading;
	return (
		<Container>
			<Helmet>
				<title>
					{state?.name ? state.name : loading ? "Loading..." : infoData?.name}
				</title>
			</Helmet>
			<Header>
				<Title>
					{state?.name ? state.name : loading ? "Loading..." : infoData?.name}{" "}
				</Title>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank :</span>
							<span>{infoData?.coingecko_rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol :</span>
							<span>{infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price :</span>
							<span>{infoData?.market_data.current_price.usd.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description.en}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Supply :</span>
							<span>{infoData?.market_data.total_supply.toFixed(3)}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Circulating Supply :</span>
							<span>{infoData?.market_data.circulating_supply.toFixed(3)}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply :</span>
							<span>{infoData?.market_data.max_supply}</span>
						</OverviewItem>
					</Overview>

					<Tabs>
						<Tab isactive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isactive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>
					<Switch>
						<Route path={"/:coinId/price"}>
							<Price coinId={coinId} />
						</Route>
						<Route path={"/:coinId/chart"}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}
export default Coin;

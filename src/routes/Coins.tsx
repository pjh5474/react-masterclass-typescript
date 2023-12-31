import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.bgColor};
	margin-bottom: 10px;
	border-radius: 15px;
	a {
		transition: color 0.2s ease-in;
		display: flex;
		align-items: center;

		padding: 20px;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

const Title = styled.h1`
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Subtitle = styled.h3`
	font-size: 18px;
	color: ${(props) => props.theme.textColor};
	margin-bottom: 10px;
`;

const Loader = styled.span`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

function Coins() {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins, {
		retry: false,
	});
	return (
		<Container>
			<Helmet>
				<title>Coins | Coin Explorer</title>
			</Helmet>
			<Header>
				<Title>Coins</Title>
				<Subtitle> Data provided by CoinGecko </Subtitle>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name },
								}}
							>
								<Img
									src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;

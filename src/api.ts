// const BASE_URL = "https://api.coinpaprika.com/v1";
const BASE_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoins() {
	return fetch(
		`${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1`
	).then((response) => response.json());
}

export async function fetchCoinInfo(coinId: string) {
	return fetch(`${BASE_URL}/coins/${coinId}?localization=false`).then(
		(response) => response.json()
	);
}

// export async function fetchCoinHistory(coinId: string) {
// 	return fetch(
// 		`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
// 	).then((response) => response.json());
// }

export async function fetchCoinHistory(coinId: string) {
	return fetch(`${BASE_URL}/coins/${coinId}/ohlc?vs_currency=usd&days=14`).then(
		(response) => response.json()
	);
}

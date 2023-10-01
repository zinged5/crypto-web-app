import axios from 'axios';

function instance() {
    const token = ''

    return axios.create({
        baseURL: 'https://rest.coinapi.io/v1/assets?limit=100&type_is_crypto=1',
        headers: {
            'X-CoinAPI-Key': token
        }
    });
}

export default instance;

// filter_asset_id=BTC,ETH,XLM,XRP,ADA
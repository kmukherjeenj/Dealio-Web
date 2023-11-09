// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';

export const BASE_URL = 'https://api.dealio.financial/v1';

export const HTTPS = axios.create({
    baseURL: BASE_URL,
});

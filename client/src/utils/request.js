import axios from 'axios'

// const baseUrl = 'http://52.14.34.221:2019/api/v1.0'
export const instance = axios.create({
	baseURL: 'http://52.14.34.221:2019/api/v1.0',
	timeout: 1000,
	headers: { 'X-Custom-Header': 'foobar' },
})

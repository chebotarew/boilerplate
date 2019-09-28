import { instance as axios } from '../utils/request'
import { urls } from '../constants/BackUrls.constant'

const axiosInstance = null

export async function registerApi(data) {
	const res = await axios.post(urls.login, data)
	return res.data
}

export async function loginApi({ login, password }) {
	const res = await axios.post(urls.login, { login, password })
	return res.data
}

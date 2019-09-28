import { instance as axios } from '../utils/request'
import { urls } from '../constants/BackUrls.constant'

const axiosInstance = null

export async function registerApi(data) {
	const res = await axios.post(urls.register, data)
	return res.data
}

export async function loginApi(data) {
	const res = await axios.post(urls.login, data)
	return res.data
}

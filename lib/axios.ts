import axios from 'axios'

interface PromiseExecutor {
	resolve: (value?: any) => void
	reject: (reason?: any) => void
}

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
})

let isRefreshing = false
let failedQueue: PromiseExecutor[] = []

const processQueue = (error, token = null) => {
	failedQueue.forEach(prom => {
		if (error) {
			prom.reject(error)
		} else {
			prom.resolve(token)
		}
	})

	failedQueue = []
}

api.interceptors.response.use(
	response => response,
	error => {
		const originalRequest = error.config

		if (error.response.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject })
				})
					.then(() => {
						return api(originalRequest)
					})
					.catch(err => {
						return Promise.reject(err)
					})
			}

			originalRequest._retry = true
			isRefreshing = true

			return new Promise((resolve, reject) => {
				api
					.post('/auth/refresh')
					.then(() => {
						processQueue(null)
						resolve(api(originalRequest))
					})
					.catch(err => {
						processQueue(err, null)
						reject(err)
					})
					.finally(() => {
						isRefreshing = false
					})
			})
		}

		return Promise.reject(error)
	}
)

export default api

import axios from 'axios';

export const HTTPGet = axios.create({
  baseURL: process.env.API_URL,
	auth: {
		username: 'admin',
		password: 'secret'
	}
})

export const HTTP = axios.create({
  baseURL: process.env.API_URL

})

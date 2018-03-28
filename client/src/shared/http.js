import axios from 'axios';

export const HTTPGet = axios.create({
  baseURL: process.env.API_URL,
	auth: {
		username: 'admin',
		password: 'secret'
	}
})

export const HTTPPost = axios.create({
  baseURL: process.env.API_URL

})

import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://'+process.env.HOST+':5000/api/',
	auth: {
		username: 'admin',
		password: 'secret'
	}
})

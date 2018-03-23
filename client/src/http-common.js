import axios from 'axios';

export const HTTP = axios.create({
  baseURL: 'http://localhost:5000/api/',
	auth: {
		username: 'admin',
		password: 'secret'
	}
})

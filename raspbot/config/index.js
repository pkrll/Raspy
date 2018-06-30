'use strict'

module.exports = {
  oauth: {
    id: '',
    secret: ''
  },
  development: {
    port: 5000,
    databasePath: 'config/db.json',
		httpsPort: 5443,
		httpsOpts: {
			cert: 'config/.sslcert/fullchain.pem',
			key: 'config/.sslcert/privkey.pem'
		}
  },
  production: {
    port: 5000,
    databasePath: 'config/db.json',
		httpsPort: 5443,
		httpsOpts: {
			cert: 'config/.sslcert/fullchain.pem',
			key: 'config/.sslcert/privkey.pem'
		}
  }
}

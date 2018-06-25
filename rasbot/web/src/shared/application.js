'use strict'
import json from '@/../../package.json'

export default {
  install: (Vue) => {

    Vue.prototype.$application = {
			appName: json.name,
	    version: json.version,
      build: json.build
		}

  }
};

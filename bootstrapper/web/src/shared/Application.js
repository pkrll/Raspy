import json from '@/../../../package.json'

export default {
  install: (Vue) => {

    Vue.prototype.$Application = {
			appName: json.name,
	    version: json.version
		}

  }
};

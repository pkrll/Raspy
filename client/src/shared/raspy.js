import json from '@/../package.json'

export default {
  install: (Vue) => {

    Vue.prototype.$Raspy = {
			appName: json.name,
	    version: json.version
		}

  }
};

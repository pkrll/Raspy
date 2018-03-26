export default {
	install: (Vue) => {

		Vue.prototype.$bookmarker = {
			/**
			 * The current bookmark
			 * @type {String}
			 */
			currentBookmark: undefined,
			/**
			 * Sets the bookmark
			 *
			 * @param {String} page The page to bookmark
			 */
			set(page) {
				this.currentBookmark = encodeURIComponent(page)
				document.cookie =  "bookmark=" + this.currentBookmark + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
			},
			/**
			 * Retrieves the current bookmark.
			 *
			 * @return {String}      The current bookmark, or undefined if not set.
			 */
			get () {
				if (this.currentBookmark != undefined) return this.currentBookmark;

				let value = "; " + document.cookie;
				if (value.indexOf("bookmark") >= 0) {
					let parts = value.split("; " + "bookmark" + "=");

					if (parts.length == 2) {
						this.currentBookmark = parts.pop().split(";").shift();
					}
				}

				return this.currentBookmark;
			},
			/**
			 * Clears the bookmark.
			 *
			 */
			clear() {
				this.currentBookmark = undefined;
				document.cookie =  "bookmark=" + this.currentBookmark + "; path=/; expires=Fri, 31 Dec 1970 23:59:59 GMT";
			}
		};

		// Vue.prototype.$cookies = {
		// 	setCookie(key, value) {
		// 		document.cookie = key + "=" + encodeURIComponent(value) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
		// 	},
		// 	getCookie(key) {
		// 		let value = "; " + document.cookie;
		// 		if (value.indexOf(key) >= 0) {
		// 			let parts = value.split("; " + key + "=");
		// 			if (parts.length == 2) return parts.pop().split(";").shift();
		// 		}
		//
		// 		return undefined;
		// 	}
		// };
	}
};

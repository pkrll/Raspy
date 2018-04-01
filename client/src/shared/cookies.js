export default {
	install: (Vue) => {

		Vue.prototype.$CookieManager = {
			/**
			 * 	The current bookmark
			 * 	@type {String}
			 */
			currentBookmark: undefined,
			/**
			 * 	Saves a cookie.
			 *
			 * 	@param  {String} key     Name of the cookie.
			 * 	@param  {String} value   Value of the cookie.
			 * 	@param  {String} expires Expiration date of the cookie. Optional.
			 */
			saveCookie(key, value, expires) {
				if (expires == undefined) {
					expires = "";
				} else if (expires == false) {
					expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
				} else {
					expires = "; expires=" + expires;
				}

				document.cookie = key+"="+value + expires+"; path=/;";
			},
			/**
			 * 	Loads cookie.
			 *
			 * 	@param  {String} key 	Name of the cookie to load
			 * 	@return {String}     	The value of the cookie.
			 */
			loadCookie(key) {
				let cookie 	= undefined;
				let value 	= "; " + document.cookie;

				if (value.indexOf(key) >= 0) {
					let parts = value.split("; " + key + "=");
					if (parts.length == 2) cookie = parts.pop().split(";").shift();
				}

				return cookie;
			},
			/**
			 * 	Clears the specified cookie.
			 * 	@param  {String} key Name of the cookie.
			 */
			clearCookie(key) {
				document.cookie =  key + "=undefined; path=/; expires=Fri, 31 Dec 1970 23:59:59 GMT";
			},
			/**
			 * 	Sets the bookmark
			 *
			 * 	@param {String} page The page to bookmark
			*/
			setBookmark(page) {
				this.currentBookmark = encodeURIComponent(page)
				this.saveCookie("bookmark", page, "Fri, 31 Dec 9999 23:59:59 GMT");
			},
			/**
			 * 	Retrieves the current bookmark.
			 *
			 * 	@return {String}      The current bookmark, or undefined if not set.
			 */
			getBookmark() {
				if (this.currentBookmark != undefined) return this.currentBookmark;

				let value = "; " + document.cookie;
				if (value.indexOf("bookmark") >= 0) {
					let parts = value.split("; " + "bookmark" + "=");

					if (parts.length == 2) {
						this.currentBookmark = parts.pop().split(";").shift();
					}
				}

				return this.loadCookie("bookmark");
			},
			/**
			 *	Clears the current bookmark.
			 */
			clearBookmark() {
				this.currentBookmark = undefined;
				this.clearCookie("bookmark");
			}

		}
	}
}

import {HTTP} from '@/shared/http'

export default {
	/**
	 * Checks if a string starts with a specific character.
	 *
	 * @param  {[type]} value     The string to check.
	 * @param  {[type]} character The character to check against.
	 * @return Boolean            True if value starts with character, otherwise false.
	 */
	startsWith: function (value, character) {
		if (!value) return false;
		value = value.toString();
		return value.charAt(0) === character.toString();
	},
	/**
	 * Browse the specified path.
	 *
	 * @param  {String} 	path 			The path to list.
	 * @param  {Function} callback 	The callback to invoke on 200 response.
	 */
	browseDirectory: function (path, callback) {
		HTTP.get('filesystem/list' + path).then(
			response => {
				this.files = response.data.files;
				this.directories = response.data.directories;
				if (typeof callback === 'function') callback();
			}
		).catch(e => {
			console.log("ERROR " + e);
		})
	},
	/**
	 * Retrieves information on the specified file.
	 *
	 * @param  {String}   path     The path to the file.
	 * @param  {Function} callback The callback to invoke on 200 response.
	 */
	viewFile: function (path, callback) {
		HTTP.get('filesystem/file' + path).then(
			response => {
				this.metadata = response.data;
				if (typeof callback === 'function') callback();
			}
		).catch(e => {
			console.log("ERROR " + e);
		});
	},

	deleteFile: function() {
		let path = decodeURIComponent(this.path);
		HTTP.delete('filesystem/file' + path).then(
			response => {
				let status = response.data.status;
				if (status == "OK") {
					this.$root._router.go(-1);
				} else {
					this.cancelDeleteFile();
					console.log(response.data.message);
				}
			}
		).catch(e => {
			console.log("ERROR " + e);
		});
	},
	cancelDeleteFile: function () {
		this.showConfirmation(false);
	},
	/**
	 * Navigates back to the previous page.
	 */
	goBack: function () {
		this.$root._router.go(-1);
	},
	/**
	 * Prettifies the specified path.
	 *
	 * @param  {String} path The path to pretify.
	 * @return {String}      The path, pretified.
	 */
	prettyPath: function (path) {
		return decodeURIComponent(path);
	},
	/**
	 * Converts bytes to a human readable format.
	 *
	 * @param  {int} 		 bytes  The number of bytes.
	 * @param  {boolean} binary True if binary units, false if SI.
	 * @return {String}        	The number of bytes converted.
	 */
	bytesToHumanReadable: function (bytes, binary) {
		const unit = (binary) ? 1024 : 1000;

		if (bytes < unit) {
			return bytes;
		}

		const symbols  = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
		const exponent = Math.floor(Math.log(bytes) / Math.log(unit));

		if (exponent <= symbols.length) {
			const size = bytes / Math.pow(unit, exponent);
			return size.toFixed(1) + symbols[exponent];
		}

		return bytes;
	}

}

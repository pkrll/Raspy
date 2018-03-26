import {HTTP} from '@/http-common'

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
	 * @param  {[type]} path The path to list.
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
	}
}

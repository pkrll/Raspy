// import { HTTPGet, HTTPPost } from '@/shared/http'

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

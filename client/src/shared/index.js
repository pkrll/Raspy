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

	iconForFile: function (filename) {
		let nameComponents 	= filename.split('.');
		let fileExtension		= nameComponents[nameComponents.length - 1];

		switch (fileExtension) {
			case 'pdf':
				return 'file-pdf';
				break;
			case 'png':
			case 'jpg':
			case 'gif':
			case 'svg':
			case 'tif':
			case 'bmp':
				return 'file-image';
				break;
			case 'txt':
			case 'odt':
			case 'rtf':
			case 'tex':
			case 'md':
				return 'file-alt';
				break;
			case 'doc':
			case 'docx':
				return 'file-word';
				break;
			case 'ppt':
			case 'pptx':
				return 'file-powerpoint';
				break;
			case 'ods':
			case 'xlr':
			case 'xls':
			case 'xlsx':
				return 'file-excel';
				break;
			case 'zip':
			case 'rar':
			case 'bz2':
			case 'gz':
			case '7z':
			case 'arj':
			case 'jar':
			case 'tgz':
			case 'zipx':
				return 'file-archive';
				break;
			case 'c':
			case 'cpp':
			case 'java':
			case 'class':
			case 'cs':
			case 'h':
			case 'sh':
			case 'swift':
			case 'vb':
			case 'py':
			case 'erl':
			case 'php':
			case 'htm':
			case 'html':
			case 'css':
			case 'js':
			case 'vue':
			case 'vue':
				return 'file-code';
				break;
			case 'aif':
			case 'cda':
			case 'mid':
			case 'mp3':
			case 'mpa':
			case 'ogg':
			case 'wav':
			case 'wma':
			case 'midi':
				return 'file-audio';
				break;
			case 'avi':
			case 'flv':
			case 'h264':
			case 'm4v':
			case 'mkv':
			case 'mov':
			case 'mp4':
			case 'mpg':
			case 'mpeg':
			case 'vob':
			case 'wmv':
				return 'file-video';
				break;
			default:
				return 'file';
		}
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

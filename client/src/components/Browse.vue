<template>
	<div>
		<nav class="file-list">
			<div v-for="directory in directories" class="directory" v-if="!startsWith(directory, '.')">
				<router-link v-bind:to="'/filesystem/browse' + directory.path">
					<font-awesome-icon icon="folder-open"/> {{directory.name}}
				</router-link>
			</div>
			<div v-for="file in files" class="file" v-if="!startsWith(file, '.')">
				<router-link v-bind:to="'/filesystem/file' + file.path">
					<font-awesome-icon icon="file"/> {{file.name}}
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script>
import {HTTP} from '../http-common'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { folderopen, file } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Browse',

	components: {
    FontAwesomeIcon
  },
	methods: {
		startsWith: function (value, searchString) {
	    if (!value) return false;
	    value = value.toString();
	    return value.charAt(0) === searchString.toString();
	  }

	},

	data() {
		return {
			showHidden: false,
			files: [],
			directories: []
		}
	},

	created() {
		HTTP.get('filesystem/list/').then(
			response => {
				this.files = response.data.files;
				this.directories = response.data.directories;
			}
		).catch(e => {
			console.log("ERROR " + e);
		})
	}

}
</script>

<style scoped>

.file-list div {
	background: rgb(115, 186, 208);
	border-top:	1px solid #000;
}

.file-list a {
	display: 					block;
	color: 						#fff;
	font-size: 				1.1em;
	text-decoration: 	none;
	padding: 					10px;
	width: 						100%;
}

</style>

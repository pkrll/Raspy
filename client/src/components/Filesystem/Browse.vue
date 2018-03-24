<template>
	<div>
		<Toolbar 	:path="path"
							:goBack="goBack"
							:toggleHidden="toggleHidden"
							:toggleHiddenIcon="toggleHiddenIcon"
							:showConfirmation="showConfirmation">
			Folder
		</Toolbar>

		<nav class="file-list" v-if="files.length > 0 || directories.length > 0">

			<div v-for="directory in directories" class="directory" v-if="showHidden || !startsWith(directory.name, '.')">
				<router-link :to="{ name: 'Browses', params: {path: encodeURIComponent(directory.path) }}">
					<span><font-awesome-icon icon="folder-open"/>&nbsp;&nbsp;{{directory.name}}</span>
				</router-link>
			</div>

			<div v-for="file in files" class="file" v-if="showHidden || !startsWith(file.name, '.')">
				<router-link :to="{ name: 'File', params: {path: encodeURIComponent(file.path) }}">
					<span><font-awesome-icon icon="file"/>&nbsp;&nbsp;{{file.name}}</span>
				</router-link>
			</div>

		</nav>

		<nav class="file-list empty" v-else>
			<div>This folder contains no files.</div>
		</nav>

		<ConfirmButton v-show="didClickDelete" :cancelCallback="cancelDeleteFile" :confirmCallback="deleteFile"></ConfirmButton>
	</div>
</template>

<script>
import shared from '@/common'
import ConfirmButton from '@/components/ConfirmButton'
import Toolbar from '@/components/Filesystem/Toolbar'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { trashalt, cog, arrowaltcircleleft, folderopen, file, toggleon, toggleoff } from '@fortawesome/fontawesome-free-solid'

export default {
	props: { path: { default: '/' } },
	name: 'Browse',
	components: { FontAwesomeIcon, Toolbar, ConfirmButton },
	watch: {
		'$route' (to, from) {
			this.didClickDelete = false;
			let path = (to.params.path != undefined) ? decodeURIComponent(to.params.path) : '/';
			this.browseDirectory(path);
		}
  },
	methods: {
		/**
		 * Toggles hidden files and changes the toolbar.
		 */
		toggleHidden: function () {
			// TODO: Improve this
			if (this.showHidden) {
				this.toggleHiddenIcon = 'toggle-off';
				this.showHidden = false;
			} else {
				this.toggleHiddenIcon = 'toggle-on';
				this.showHidden = true;
			}
		},

		showConfirmation: function (status) {
			this.didClickDelete = status;
		}
	},
	data() {
		return {
			showHidden: false,
			didClickDelete: false,
			toggleHiddenIcon: 'toggle-off',
			files: [],
			directories: []
		}
	},
	created () {
		this.browseDirectory 	= shared.browseDirectory.bind(this);
		this.deleteFile 			= shared.deleteFile.bind(this);
		this.cancelDeleteFile = shared.cancelDeleteFile.bind(this);
		this.goBack 					= shared.goBack.bind(this);
		this.startsWith 			= shared.startsWith;
		this.prettyPath 			= shared.prettyPath;

		this.browseDirectory(this.path);
	}

}
</script>

<style scoped>

.file-list {
	display: 				flex;
	flex-direction: column;
	height: 				100vh;
	width: 					100vw;
}

.file-list div {
	background: 			rgb(115, 186, 208);
	width: 						100%;
	flex: 						1;
	height: 					100px;
	max-height: 			100px;
}

.file-list div a {
	cursor:						pointer;
	color: 						#fff;
	display: 					table;
	font-size: 				5vw;
	height: 					100%;
	text-decoration: 	none;
	width: 						100%;

}

.file-list div a span {
	display: 				table-cell;
	vertical-align: middle;
	padding: 				0 0px 0 30px;
	word-break: 		break-all;
}

.empty {
	display: 	table;
	height: 	100%;
}

.empty div {
	background: 		none;
	color: 					#fff;
	display: 				table-cell;
	font-size: 			1.4em;
	text-align: 		center;
	vertical-align:	middle;
}

@media screen and (max-width: 540px) {
  .file-list div a {
     font-size: 8vw;
  }
}

</style>

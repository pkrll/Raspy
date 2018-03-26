<template>
	<div>
		<Toolbar 	:path="path"
							:goBack="goBack"
							:showConfirmation="showConfirmation">
			File
		</Toolbar>

		<ConfirmButton v-show="didClickDelete" :cancelCallback="cancelDeleteFile" :confirmCallback="deleteFile"></ConfirmButton>
	</div>
</template>

<script>
import shared from '@/common'
import ConfirmButton from '@/components/Common/ConfirmButton'
import Toolbar from '@/components/Filesystem/Toolbar'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { arrowaltcircleleft } from '@fortawesome/fontawesome-free-solid'

export default {
	props: ['path'],
	name: "File",
	components: { FontAwesomeIcon, ConfirmButton, Toolbar },
	methods: {
		showConfirmation: function (status) {
			this.didClickDelete = status;
		}
	},
	data() {
		return {
			didClickDelete: false
		}
	},
	created () {
		this.deleteFile 			= shared.deleteFile.bind(this);
		this.cancelDeleteFile = shared.cancelDeleteFile.bind(this);
		this.goBack 					= shared.goBack.bind(this);
		this.prettyPath 			= shared.prettyPath;
	}

}
</script>

<style scoped>

</style>

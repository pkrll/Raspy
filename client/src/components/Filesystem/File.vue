<template>

</template>

<script>
import {HTTP} from '../../http-common'

export default {
	props: ['path'],
	name: "File",

	created () {
		HTTP.get('filesystem/file' + this.path).then(
			response => {
				console.log(response);
			}
		).catch(e => {
			console.log("Error " + e);
		});
	}

}
</script>

<style lang="css">
</style>

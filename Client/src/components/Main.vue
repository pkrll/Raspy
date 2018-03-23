<template>
  <h1>
		RPCi
	</h1>
</template>

<script>
import axios from 'axios';
import {HTTP} from '../http-common';

export default {
	name: 'Main',
	data() {
		return {
			msg: 'Welcome!'
		}
	},

	created() {
		HTTP.get('filesystem/list/').then(
			response => {
				console.log(response);
			}
		).catch(e => {
			console.log("ERROR " + e);
		})
	}

}
</script>

<style lang="css">
</style>

<template>
	<div class="display">
			<font-awesome-icon icon="thermometer-empty"/> {{temperature}}<br>
	</div>
</template>

<script>
import {HTTP} from '@/http-common';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { thermometerfull, thermometerthreequarters, thermometerquarter, thermometerhalf, thermometerempty } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Temperature',
	components: {
    FontAwesomeIcon
  },
	data() {
		return {
			temperature: 0
		}
	},
	created() {
		HTTP.get('system/temp').then(
			response => {
				this.temperature = response.data.temperature;
			}
		).catch(e => {
			console.log("ERROR " + e);
		})
	}
}
</script>

<style scoped>

.display {
	color: #fff;
	font-size: 20vw;
	text-align: center;
	margin-top: 10vh;
}

</style>

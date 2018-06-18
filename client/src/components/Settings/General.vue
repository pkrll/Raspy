<template>
  <section class="wrapper">
		<div class="heading">General settings</div>
		<router-link to="/settings/update" class="row">
			<div class="icon"><font-awesome-icon icon="cloud-download-alt"/></div>
			<div class="title">Check for update</div>
			<div class="arrow"><font-awesome-icon icon="angle-right"/></div>
		</router-link>
  </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
	name: 'SettingsGeneral',
	components: { FontAwesomeIcon }
}
</script>

<style scoped>

.wrapper {
	margin: 10px 2vw;
}

.heading {
	color: 			#ddd;
	font-size: 	4vw;
	text-align: center;
}

.row {
	color: 						inherit;
	display: 					flex;
	border-bottom: 		1px solid #fff;
	font-size: 				5vw;
	justify-content: 	space-between;
	align-items: 			center;
}

.row div {
	padding: 10px;
}

.row .title {
	width: 70vw;
}

.row .button {
	cursor:			pointer;
	width: 			20vw;
	text-align: center;
}

.subscript {
	color: 			#ccc;
	font-size: 	4vw;
	overflow-x: scroll;
	padding: 		0 10px 0 0;
}

.greyed {
	color: grey;
}


</style>

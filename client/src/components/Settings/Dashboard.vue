<template>
	<section class="wrapper">

		<div class="row">
			<div class="title">
				Dashboard refresh rate
			</div>
			<div class="button">
				<select class="select" name="">
					<option class="test" value="0">Never</option>
					<option value="3">3 seconds</option>
					<option value="5">5 seconds</option>
					<option value="15">15 seconds</option>
					<option value="30">30 seconds</option>
					<option value="60">60 seconds</option>
					<option value="120">2 minutes</option>
				</select>
			</div>
		</div>

		<div class="row">
			<div class="title">Show temperatures in</div>
			<div class="button">Celsius</div>
		</div>

	</section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
	name: 'SettingsDashboard',
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
	width: 			25vw;
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

.select {
	text-align: center;
	border: none;
	appearance: none;
	font-size: 4vw;
	width: 100%;
	padding: 10px;
	font-family: 'Hind';
	background: none;
	color: #fff;
}

</style>

<template>
	<section class="wrapper">
		<div class="heading">Account settings</div>
		<div class="row">
			<div class="title">
				Stay logged in
			</div>
			<div class="button">On</div>
		</div>

		<div class="row">
			<div class="single-button">Sign out of Raspy</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'SettingsAccount'
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
	width: 75vw;
}

.single-button {
	color: 			red;
	cursor: 		pointer;
	text-align: center;
	width: 			100%;
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
</style>

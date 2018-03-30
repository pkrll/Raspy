<template>
	<section class="wrapper">
		<div class="heading">File browser settings</div>

		<div class="row">
			<div class="title">
				Favorite folder
				<div class="subscript">None</div>
			</div>
			<div class="button">Clear</div>
		</div>

		<div class="row">
			<div class="title">Show hidden files</div>
			<div class="button">On</div>
		</div>

	</section>
</template>

<script>
export default {
	name: 'Settings-Browser'
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
	width: 			20vw;
	text-align: center;
}

.subscript {
	color: 			#ccc;
	font-size: 	4vw;
	overflow-x: scroll;
	padding: 		0 10px 0 0;
}

</style>

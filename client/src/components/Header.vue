<template>
	<header>
		<img src="../assets/img/pi.svg">
		<div class="title">Raspberry Pi Command Interface</div>
	</header>
</template>

<script>
export default {
	name: 'Header'
}
</script>

<style scoped>

header {
	background: 			rgb(23,173,145);
	display: 					flex;
	align-items:			center;
	justify-content:	flex-start;
	padding:					10px;
}

header > div.title {
	color: 				rgb(254,254,252);
	font-size: 		1.3em;
	margin-left:	20px;
}

header > img {
	height: 64px;
}

</style>

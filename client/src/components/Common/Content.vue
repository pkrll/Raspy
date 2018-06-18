<template>
	<section class="wrapper">
		<div class="content">
			{{text}}
		</div>
	</section>
</template>

<script>
export default {
	name: 'Content',
	props: ['text']
}
</script>

<style scoped>
.wrapper {
	align-items: 			center;
	display: 					flex;
	flex-direction: 	column;
	justify-content: 	center;
}

.content {
	font-size: 5vw;
	text-align: center;
}

</style>

<template>
	<section class="wrapper">
		<div class="content">
			{{content}}
		</div>
	</section>
</template>

<script>
export default {
	name: 'Content',
	props: ['content']
}
</script>

<style scoped>

.content {
	font-size: 5vw;
	text-align: center;
}

</style>

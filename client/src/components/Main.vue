<template>
	<section class="wrapper">
		<Login v-if="this.$root.isLoggedIn == false"></Login>
		<img src="../assets/img/logo.svg" alt="Raspy">
		Raspy 0.1.0
	</section>
</template>

<script>
import Login from '@/components/Login/Main'

export default {
	name: 'Main',
	components: { Login }
}
</script>

<style scoped>

.wrapper {
	align-items: 			center;
	display: 					flex;
	flex-direction: 	column;
	justify-content: 	space-around;
}

.wrapper > img {
	margin-top: 20px;
	max-width: 60vw;
}

</style>

<template>
	<section class="wrapper">
		<Login v-if="this.$root.isLoggedIn == false"></Login>
		<div class="splash">
			<img src="../assets/img/logo.svg" alt="Raspy" style="margin: auto;">
			Raspy {{this.$Raspy.version.split("+")[0]}}
	</div>
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

.wrapper img {
	display: 		block;
	margin: 		auto;
	max-width: 	60vw;
}

.splash {
	text-align: center;
	margin-top: 20px;
	font-size: 8vw;
}

@media screen and (min-width: 600px) {
	.splash {
		font-size: 7vw;
	}
}

@media screen and (min-width: 750px) {
	.splash {
		font-size: 6vw;
	}
}

</style>

<template>
	<section class="wrapper">
		<div class="description">
			Login to Raspy
		</div>
		<div>
				<input type="text" name="username" placeholder="Username...">
				<input type="password" name="password" placeholder="Password...">
			<div style="padding-top: 10px;">
				<div class="button">Sign in</div>
			</div>
		</div>
	</section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { key, user } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Login',
	components: { FontAwesomeIcon }
}
</script>

<style>
.wrapper {
	align-items: 			center;
	display: 					flex;
	flex-direction: 	column;
	justify-content: 	flex-start;
}

.description {
	font-size: 	5vw;
	margin-top: 10px;
}

input {
	border: 						1px solid #fff;
	border-radius: 			5px;
	display: 						block;
	font-family: 				'Hind';
	font-size: 					4vw;
	padding: 						10px 20px 10px 20px;
	-webkit-appearance: none;
}

input:focus {
	outline: none;
}

.button {
	background: 		rgb(82, 172, 120);
	border-radius: 	5px;
	font-size: 			4vw;
	padding: 				10px 10px 10px 10px;
	text-align: 		center;
}
</style>

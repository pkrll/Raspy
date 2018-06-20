<template>
	<section class="wrapper">
		<div v-if="signingIn == false">
			<div class="description">
				Login to Raspy
			</div>
			<div>
				<input type="text" name="username" v-model="username" placeholder="Username...">
				<input type="password" name="password" v-model="password" placeholder="Password...">
				<div style="padding-top: 10px;">
					<div class="button noselect" v-on:click="signIn">Sign in</div>
				</div>
			</div>
			<div class="message" v-if="message != undefined">
				{{message}}
			</div>
			<div class="message" v-if="this.$root.connectionError != undefined">
				{{this.$root.connectionError}}
			</div>
		</div>
		<div class="description" v-else>
			Signing in, please wait...
		</div>
	</section>
</template>

<script>
import shared from '@/shared'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { key, user } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Login',
	components: { FontAwesomeIcon },
	methods: {
		/**
		 * Signs in to Raspy.
		 */
		signIn: function () {
			if (this.username.length == 0) {
				this.message = "You must specify a username to sign in."
				return;
			}

			this.message = undefined;
			this.signingIn = true;
			this.$APIManager.login(this.username, this.password, this.handleResponse);
		},
		/**
		 * The callback for login.
		 *
		 * @param  {Object} response The response from the server.
		 */
		handleResponse: function (response) {
			if (response.status == 1) {
				this.$root.createSession(this.username, this.password);
			} else {
				this.message = response.message;
				this.signingIn = false;
			}
		}
	},
	data() {
		return {
			username: '',
			password: '',
			message: undefined,
			signingIn: false
		}
	}
}
</script>

<style scoped>

.wrapper > div {
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
	font-size: 					5vw;
	padding: 						10px 20px 10px 20px;
	-webkit-appearance: none;
}

input:focus {
	outline: none;
}

.button {
	background: 		rgb(82, 172, 120);
	border-radius: 	5px;
	cursor:					pointer;
	font-size: 			4vw;
	padding: 				10px 10px 10px 10px;
	text-align: 		center;
}

.message {
	color: 			rgb(255,55,55);
	font-size: 	5vw;
	padding: 		10px 10px 0px 10px;
}

</style>

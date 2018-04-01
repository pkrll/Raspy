<template>
	<section class="wrapper">
		<div class="heading">Account settings</div>
		<div class="row">
			<div class="title">
				Stay logged in
			</div>
			<div class="button" v-on:click="toggleAutoLogin">{{this.autoLogin | autoLoginFilter }}</div>
		</div>

		<div class="row">
			<div class="single-button" v-on:click="signOut">Sign out of Raspy</div>
		</div>
	</section>
</template>

<script>
export default {
	name: 'SettingsAccount',
	filters: {
		/**
		 * Replaces true with on and false with off.
		 *
		 * @param  {Boolean} value 	The boolean value to replace.
		 * @return {String}       	'On' if value is true, otherwise 'off'.
		 */
		autoLoginFilter: function (value) {
			return (value) ? 'On' : 'Off';
		}
	},
	methods: {
		/**
		 * Signs out of Raspy.
		 */
		signOut: function () {
			this.$root.deleteSession();
			this.$root._router.push('/');
		},
		/**
		 * Toggles the auto login options.
		 */
		toggleAutoLogin: function () {
			this.autoLogin != autoLogin;
			this.$CookieManager.saveCookie('autoLogin', this.autoLogin);
		}
	},
	data: function () {
		return {
			autoLogin: false
		}
	},
	created: function () {
		let autoLogin = this.$CookieManager.loadCookie('autoLogin');
		this.autoLogin = (autoLogin != undefined) ? autoLogin : false;
	}
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

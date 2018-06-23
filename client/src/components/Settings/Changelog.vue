<template>
  <div class="content">
		<div class="heading">{{heading}}</div>
		<vue-markdown class="changelog">
			{{content}}
		</vue-markdown>
		<div class="button" v-on:click="launchBootstrapper">Update</div>
	</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
	name: "Changelog",
	props: ["heading", "content"],
	components: { 'vue-markdown' : VueMarkdown },
	methods: {
		launchBootstrapper: function () {
			// Because Safari doesnt let us use window.open inside
			// an async function, we need to create it outside.
			let newWindow = window.open();
			let url = window.location.protocol + '//' + window.location.hostname + ':5001';
			this.$APIManager.launchBootstrapper(response => {
				if (response.status == 1) {
					let timer = setInterval(() => {
						clearInterval(timer);
						newWindow.location = url;
					}, 500);
				} else {
					console.log(response);
				}
			});
		}
	}
}
</script>

<style scoped>

a {
	color: 						#fff;
	text-decoration: 	none;
}

.container {
	align-items: 			center;
	display: 					flex;
	flex-direction: 	column;
	justify-content: 	flex-start;
}

.heading {
	font-size: 	8vw;
	margin-top: 40px;
	text-align: center;
}

.changelog {
	font-size: 3.5vw;
}

.button {
	background: 		rgb(82, 172, 120);
	border-radius: 	5px;
	cursor:					pointer;
	font-size: 			5vw;
	margin-top: 		40px;
	padding: 				10px;
}

</style>

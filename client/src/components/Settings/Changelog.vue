<template>
  <div class="content">
		<div class="heading">{{heading}}</div>
		<vue-markdown class="changelog">
			{{content}}
		</vue-markdown>
		<div class="button" v-on:click="launchUpdater">Launch updater</div>
	</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
	name: "Changelog",
	props: ["heading", "content"],
	components: { 'vue-markdown' : VueMarkdown },
	methods: {
		launchUpdater: function () {
			this.$APIManager.launchUpdater(function (response) {
				if (response.status == 1) {
					let hostname = 'http://'+window.location.href+':5001';
					window.open(hostname, '_blank');
					window.location.href = hostname;
				} else {
					alert("An error occurred. Could not update the software.");
				}
			});
		}
	}
}
</script>

<style scoped>
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

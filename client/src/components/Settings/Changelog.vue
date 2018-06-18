<template>
  <div class="content">
		<div class="heading">{{heading}}</div>
		<vue-markdown class="changelog">
			{{content}}
		</vue-markdown>
		<div class="button">Launch updater</div>
	</div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
	name: "Changelog",
	props: ["heading", "content"],
	components: { 'vue-markdown' : VueMarkdown }
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

<template>
	<div>
	</div>
</template>

<script>
import axios from 'axios';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { desktop } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Main',

	components: {
    FontAwesomeIcon
  }
}
</script>

<style scoped>
.titlebar {
	background: rgb(229, 73, 95);
	color: 			#fff;
	font-size: 	1.1em;
	padding: 		10px;
}

.section {
	display: 				flex;
	flex-direction: column;
	height: 				100vh;
	width: 					100vw;
}

.section .header {
	background: 		rgb(92, 107, 158);
	color:					rgb(225,225,225);
	font-variant: 	small-caps;
	font-size:  		3vw;
	text-transform: lowercase;
	padding: 				10px;
}

.section .item {
	flex: 			1;
	height: 		100px;
	text-align: center;
	width: 			100%;
}

.section .item a {
	background: rgb(114, 186, 208);
	color:			rgb(254,254,252);
	display: 		table;
	font-size:  5vw;
	height: 		100%;
	width: 			100%;
}

.section .item a span {
	display: 				table-cell;
	vertical-align: middle;
}

@media screen and (max-width: 540px) {
  .section .item a {
     font-size: 8vw;
  }

	.section .header {
		font-size: 7vw;
	}
}

</style>

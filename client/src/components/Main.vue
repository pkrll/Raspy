<template>
	<div>
		<!-- <header class="titlebar">
			<font-awesome-icon icon="desktop"/>
		</header> -->
		<section class="section">
			<div class="header">File system</div>
			<div class="item">
				<router-link to="/filesystem/browse"><span>Browse files</span></router-link>
			</div>
			<div class="header">System information</div>
			<div class="item">
				<router-link to="/system/temperature"><span>Temperature</span></router-link>
			</div>
			<div class="item">
				<router-link to="/system/cpu"><span>CPU usage</span></router-link>
			</div>
			<div class="item">
				<router-link to="/system/ram"><span>RAM usage</span></router-link>
			</div>
			<div class="item">
				<router-link to="/system/disk"><span>Disk usage</span></router-link>
			</div>
		</section>
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
	font-size:  		1.1em;
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
	font-size:  5vh;
	height: 		100%;
	width: 			100%;
}

.section .item a:hover {
	background: rgba(114, 186, 208, 0.5);
}

.section .item a span {
	display: 				table-cell;
	vertical-align: middle;
}

</style>

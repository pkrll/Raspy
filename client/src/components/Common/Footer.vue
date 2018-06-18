<template>
	<footer>
		<div>
			Built with <font-awesome-icon icon="heart"/> using <font-awesome-icon :icon="['fab', 'vuejs']"/>, <font-awesome-icon :icon="['fab', 'node-js']"/> and <font-awesome-icon :icon="['fab', 'python']"/>
		</div>
		<div>Version {{this.$Raspy.version}}</div>
	</footer>

</template>

<script>
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { heart } from '@fortawesome/fontawesome-free-solid'
import vuejs from '@fortawesome/fontawesome-free-brands/faVuejs'
import node from '@fortawesome/fontawesome-free-brands/faNodeJs'
import python from '@fortawesome/fontawesome-free-brands/faPython'

fontawesome.library.add(vuejs, python, node);

export default {
	name: 'Footer',
	components: { FontAwesomeIcon }
}

</script>

<style scoped>

footer {
	bottom:						0;
	display:					flex;
	font-size:				2vw;
	flex-shrink:			0;
	justify-content: 	space-between;
	padding: 					10px;
	position: 				relative;
}

@media screen and (max-width: 540px) {

	footer {
		font-size: 	3.4vw;
	}

}


</style>

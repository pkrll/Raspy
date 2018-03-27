<template>
	<footer>
		Built with <font-awesome-icon icon="heart"/> using <font-awesome-icon :icon="['fab', 'vuejs']"/> and <font-awesome-icon :icon="['fab', 'python']"/>
	</footer>
</template>

<script>
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { heart } from '@fortawesome/fontawesome-free-solid'
import vuejs from '@fortawesome/fontawesome-free-brands/faVuejs'
import python from '@fortawesome/fontawesome-free-brands/faPython'

fontawesome.library.add(vuejs, python);

export default {
	name: 'Footer',
	components: { FontAwesomeIcon }
}

</script>

<style scoped>

footer {
	bottom: 			0;
	font-size: 		2vw;
	flex-shrink: 	0;
	padding: 			10px 0 10px 10px;
	position: 		relative;
}

@media screen and (max-width: 540px) {

	footer {
		font-size: 	3.4vw;
	}

}


</style>

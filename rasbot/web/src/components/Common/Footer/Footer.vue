<template>
	<footer>
		<div id="container">
  		<div>
  			Built with <font-awesome-icon icon="heart"/> using <font-awesome-icon :icon="['fab', 'vuejs']"/>, <font-awesome-icon :icon="['fab', 'node-js']"/> and <font-awesome-icon :icon="['fab', 'python']"/>
  		</div>
      <div>Version {{this.$application.version}}+{{this.$application.build}}</div>
    </div>
	</footer>

</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faVuejs, faNodeJs, faPython } from '@fortawesome/free-brands-svg-icons';

library.add(faHeart, faVuejs, faNodeJs, faPython);

export default {
	name: 'Footer',
}

</script>

<style scoped src="@/components/Common/Footer/footer.css">
</style>

<template>
	<div>
		<Login v-if="this.$root.isLoggedIn == false"></Login>
	</div>
</template>

<script>
import Login from '@/components/Login/Main'

export default {
	name: 'Main',
	components: { Login }
}
</script>

<style scoped>

</style>

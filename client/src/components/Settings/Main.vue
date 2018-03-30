<template>
	<section class="wrapper">
		<div style="color: #ddd; font-size: 4vw;">
			Settings
		</div>
		<router-link to="/settings/browser" class="row">
			<div><font-awesome-icon icon="hdd"/></div>
			<div class="title">File browser</div>
			<div><font-awesome-icon icon="angle-right"/></div>
		</router-link>
		<router-link to="/settings/dashboard" class="row">
			<div><font-awesome-icon icon="tachometer-alt"/></div>
			<div class="title">Dashboard</div>
			<div><font-awesome-icon icon="angle-right"/></div>
		</router-link>
		<router-link to="/settings/account" class="row">
			<div><font-awesome-icon icon="user-circle"/></div>
			<div class="title">Account</div>
			<div><font-awesome-icon icon="angle-right"/></div>
		</router-link>
		<router-link to="/settings/general" class="row">
			<div><font-awesome-icon icon="wrench"/></div>
			<div class="title">General</div>
			<div><font-awesome-icon icon="angle-right"/></div>
		</router-link>
	</section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
	name: 'Settings',
	components: {FontAwesomeIcon}
}
</script>

<style scoped>

.wrapper {
	margin: 10px 2vw;
}

.row {
	color: inherit;
	display: flex;
	border-bottom: 1px solid #fff;
	font-size: 6vw;
	justify-content: space-between;
}

.row div {
	padding: 10px;
}

.row .title {
	flex: 1;
}

</style>

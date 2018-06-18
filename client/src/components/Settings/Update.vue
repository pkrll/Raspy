<template>
	<component v-bind:is="middleComponent" v-bind:content="content" v-bind:heading="heading"></component>
</template>

<script>
import Spinner from '@/components/Common/Spinner'
import Content from '@/components/Common/Content'
import UpdateInformation from '@/components/Settings/UpdateInformation'

export default {
	name: "Update",
	components: { Spinner, Content, UpdateInformation },
	data: function () {
		return {
			middleComponent: 'Spinner',
			heading: '',
			content: 'Checking for update...'
		}
	},
	methods: {
		didCheckForUpdate: function (response) {
			console.log(response);
			if (response.status == 1) {
				let version = response.version.version;
				let isNewer = response.version.isNewer;

				if (isNewer) {
					this.heading = 'Version ' + version + ' is available!'
					this.content = '\r\n'+response.version.changes;
					this.middleComponent = 'UpdateInformation';
				} else {
					this.content = "Software is up to date.";
					this.middleComponent = 'Content';
				}
			} else {
				this.content = "Something went wrong. Could not check for update."
				this.middleComponent = 'Content';
			}
		}
	},
	created() {
		this.$APIManager.checkForUpdate(this.didCheckForUpdate);
	}
}
</script>

<style scoped>

.container {
	align-items: 			center;
	display: 					flex;
	flex-direction: 	column;
	justify-content: 	center;
}


</style>

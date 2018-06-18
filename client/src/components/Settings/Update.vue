<template>
	<component v-bind:is="middleComponent"
						 v-bind:text="text">
	</component>
</template>

<script>
import Spinner from '@/components/Common/Spinner'
import Content from '@/components/Common/Content'

export default {
	name: "Update",
	components: { Spinner, Content },
	data: function () {
		return {
			middleComponent: 'Spinner',
			text: 'Checking for update...'
		}
	},
	methods: {
		didCheckForUpdate: function (response) {
			console.log(response);
			if (response.status == 1) {
				let version = response.version.version;
				let isNewer = response.version.isNewer;

				if (isNewer) {
					this.text = "A newer version " + version + " is available.";
				} else {
					this.text = "Software is up to date.";
				}
			} else {
				this.text = "Something went wrong. Could not check for update."
			}

			this.middleComponent = 'Content';
		}
	},
	created() {
		this.$APIManager.checkForUpdate(this.didCheckForUpdate);
	}
}
</script>

<style scoped>
</style>

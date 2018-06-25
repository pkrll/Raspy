<template>
	<section class="wrapper">
		<nav class="options" v-show="this.errorMessage == undefined">
			<div class="noselect" v-bind:class="{active: isFavorite}">
				<font-awesome-icon icon="star"/>
				<div class="title">Set as favorite</div>
			</div>

			<div class="noselect" v-on:click="showAdvancedOptions = !showAdvancedOptions" v-bind:class="{greyed: showAdvancedOptions}">
				<font-awesome-icon icon="cogs"/>
				<div class="title">Show advanced options</div>
			</div>
		</nav>

		<nav class="options" v-show="showAdvancedOptions">
			<div class="noselect" v-on:click="showHidden = !showHidden">
				<font-awesome-icon v-bind:icon="(showHidden) ? 'toggle-on' : 'toggle-off'"/>
				<div class="title">Show hidden files</div>
			</div>

			<div class="noselect" v-on:click="makeDirectory">
				<font-awesome-icon icon="folder"/>
				<div class="title">New folder</div>
			</div>

			<div class="noselect" v-on:click="deleteDirectory" v-bind:class="{greyed: didClickDelete}">
				<font-awesome-icon icon="trash"/>
				<div class="title">Delete folder</div>
			</div>
		</nav>

		<component  v-bind:is="middleComponent"
                v-bind:directories="directories"
                v-bind:files="files"
                v-bind:showHidden="showHidden"
                v-bind:prettyPath="prettyPath"
                v-bind:content="errorMessage">
		</component>

		<component v-bind:is="bottomComponent">
		</component>

	</section>

</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Directory from '@/components/Browser/Directory/Directory.vue';
import { watch, computed, methods, data, created } from '@/components/Browser/Main/main.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faCogs, faToggleOn, faToggleOff, faFolder, faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faStar, faCogs, faToggleOn, faToggleOff, faFolder, faTrash);

export default {
	props: { path: { default: '/' } },
	name: 'Browser',
	components: { Directory, Spinner },
	watch: watch,
	computed: computed,
	methods: methods,
	data: data,
	created: created
}
</script>

<style scoped>

.options .title {
	font-size: 3.5vw;
}

</style>

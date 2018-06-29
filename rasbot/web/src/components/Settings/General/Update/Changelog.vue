<template>
  <div id="container">
    <div class="heading">{{heading}}</div>
    <vue-markdown class="changelog">
      {{textElement}}

*Launch the bootstrapper to update to the latest version.*
    </vue-markdown>
    <div class="button" v-on:click="launchBootstrapper">Launch bootstrapper</div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
	name: "Changelog",
	props: ["heading", "textElement"],
	components: { 'vue-markdown' : VueMarkdown },
	methods: {
		launchBootstrapper: function () {
      this.$root._router.push('bootstrapper');
		}
	}
}
</script>

<style scoped src="@/components/Settings/General/Update/changelog.css"></style>

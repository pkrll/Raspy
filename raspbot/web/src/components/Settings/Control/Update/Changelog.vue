<template>
  <div id="container">
    <div class="heading">{{heading}}</div>
    <vue-markdown class="changelog">
      {{textElement}}
    </vue-markdown>
    <div class="button">Update</div>
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

<style scoped src="@/components/Settings/Control/Update/changelog.css"></style>

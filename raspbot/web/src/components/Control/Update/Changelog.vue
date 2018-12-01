<template>
  <div id="container">
    <div class="heading">{{heading}}</div>
    <vue-markdown class="changelog">
      {{textElement}}
    </vue-markdown>
    <div v-on:click="$emit('update')" class="button">Update</div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
	name: "Changelog",
	props: ["heading", "textElement"],
	components: { 'vue-markdown' : VueMarkdown },
}
</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped src="@/components/Control/Update/update.css"></style>
<style scoped src="@/components/Control/Update/changelog.css"></style>

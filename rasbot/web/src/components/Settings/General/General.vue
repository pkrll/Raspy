<template>
  <section id="content">
    <div class="heading">General settings</div>
    <router-link to="/settings/general/update" class="row">
      <div class="icon"><font-awesome-icon icon="cloud-download-alt"/></div>
      <div class="title">Check for update</div>
      <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
    </router-link>
    <div class="row" v-on:click="launchBootstrapper">
      <div class="icon"><font-awesome-icon icon="terminal"/></div>
      <div class="title">Launch bootstrapper</div>
      <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
    </div>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudDownloadAlt, faTerminal, faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faCloudDownloadAlt, faTerminal, faAngleRight);

export default {
  name: 'SettingsGeneral',
  methods: {
    launchBootstrapper: function() {
      this.$root._router.push('bootstrapper');
    }
  }
}
</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped>
.row {
	font-size: 				5vw;
	align-items: 			center;
}

.row .title {
	width: 70vw;
}

</style>

<template>
  <section id="content">
    <div class="heading">Control</div>
    <router-link to="/control/update" class="row">
      <div class="icon"><font-awesome-icon icon="download"/></div>
      <div class="title">Check for update</div>
      <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
    </router-link>
    <router-link to="/control/reboot" class="row">
      <div class="icon"><font-awesome-icon icon="redo-alt"/></div>
      <div class="title">Reboot Raspbot</div>
      <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
    </router-link>
    <router-link to="/control/shutdown" class="row">
      <div class="icon"><font-awesome-icon icon="power-off"/></div>
      <div class="title">Shutdown Raspbot</div>
      <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
    </router-link>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDownload, faPowerOff, faRedoAlt, faPlug, faAngleRight } from '@fortawesome/free-solid-svg-icons';

library.add(faDownload, faPowerOff, faRedoAlt, faPlug, faAngleRight);

export default {
  name: 'Control'
}
</script>

<style scoped src="@/components/Settings/main.css"></style>

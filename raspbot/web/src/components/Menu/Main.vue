<template>
  <section id="content">
    <nav class="options">
      <router-link to="/advanced/devices" class="row">
        <div class="noselect">
          <div class="icon"><font-awesome-icon :icon="['far', 'hdd']"/></div>
          <div class="title">Mount/Unmount</div>
          <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
        </div>
      </router-link>
      <router-link to="/control" class="row">
        <div class="noselect">
          <div class="icon"><font-awesome-icon icon="keyboard"/></div>
          <div class="title">Control</div>
          <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
        </div>
      </router-link>
      <router-link to="/settings" class="row">
        <div class="noselect">
          <div class="icon"><font-awesome-icon icon="sliders-h"/></div>
          <div class="title">Settings</div>
          <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
        </div>
      </router-link>
    </nav>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSlidersH, faKeyboard, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faHdd } from '@fortawesome/free-regular-svg-icons';

library.add(faHdd, faSlidersH, faKeyboard, faAngleRight);

export default {
  name: 'Menu'
}
</script>

<style scoped src="@/components/Menu/main.css">
</style>

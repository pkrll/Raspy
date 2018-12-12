<template>
  <section id="content">
    <nav class="file-list-view" v-if="devices.length > 0">
      <nav class="row">
        <div class="icon"><font-awesome-icon icon="list-alt"/></div>
        <div class="title">Name</div>
        <div class="title">Size</div>
        <div class="title">Type</div>
        <div class="title">Mount</div>
      </nav>
      <nav v-for="device in devices" class="row" v-on:click="showDetails(device)">
					<div class="icon"><font-awesome-icon :icon="icon(device.mountpoint)"/></div>
					<div class="title">{{deviceName(device)}}</div>
					<div class="title">{{device.size}}</div>
					<div class="title">{{device.type}}</div>
					<div class="title">{{device.mountpoint}}</div>
			</nav>
    </nav>
  </section>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { faHdd } from '@fortawesome/free-regular-svg-icons';

library.add(faHdd, faListAlt);

export default {
  name: 'List',
  props: ['devices', 'showDetails'],
  methods: {
    icon: function (mountpoint) {
      return (mountpoint != null) ? ['fa', 'hdd'] : ['far', 'hdd'];
    },
    deviceName: function(device) {
      const name = device.name.match(/(?!\/)\w+$/g);
      if (name.length > 0) return name[0];

      return device.name;
    }
  }
}
</script>

<style scoped src="@/shared/general.css"></style>
<style scoped>
.row .icon {
  font-size: 5vw;
  width: auto;
}
.row .title {
  font-size: 5vw;
}

</style>

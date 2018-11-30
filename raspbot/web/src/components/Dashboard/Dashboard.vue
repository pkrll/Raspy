<template>
  <section id="content">
    <nav class="options">
      <router-link to="/dashboard/shutdown">
        <div class="noselect">
          <font-awesome-icon icon="power-off"/>
          <div class="title">Power off</div>
        </div>
      </router-link>
      <router-link to="/dashboard/reboot">
        <div class="noselect">
          <font-awesome-icon icon="redo"/>
          <div class="title">Reboot</div>
        </div>
      </router-link>
    </nav>

    <div class="column-view">
      <div class="icon">
        <font-awesome-icon icon="thermometer-three-quarters"/> {{this.temperature}}
      </div>

      <div class="table-view">
        <div class="table-row-view">
          <div class="table-cell-view">CPU usage:</div>
          <div class="table-cell-view right">{{this.cpu}} %</div>
        </div>
        <div class="table-row-view">
          <div class="table-cell-view">RAM total: </div>
          <div class="table-cell-view right">{{this.convertSize(this.ram.total)}}</div>
        </div>
        <div class="table-row-view">
          <div class="table-cell-view">RAM used: </div>
          <div class="table-cell-view right">{{this.convertSize(this.ram.used)}}</div>
        </div>
        <div class="table-row-view">
          <div class="table-cell-view">RAM available: </div>
          <div class="table-cell-view right">{{this.convertSize(this.ram.available)}}</div>
        </div>
        <div class="table-row-view">
          <div class="table-cell-view">HDD total:</div>
          <div class="table-cell-view right">{{this.convertSize(this.disk.total)}}</div>
        </div>
        <div class="table-row-view">
          <div class="table-cell-view">HDD used:</div>
          <div class="table-cell-view right">{{this.convertSize(this.disk.used)}}</div>
        </div>
        <div class="table-row-view">
          <div class="table-cell-view">HDD free:</div>
          <div class="table-cell-view right">{{this.convertSize(this.disk.free)}}</div>
        </div>
      </div>

      <div class="box">
        <div class="title"><font-awesome-icon icon="clock"/> Uptime:</div>
        <div class="description">{{this.convertTime(this.uptime.total_seconds)}}</div>
      </div>
    </div>

  </section>
</template>

<script>
import { data, created, methods, beforeDestroy } from '@/components/Dashboard/dashboard.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff, faRedo, faThermometerThreeQuarters, faClock } from '@fortawesome/free-solid-svg-icons';

library.add(faPowerOff, faRedo, faThermometerThreeQuarters, faClock);

export default {
  name: 'Dashboard',
  data: data,
  created: created,
  methods: methods,
  beforeDestroy: beforeDestroy
}
</script>

<style scoped>
.column-view {
  display:          flex;
  font-size:        8vw;
  flex-direction:   column;
  justify-content:  space-around;
  padding:          50px;
  text-align: left;
}

.column-view .icon {
  font-size:  15vw;
  text-align: center;
}

.options a {
  width: 100%;
  color: #fff;
  text-decoration: none;
}

.box {
  font-size: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 8vw;
  align-items: center;
  width: 100%;
}

.box > .title {
  font-size: 7vw;
}

.box > .description {
  text-align: center;
}

</style>

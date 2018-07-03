<template>
  <section id="content">
    <nav class="options">
      <div class="noselect">
        <router-link to="/dashboard/shutdown">
          <font-awesome-icon icon="power-off"/>
          <div class="title">Power off</div>
        </router-link>
      </div>
      <div class="noselect">
        <router-link to="/dashboard/reboot">
          <font-awesome-icon icon="redo"/>
          <div class="title">Reboot</div>
        </router-link>
      </div>
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
    </div>

  </section>
</template>

<script>
import { data, created, methods, beforeDestroy } from '@/components/Dashboard/dashboard.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPowerOff, faRedo, faThermometerThreeQuarters } from '@fortawesome/free-solid-svg-icons';

library.add(faPowerOff, faRedo, faThermometerThreeQuarters);

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

.noselect a {
  color: #fff;
  text-decoration: none;
}

</style>

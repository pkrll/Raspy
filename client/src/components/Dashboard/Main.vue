<template>
  <section class="wrapper">

		<nav class="options">
		 <div class="noselect">
			 <font-awesome-icon icon="power-off"/>
			 <div class="title">Power off</div>
		 </div>

		 <div class="noselect">
			 <font-awesome-icon icon="redo"/>
			 <div class="title">Reboot</div>
		 </div>

	 </nav>

	 <div class="column-view">
		 <div class="icon">
			 <font-awesome-icon icon="thermometer-three-quarters"/> {{this.temperature}}
		 </div>

		 <div class="table-view">
			 <div class="table-row-view">
				 <div class="table-cell-view">CPU usage:</div>
				 <div class="table-cell-view right">{{this.cpu}}</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">RAM total: </div>
				 <div class="table-cell-view right">{{this.ram.total}}</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">RAM used: </div>
				 <div class="table-cell-view right">{{this.ram.used}}</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">RAM available: </div>
				 <div class="table-cell-view right">{{this.ram.available}}</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">HDD total:</div>
				 <div class="table-cell-view right">{{this.disk.total}}</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">HDD used:</div>
				 <div class="table-cell-view right">{{this.disk.used}}</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">HDD free:</div>
				 <div class="table-cell-view right">{{this.disk.free}}</div>
			 </div>
		 </div>
	 </div>

  </section>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { thermometerthreequarters, poweroff, redo } from '@fortawesome/fontawesome-free-solid'

export default {
	name: 'Dashboard',
	components: { FontAwesomeIcon },
	methods: {

		update: function () {
			this.$APIManager.getSystemInformation(this.didFinishRequest);
		},

		didFinishRequest: function (response) {
			this.ram = response.ram;
			this.cpu = response.cpu;
			this.disk = response.disk;
			this.temperature = response.temperature;
		}
	},
	data: function () {
		return {
			ram: {},
			cpu: {},
			disk: 0,
			temperature: 0,
			intervalID: null
		}
	},
	created: function () {
		this.update();
		this.intervalID = setInterval(this.update, 3000);
	},
	beforeDestroy: function() {
		if (this.intervalID != null) clearInterval(this.intervalID);
	},
}
</script>

<style scoped>
.column-view {
	display:          flex;
	font-size:        8vw;
	flex-direction:   column;
	justify-content:  space-around;
	padding:          50px;
}

.column-view .icon {
	font-size:  15vw;
	text-align: center;
}
</style>

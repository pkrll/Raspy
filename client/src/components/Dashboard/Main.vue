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
			 <font-awesome-icon icon="thermometer-three-quarters"/> 54 C
		 </div>

		 <div class="table-view">
			 <div class="table-row-view">
				 <div class="table-cell-view">CPU usage:</div><div class="table-cell-view right">2%</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">RAM free: </div><div class="table-cell-view right">850 MB</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">RAM used: </div><div class="table-cell-view right">50 MB</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">HDD free:</div><div class="table-cell-view right">75 MB</div>
			 </div>
			 <div class="table-row-view">
				 <div class="table-cell-view">HDD used:</div><div class="table-cell-view right">175 MB</div>
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
	components: { FontAwesomeIcon }
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

<template>
  <div class="confirmButtonWrapper">
		<div v-on:click="cancel"><span>Cancel</span></div>
		<div v-on:click="confirm"><span>Confirm</span></div>
	</div>
</template>

<script>
export default {
	name: 'ConfirmButton',
	props: ['cancelCallback', 'confirmCallback'],
	methods: {
		cancel: function () {
			this.cancelCallback();
		},
		confirm: function () {
			this.confirmCallback()
		}
	}
}
</script>

<style>

.confirmButtonWrapper {
	align-items: 			center;
	background: 			rgb(229, 73, 95);
	bottom: 					0;
	color: 						#fff;
	display: 					flex;
	font-size: 				1.5em;
	height: 					100px;
	justify-content: 	space-around;
	position: 				fixed;
	width: 						100%;
}

.confirmButtonWrapper > div {
	display: 			table;
	cursor:				pointer;
	height: 			100%;
	text-align: 	center;
	width: 				50%;
}

.confirmButtonWrapper > div span {
	display: 				table-cell;
	vertical-align: middle;
}

.confirmButtonWrapper > div:first-child {
	border-right: 1px solid #fff;
}

</style>

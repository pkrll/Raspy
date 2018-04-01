<template>
	<section class="wrapper">
		<div class="heading">File browser settings</div>

		<div class="row">
			<div class="title">
				Favorite folder
				<div class="subscript">{{this.favoritFolder}}</div>
			</div>
			<div class="button noselect" v-on:click="clearBookmark" v-bind:class="{greyed : this.favoritFolder == 'None'}">Clear</div>
		</div>

		<div class="row">
			<div class="title">Show hidden files</div>
			<div class="button" v-on:click="toggleHiddenFiles">{{this.showHidden | showHiddenLabel}}</div>
		</div>

	</section>
</template>

<script>
export default {
	name: 'Settings-Browser',
	methods: {
		/**
		* Removes the current bookmark.
		*/
		clearBookmark: function () {
			if (this.favoritFolder != 'None') {
				this.$CookieManager.clearBookmark();
				this.favoritFolder = 'None';
			}
		},
		/**
		* Toggle show hidden files.
		*/
		toggleHiddenFiles: function () {
			this.showHidden = !this.showHidden;

			if (this.showHidden) {
				this.$CookieManager.saveCookie('showHidden', true);
			} else {
				this.$CookieManager.clearCookie('showHidden');
			}
		}
	},
	filters: {
		/**
		 * Replaces true with on and false with off.
		 *
		 * @param  {Boolean} value 	The boolean value to replace.
		 * @return {String}       	'On' if value is true, otherwise 'off'.
		 */
		showHiddenLabel: function (value) {
			return (value) ? 'On' : 'Off';
		}
	},
	data: function () {
		return {
			favoritFolder: 'None',
			showHidden: false
		}
	},
	created: function () {
		let folder = this.$CookieManager.getBookmark();
		if (folder != undefined) {
			this.favoritFolder = decodeURIComponent(folder);
		}

		let showHidden = this.$CookieManager.loadCookie('showHidden');
		if (showHidden != undefined) {
			this.showHidden = showHidden;
		}
	}
}
</script>

<style scoped>

.wrapper {
	margin: 10px 2vw;
}

.heading {
	color: 			#ddd;
	font-size: 	4vw;
	text-align: center;
}

.row {
	color: 						inherit;
	display: 					flex;
	border-bottom: 		1px solid #fff;
	font-size: 				5vw;
	justify-content: 	space-between;
	align-items: 			center;
}

.row div {
	padding: 10px;
}

.row .title {
	width: 70vw;
}

.row .button {
	cursor:			pointer;
	width: 			20vw;
	text-align: center;
}

.subscript {
	color: 			#ccc;
	font-size: 	4vw;
	overflow-x: scroll;
	padding: 		0 10px 0 0;
}

.greyed {
	color: grey;
}

</style>

<template>
  <div id="loginBox">
    <div class="input">
      <div><input type="text" name="username" placeholder="Username" v-model="username"></div>
      <div><input type="password" name="password" placeholder="Password" v-model="password"></div>
      <div><div class="button noselect" v-on:click="_signIn">Sign in</div></div>
      <div>{{textElement}}&nbsp;</div>
    </div>
  </div>
</template>

<script>
import { data, methods, mounted } from '@/components/Login/login.js'

export default {
  name: 'Login',
  props: ['textElement'],
  data: data,
  methods: methods,
  mounted: mounted
}
</script>

<style scoped>

#loginBox {
  height: auto;
  flex-grow: 1;
}

#loginBox > div {
  padding-top: 5%;
}

div.input > div {
  padding: 5px;
}

input {
	border: 						1px solid #fff;
	border-radius: 			5px;
	display: 						block;
	font-family: 				'Avenir';
	font-size: 					5vw;
	padding: 						10px 20px 10px 20px;
	-webkit-appearance: none;
}

input:focus {
	outline: none;
}


.button {
	background: 		rgb(82, 172, 120);
	border-radius: 	5px;
	cursor:					pointer;
	font-size: 			4vw;
	padding: 				10px 10px 10px 10px;
	text-align: 		center;
}

@media only screen and (min-device-width: 320px)
									 and (max-device-width: 812px)
									 and (orientation: landscape) {

   #loginBox {
     position: absolute;
     flex-grow: 0;
   }


}

</style>

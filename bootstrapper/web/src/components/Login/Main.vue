<template>
  <div id="loginBox">
    <div class="input">
      <div><input type="text" name="username" placeholder="Username" v-model="username"></div>
      <div><input type="password" name="password" placeholder="Password" v-model="password"></div>
      <div><div class="button noselect" v-on:click="signIn">Sign in</div></div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faRobot } from '@fortawesome/free-solid-svg-icons'

library.add(faRobot);

export default {
  name: 'Login',
  data: function () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {

    }
  }
}
</script>

<style scoped>

#loginBox {
  position: absolute;
}

#loginBox > div {
  padding-top: 5%;
}

div.input > div {
  padding: 5px;
}

.title {
  font-size: 8vw;
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
</style>

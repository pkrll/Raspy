<template>
  <section id="content">
    <div class="heading">Edit pasword</div>
    <div id="container">
      <input type="password" name="password" v-model="password" value="">
      <div class="button" v-on:click="updatePassword">Save</div>
      <div>{{message}}</div>
    </div>
  </section>
</template>

<script>
import { data, methods } from '@/components/Settings/Account/Password/password.js';

export default {
  name: 'AccountPassword',
  data: data,
  methods: methods
}
</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped src="@/components/Settings/Account/Password/password.css"></style>

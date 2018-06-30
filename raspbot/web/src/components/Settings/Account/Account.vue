<template>
  <section id="content">
    <div class="heading">Account settings</div>
    <router-link to="/settings/account/password" class="row">
      <div class="icon"><font-awesome-icon icon="key"/></div>
      <div class="title">Change password</div>
      <div class="arrow"><font-awesome-icon icon="angle-right"/></div>
    </router-link>
  </section>
</template>

<script>
import { data, created, methods, filters } from '@/components/Settings/Account/account.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faKey } from '@fortawesome/free-solid-svg-icons';

library.add(faKey);

export default {
  name: 'SettingsAccount',
  data: data,
  created: created,
  methods: methods,
  filters: filters
}

</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped src="@/components/Settings/Account/account.css"></style>

<template>
  <section>
    <nav class="options" v-show="this.errorMessage == undefined">
      <div class="noselect" v-on:click="didClickCancel">
        <font-awesome-icon icon="ban"/>
        <div class="title">Cancel</div>
      </div>

      <div class="noselect" v-on:click="didClickSelect(currentPath)">
        <font-awesome-icon icon="check"/>
        <div class="title">Select</div>
      </div>

      <div class="noselect" v-on:click="makeDirectory">
        <font-awesome-icon icon="folder"/>
        <div class="title">New folder</div>
      </div>
    </div>
  </nav>

  <component  v-bind:is="middleComponent"
              v-bind:directories="directories"
              v-bind:browse="browse"
              v-bind:prettyPath="prettyPath">
              v-bind:currentPath="currentPath">
  </component>

</section>

</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';
import Directory from '@/components/Browser/Select/Browser.vue';
import { data, methods, computed, created } from '@/components/Browser/Select/select.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBan, faCheck, faFolder } from '@fortawesome/free-solid-svg-icons';

library.add(faBan, faCheck, faFolder);

export default {
  props: { didClickCancel: { default: '' }, didClickSelect: { default: '' } },
  name: 'Select',
  data: data,
  components: { Directory, Spinner, Content },
  computed: computed,
  methods: methods,
  created: created,
  beforeRouteLeave (to, from, next) {
    if (to.name == 'Select' || to.name == 'Select: Directory') {
      next();
    } else {
      next({ name: 'Select: Directory', params: to.params });
    }
  }
}
</script>

<style scoped>

.options .title {
	font-size: 3.5vw;
}

</style>

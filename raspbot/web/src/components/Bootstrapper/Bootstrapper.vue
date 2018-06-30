<template>
  <section id="content">
    <component v-bind:is="component" v-bind:textElement="content"></component>
  </section>
</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';

export default {
  name: 'Bootstrapper',
  components: { Spinner, Content },
  data: function() {
    return {
      component: 'Spinner',
      content: 'Loading...'
    }
  },
  mounted: function() {
    this.$APIManager.launchBootstrapper(response => {
      if (response.success) {
        let url = window.location.protocol + '//' + window.location.hostname + ':5001';
        window.location.href = url;
      } else {
        this.component = 'Content';
        if (response.error.message) {
          this.content = response.error.message;
        } else {
          this.content = "An error occurred: Could not open bootstrapper.";
        }
      }
    });
  }
}
</script>

<style scoped></style>

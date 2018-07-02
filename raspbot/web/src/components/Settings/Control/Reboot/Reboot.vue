<template>
  <div id="content">
    <div id="confirmation" v-if="!didConfirm">
      <div>Are you sure you want to reboot?</div>
      <div id="buttons">
        <div v-on:click="reboot" class="button">Reboot</div>
        <div v-on:click="cancel" class="button red">Cancel</div>
      </div>
    </div>
    <component  v-bind:is="component"
                v-bind:textElement="textElement" v-else>
   </component>
 </div>
</template>

<script>
import Spinner from '@/components/Common/Spinner/Spinner.vue';
import Content from '@/components/Common/Content/Content.vue';

export default {
  name: 'Reboot',
  components: { Spinner, Content },
  data: function() {
    return {
      didConfirm: false,
      textElement: ''
    }
  },
  methods: {
    reboot: function() {
      this.didConfirm = true;
      this.component = 'Spinner';
      this.textElement = 'Rebooting...';

      this.$APIManager.rebootRaspbot(response => {
        this.component = 'Content'
        if (response.success) {
          let timer = setInterval(() => {
            this.$root._router.push('/');
            clearInterval(timer);
          }, 1000);
        } else {
          this.textElement = 'Could not reboot';
        }
      });
    },

    cancel: function() {
      this.$shared.goBack(this);
    }
  }
}
</script>

<style scoped src="@/components/Settings/main.css"></style>
<style scoped>

#confirmation {
  font-size: 6vw;
  padding: 10px 0;
}

#buttons > div:last-child {
  margin-top: 20px;
}

.red {
	background: rgb(172, 82, 82);
}

</style>

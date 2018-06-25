<template>
  <section id="content">
    <div class="content">
      {{textElement}}
    </div>
  </section>
</template>

<script>
export default {
  name: 'Content',
  props: ['textElement']
}
</script>

<style scoped>

.content {
  font-size: 5vw;
  text-align: center;
}

</style>

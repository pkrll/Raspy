<template>
  <section id="content-wrapper">
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
  padding: 30px;
}

#content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>

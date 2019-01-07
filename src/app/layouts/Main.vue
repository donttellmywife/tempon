<template>
  <div class="container">
    <Header />

    <slot></slot>
  </div>
</template>

<script>
  import {Header} from 'COMPONENT'

  export default {
    components: {
      Header
    }
  }
</script>

<style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 15px 30px;
    background: #f9f7f5;
  }
</style>

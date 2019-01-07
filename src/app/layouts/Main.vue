<template>
  <div class="main-layout">
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

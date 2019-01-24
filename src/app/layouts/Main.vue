<template>
<div class="main-layout">
  <Header />

  <main class="main-content">
    <slot />
  </main>
</div>
</template>


<script>
  import { Header } from 'COMPONENT'

  export default {
    components: {
      Header
    }
  }
</script>

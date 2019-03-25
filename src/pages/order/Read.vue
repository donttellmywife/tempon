<template>
<main-layout>
  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>

  <cargo-client  v-if="!(isLoading && error)" :key="order._id" :cargo="order" />
</main-layout>
</template>


<script>
  import orderMixin from './mixin.js'


  export default {
    mixins: [orderMixin],
  }
</script>

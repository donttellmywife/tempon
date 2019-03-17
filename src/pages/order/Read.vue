<template>
<main-layout>
  <h2>JUST OBSERVE ORDER</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>

  <cargo-client  v-if="!(isLoading && error)" :key="order._id" :cargo="order" />
</main-layout>
</template>


<script>
  import { Loading, CargoClient } from 'COMPONENT'
  import orderMixin from './mixin.js'


  export default {
    mixins: [orderMixin],


    components: {
      CargoClient,
      Loading,
    },
  }
</script>

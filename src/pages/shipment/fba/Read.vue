<template>
<main-layout>
  <h2>SHIPMENT</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>

  <fba-client v-if="!(isLoading && error)" :key="shipment._id" :shipment="shipment" />
</main-layout>
</template>


<script>
  import { FbaClient } from 'COMPONENT'
  import fbaMixin from './mixin.js'


  export default {
    mixins: [fbaMixin],


    components: {
      FbaClient,
    },
  }
</script>

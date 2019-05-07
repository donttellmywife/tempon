<template>
<main-layout>
  <h2>SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <Err v-if="error" :msg="error" />

  <fba-client v-if="!(isLoading && error)" :key="shipment._id" :shipment="shipment" />

  <button v-if="shipment.status !== 'shipped'" class="btn btn-danger" @click="remove">delete fba shipment</button>
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

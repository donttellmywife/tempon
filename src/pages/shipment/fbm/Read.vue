<template>
<main-layout>
  <h2>JUST OBSERVE SHIPMENT</h2>

  <Loading v-if="isLoading" />

  <p v-if="error" class="error">{{ error }}</p>

  <fbm-client v-if="!(isLoading && error)" :key="shipment._id" :shipment="shipment" />

  <button v-if="shipment.status !== 'shipped'" class="btn btn-danger" @click="remove">delete fbm shipment</button>
</main-layout>
</template>


<script>
  import { FbmClient } from 'COMPONENT'
  import fbmMixin from './mixin.js'


  export default {
    mixins: [fbmMixin],


    components: {
      FbmClient,
    },
  }
</script>

<template>
<li>
  <router-link v-if="shipment._id" :to="{ name: 'viewFBM', params: { sid: shipment._id }}">
    {{ shipment.description }}
  </router-link>

  <router-link v-if="shipment._id" :to="{ name: 'updateFBM', params: { sid: shipment._id }}">
    EDIT
  </router-link>

  <router-link v-if="shipment._id" :to="{ name: 'assistFBM', params: { sid: shipment._id }}">
    ASSIST
  </router-link>


  <div>Created At: {{ formatDate(shipment.createdAt) }}</div>
  <div>
    <span>STATUS: {{ shipment.status }}</span>
    <span>ADDRESS: {{ shipment.address }}</span>
  </div>

  <div>
    <li v-for="cargo in shipment.cargos">
      {{ cargo.quantity }}
    </li>
  </div>

  <div v-if="shipment.status === 'shipped'">
    {{ shipment.tracking }}
  </div>
</li>
</template>


<script>
  import { methodDate } from 'MIXIN'
  export default {
    props: ['shipment'],
    mixins: [methodDate],
  }
</script>

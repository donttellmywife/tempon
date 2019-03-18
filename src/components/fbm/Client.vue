<template>
  <li>
    <router-link :to="{ name: 'viewFBM', params: { sid: shipment._id }}">{{ shipment.description }}</router-link>

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
    mixins: [ methodDate ],
  }
</script>

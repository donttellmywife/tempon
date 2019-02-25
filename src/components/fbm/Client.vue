<template>
  <li>
    <div>
      <span>STATUS: {{ shipment.status }}</span>
      <span>DESCRIPTION: {{ shipment.description }}</span>
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
  export default {
    props: ['shipment'],
  }
</script>

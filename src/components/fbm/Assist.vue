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

    <input v-if="shipment.status === 'todo'" v-model="tracking" placeholder="trakcing is" />

    <button v-on:click="start">tell client!</button>
  </li>
</template>


<script>
  import { fbm } from 'API'


  export default {
    props: ['shipment'],


    data() {
      return {
        tracking: '',
      }
    },


    methods: {
      start() {
        const shipment = {
          ...this.$props.shipment,
          tracking: this.tracking,
        }

        fbm.update(shipment).then(console.log).catch(err => this.error = err)
      }
    },
  }
</script>

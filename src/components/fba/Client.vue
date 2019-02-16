<template>
  <li>
    <div>
      <span>{{ shipment.status }}</span>
      <span>{{ shipment.description }}</span>
      <span>{{ shipment.fnsku }}</span>
    </div>

    <div>
      <li v-for="cargo in shipment.cargos">
        {{ cargo.quantity }}
      </li>
    </div>

    <div v-if="shipment.status === 'in progress'">
      {{ shipment.dimensions.depth }}
      {{ shipment.dimensions.height }}
      {{ shipment.dimensions.width }}
      {{ shipment.dimensions.weight }}

      <input type="text" v-model="labels" />

      <button v-on:click="update">Agree, we can ship it?</button>
    </div>
  </li>
</template>


<script>
  import { fba } from 'API'


  export default {
    props: ['shipment'],

    data() {
      return {
        labels: '',
      }
    },

    mounted() {
    },


    methods: {
      update() {
        const shipment = {
          ...this.$props.shipment,
          labels: this.labels,
        }

        fba.update(shipment).then(console.log).catch(err => this.error = err)
      }
    },
  }
</script>

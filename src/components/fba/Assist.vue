<template>
  <li v-if="!loading">
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

    <form v-if="shipment.status === 'todo'" @submit.prevent="update">
      How big is the box?<br>
      <label>Depth<br><input v-model="dimensions.depth" placeholder="depth" type="number"></label><br>
      <label>Height<br><input v-model="dimensions.height" placeholder="height" type="number"></label><br>
      <label>Width<br><input v-model="dimensions.width" placeholder="width" type="number"></label><br>
      <label>Weight<br><input v-model="dimensions.weight" placeholder="weight" type="text"></label><br>

      <button type="submit">let us handle it!</button><br>
    </form>

    <button v-if="shipment.status === 'ready'" v-on:click="start">START SHIPMENT</button>
  </li>
</template>


<script>
  import { fba } from 'API'


  export default {
    props: ['shipment'],

    data() {
      return {
        dimensions: {
          depth: '',
          height: '',
          width: ',',
          weight: '',
        },
      }
    },

    mounted() {
    },


    methods: {
      update() {
        const shipment = {
          ...this.$props.shipment,
          dimensions: { ...this.dimensions }
        }

        fba.update(shipment).then(console.log).catch(err => this.error = err)
      },


      start() {
        fba.update(this.$props.shipment).then(console.log).catch(err => this.error = err)
      }
    },
  }
</script>

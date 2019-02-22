<template>
  <li>
    <div>
      Client expects:
      <span>{{ cargo.description.expected }}</span>

      <label>
        Exectly the same!
        <input type="checkbox" v-model="description.same">

      </label>

      <label v-if="!description.same">
        and rly is <input v-model="description.actual" placeholder="description" type="text">
      </label>
      <br>
    </div>


    <div>
      In amount of:
      <b>{{ cargo.quantity.expected }}</b>

      <label>
        Exectly the same!
        <input type="checkbox" v-model="quantity.same">

      </label>

      <label v-if="!quantity.same">
        and rly is <input v-model="quantity.actual" placeholder="quantity" type="number">
      </label>
    </div>


    with tracking: {{ cargo.tracking }}<br>
    and labels: {{ cargo.labels }}<br>

    <button type="submit" v-on:click="update">let us handle it!</button>
  </li>
</template>


<script>
  import { orders } from 'API'


  export default {
    props: ['cargo'],

    data() {
      return {
        description: {
          same: true,
          actual: ''
        },
        quantity: {
          same: true,
          actual: ''
        },
      }
    },


    methods: {
      update() {
        const cargo = {
          ...this.$props.cargo,
        }

        if (!this.description.same) cargo.description.actual = this.description.actual
        if (!this.quantity.same) cargo.quantity.actual = this.quantity.actual

        orders.update(cargo).then(console.log).catch(err => this.error = err)
      }
    },
  }
</script>

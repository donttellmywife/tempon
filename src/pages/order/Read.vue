<template>
<main-layout>
<h2>order</h2>
<Loading v-if="isLoading" />
<Err v-if="error" :msg="error" />

<cargo-client  v-if="!(isLoading && error)" :key="order._id" :cargo="order" />

<button v-if="order.status !== 'done'" class="btn btn-danger" @click="remove">delete order</button>
</main-layout>
</template>


<script>
  import orderMixin from './mixin.js'


  export default {
    mixins: [orderMixin],
  }
</script>

<template>
<main-layout>
  <h2>UPDATE FBM SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <p v-if="error" class="error">{{ error }}</p>


  <div class="two-sides">
    <main class="clm">
      <form @submit.prevent="update">
        <div class="form-group">
          <label>Where to? <br>
            <input v-model="shipment.address" class="form-control" placeholder="some avenue" type="text">
          </label><br>
        </div>

        <div class="form-group">
          <label>describe contents <br>
            <input v-model="shipment.description" class="form-control" placeholder="starwars lego" type="text">
          </label><br>
        </div>

        <div v-if="shipment.cargos.length" class="form-group">
          <hr>
          <div v-for="ord in shipment.cargos">
            <label>in amount of
              <input v-model="ord.quantity" class="form-control form-control-sm" placeholder="1" type="number" disabled>
            </label><br>
          </div>
        </div>


        <div class="form-group">
          Additional packing:<br>
          <label v-for="type in ['box', 'A4 envelope', 'bubble wrap']">
            <input type="checkbox" :value="type" v-model="shipment.packing">
            {{ type }}
            <br>
          </label>
        </div>


        <div class="form-group">
          Select courier<br>
          <label v-for="cour in possibleCourier">
            <input type="radio" :value="cour" v-model="selectedCourier">
          {{ cour }}</label><br>

          <input v-if="showCustomCourier" v-model="customCourier" class="form-control form-control-sm" placeholder="input your courier" />
        </div>

        <button class="btn btn-primary" type="submit">update fbm shipment</button>
      </form>
    </main>

    <aside v-if="orders.length" class="clm">
      Choose orders:

      <label v-for="ord in orders">
        <input type="checkbox" :value="ord" v-model="cargos">
        {{ ord.description.expected }}
      </label><br>
    </aside>
  </div>
</main-layout>
</template>


<script>
  import fbmMixin from './mixin.js'


  export default {
    mixins: [fbmMixin],
  }
</script>

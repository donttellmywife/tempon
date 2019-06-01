<template>
<main-layout>
  <h2>ASSIST SHIPMENT</h2>
  <Loading v-if="isLoading" />
  <p v-if="error" class="error">{{ error }}</p>


  <div class="two-sides">
    <main class="clm">
      <form @submit.prevent="update">
        <h6>status: {{ shipment.status }}</h6>

        <div class="form-group">
          <label>Set priority: <select v-model="shipment.priority" class="form-control">
            <option v-for="option in possiblePriority" :value="option">
              {{ option }}
            </option>
          </select></label>
        </div>

        <div class="form-group">
          Deliver to: <br>
          <label>Recipient <br>
            <input v-model="shipment.deliverTo.recipient" class="form-control" placeholder="" type="text">
          </label><br>
          <label>Company <br>
            <input v-model="shipment.deliverTo.company" class="form-control" placeholder="" type="text">
          </label><br>
          <label>Address <br>
            <input v-for="line in shipment.deliverTo.address" v-model="line.line" class="form-control" placeholder="" type="text">
          </label><br>
          <label>City <br>
            <input v-model="shipment.deliverTo.city" class="form-control" placeholder="" type="text">
          </label><br>
          <label>State <br>
            <input v-model="shipment.deliverTo.state" class="form-control" placeholder="" type="text">
          </label><br>
          <label>Zip <br>
            <input v-model="shipment.deliverTo.zip" class="form-control" placeholder="" type="text">
          </label><br>
          <label>Country <br>
            <input v-model="shipment.deliverTo.country" class="form-control" placeholder="" type="text">
          </label><br>
          <label>Phone <br>
            <input v-model="shipment.deliverTo.phone" class="form-control" placeholder="" type="phone">
          </label><br>
          <label>Email <br>
            <input v-model="shipment.deliverTo.email" class="form-control" placeholder="" type="email">
          </label><br>
        </div>

        <div class="form-group">
          <label>describe contents <br>
            <input v-model="shipment.description" class="form-control" placeholder="starwars lego" type="text">
          </label><br>
        </div>

        <div v-for="ord in shipment.cargos" class="form-group">
          {{ ord.quantity }} of {{ ord._id }}<br>
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
          {{ cour }}<br></label>

          <input v-if="showCustomCourier" v-model="customCourier" class="form-control form-control-sm" placeholder="input your courier" />
        </div>

        <input v-if="shipment.status === 'todo'" v-model="shipment.tracking" class="form-control" placeholder="trakcing is" />
        <br>
        <button class="btn btn-primary" type="submit">assist fbm shipment</button>
      </form>
    </main>


    <aside v-if="orders.length" class="clm">
      SIDE BAR WITH POSSIBLE ORDERS

      <label v-for="ord in orders">
        {{ ord.description.expected }}
        <!-- <input type="checkbox" :value="ord" v-model="orders"> -->
      </label>
    </aside>
  </div>
</main-layout>
</template>


<script>
  import fbmMixin from './mixin.js'


  export default {
    mixins: [fbmMixin],

    data() {
      return {
        possiblePriority: ['', 'low', 'normal', 'high', 'urgent'],
      }
    },
  }
</script>

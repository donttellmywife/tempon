<template>
<li>
  <router-link v-if="shipment._id" :to="{ name: 'viewFBA', params: { sid: shipment._id }}">
    {{ shipment.description }}
  </router-link>
  <div>Created At: {{ formatDate(shipment.createdAt) }}</div>
  <div>
    <span>{{ shipment.status }}</span>
    <!-- <span>{{ shipment.description }}</span> -->
    <span>{{ shipment.fnsku }}</span>
  </div>

  <div>
    <li v-for="cargo in shipment.cargos">
      {{ cargo.quantity }}
    </li>
  </div>

  <div v-if="shipment.status === 'todo'">
    {{ description }}
    {{ fnsku }}
    {{ cargos }}
  </div>

  <div v-if="shipment.status === 'in progress'">
    {{ shipment.dimensions.depth }}
    {{ shipment.dimensions.height }}
    {{ shipment.dimensions.width }}
    {{ shipment.dimensions.weight }}

    <router-link
      v-if="$store.getters.user.role === 'client' && shipment._id"
      :to="{
        name: 'updateFBA',
        params: { sid: shipment._id },
      }">
      YOUR REVIEW NEEDED TO PROCEED
    </router-link>
  </div>

  <router-link
    v-if="$store.getters.user.role === 'client' && shipment.status === 'todo' && shipment._id"
    :to="{
      name: 'updateFBA',
      params: { sid: shipment._id },
    }">
    EDIT
  </router-link>

  <router-link
    v-if="$store.getters.user.role === 'assistant' && shipment._id"
    :to="{
      name: 'assistFBA',
      params: { sid: shipment._id },
    }">
    ASSIST
  </router-link>
</li>
</template>


<script>
  import { methodDate } from 'MIXIN'


  export default {
    props: ['shipment'],
    mixins: [methodDate],
  }
</script>

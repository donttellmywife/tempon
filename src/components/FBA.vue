<template>
<article :class="{
  'border-warning': shipment.status === 'todo',
  'border-success': shipment.status === 'shipped',
  'border-info': shipment.status === 'in progress' || shipment.status === 'ready'
  }" class="card mb-3">

  <div class="card-header">
    <h3 class="modal-title">
      <router-link v-if="shipment._id" :to="{ name: 'viewFBA', params: { sid: shipment._id }}">
        {{ shipment.description }}
      </router-link>
    </h3>
    <h6>status: {{ shipment.status }}</h6>
    <h6 v-if="shipment.user && shipment.user.name && $store.getters.user.role === 'assistant'">
      client: {{ shipment.user.name }}
    </h6>

    <div class="absolute-right">
      <button type="button" class="btn btn-link btn-sm">
        <router-link
          v-if="$store.getters.user.role === 'client' && shipment._id && shipment.status !== 'shipped'"
          :to="{
            name: 'updateFBA',
            params: { sid: shipment._id },
          }">
          {{ shipment.status === 'in progress' ? 'UPDATE NEEDED TO PROCEED' : 'EDIT' }}
        </router-link>

        <router-link
          v-if="$store.getters.user.role === 'assistant' && shipment._id"
          :to="{
            name: 'assistFBA',
            params: { sid: shipment._id },
          }">
          ASSIST
        </router-link>
      </button>
    </div>
  </div>

  <div  class="card-body card-body--2clm">
    <div>
      CARGOS
    </div>
    <div>
      <div v-for="cargo in shipment.cargos">
        {{ cargo.quantity }} of <router-link
          v-if="cargo._id"
          :to="{
            name: 'viewOrder',
            params: { oid: cargo._id },
          }">
          {{ cargo._id }}
        </router-link>
      </div>
    </div>
  </div>


  <div v-if="shipment.status === 'in progress'">
    <div class="card-body card-body--2clm">
      <div>
        Boxes
      </div>
      <div v-for="box in shipment.box">
        Description: {{ box.description }} <br>
        Length: {{ box.length }} <br>
        Width: {{ box.width }} <br>
        Height: {{ box.height }} <br>
        Weight: {{ box.weight }} <br>
      </div>
    </div>
  </div>

  <div class="card-body">
    FNSKU:
    <a v-for="fnsku in shipment.fnsku" :href="formatUrl(fnsku.url)">{{ fnsku.url }}</a>
  </div>

  <div class="card-body">
    SHIPPING LABELS:
    <a v-for="label in shipment.labels" :href="formatUrl(label.url)">{{ label.url }}</a>
  </div>

  <div class="card-footer text-muted">
    <small>created: {{ formatDate(shipment.createdAt) }}</small>
    <br>
    <small>updated: {{ formatDate(shipment.updatedAt) }}</small>
  </div>
</article>
</template>


<script>
  import { methodDate } from 'MIXIN'


  export default {
    props: ['shipment'],
    mixins: [methodDate],
  }
</script>

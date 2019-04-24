<template>
<article :class="{
  'border-warning': shipment.status === 'todo',
  'border-success': shipment.status === 'shipped',
  'border-info': shipment.status === 'in progress' || shipment.status === 'ready'
  }" class="card mb-3">

  <div class="card-header">
    <h3 class="modal-title">
      <router-link v-if="shipment._id" :to="{ name: 'viewFBM', params: { sid: shipment._id }}">
        {{ shipment.description }}
      </router-link>
    </h3>
    <h6>status: {{ shipment.status }}</h6>

    <div class="absolute-right">
      <button type="button" class="btn btn-link btn-sm">
        <router-link
          v-if="shipment._id && $store.getters.user.role === 'client' && shipment.status === 'todo'"
          :to="{ name: 'updateFBM', params: { sid: shipment._id }}">

          EDIT
        </router-link>

        <router-link
          v-if="shipment._id && $store.getters.user.role === 'assistant'"
          :to="{ name: 'assistFBM', params: { sid: shipment._id }}">

          ASSIST
        </router-link>
      </button>
    </div>
  </div>

  <div class="card-body card-body--2clm">
    <div>ADDRESS</div>
    <div>{{ shipment.address }}</div>
  </div>

  <div class="card-body card-body--2clm" v-if="shipment.status === 'shipped'">
    <div>TRACKING</div>
    <div>{{ shipment.tracking }}</div>
  </div>

  <div class="card-body card-body--2clm">
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

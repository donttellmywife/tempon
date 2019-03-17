<template>
<article>
  <div>Created At: {{ formatDate(cargo.createdAt) }}</div>
  STATUS: {{ cargo.status }} <br>
  <router-link :to="{ name: 'viewOrder', params: { oid: cargo._id }}">{{ cargo.description.expected }}</router-link>

  <div v-if="cargo.status !== 'todo'">
    <div v-bind:class="{ success: !cargo.description.actual, fail: cargo.description.actual }">
      You expecting:
      <span>{{ cargo.description.expected }}</span>
      <span v-if="cargo.description.actual">
        you know, actualy we've found there {{ cargo.description.actual }}
      </span>
    </div>

    <div v-bind:class="{ success: !cargo.quantity.actual, fail: cargo.quantity.actual }">

      Was in amount of:
      <b>{{ cargo.quantity.expected }}</b><br>

      <div v-if="cargo.status === 'done'">
        Left in amount of:
        <b>{{ cargo.quantity.left }}</b>
      </div>

      <span v-if="cargo.quantity.actual">
        but actualy we've found there <b>{{ cargo.quantity.actual }}</b>
      </span>
    </div>

    with tracking: {{ cargo.tracking }}<br>
    and labels: {{ cargo.labels }}<br>
  </div>



  <div v-if="cargo.status === 'todo'">
    <router-link :to="{ name: 'editOrder', params: { oid: cargo._id }}">EDIT</router-link>
    <button v-if="isEditMode" @click="exitViewMode">View</button>
    <button v-if="!isEditMode" @click="goEditMode">Edit</button>

    <div v-if="!isEditMode">
      <div>
        You expecting:
        <span>{{ description }}</span>
      </div>


      <div>
        In amount:
        <b>{{ quantity }}</b><br>
      </div>

      with tracking: {{ tracking.map(({ value }) => value) }}<br>
      and labels: {{ labels }}<br>
    </div>


    <form v-if="isEditMode" @submit.prevent="update">
      <label>what's in the box?<br>
        <input v-model="description" placeholder="description" type="text">
      </label>
      <br>

      <label>and how many?<br>
        <input v-model="quantity" placeholder="quantity" type="number">
      </label><br>

      <label>how to find it<br>
        <div v-for="track in tracking">
          <input v-model="track.value" placeholder="tracking" type="text">
        </div>
        <button @click="addEmptyTrack">add tracking</button>
      </label><br>

      <label>labels<br>
        <input v-model="labels" placeholder="link to gdocs" type="text">
      </label><br>

      <button type="submit">update my wish</button>
    </form>
  </div>
</article>
</template>


<script>
  import { methodDate } from 'MIXIN'
  import { orders } from 'API'

  // for array model iterations
  const makeValueObject = value => ({ value })

  export default {
    props: ['cargo'],
    mixins: [methodDate],


    data() {
      return {
        description: this.$props.cargo.description.expected || '',
        quantity: this.$props.cargo.quantity.expected || 0,
        tracking: this.$props.cargo.tracking.length
          ? this.$props.cargo.tracking.map(makeValueObject)
          : [''].map(makeValueObject),
        labels: this.$props.cargo.labels,
        link: `/orders/${this.$props.cargo._id}`,

        error: '',
        isEditMode: false,
        isLoading: false,
      }
    },


    methods: {
      goEditMode() {
        this.isEditMode = true
      },


      exitViewMode() {
        this.isEditMode = false
      },


      update() {
        this.isLoading = true
        this.error = ''

        const cargo = {
          ...this.$props.cargo,
          description: {
            expected: this.description,
          },
          quantity: {
            expected: this.quantity,
          },
          tracking: this.tracking.map(({ value }) => value).filter(track => track.length > 0),
          labels: this.labels,
        }

        orders.update(cargo)
          .catch(err => this.error = err)
          .then(() => {
            this.isLoading = false
            this.isEditMode = false
          })
      },


      addEmptyTrack(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        this.tracking = this.tracking.concat({
          value: '',
        })
      },


      removeTrack(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        // this.tracking = this.tracking.concat({
        //   value: '',
        // })
      }
    },
  }
</script>

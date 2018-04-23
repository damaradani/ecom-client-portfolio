<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-xs-6 col-md-3" v-for="(guitar, index) in guitars" :key="index">
        <div class="thumbnail">
          <img v-bind:src="guitar.imgUrl" v-bind:alt="guitar.name">
          <p class="nameItem"><strong>{{ guitar.name }}</strong></p>
          <p>IDR {{ addCommas(guitar.price) }}</p>
          <button class="btn btn-default" @click="addToCharts(guitar)">Add to Chart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'guitar',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'addToCharts'
    ]),
    addCommas: function (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    guitars () {
      return this.$store.getters.guitars
    }
  }
}
</script>

<style scoped>
.thumbnail {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.nameItem {
  height: 40px;
}
</style>

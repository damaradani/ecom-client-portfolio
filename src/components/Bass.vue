<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-xs-6 col-md-3" v-for="(bassG, index) in bass" :key="index">
        <div class="thumbnail">
          <img v-bind:src="bassG.imgUrl" v-bind:alt="bassG.name">
          <p class="nameItem"><strong>{{ bassG.name }}</strong></p>
          <p>IDR {{ addCommas(bassG.price) }}</p>
          <button class="btn btn-default" @click="addToCharts(bassG)">Add to Chart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'bass',
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
    bass () {
      return this.$store.getters.bass
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

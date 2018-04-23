<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-md-4 col-sm-6 col-xs-12" v-for="(drumset, index) in drumsets" :key="index">
        <div class="thumbnail">
          <img :src="drumset.imgUrl" :alt="drumset.name" class="responsive">
          <p><strong>{{ drumset.name }}</strong></p>
          <p>IDR {{ addCommas(drumset.price) }}</p>
          <button class="btn btn-default" @click="addToCharts(drumset)">Add to Chart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'drumset',
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
    drumsets () {
      return this.$store.getters.drumset
    }
  }
}
</script>

<style scoped>
.thumbnail {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.responsive {
  height: 70%;
  width: auto;
  max-height: 250px;
}
</style>

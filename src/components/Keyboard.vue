<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-md-4 col-sm-6 col-xs-12" v-for="(keyboard, index) in keyboards" :key="index">
        <div class="thumbnail">
          <img v-bind:src="keyboard.imgUrl" v-bind:alt="keyboard.name" class="responsive">
          <p><strong>{{ keyboard.name }}</strong></p>
          <p>IDR {{ addCommas(keyboard.price) }}</p>
          <button class="btn btn-default" @click="addToCharts(keyboard)">Add to Chart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'keyboard',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
      'addToCharts'
    ]),
    addCommas: function (price) {
      // console.log(price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  },
  computed: {
    keyboards () {
      return this.$store.getters.keyboards
    }
  }
}
</script>

<style scoped>
.thumbnail {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.responsive {
  height: 50%;
  width: auto;
  max-height: 250px;
}
</style>

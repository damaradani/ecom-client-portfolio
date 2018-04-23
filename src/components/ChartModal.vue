<template>
  <div class="modal fade" id="chartModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Chart</h4>
        </div>
        <div class="modal-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr class="text-center">
                  <th></th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody v-if="chartFix && chartFix.length" class="text-left">
                <tr v-for="(chartFix, index) in charts" :key="index">
                  <td><img v-bind:src="chartFix.imgUrl" v-bind:alt="chartFix.name" style="height:40px;"></td>
                  <td>{{ chartFix.name }}</td>
                  <td>{{ addCommas(chartFix.price) }}</td>
                  <td>
                    <span class="glyphicon glyphicon-minus-sign plusminus" @click="decrease(chartFix._id)" data-toggle="tooltip" title="Decrease Quantity" style="color:blue; cursor:pointer;">
                    </span>
                    {{ chartFix.total }}
                    <span class="glyphicon glyphicon-plus-sign plusminus" @click="increase(chartFix)" data-toggle="tooltip" title="Add Quantity" style="color:blue; cursor:pointer;">
                    </span>
                  <td>{{ addCommas(chartFix.totalPrice) }}</td>
                  <td>
                    <a href="#" @click="deleteItemCharts(chartFix._id)" data-toggle="tooltip" title="Delete!">
                      <span class="glyphicon glyphicon-trash">
                      </span>
                    </a>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td><strong>Grand Total</strong></td>
                  <td>{{ addCommas(grandTotal) }}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal-footer">
          <!-- <div style="background-color:#E6E6FA; width:50%;" class="text-left">Grand Total: {{ getGrandTotal }}</div> -->
          <button type="button" class="btn btn-default" @click="checkout">Checkout</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import swal from 'sweetalert'

export default {
  name: 'ChartModal',
  data () {
    return {
      charts: [],
      items: [],
      grandTotal: 0
    }
  },
  methods: {
    ...mapActions([
      'addToCharts',
      'deleteOneItem',
      'deleteChartItem'
    ]),
    deleteItemCharts: function (itemId) {
      swal({
        title: 'Are you sure?',
        text: `Do you really gonna delete this `,
        icon: 'warning',
        buttons: [true, 'yes Delete this']
      }).then(result => {
        if (result) {
          this.deleteChartItem(itemId)
        }
      })
    },
    addCommas: function (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    increase: function (item) {
      this.addToCharts(item)
    },
    decrease: function (item) {
      this.deleteOneItem(item)
    },
    getGrandTotal: function (items) {
      let grandtot = 0
      for (let key in items) {
        // console.log(items[key].totalPrice)
        grandtot += items[key].totalPrice
      }
      // console.log(grandtot)
      this.grandTotal = grandtot
    },
    checkout: function () {
      swal(
        'Thank You!',
        `Your Total Payment is IDR ${this.addCommas(this.grandTotal)}`,
        'success'
      ).then(result => {
        $('#chartModal').modal('toggle')
      })
    }
  },
  updated: function () {
    this.charts = this.$store.getters.chartFix
    this.getGrandTotal(this.chartFix)
  },
  created: function () {
    if (this.$store.getters.chartFix) {
      // console.log('chartFix ====>', this.$store.getters.chartFix)
      this.charts = this.$store.getters.chartFix
      // this.getGrandTotal(chartFix)
    }
    this.items = this.$store.state.items
  },
  computed: {
    ...mapGetters(['chartFix'])
  }
}
</script>

<style>

</style>

<template>
  <div class="container">
    <h2>Item List</h2>
    <div class="table-responsive">
      <table class="table text-left">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-if="items && items.length">
          <tr v-for="(item, index) in items" :key="index">
            <td>
              <img v-bind:src="item.imgUrl" v-bind:alt="item.name" style="height:40px;">
            </td>
            <td>{{ item.name }}</td>
            <td>{{ addCommas(item.price) }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.stock }}</td>
            <td>
              <a @click="setItem(item)" class="action" data-toggle="modal" data-target="#editModal">
                <span class="glyphicon glyphicon-edit">
                </span>
              </a> |
              <a @click="delItem(item._id)" class="action">
                <span class="glyphicon glyphicon-trash">
                </span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <edit-item-modal :item="editItem"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EditItemModal from '@/components/EditItemModal.vue'
import swal from 'sweetalert'

export default {
  name: 'listitem',
  components: {
    EditItemModal
  },
  data () {
    return {
      itemss: [],
      editItem: ''
    }
  },
  methods: {
    ...mapActions([
      'deleteItem'
    ]),
    addCommas: function (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    setItem: function (item) {
      this.editItem = {
        _id: item._id,
        name: item.name,
        price: item.price,
        imgUrl: item.imgUrl,
        category: item.category,
        stock: item.stock
      }
    },
    delItem: function (itemId) {
      swal({
        title: 'Are you sure?',
        text: `Do you really gonna delete this `,
        icon: 'warning',
        buttons: [true, 'yes Delete this']
      }).then(result => {
        if (result) {
          this.deleteItem(itemId)
        }
      })
    }
  },
  updated: function () {
    this.itemss = this.$store.state.items
  },
  mounted: function () {
    this.itemss = this.$store.state.items
  },
  computed: mapState([
    'items'
  ])
}
</script>

<style scoped>
.action:hover {
  cursor: pointer;
}
</style>

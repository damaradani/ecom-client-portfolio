<template>
  <div class="admin">
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="well well-sm">
            <form class="form-horizontal" action="#">
            <fieldset>
              <legend class="text-center">Add Instrument</legend>
              <!-- Name input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="name">Name</label>
                <div class="col-md-9">
                  <input id="name" v-model="name" type="text" placeholder="Brand Name" class="form-control" required>
                </div>
              </div>
              <!-- Price input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="price">Price</label>
                <div class="col-md-9">
                  <input id="price" v-model="price" type="number" placeholder="IDR Price" class="form-control" required>
                </div>
              </div>
              <!-- Img input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="image">Image</label>
                <div class="col-md-9">
                  <input id="image" ref="fileInput" name="image" type="file" class="form-control" accept="image/*" @change="handleUploadPicture" required>
                </div>
              </div>
              <!-- Category input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="category">Category</label>
                <div class="col-md-9">
                  <select v-model="category" class="form-control" id="category" required>
                    <option value="guitar">Guitar</option>
                    <option value="bass">Bass</option>
                    <option value="keyboard">Keyboard</option>
                    <option value="drumset">Drum Set</option>
                  </select>
                </div>
              </div>
              <!-- Stock input-->
              <div class="form-group">
                <label class="col-md-3 control-label" for="stock">Stock</label>
                <div class="col-md-9">
                  <input id="stock" v-model="stock" type="number" placeholder="IDR Price" class="form-control">
                </div>
              </div>
              <!-- Form actions -->
              <div class="form-group">
                <div class="col-md-12 text-right">
                  <button type="button" class="btn btn-primary btn-md" @click="addItem">Add Item</button>
                </div>
              </div>
            </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
    <ListItem />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ListItem from '@/components/ListItem.vue'
import swal from 'sweetalert'

export default {
  name: 'admin',
  components: {
    ListItem
  },
  data () {
    return {
      name: '',
      price: 0,
      image: '',
      category: '',
      stock: 0,
      roles: ''
    }
  },
  methods: {
    addItem: function () {
      let status = this.cekInput()
      let newItem = {
        name: this.name,
        price: this.price,
        image: this.image,
        category: this.category,
        stock: this.stock
      }
      if (status) {
        this.uploadImg(newItem)

        this.name = ''
        this.price = 0
        this.image = ''
        this.category = ''
        this.stock = 0
        const input = this.$refs.fileInput
        input.type = 'text'
        input.type = 'file'
      }
    },
    handleUploadPicture: function (event) {
      this.image = event.target.files[0]
    },
    cekInput: function () {
      if (this.name === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Name must be filled'
        })
        return false
      } else if (this.price === 0 || this.price === null) {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Price must be filled'
        })
        return false
      } else if (this.image === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Image must not empty'
        })
        return false
      } else if (this.category === '') {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Category must be choosen'
        })
        return false
      } else if (this.stock === 0 || this.stock === null) {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Stock minimal 1'
        })
        return false
      } else {
        return true
      }
    },
    ...mapActions([
      'uploadImg'
    ])
  },
  computed: mapState([
    'role'
  ]),
  updated: function () {
    this.roles = this.role
  },
  mounted: function () {
    this.roles = this.role
    if (this.role !== 'admin') {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>

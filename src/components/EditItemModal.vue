<template>
  <div class="modal fade" id="editModal" role="dialog" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Edit To Do</h4>
        </div>
        <div class="modal-body form-group">
          <label>Name :</label>
          <input type="text" v-model="item.name" class="form-control">
          <label>Price :</label>
          <input type="number" class="form-control" v-model="item.price">
          <label>Image :</label> <!-- nanti dulu bikin ribet -->
          <input name="image" type="file" class="form-control" accept="image/*" @change="handleUploadPicture">
          <label>Category :</label>
          <select v-model="item.category" class="form-control">
            <option value="guitar">Guitar</option>
            <option value="bass">Bass</option>
            <option value="keyboard">Keyboard</option>
            <option value="drumset">Drum Set</option>
          </select>
          <label>Stock</label>
          <input v-model="item.stock" type="number" placeholder="IDR Price" class="form-control">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" @click="saveEdit">Save Edit</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditItemModal',
  props: ['item'],
  data () {
    return {
      name: '',
      price: 0,
      image: '',
      category: '',
      stock: 0
    }
  },
  methods: {
    saveEdit: function () {
      let imgUrl = this.image
      if (this.image === '') {
        imgUrl = this.item.imgUrl
      }
      let editItem = {
        _id: this.item._id,
        name: this.item.name,
        price: this.item.price,
        imgUrl: imgUrl,
        category: this.item.category,
        stock: this.item.stock
      }
      this.$store.dispatch('uploadEditImg', editItem)
    },
    handleUploadPicture: function (event) {
      this.image = event.target.files[0]
    }
  }
}
</script>

<style>

</style>

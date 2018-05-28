<template>
  <!-- Modal Login -->
    <div class="modal fade" id="loginModal" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <form v-on:submit.prevent="login()">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Login</h4>
            </div>
            <div class="modal-body form-group">
              <label for="email">Email :</label>
              <input type="text" class="form-control" v-model="email" id="email">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="password" id="password">

            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-default" style="width:100%;" data-dimiss="modal">Login</button>
              <!--<button type="button" class="btn fb" @click=""> @click="login()"
                <i class="fa fa-facebook fa-fw"></i> Login with Facebook
              </button>-->
            </div>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import swal from 'sweetalert'
import axios from 'axios'

export default {
  name: 'LoginModal',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let email = this.email
      let password = this.password
      let url = this.$store.state.server + 'signin'

      axios.post(url, {email, password})
        .then(response => {
          if (response.data.message !== 'User Login Succesfully') {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'something wrong!'
            })
          } else {
            localStorage.setItem('token', response.data.token)
            this.$store.commit('setRole', response.data.user.role)
            this.$store.commit('setToken', response.data.token)
            this.$store.dispatch('getCharts')
            swal(
              'Good job!',
              'You log in successfully!',
              'success'
            ).then(next => {
              // eslint-disable-next-line
              $('#loginModal').modal('toggle')
              this.email = ''
              this.password = ''
            })
          }
        })
        .catch(() => {
          // console.log(err)
          swal({
            icon: 'error',
            title: 'Oops...',
            text: 'Email / Password is wrong'
          })
        })
    }
  }
}
</script>

<style>

</style>

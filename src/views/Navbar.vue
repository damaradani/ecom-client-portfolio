<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">MIS</a>
      </div>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="nav navbar-nav">
          <li><router-link to="/">Home</router-link></li>
          <li v-if="role === 'admin'"><router-link to="/admin">Admin Page</router-link></li>
          <!-- <li><a href="#">Products</a></li> -->
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="#" v-if="!role" data-toggle="modal" data-target="#loginModal">Login</a>
            <a href="#" v-else @click="logout">Logout</a>
          </li>
          <li><a href="#" v-if="!role" data-toggle="modal" data-target="#signUpModal"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
          <li><a href="#" data-toggle="modal" data-target="#chartModal" ><span class="glyphicon glyphicon-shopping-cart"></span> Cart</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import swal from 'sweetalert'

export default {
  name: 'navbar',
  methods: {
    logout: function () {
      swal({
        title: 'Are you sure?',
        icon: 'warning',
        buttons: [true, 'Yes, Log out!']
      }).then(result => {
        if (result) {
          localStorage.removeItem('token')
          this.$store.commit('setRole', '')
          this.$store.commit('setToken', '')
          swal(
            'Log out!',
            'You have been log out.',
            'success'
          ).then(result => {
            this.$router.push('/')
          })
        }
      })
    }
  },
  computed: mapState([
    'role'
  ])
}
</script>

<style>
.navbar-brand {
  font-family: 'Fjalla One', sans-serif;
  font-size: 2em;
}
</style>

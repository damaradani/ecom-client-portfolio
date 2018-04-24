<template>
  <div id="app">
    <navbar />
    <login-modal />
    <SignUpModal />
    <ChartModal />
    <div class="jumbotron">
      <div class="container text-center">
        <h1>Music Instruments Store</h1>
        <h3>Pick your own Instrument</h3>
      </div>
    </div>
    <Category v-if="role !== 'admin'"/>
    <router-view/>

    <footer v-if="role !== 'admin'" class="container-fluid text-center">
      <p>
        Category Icon Designed By
        <a href="https://www.flaticon.com/authors/freepik">Freepik</a>
        from Flaticon
      </p>
    </footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import navbar from '@/views/Navbar.vue'
import LoginModal from '@/components/LoginModal.vue'
import SignUpModal from '@/components/SignUpModal.vue'
import ChartModal from '@/components/ChartModal.vue'
import Category from '@/views/Category.vue'

export default {
  name: 'app',
  data () {
    return {
      charts: null
    }
  },
  components: {
    navbar,
    LoginModal,
    SignUpModal,
    ChartModal,
    Category
  },
  updated: function () {
    this.charts = this.$store.getters.chartFix
  },
  created: function () {
    let token = localStorage.getItem('token') || ''
    this.$store.dispatch('cekToken', token)
    this.$store.dispatch('getItems')
    this.charts = this.$store.getters.chartFix

    if (this.role === 'admin') {
      this.$router.push('/admin')
    }
  },
  computed: mapState([
    'role'
  ])
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Remove the navbar's default rounded borders and increase the bottom margin */
.navbar {
  /* margin-bottom: 50px; */
  border-radius: 0;
}

.jumbotron {
  margin-top: -20px;
  background-image: url("assets/img/Gibson-Les-Paul-l.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  font-family: 'Fjalla One', sans-serif;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

footer {
  height: 70px;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}
</style>

<template>
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark justify-content-between" style="background-color: black;">
      <!-- Brand/logo -->
      <a class="navbar-brand" @click="goToHome" style="font-size: 1.5rem; color:white;">RAZER</a>
      
      <!-- Links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" style="color: white" @click="goToCart"><i class="fas fa-shopping-basket fa-2x"></i></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" style="color: white" data-toggle="modal" data-target="#signinModal" v-if="!isLogin"><i class="fas fa-user fa-2x"></i></a>
          <a class="nav-link" style="color: white; font-weight: bold" v-if="isLogin" @click="signout">Sign Out</a>
        </li>
      </ul>
    </nav>

    <!-- SIGNIN MODALS -->
    <div class="modal fade" id="signinModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" style="margin-left: 1%">SignIn</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <form @submit.prevent="signin">
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" v-model="user.email">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" v-model="user.password">
                            <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">SignIn</button>
                        </div>
                    </form>
                    <div>
                        <a data-toggle="modal" data-target="#signupModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignUp</a>
                        <a class="default" style="float: right; margin-right: 1%;">Don't have any account?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SIGNUP MODALS -->
    <div class="modal fade" id="signupModal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" style="margin-left: 1%">SignUp</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <!-- Modal body -->
                <div class="modal-body">
                    <form @submit.prevent="signup">
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="name">Name:</label>
                            <input type="name" class="form-control" v-model="newUser.name">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="email">Email:</label>
                            <input type="email" class="form-control" v-model="newUser.email">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="password">Password:</label>
                            <input type="password" class="form-control" v-model="newUser.password">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="address">Address:</label>
                            <input type="text" class="form-control" v-model="newUser.address">
                        </div>
                        <div class="form-group" style="margin-left:1%; margin-right: 1%;">
                            <label for="balance">Balance:</label>
                            <input type="number" class="form-control" style="width: 100%" v-model="newUser.balance">
                            <button class="btn btn-dark" type="submit" style="margin-top: 3%; width: 100%; background-color: black;">SignUp</button>
                        </div>
                    </form>
                    <div>
                        <a data-toggle="modal" data-target="#signinModal" data-dismiss="modal" class="pointer" style="float: right; margin-right: 1%; color: blue">SignIn</a><a class="default" style="float: right; margin-right: 1%;">Have any account?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <router-view/>

    <div class="footer">
      <h5 style="margin-top: 1.2%;">&copy;2019 - <strong>Elia Victor</strong></h5>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      isLogin: false,
      baseUrl: 'http://localhost:3000',
      user: {
        email: '',
        password: ''
      },
      newUser: {
        name: '',
        email: '',
        password: '',
        address: '',
        balance: ''
      }
    }
  },
  created: function() {
    this.checkLogin()
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    },
    goToCart() {
      this.$router.push('/cart')
    },
    checkLogin() {
      if (localStorage.getItem('token')) this.isLogin = true
    },
    signin() {
      let obj = {
        email: this.user.email,
        password: this.user.password
      }
      axios({
          method: "POST",
          url: `${this.baseUrl}/users/signin`,
          data: obj
      })      
      .then(({data}) => {
        if (data.email === 'admin@mail.com') {
          localStorage.setItem('admin', true)
          this.$router.push('/admin')
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('userId', data.userId)
        this.isLogin = true
        this.user.email = ''
        this.user.password = ''
        Swal.fire({
          title: `Welcome back ${localStorage.getItem('name')}!`,
          type: 'success'
        })
      })
      .catch(err => {
        console.log(err)
        Swal.fire({
          title: 'Failed to signin!',
          text: `${err.message}`,
          type: 'error',
          confirmButtonText: 'Ok'
        })
      }) 
    },
    signup() {
      let obj = {
        name: this.newUser.name,
        email: this.newUser.email,
        password: this.newUser.password,
        address: this.newUser.address,
        balance: this.newUser.balance
      }
      // console.log(obj,'ini obj register')
      axios({
          method: "POST",
          url: `${this.baseUrl}/users/signup`,
          data: obj,
      })   
      .then(({data}) => {
          console.log(data)
          Swal.fire({
            title: `Success signup with email ${obj.email}!`,
            type: 'success'
          })   
      })
      .catch(err => {
          console.log(err)
          Swal.fire({
            title: 'Failed to signup!',
            text: `${err.message}`,
            type: 'error',
            confirmButtonText: 'Ok'
          })
      })
    },
    signout() {
      Swal.fire({
          title: 'Are you sure?',
          text: "We will miss you!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#343A40',
          cancelButtonColor: '#C82333',
          confirmButtonText: 'Yes, signout!'
      })
      .then((result) => {
          if (result.value) {
              localStorage.clear()
              this.isLogin = false
              this.$router.push('/')
          }
      })
    }
  },
}
</script>

<style>
.footer {
   position: fixed;
   left: 0;
   bottom: 0;
   height: 50px;
   width: 100%;
   background-color: black;
   color: white;
   text-align: center;
}
</style>
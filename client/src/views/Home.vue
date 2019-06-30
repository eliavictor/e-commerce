<template>
  <div style="background-color: white;">
    <v-parallax height="800" src="https://steamuserimages-a.akamaihd.net/ugc/80340029164328471/02367390B1542558E5E7C59E4EF94E896B67FCD8/"> 
    <v-layout align-center column>
      <h1 class="display-2 font-weight-thin mb-3">RAZER</h1>
      <h4 class="subheading">See more our products <a class="pointer" style="text-decoration: underline" @click="goToProduct">here!</a></h4>
    </v-layout></v-parallax>
    <h2 style="color: black; margin-left: 3.5%; margin-top: 2%"> Hot Products : </h2>
    <v-layout style="margin-top: 1%; margin-bottom: 8%;" row align-center justify-space-around fill-height>
      <card style="background-color: black; color: white" v-for="(product, index) in this.$store.state.hotProducts" :key="index" :data="product" v-bind:addCart="addToCart"/>
    </v-layout>
  </div>
</template>

<script>
  import card from "../components/Card"
  import axios from "axios"
  export default {
    name: 'Home',
    data() {
      return{
        hotProducts: []
      }
    },
    components: {
      card
    },
    created(){
      this.$store.state.hotProducts = []
      this.$store.dispatch('retrieveProduct')
    },
    methods: {
      goToProduct() {
        this.$router.push('/products')
      },
      addToCart(id) {
        // MAX AMOUNT
          let products = this.$store.state.hotProducts
          let maxAmount = 0
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === id) {
              maxAmount = products[i].stock
            }
          }
        // FIND TRANSACTION BY PRODUCT ID
          axios({
              method: "GET",
              url: `http://localhost:3000/transactions/product/${id}`,
              headers: {
                  "token" : localStorage.getItem('token'),
              }
          })            
          .then(({data}) => {
            if (data) {
              let obj = {
                userId: localStorage.getItem('token'),
                idProduct: id,
                amount: data.amount + 1,
                status: false 
              }
              // AMOUNT <= MAXAMOUNT
                if (obj.amount <= maxAmount) {
                  // EDIT TRANSACTION
                    axios({
                      method: "PUT",
                      url: `http://localhost:3000/transactions/${data._id}`,
                      data: obj,
                      headers: {
                        "token" : localStorage.getItem('token'),
                      }
                    })
                    .then(product => {
                      Swal.fire({
                        title: 'Success add to cart!',
                        type: 'success'
                      }) 
                    })
                    .catch(err => {
                      console.log('ini error create', err)
                    })
                } else {
                  Swal.fire({
                    title: 'Maximum stock reached!',
                    type: 'error',
                    confirmButtonText: 'Ok'
                  })
                }
            } else {
              // CREATE TRANSACTION
                let newObj = {
                  userId: localStorage.getItem('userId'),
                  idProduct: id,
                  amount: 1,
                  status: false 
                }
                axios({
                  method: "POST",
                  url: `http://localhost:3000/transactions`,
                  data: newObj,
                  headers: {
                      "token" : localStorage.getItem('token'),
                  }
                })
                .then(product => {
                  Swal.fire({
                    title: 'Success add to cart!',
                    type: 'success'
                  }) 
                })
                .catch(err => {
                  console.log('ini error create', err)
                })
            }
          })
          .catch(err => {
            console.log(err)
            Swal.fire({
                title: 'Failed to find product!',
                text: `${err.message}`,
                type: 'error',
                confirmButtonText: 'Ok'
            })
          })
      }
    }
  }
</script>

<style>
  .pointer {cursor: pointer;}
</style>

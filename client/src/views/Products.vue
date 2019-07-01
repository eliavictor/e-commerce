<template>
  <div style="background-color: white; margin-bottom: 3%">
    <h2 style="color: black; margin-left: 3.5%; margin-top: 2%"> Our Products : </h2>
    <div class="container" style="max-height: 650px; overflow: auto;">
      <v-layout class="d-flex flex-wrap" row align-center justify-space-around fill-height>
        <card style="background-color: black; color: white; margin: 1%; max-width: 300px;" v-for="(product, index) in this.$store.state.products" :key="index" :data="product" v-bind:addCart="addToCart"> </card>
      </v-layout>
    </div>
  </div>
</template>

<script>
  import card from "../components/Card"
  import axios from "axios"
  export default {
    name: 'Products',
    components: {
      card
    },
    created() {
      this.$store.dispatch('retrieveProduct')
    },
    methods: {
      addToCart(id) {
        if (localStorage.getItem('token')) {
          // MAX AMOUNT
          let products = this.$store.state.products
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
        } else {
          Swal.fire({
            title: 'Signin first for add product to cart!',
            type: 'error',
            confirmButtonText: 'Ok'
          })
        }
      }
    }
  }
</script>

<style>
</style>

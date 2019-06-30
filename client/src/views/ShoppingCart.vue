<template>
  <div style="background-color: white;">
    <div v-show="isLogin">
      <h2 style="color: black; margin-left: 3.5%; margin-top: 2%"> Your Cart : </h2>
      <div class="container" style="max-height: 600px; overflow: auto;">
        <v-layout style="margin: 1%;" row align-center v-for="(product, index) in cart" :key="index">
            <cart :data="product" :minAmount="minAmount" :addAmount="addAmount" :remove="remove"/>
        </v-layout>
      </div>
    </div>
    <div v-show="!isLogin">
      <h1>You must login to see cart</h1>
    </div>
  </div>
</template>

<script>
import cart from "../components/Cart"
import axios from "axios"
export default {
    name: 'ShoppingCart',
    data() {
      return {
        isLogin: localStorage.getItem('token'),
        cartDetail: {},
        cart: []
      }
    },
    created() {
      this.$store.dispatch('retrieveProduct')
      this.retrieveCart()
    },
    components: {
      cart
    },
    methods: {
      retrieveCart() {
        let id = localStorage.getItem('userId')
        axios({
          method: "GET",
          url: `http://localhost:3000/transactions/user/${id}`,
          headers: {
              "token" : localStorage.getItem('token'),
          }
        })
        .then(({data}) => {
          let products = this.$store.state.products
          for (let j = 0; j < products.length; j++) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].productId === products[j]._id) {
                // this.cartDetail = {...data[i], ...products[j]}
                this.cartDetail = {
                  userId: data[i].userId,
                  transactionId: data[i]._id,
                  productId: products[j]._id,
                  img: products[j].img,
                  productName: products[j].name,
                  amount: data[i].amount,
                  totalPrice: data[i].amount * products[j].price,
                  maxAmount: products[j].stock
                }
                this.cart.push(this.cartDetail)
              }
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
      },
      minAmount(data) {
        let obj = {
          userId: localStorage.getItem('token'),
          idProduct: data.productId,
          amount: data.amount - 1,
          status: false 
        }
        if (obj.amount != 0) {
          axios({
            method: "PUT",
            url: `http://localhost:3000/transactions/${data.transactionId}`,
            data: obj,
            headers: {
                "token" : localStorage.getItem('token'),
            }
          })
          .then(product => {
            this.cart = []
            this.retrieveCart()
          })
          .catch(err => {
            console.log('ini error create', err)
          })
        } else {
          this.remove(data.transactionId)
        }
      },
      addAmount(data) {
        let obj = {
          userId: localStorage.getItem('token'),
          idProduct: data.productId,
          amount: data.amount + 1,
          status: false 
        }
        if (obj.amount <= data.maxAmount) {
          axios({
            method: "PUT",
            url: `http://localhost:3000/transactions/${data.transactionId}`,
            data: obj,
            headers: {
                "token" : localStorage.getItem('token'),
            }
          })
          .then(product => {
            this.cart = []
            this.retrieveCart()
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
      },
      remove(id) {
        Swal.fire({
          title: 'Are you sure to delete product from cart?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#343A40',
          cancelButtonColor: '#C82333',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.value) {
            axios({
              method: "DELETE",
              url: `http://localhost:3000/transactions/${id}`,
              headers: {
                "token" : localStorage.getItem('token'),
              }
            })
            .then(product => {
              Swal.fire({
                title: 'Success delete from cart!',
                type: 'success'
              }) 
              this.cart = []
              this.retrieveCart()
            })
            .catch(err => {
              console.log('ini error create', err)
            })
          }
        })
      }
    }
  }
</script>

<style>
.pointer {cursor: pointer;}
</style>

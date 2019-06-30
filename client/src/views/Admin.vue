<template>
    <div>
        <div v-show="admin">
            <div class="row">
                <!-- ADD PRODUCT -->
                <div class="col-6" style="border: solid 1px black;" v-if="editClicked === false">
                    <h2 style="margin: 2%" >Add Product </h2>                     
                    <div class="col-12 collapse show" style="color: #343A40;">
                        <form @submit.prevent="addProduct">
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="img">Image:</label>
                                <div class="custom-file col-9">
                                    <input type="file" class="custom-file-input" v-on:change="getDataImage">
                                    <label class="custom-file-label" for="customFile" style="text-align: left;">Choose file</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="name">Name:</label>
                                <input type="text" class="col-9 form-control" v-model="product.name">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="description">Description:</label>
                                <input type="text" class="col-9 form-control" v-model="product.description">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="price">Price:</label>
                                <input type="number" class="col-9 form-control" v-model="product.price">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="stock">Stock:</label>
                                <input type="number" class="col-9 form-control" v-model="product.stock">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="hotProducts">Hot Products:</label>
                                <input class="col-1" style="margin-top: 1.5%;" type="checkbox" name="hotProducts" value="true" v-model="product.hotProducts">
                                <p class="col-8" style="margin-top:0.5%; margin-left:-5%">*Check to show this product in Hot Products section</p>
                                <button class="btn btn-dark" type="submit" style="margin-top: 3%; margin-left: 6%; width: 100%;">Add Product</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- EDIT PRODUCT -->
                <div class="col-6" style="border: solid 1px black;" v-if="editClicked === true">         
                    <h2 style="margin: 2%">Edit Product </h2>            
                    <div class="col-12 collapse show" style="color: #343A40;">
                        <form @submit.prevent="submitEdit(product._id)">
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="img">Image:</label>
                                <div class="custom-file col-9">
                                    <input type="file" class="custom-file-input" v-on:change="getDataImage">
                                    <label class="custom-file-label" for="customFile" style="text-align: left;">Choose file</label>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="name">Name:</label>
                                <input type="text" class="col-9 form-control" v-model="product.name">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="description">Description:</label>
                                <input type="text" class="col-9 form-control" v-model="product.description">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="price">Price:</label>
                                <input type="number" class="col-9 form-control" v-model="product.price">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="stock">Stock:</label>
                                <input type="number" class="col-9 form-control" v-model="product.stock">
                            </div>
                            <div class="form-group row">
                                <label class="col-3" style="margin-top: 1%" for="hotProducts">Hot Products:</label>
                                <input class="col-1" style="margin-top: 1.5%;" type="checkbox" v-model="product.hotProducts" v-if="product.hotProducts === false">
                                <input class="col-1" style="margin-top: 1.5%;" type="checkbox" v-model="product.hotProducts" v-if="product.hotProducts === true" checked>
                                <p class="col-8" style="margin-top:0.5%; margin-left:-5%">*Check to show this product in Hot Products section</p>
                                <button class="btn btn-dark" type="submit" style="margin-top: 3%; margin-left: 6%; width: 100%;">Edit Product</button>
                            </div>
                        </form>
                        <button class="btn btn-dark" style="margin-left: 3%; width: 100%;" @click="gotoAdd">Add New Product</button>
                    </div>
                </div>
                <!-- PRODUCT LIST -->
                <div class="col-6" style="border: solid 1px black;">
                    <h2>Product List</h2>
                    <form>
                        <input type="text" class="form-control" placeholder="Search Product Here" style="width:80%">
                    </form>
                    <div class="row" style="max-height: 300px; overflow: auto; margin-top: 2%;">
                        <v-layout style="margin: 1%;" class="col-10" row align-center v-for="(product, index) in this.$store.state.products" :key="index">
                            <cartAdmin :data="product" v-bind:edit="editProduct" v-bind:remove="deleteProduct"/>
                        </v-layout>
                    </div>
                </div>
            </div>
            <!-- Transaction List -->
            <!-- <div class="row">
                <div class="col-12" style="border: solid 1px black;">
                    <h2 style="margin-left: 1%">Transaction List</h2> 
                    <cart/>
                </div>
            </div> -->
        </div>
        <div v-show="!admin">
            <h1>You are not admin</h1>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cartAdmin from "../components/CartAdmin"
import cart from "../components/Cart"
import store from "../store"
export default {
    name: 'Admin',
    data() {
        return {
            editClicked: false,
            admin: localStorage.getItem('admin'),
            product: {
                img: '',
                name: '',
                description: '',
                price: 0,
                stock: 0,
                hotProducts: false
            },
            baseUrl: 'http://localhost:3000',
        }
    },
    components: {
      cartAdmin,
      cart
    },
    created() {
        this.$store.dispatch('retrieveProduct')
    },
    methods: {
        retrieveProduct() {
            this.$store.dispatch('retrieveProduct')
        },
        gotoAdd() {
            this.product.img = '',
            this.product.name = '',
            this.product.description = '',
            this.product.price = 0,
            this.product.stock = 0,
            this.product.hotProducts = false
            this.editClicked = false
            console.log(this.product, this.editClicked);
        },
        getDataImage(event) {
            this.product.img = event.target.files[0]  
        },
        addProduct() {
            let formData = new FormData()
            formData.append('file', this.product.img)
            formData.append('name', this.product.name)
            formData.append('description', this.product.description)
            formData.append('price', this.product.price)
            formData.append('stock', this.product.stock)
            formData.append('hotProducts', this.product.hotProducts)
            // console.log(formData, 'ini form data')
            axios({
                method: "POST",
                url: `http://localhost:3000/products`,
                data: formData,
                headers: {
                    "token" : localStorage.getItem('token'),
                }
            })            
            .then(({data}) => {
                this.$store.state.products = []
                this.retrieveProduct()
                this.product.img = ""
                this.product.name = ""
                this.product.description = ""  
                this.product.price = ""
                this.product.stock = ""
                this.product.hotProducts = false
                Swal.fire({
                    title: 'Success create new product!',
                    type: 'success'
                }) 
            })
            .catch(err => {
                console.log(err)
                Swal.fire({
                    title: 'Failed to create new product!',
                    text: `${err.message}`,
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            })
        },
        editProduct(product) {
            this.editClicked = true
            this.product = product
        },
        submitEdit(id) {
            let obj = {
                img: this.product.img,
                name: this.product.name,
                description: this.product.description,
                price: this.product.price,
                stock: this.product.stock,
                hotProducts: this.product.hotProducts,
            }
            Swal.fire({
                title: 'Are you sure edit product?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, edit it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: "PUT",
                        url: `http://localhost:3000/products/${id}`,
                        data: obj,
                        headers: {
                            "token" : localStorage.getItem('token')
                        }
                    })            
                    .then(({data}) => {
                        this.$store.state.products = []
                        this.$store.dispatch('retrieveProduct')
                        Swal.fire({
                            title: 'Success edit product!',
                            type: 'success'
                        })   
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'Failed to edit product!',
                            text: `${err.message}`,
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                    })
                }
            })
        },
        deleteProduct(id) {
            Swal.fire({
                title: 'Are you sure to delete product?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#343A40',
                cancelButtonColor: '#C82333',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: "DELETE",
                        url: `http://localhost:3000/products/${id}`,
                        headers: {
                            "token" : localStorage.getItem('token'),
                        }
                    })            
                    .then(({data}) => {
                        this.$store.state.products = []
                        this.retrieveProduct()
                        Swal.fire(
                            'Deleted!',
                            'Your Product has been deleted.',
                            'success'
                        )
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            title: 'Failed to delete article!',
                            text: `${err.message}`,
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                    })
                }
            })
        }
    }
}
</script>

<style>

</style>

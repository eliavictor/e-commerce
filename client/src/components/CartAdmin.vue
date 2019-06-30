<template>
    <div class="card text-white" style="width: 100%; background-color: black;">
        <div class="card-body row text-center">
        <div class="col-4">
            <img :src=data.img alt="Product image" style="width:30px; height: 30px; object-fit: cover; border: solid 1px white;">
            <h6 style="float: right; margin-top: 8%;"> {{data.name}} </h6>
        </div>
        <div class="col-3">
            <h6 style="margin-top: 10%"> Stock : {{data.stock}}</h6>
        </div>
        <h6 class="col-3" style="margin-top: 2.5%;"> Price: {{data.price}} </h6>
        <h6 class="col-1 pointer" style="margin-top: 2.5%;" @click='edit(data)'> <i class="fas fa-edit fa-1x"/> </h6>
        <h6 class="col-1 pointer" style="margin-top: 2.5%;" @click='remove(data._id)'> <i class="fas fa-trash fa-1x"/> </h6>
        </div>
    </div>
</template>

<script>
export default {
    name: "cartAdmin",
    props: {
    edit: Function,
    remove: Function,
    data: Object
  }
}
</script>

<style>

</style>

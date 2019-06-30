<template>
    <div class="card text-white" style="width: 100%; background-color: black;">
        <div class="card-body row text-center">
        <div class="col-6 row">
            <div class="col-1"></div>
            <img class="col-3" :src=data.img alt="Product image" style="max-width:80px; max-height: 80px; object-fit: cover; border: solid 1px white; margin-left: 1%;">
            <h3 class="col-8" style="float: right; margin-top: 3%;"> {{data.productName}} </h3>
        </div>
        <div class="col-2">
            <h3> Quantity </h3>
            <div class="row">
                <a class="col-4 pointer" style="margin-top: 4%;" @click="minAmount(data)"><i class="fas fa-minus fa-1x"/></a>
                <h4 style="display: inline-block; border: solid 1px white; padding: 5px; padding-left: 15px; padding-right: 15px;"> {{data.amount}} </h4>
                <a class="col-4 pointer" style="margin-top: 4%;" @click="addAmount(data)"><i class="fas fa-plus fa-1x"/></a>
            </div>
        </div>
        <div class="col-3">
            <h3 style="margin-top: 2%;"> Total Price </h3>
            <h4>{{data.totalPrice}}</h4>
        </div>
        <h3 class="col-1 pointer" style="margin-top: 2.5%;" @click="remove(data.transactionId)"> <i class="fas fa-trash fa-1x"/> </h3>
        </div>
    </div>
</template>

<script>
export default {
    name:"Cart",
    props: {
        data: Object,
        addAmount: Function,
        minAmount: Function,
        remove: Function
    }
}
</script>

<style>
    .pointer {cursor: pointer;}
</style>

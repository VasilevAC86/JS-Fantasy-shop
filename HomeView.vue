<template>
  <Filter />
  <div v-for="product of productStore.productList" v-bind:key="product.id">{{ product.name }}</div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';
import {useProductStore} from '../stores/productStore.ts';
import Filter from '../components/Filter.vue';

const productStore = useProductStore();

onMounted(() => {
  productStore.load();
})
</script>
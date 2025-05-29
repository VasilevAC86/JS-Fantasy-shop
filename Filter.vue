<template>
    <div>
        <select v-model="type">
            <option>всё</option>
            <option>оружие</option>
            <option>броня</option>
            <option>артефакт</option>
            <option>зелье</option>
            <option>магический предмет</option>
        </select>
    </div>
    <div>
        <input v-model="maxPrice" type="number" placeholder="Максимальная цена"/><button v-on:click="setMaxPrice">Отфильтровать</button>
    </div>
    <div>
        <input v-model="inStock" type="checkbox"> - показывать товары только в наличии
    </div>
    <div>
        
    </div>
</template>

<script setup lang="ts">
    import {computed, ref} from 'vue';
    import {useProductStore} from '../stores/productStore.ts';

    const maxPrice:Ref = ref('');

    const productStore = useProductStore();

    function setMaxPrice() {
        if(!maxPrice || maxPrice < 0){ // если пустая сторка в input или 0, то
            productStore.removeFilter('maxPrice'); // сбрасываем фильтр
        }
        productStore.addFilter('maxPrice', maxPrice);
    }

    const inStock = computed({
        get(){ // проверяем выбран ли фильтр (нажата ли галочка)
            if(productStore.filters.inStock){
                return true;
            }
            return false;
        },
        set(){
            if(productStore.filters.inStock){
                productStore.removeFilter('inStock');
                return;
            }
            productStore.addFilter('inStock', true);
        }
    })

    const type = computed({
        get(){
            if(!productStore.filters.type) {
                return 'всё';    // показать все товары, т.е. выключить фильтры             
            }
            return productStore.filters.type
        },
        set(v){
            if(v == 'всё') {
                productStore.removeFilter('type');
                return;
            }
            productStore.addFilter('type', v);
        }
    })
</script>

<style>

</style>
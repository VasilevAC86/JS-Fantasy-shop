import { defineStore } from "pinia"; // импортируем хранилице из pinia
import {ref, computed, type Ref} from 'vue'; // импортируем ref для возможности работы состояния хранилища

export const useProductStore = defineStore('productStore', () => {
    // состояние хранилища, определяется переменными
    const productList:Ref = ref([]);
    const filters:Ref = ref({}); // чтобы запрашивать конкретные товары
    // геттеры

    // функции-экшены
    function addFilter(key:string, value:string):void {  // метод, который добавляет фильтр
        filters.value[key] = value;
        load();
    }
    function removeFilter(key:string) { // Функция снятия фильтра
        delete filters.value[key];
        load();
    }
    function clearFilters() { // Очистить все фильтры
        filters.value = {};
        load();
    }
    function load() { // Ф. для получения товаров
        const baseUrl = '/api/products';
        let url = baseUrl + '?';
        if (filters.value.type) {
            url += `type=${filters.value.type}&`
        }
        if(filters.value.maxPrice) {
            url += `maxPrice=${filters.value.maxPrice}&`
        }
        if(filters.value.manufacturer) {
            url += `manufacturer=${filters.value.manufacturer}&`
        }
        if(filters.value.inStock) {
            url += `inStock=${filters.value.inStock}`
        }
        return fetch(url).then((response:Response) => { // метод, который отправляет запрос, подписываемся на него
            return response.json();
        }).then((value) => {
            productList.value = value;
        })
    }

    return {productList, filters, addFilter, removeFilter, clearFilters, load}
});
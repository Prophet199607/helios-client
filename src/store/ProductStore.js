import {defineStore} from "pinia";
import {ref} from "vue";
import api from "../plugins/axios.js";

export const useProductStore = defineStore('productStore', () => {
    const products = ref([])

    const loadProducts = (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data} = await api.post('/Common/SearchProducts', {
                    "loca": localStorage.getItem("loca"),
                    "code": "",
                    "name": query
                });

                products.value = data;
                resolve(data)
            } catch (e) {
                products.value = [];
                reject(e)
            }
        })
    };

    const loadProductDetails = (payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data} = await api.post("/Common/GetSingleProduct", payload);

                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    };

    return {loadProducts, loadProductDetails, products};
})
import {defineStore} from "pinia";
import {ref} from "vue";
import api from "../plugins/axios.js";

export const useCustomerStore = defineStore('customerStore', () => {
    const customers = ref([])
    const banks = ref([])

    const loadCustomers = (query) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data} = await api.post('/Common/GetCustomers', {
                    "loca": localStorage.getItem("loca"),
                    "custCode": "",
                    "custName": query
                });

                customers.value = data;
                resolve(data)
            } catch (e) {
                customers.value = [];
                reject(e)
            }
        })
    };

    const loadCustomerOutstandingAmount = (payload) => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data} = await api.get(`/Common/GetCustomerOutstanding/${payload.loca}/${payload.cust_code}/${payload.ref_code}`);

                resolve(data)
            } catch (e) {
                reject(e)
            }
        })
    };

    const loadBanks = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const {data} = await api.get('/Common/GetAllBanks');

                banks.value = data.Banks;
                resolve()
            } catch (e) {
                reject(e)
            }
        })
    };

    return {loadCustomers, loadBanks, loadCustomerOutstandingAmount, customers, banks};
})
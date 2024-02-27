import {defineStore} from "pinia";
import api from "../plugins/axios.js";
import {ref} from "vue";
import usePrint from "../composables/usePrint.js";
const { printReceipt } = usePrint()

export const useCollectionStore = defineStore('collectionStore', () => {
    const collections = ref([])
    const saveCollection = (payload) => {
        return new Promise((resolve, reject) => {
            api.post('/Order/SavePaymentCollections', payload).then(({data}) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    const getCreatedCollections = (payload) => {
        return new Promise((resolve, reject) => {
            api.get(`/Order/GetTransactionListbyDateRange/${payload.start_date}/${payload.end_date}
            /${payload.ref_code}/OPMT/${payload.loca}`).then(({data}) => {
                collections.value = data.transactions;
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    const printCollectionDetails = (payload, is_duplicate = false) => {
        return new Promise((resolve, reject) => {
            api.get(`/Order/GetOrderDetailsDocNoWise/${payload.doc_no}/OPMT/${payload.loca}`).then(({data}) => {
                printReceipt(data, is_duplicate)
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    return {saveCollection, getCreatedCollections, printCollectionDetails, collections};
})
import {defineStore} from "pinia";
import api from "../plugins/axios.js";
import {ref} from "vue";
import axios from 'axios';

export const usePatientStore = defineStore('collectionStore', () => {
    const patients = ref([])
    const savePatient = (payload) => {
        return new Promise((resolve, reject) => {
            api.post('/Order/SavePaymentPatients', payload).then(({data}) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    const getPredictions = (payload) => {
        return new Promise((resolve, reject) => {
            axios.post('https://asia-southeast1-celtic-sunlight-419307.cloudfunctions.net/predict',
                payload,
                {headers: {"Content-Type": "multipart/form-data"}}).then(({data}) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    return {savePatient, getPredictions, patients};
})

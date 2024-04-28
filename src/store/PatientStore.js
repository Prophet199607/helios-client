import {defineStore} from "pinia";
import api from "../plugins/axios.js";
import {ref} from "vue";
import axios from 'axios';

export const usePatientStore = defineStore('collectionStore', () => {
    const patients = ref([])
    const diagnoses = ref([])
    const savePatient = (payload) => {
        return new Promise((resolve, reject) => {
            api.post('/Order/SavePaymentPatients', payload).then(({data}) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    const getPendingAppointmentsByPatientNic = (nic) => {
        return new Promise((resolve, reject) => {
            api.get(`/patient/find?nic=${nic}&status=0`).then(({data}) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    const getDiagnoses = () => {
        return new Promise((resolve, reject) => {
            api.get(`/diagnosis/patient/1`).then(({data}) => {
                diagnoses.value = data.data;
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    const addDiagnosis = (payload) => {
        return new Promise((resolve, reject) => {
            api.post("/diagnosis", payload).then(({data}) => {
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

    return {savePatient, getPendingAppointmentsByPatientNic, getDiagnoses, addDiagnosis, getPredictions,
        patients, diagnoses};
})

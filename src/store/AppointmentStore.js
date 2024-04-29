import {defineStore} from "pinia";
import api from "../plugins/axios.js";
import {ref} from "vue";

export const useAppointmentStore = defineStore('appointmentStore', () => {
    const appointments = ref([])
    const getAllPatientAppointments = () => {
        return new Promise((resolve, reject) => {
            api.get('/appointment/patient/1').then(({data}) => {
                appointments.value = data.data;
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    const saveAppointment = (payload) => {
        return new Promise((resolve, reject) => {
            api.post('/appointment', payload).then(({data}) => {
                resolve(data)
            }).catch(err => {
                reject(err)
            });
        })
    };

    return {getAllPatientAppointments, saveAppointment, appointments};
})

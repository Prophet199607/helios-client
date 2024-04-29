<script>
export default {
  layout: null
}
</script>

<script setup>

import {ref} from "vue";
import {useAuthStore} from "../../store/AuthStore.js";
const router = useRouter();

const auth = useAuthStore();
import toast from "../../plugins/toast.js";
import { Field, ErrorMessage} from 'vee-validate';

import logo from '../../assets/images/logo.png';
import {useRouter} from "vue-router";

const form = ref({
  username: '',
  password: '',
});

const submit = async () => {
  await auth.login(form.value)
      .then(() => {
      })
      .catch(_ => {
        toast.error('Invalid Credentials!', {
          position: toast.POSITION.TOP_RIGHT
        });
      })
}
</script>

<template>

</template>

<style scoped>
::v-deep(.vs__search) {
  padding: 2px 4px;
}

::v-deep(.vs1__listbox) {
  font-size: 0.50rem !important;
}
</style>

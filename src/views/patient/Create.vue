<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import Modal from "../../components/Modal.vue";
import Button from "../../components/Button.vue";
import SecondaryButton from "../../components/SecondaryButton.vue";
import SuccessButton from "../../components/SuccessButton.vue";
import Table from "../../components/Table.vue";
import {formatCurrency1} from "../../utils/currencyUtils.js";
import {useCustomerStore} from "../../store/CustomerStore.js";
import 'vue-select/dist/vue-select.css';
import {Field, Form, ErrorMessage} from 'vee-validate';
import CustomerSearchableDropdown from "../../components/CustomerSearchableDropdown.vue";
import usePrint from "../../composables/usePrint.js";
import swal from "sweetalert";

const { printReceipt } = usePrint()


const customerStore = useCustomerStore();
const router = useRouter();

const showAddChequeModal = ref(false);

const payment_methods = [
  {id: 'Cash', method_name: 'CASH'},
  {id: 'Cheque', method_name: 'CHEQUE'},
  {id: 'Card', method_name: 'CARD'},
];
const paymentMode = ref('');
const paymentMode2 = ref('');
const customerCode = ref('');
const customerCode2 = ref('');
const outstandingAmount = ref(0);
const bank2 = ref('');
let payments = ref([]);
const payment = ref({
  amount: '',
  paymentMode: '',
  chequeNo: '',
  bank: '',
  branch: '',
  chequeDate: '',
});
const editMode = ref(false)
const editRecord = ref(null)

const addCheque = () => {
  payment.value.paymentMode = paymentMode.value;
  payments.value.push(payment.value)
  closeModal()
}

const updateCheque = () => {
  payments.value.splice(editRecord.value, 1, payment.value);
  closeModal()
}

const openChequeAddModal = () => {
  showAddChequeModal.value = true;
}

const editCheque = ({...cheque}, index) => {
  editMode.value = true;
  editRecord.value = index;
  payment.value = cheque;
  openChequeAddModal()
}

const deleteCheque = (index) => {
  swal({
    title: "Are you sure?",
    text: "Do you want print this sales order?",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(function (willDelete) {
    if (willDelete) {
      payments.value.splice(index, 1)
      closeModal()
    }
  });
}

const closeModal = () => {
  editMode.value = false;
  showAddChequeModal.value = false;
  payment.value = {
    amount: '',
    paymentMode: '',
    chequeNo: '',
    bank: '',
    branch: '',
    chequeDate: '',
  };
  editRecord.value = null;
}

const onSaveCollection = () => {
  if (paymentMode.value === 'Cheque' && payments.value.length === 0) {
    swal("Oops!", "Please add at least one cheque", "error");
  }
}

const banks = computed(() => {
  return customerStore.banks;
})

const getBankName = (code) => {
  return banks.value.find(el => el.Bank_Code === code).Bank_Name;
}

const updateHiddenCustomerField = () => {
  customerCode2.value = customerCode.value;
};

const updateHiddenPaymentModeField = () => {
  paymentMode2.value = paymentMode.value;
};

const updateHiddenBankField = () => {
  bank2.value = payment.value.bank;
};

const requiredValidation = (value) => {
  if (!value) {
    return 'This field is required!';
  }
  return true;
}

const selectCustomer = (customer) => {
  customerCode.value = customer.Cust_Code;
}

const clearCustomerData = () => {
  customerCode.value = '';
}

watch(customerCode, (newVal, oldVal) => {
  updateHiddenCustomerField()
  customerStore.loadCustomerOutstandingAmount({
    loca: localStorage.getItem('loca'),
    cust_code: customerCode.value,
    ref_code: localStorage.getItem('Emp_Code'),
  }).then(res => {
    outstandingAmount.value = res.details.length === 0 ? '0' : res.details[0]?.Amount.toString();
  }).catch(err => {
    outstandingAmount.value = '0';
  })
})

watch(paymentMode, (newVal, oldVal) => {
  updateHiddenPaymentModeField();
})

watch(() => payment.value.bank, (newVal, oldVal) => {
  updateHiddenBankField();
})

onMounted(() => {
  customerStore.loadCustomers()
  customerStore.loadBanks()
})
</script>

<template>
  <div>
    <div class="mb-5 text-sm">
      <router-link :to="{name: 'patients'}" class="flex items-center gap-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12z"/></svg>
        Back</router-link>
    </div>
    <Form @submit="onSaveCollection">
      <div class="mb-6">
        <label for="email" class="block mb-2 capitalize font-medium text-sm text-gray-700">First Name</label>
        <Field v-model="customerCode2" name="customer" type="hidden" as="input"
               :rules="requiredValidation" @change="updateHiddenCustomerField"/>
        <CustomerSearchableDropdown @customer-click="selectCustomer" @clear-customer="clearCustomerData"></CustomerSearchableDropdown>
        <ErrorMessage name="customer" class="text-red-500 text-xs"/>
      </div>

      <div class="mb-6">
        <label for="email" class="block mb-2 capitalize font-medium text-sm text-gray-700">First Name</label>
        <Field v-model="customerCode2" name="customer" type="hidden" as="input"
               :rules="requiredValidation" @change="updateHiddenCustomerField"/>
        <CustomerSearchableDropdown @customer-click="selectCustomer" @clear-customer="clearCustomerData"></CustomerSearchableDropdown>
        <ErrorMessage name="customer" class="text-red-500 text-xs"/>
      </div>

      <div class="mb-6">
        <label for="email" class="block mb-2 capitalize font-medium text-sm text-gray-700">Email</label>
        <Field v-model="customerCode2" name="customer" type="hidden" as="input"
               :rules="requiredValidation" @change="updateHiddenCustomerField"/>
        <CustomerSearchableDropdown @customer-click="selectCustomer" @clear-customer="clearCustomerData"></CustomerSearchableDropdown>
        <ErrorMessage name="customer" class="text-red-500 text-xs"/>
      </div>

      <div class="mb-6">
        <label for="email" class="block mb-2 capitalize font-medium text-sm text-gray-700">Contact Number</label>
        <Field v-model="customerCode2" name="customer" type="hidden" as="input"
               :rules="requiredValidation" @change="updateHiddenCustomerField"/>
        <CustomerSearchableDropdown @customer-click="selectCustomer" @clear-customer="clearCustomerData"></CustomerSearchableDropdown>
        <ErrorMessage name="customer" class="text-red-500 text-xs"/>
      </div>
      <SuccessButton type="submit" class="mt-5 float-right">Save</SuccessButton>
    </Form>
  </div>
</template>

<style scoped>
::v-deep(.vs__search) {
  padding: 5px 7px;
}
</style>

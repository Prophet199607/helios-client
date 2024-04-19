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
    console.log("asasas")
    swal("Oops!", "Please add at least one cheque", "error");
    return;
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
      <router-link :to="{name: 'collections-index'}" class="flex items-center gap-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path fill="currentColor" d="M17.51 3.87L15.73 2.1L5.84 12l9.9 9.9l1.77-1.77L9.38 12z"/></svg>
        Back</router-link>
    </div>
    <Form @submit="onSaveCollection">
      <div class="mb-6">
        <label for="email" class="block mb-2 uppercase font-bold text-base text-gray-700">Customer</label>
        <Field v-model="customerCode2" name="customer" type="hidden" as="input"
               :rules="requiredValidation" @change="updateHiddenCustomerField"/>
        <CustomerSearchableDropdown @customer-click="selectCustomer" @clear-customer="clearCustomerData"></CustomerSearchableDropdown>
        <ErrorMessage name="customer" class="text-red-500 text-sm"/>
      </div>
      <div class="mb-6 flex justify-between items-center" v-if="customerCode">
        <div class="block uppercase font-normal text-base text-gray-700">Outstanding</div>
        <div class="text-lg text-red-500 font-semibold">{{ formatCurrency1(outstandingAmount) }}</div>
      </div>
      <div class="mb-6">
        <label for="email" class="block mb-2 uppercase font-bold text-base text-gray-700">Payment Mode</label>
        <Field v-model="paymentMode2" name="paymentMode" type="hidden" as="input" :rules="requiredValidation"
               @change="updateHiddenPaymentModeField"/>
        <v-select v-model="paymentMode" name="paymentMode" :options="payment_methods" label="method_name"
                  :reduce="payment_methods => payment_methods.id"
                  class="uppercase"></v-select>
        <ErrorMessage name="paymentMode" class="text-red-500 text-sm"/>
      </div>
      <div class="mb-6" v-if="paymentMode && paymentMode !== 'Cheque'">
        <label for="amount" class="block mb-2 uppercase font-bold text-base text-gray-700">Amount</label>
        <Field v-model="payment.amount" name="amount" type="number" class="rounded border border-gray-300 p-2 w-full"
               :rules="requiredValidation"></Field>
        <ErrorMessage name="amount" class="text-red-500 text-sm"/>
      </div>
      <div v-if="paymentMode === 'Cheque'">
        <Button type="button" @click="openChequeAddModal">Add Cheque</Button>
      </div>
      <SuccessButton type="submit" class="mt-5 float-right">Save</SuccessButton>
    </Form>

    <Modal :show="showAddChequeModal" @close="closeModal" :maxWidth="sm">
      <div class="p-6">
        <h2 class="text-lg font-normal text-slate-600">Add New Cheque</h2>
        <Form @submit="addCheque">
          <div class="mt-6 flex flex-col">
            <div class="mb-3">
              <label for="amount" class="block mb-2 uppercase font-bold text-base text-gray-700">Amount</label>
              <Field v-model="payment.amount" type="number" :rules="requiredValidation" name="chequeAmount"
                     class="rounded border border-gray-300 p-2 w-full"></Field>
              <ErrorMessage name="chequeAmount" class="text-red-500 text-sm"/>
            </div>
            <div class="mb-3">
              <label for="amount" class="block mb-2 uppercase font-bold text-base text-gray-700">Cheque no</label>
              <Field v-model="payment.chequeNo" type="number" :rules="requiredValidation"
                     class="rounded border border-gray-300 p-2 w-full" name="chequeNo"></Field>
              <ErrorMessage name="chequeNo" class="text-red-500 text-sm"/>
            </div>
            <div class="mb-3">
              <label for="email" class="block mb-2 uppercase font-bold text-base text-gray-700">Bank</label>
              <Field v-model="bank2" name="bank" type="hidden" as="input" :rules="requiredValidation"
                     @change="updateHiddenBankField"/>
              <v-select v-model="payment.bank" :options="banks" label="Bank_Name"
                        :reduce="banks => banks.Bank_Code"
                        class="uppercase"></v-select>
              <ErrorMessage name="bank" class="text-red-500 text-sm"/>
            </div>
            <div class="mb-3">
              <label for="amount" class="block mb-2 uppercase font-bold text-base text-gray-700">Branch</label>
              <Field v-model="payment.branch" type="text" :rules="requiredValidation"
                     class="rounded border border-gray-300 p-2 w-full" name="branch"></Field>
              <ErrorMessage name="branch" class="text-red-500 text-sm"/>
            </div>
            <div class="mb-3">
              <label for="amount" class="block mb-2 uppercase font-bold text-base text-gray-700">Cheque Date</label>
              <Field v-model="payment.chequeDate" type="date" :rules="requiredValidation"
                     class="rounded border border-gray-300 p-2 w-full" name="chequeDate"></Field>
              <ErrorMessage name="chequeDate" class="text-red-500 text-sm"/>
            </div>
            <div class="mt-6 flex space-x-1">
              <SuccessButton type="submit" v-if="!editMode">Add</SuccessButton>
              <SuccessButton @click="updateCheque" v-else>Update</SuccessButton>
              <SecondaryButton @click="closeModal">Cancel</SecondaryButton>
            </div>
          </div>
        </Form>
      </div>
    </Modal>

    <table class="min-w-full border-collapse block md:table mt-[80px]"
           v-if="paymentMode === 'Cheque' && payments.length > 0">
      <thead class="block md:table-header-group">
      <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full
      md:top-auto -left-full md:left-auto  md:relative ">
        <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Amount
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Cheque No
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Bank
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Branch
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Cheque Date
        </th>
        <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Actions
        </th>
      </tr>
      </thead>
      <tbody class="block md:table-row-group">
      <tr class="bg-gray-50 border border-grey-500 md:border-none block md:table-row"
          v-for="(cheque, index) in payments" :key="cheque">
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Amount</span>{{ formatCurrency1(cheque.amount) }}
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Cheque No</span>{{ cheque.chequeNo }}
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Bank</span>{{ getBankName(cheque.bank) }}
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Bank</span>{{ cheque.branch }}
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Mobile</span>{{ cheque.chequeDate }}
        </td>
        <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
          <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2
          border border-blue-500 rounded" @click="editCheque(cheque, index)">Edit
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 ml-2
          border border-red-500 rounded" @click="deleteCheque(index)">Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
::v-deep(.vs__search) {
  padding: 5px 7px;
}
</style>

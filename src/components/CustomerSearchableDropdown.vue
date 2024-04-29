<script setup>
import debounce from "lodash/debounce.js";
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useCustomerStore} from "../store/CustomerStore.js";

const customerStore = useCustomerStore()

const emit = defineEmits(['customer-click', 'clear-customer'])

const searchTerm = ref('');
const showDropdown = ref(false);
const searchWrapper = ref(null);
const dropdown = ref(null);

const searchCustomers = async (query) => {
  if (searchTerm.value === '') {
    showDropdown.value = false;
    return;
  }
  try {
    await customerStore.loadCustomers(searchTerm.value);
    showDropdown.value = true;
  } catch (error) {
    console.error('Error fetching items:', error);
    showDropdown.value = false;
  }
};

const debouncedSearch = debounce(searchCustomers, 500);

const selectCustomer = (customer) => {
  emit('customer-click', customer)
  showDropdown.value = false;
  searchTerm.value = customer.Cust_Name;
}

const clearSearch = () => {
  searchTerm.value = '';
  showDropdown.value = false;
  emit('clear-customer')
};

const customers = computed(() => {
  return customerStore.customers;
})

const handleClickOutside = (event) => {
  if (searchWrapper.value && !searchWrapper.value.contains(event.target) && dropdown.value
      && !dropdown.value.contains(event.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
})
</script>

<template>
  <div class="relative" ref="searchWrapper">
    <input type="text" v-model="searchTerm" @input="debouncedSearch"
           class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
    <button @click="clearSearch" class="absolute inset-y-0 right-0 px-2 py-2 flex items-center justify-center text-gray-500 hover:text-gray-700 focus:outline-none">
      <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.45 6.82L12 12.36l5.55-5.54a.75.75 0 1 1 1.06 1.06L13.06 13l5.54 5.55a.75.75 0 1 1-1.06 1.06L12 14.06l-5.55 5.54a.75.75 0 1 1-1.06-1.06L10.94 13 5.4 7.45a.75.75 0 0 1 1.05-1.06z"/></svg>
    </button>
    <div v-if="showDropdown" class="absolute left-0 right-0 mt-2 text-sm bg-white border border-gray-300
          rounded-md shadow-md z-10 overflow-y-auto max-h-[300px]" ref="dropdown">
      <div v-for="customer in customers" :key="customer.Cust_Code"
           class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectCustomer(customer)"><span class="font-semibold">
              {{ customer.Cust_Code }}</span> - {{ customer.Cust_Name }}</div>
    </div>
  </div>
</template>
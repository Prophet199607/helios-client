<script setup>

import Button from "../../components/Button.vue";
import {useRouter} from "vue-router";
import {dateFormat1} from "../../utils/dateUtil.js";
import {formatCurrency1} from "../../utils/currencyUtils.js";
import Table from "../../components/Table.vue";
import {computed, onMounted, ref} from "vue";
import {useCollectionStore} from "../../store/CollectionStore.js";
import moment from "moment/moment.js";
import swal from "sweetalert";
const router = useRouter()
const collectionStore = useCollectionStore();

const start_date = ref(moment(new Date()).format("YYYY-MM-DD"))
const end_date = ref(moment(new Date()).format("YYYY-MM-DD"))
const navigateToPage = () => {
  router.push({name: 'collections-create'})
}


const printReceipt = (collection) => {
  swal({
    title: "Are you sure?",
    text: "Do you want print this payment receipt?",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(function (willDelete) {
    if (willDelete) {
      collectionStore.printCollectionDetails({
        doc_no: collection.Doc_No,
        loca: localStorage.getItem('loca'),
      }, true)
    }
  });
}

const loadData = () => {
  collectionStore.getCreatedCollections({
    start_date: start_date.value,
    end_date: end_date.value,
    loca: localStorage.getItem('loca'),
    ref_code: localStorage.getItem('Emp_Code'),
  });
}

const collections = computed(() => {
  return collectionStore.collections;
})


onMounted(() => {
  loadData();
})
</script>

<template>
  <div class="flex justify-start mb-3">
    <div class="uppercase font-semibold text-gray-600">Collections</div>
  </div>
  <div class="flex justify-between items-center">
    <div></div>
    <div>
      <Button type="button" @click="navigateToPage()">New Collection</Button>
    </div>
  </div>

  <div>
    <div class="block md:flex gap-x-5">
      <div class="mb-3">
        <label for="amount" class="block mb-2 uppercase font-bold text-base text-gray-700">Start Date</label>
        <input v-model="start_date" type="date"
               class="rounded border border-gray-300 p-2 w-full" name="chequeDate">
      </div>
      <div class="mb-3">
        <label for="amount" class="block mb-2 uppercase font-bold text-base text-gray-700">End Date</label>
        <input v-model="end_date" type="date"
               class="rounded border border-gray-300 p-2 w-full" name="chequeDate">
      </div>
      <Button type="button" class="h-[35px] mt-0 md:mt-[35px]"
              @click="loadData">Load Data</Button>
    </div>
  </div>

  <table class="min-w-full border-collapse block md:table mt-[30px]">
    <thead class="block md:table-header-group">
    <tr class="border border-grey-500 md:border-none block md:table-row absolute -top-full
      md:top-auto -left-full md:left-auto  md:relative ">
      <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Doc No.
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Customer
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Date
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Amount
      </th>
      <th class="bg-gray-600 p-2 text-white font-bold md:border
        md:border-grey-500 text-left block md:table-cell">Actions
      </th>
    </tr>
    </thead>
    <tbody class="block md:table-row-group">
    <tr class="bg-gray-50 border mb-2 border-grey-500 md:border-none block md:table-row"
        v-for="(collection, index) in collections" :key="collection">
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Doc No.</span>{{ collection.Doc_No }}
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Customer</span>{{ collection.Cust_Name }}
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Date</span>{{ dateFormat1(collection.inserted_date) }}
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Amount</span>{{ formatCurrency1(collection.Net_Amount) }}
      </td>
      <td class="p-2 md:border md:border-grey-500 text-left block md:table-cell">
        <span class="inline-block w-1/3 md:hidden font-bold">Actions</span>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2
          border border-blue-500 rounded" @click="printReceipt(collection)">Print
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>

</style>

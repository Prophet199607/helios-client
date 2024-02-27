<script setup>

import TableHeaderCell from "./TableHeaderCell.vue";
import TableRow from "./TableRow.vue";
import Table from "./Table.vue";
import TableDataCell from "./TableDataCell.vue";
import {onMounted} from "vue";

defineProps({
  payments: {
    type: Object,
  }
})

</script>

<template>
  <div>
    <div class="text-center">
      <div class="text-left">
        <div class="font-bold text-2xl uppercase">{{payments.Company[0].Loca_Descrip}}</div>
        <div class="uppercase">NO 592 NEGOMBO RD MABOLA, WATTALA</div>
        <div>TEL/FAX:0112931288,0112938166 e-mail: wattala@dinapalagroup.com</div>
      </div>
    </div>
    <div class="text-2xl underline uppercase font-bold mt-5">
      PAYMENT
    </div>
    <div class="grid grid-cols-2 mt-[50px]">
      <div class="flex gap-x-5">
        <div class="uppercase font-semibold">Supplier</div>
        <div class="uppercase">
          <div>0061</div>
          <div>Softlogic Retail (Pvt) Ltd.</div>
          <div>No. 14,</div>
          <div>De Fonseka Place,</div>
          <div>Colombo 05.</div>
        </div>
      </div>
      <div class="flex gap-x-5">
        <div class="uppercase font-semibold">
          <div>Document No</div>
          <div>Date</div>
          <div>Location</div>
          <div>User</div>
        </div>
        <div>
          <div>PWTWTL000001</div>
          <div>18/01/2022</div>
          <div>WTL WATTALA</div>
          <div>CHATHURANGA</div>
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-5">
      <div class="my-2 overflow-hidden">
        <Table>
          <template #header>
            <TableRow>
              <TableHeaderCell class="text-left text-gray-800">Payment Mode</TableHeaderCell>
              <TableHeaderCell class="text-left text-gray-800">Bank</TableHeaderCell>
              <TableHeaderCell class="text-left text-gray-800">Cheque No</TableHeaderCell>
              <TableHeaderCell class="text-left text-gray-800">Date</TableHeaderCell>
              <TableHeaderCell class="text-left text-gray-800">Branch</TableHeaderCell>
              <TableHeaderCell class="text-left text-gray-800">Amount</TableHeaderCell>
            </TableRow>
          </template>
          <template #default>
            <TableRow>
              <TableDataCell>Cheque</TableDataCell>
              <TableDataCell class="text-left">Commercial Bank</TableDataCell>
              <TableDataCell class="text-left">457819361245</TableDataCell>
              <TableDataCell class="text-left">25/01/2024</TableDataCell>
              <TableDataCell class="text-left">Kottawa</TableDataCell>
              <TableDataCell class="text-left">5,850,000</TableDataCell>
            </TableRow>
            <TableRow>
              <TableDataCell></TableDataCell>
              <TableDataCell class="text-left"></TableDataCell>
              <TableDataCell class="text-left"></TableDataCell>
              <TableDataCell class="text-left"></TableDataCell>
              <TableDataCell class="text-left"></TableDataCell>
              <TableDataCell class="text-left font-semibold">
                <div class="border-t border-gray-400 my-2"></div>
                <div class="">
                  5,850,000
                </div>
                <div class="border-b border-gray-400 my-[2px]"></div>
                <div class="border-b border-gray-400 "></div>
              </TableDataCell>
            </TableRow>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
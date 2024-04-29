<script setup>

</script>

<template>
  <div class="overflow-x-auto">
    <table class="table-auto w-full border-collapse border border-gray-200" aria-describedby="">
      <thead>
      <tr class="bg-gray-50">
        <th class="px-4 py-2">PID</th>
        <th class="px-4 py-2">First Name</th>
        <th class="px-4 py-2">Last Name</th>
        <th class="px-4 py-2">Email</th>
        <th class="px-4 py-2">Contact No</th>
        <th class="px-4 py-2">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr class="border-b border-gray-200">
        <td class="px-4 py-2">1</td>
        <td class="px-4 py-2">John</td>
        <td class="px-4 py-2">Doe</td>
        <td class="px-4 py-2">john.doe@example.com</td>
        <td class="px-4 py-2">123-456-7890</td>
        <td class="px-4 py-2">
          <button class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded-md shadow-md transition duration-300 ease-in-out">Edit</button>
          <button class="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md shadow-md transition duration-300 ease-in-out ml-2">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


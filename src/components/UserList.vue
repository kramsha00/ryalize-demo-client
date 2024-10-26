<template>
  <!-- Toast Notification -->
  <div v-if="toastMessage" :class="toastClass" class="fixed top-4 right-4 p-4 rounded shadow z-50">
    {{ toastMessage }}
  </div>

  <div>
    <h1 class="text-lg mb-2">User List</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3"><span class="sr-only">Edit</span></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ user.firstName }} {{ user.lastName }}
          </td>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4 text-right">
            <button @click="editUser(user)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
              Edit
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Edit User Modal -->
    <EditUserModal
      :visible="isModalOpen"
      :user="selectedUser"
      @close="isModalOpen = false"
      @update-success="handleUpdateSuccess"
      @update-fail="showToast($event, 'error')"
    />
  </div>
</template>

<script>
import axios from 'axios';
import EditUserModal from './EditUserModal.vue';

export default {
  name: "UserList",
  components: { EditUserModal },
  data() {
    return {
      users: [],
      isModalOpen: false,
      selectedUser: null,
      toastMessage: '',
      toastClass: '',
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
          this.users = response.data;
        });
    },
    editUser(user) {
      this.selectedUser = user;
      this.isModalOpen = true;
    },
    handleUpdateSuccess(message) {
      this.showToast(message, 'success');
      this.isModalOpen = false;
      this.fetchUsers(); // Re-fetch users after a successful update
    },
    showToast(message, type) {
      this.toastMessage = message;
      this.toastClass = type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
      setTimeout(() => this.toastMessage = '', 3000);
    },
  }
};
</script>

<style scoped>
/* Toast Styling */
.bg-green-500 {
  background-color: #38a169;
}

.bg-red-500 {
  background-color: #e53e3e;
}
</style>

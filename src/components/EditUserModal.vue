<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-400 bg-opacity-50">
    <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-xl mb-4">Edit User</h2>
      <form @submit.prevent="updateUser">
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
          <input v-model="formData.firstName" type="text"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
          <input v-model="formData.lastName" type="text"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required />
        </div>
        <div class="mb-4">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input v-model="formData.email" type="email"
                 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 required />
        </div>
        <div class="flex justify-end">
          <button type="button" @click="close"
                  class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Cancel
          </button>
          <button type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  :disabled="loading"> <!-- Disable button when loading -->
            <span v-if="loading" class="loader"></span> <!-- Show loader when loading -->
            <span v-else>Update</span> <!-- Show text when not loading -->
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    visible: Boolean,
    user: Object,
  },
  data() {
    return {
      formData: { ...this.user }, // Pre-fill form data with the user’s data
      loading: false, // Add loading state
    };
  },
  watch: {
    user: {
      handler(newUser) {
        this.formData = { ...newUser }; // Update form data when user prop changes
      },
      deep: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    async updateUser() {
      this.loading = true; // Set loading to true when starting the update
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/users/${this.formData.id}`, this.formData);
        this.$emit('update-success', response.data.message);
        this.close();
      } catch (error) {
        this.$emit('update-fail', error.response?.data?.error || 'Failed to update user');
      } finally {
        this.loading = false; // Set loading to false when the update is complete
      }
    },
  },
};
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3; /* Light gray */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 0.8s linear infinite;
  margin-right: 5px; /* Add some space between the loader and text */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

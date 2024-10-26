<template>
	<!-- Toast Notification -->
	<div v-if="toastMessage" :class="toastClass" class="fixed top-4 right-4 p-4 rounded shadow z-50">
		{{ toastMessage }}
	</div>

	<div>
		<h1 class="text-lg mb-2">Users</h1>
		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3 w-2/5">Name</th>
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
					<td class="px-4 py-2 text-right">
						<button @click="deleteUser(user.id)" class="font-medium text-red-600 dark:text-red-500 hover:underline mr-4">
							<i class="pi pi-trash"></i>
						</button>
						<button @click="editUser(user)"
								class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
							<i class="pi pi-pencil"></i>
						</button>
					</td>
				</tr>
				<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
					<td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex flex-row ">
						<input type="text" v-model="newUser.firstName" id="first_name"
							   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-2"
							   placeholder="First Name" required/>
						<input type="text" v-model="newUser.lastName" id="first_name"
							   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							   placeholder="Last Name" required/>
					</td>
					<td class="px-6 py-4">
						<input type="email" v-model="newUser.email" id="email"
							   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							   placeholder="Email" required/>
					</td>
					<td class="px-6 py-4 text-right">
						<button @click="addUser" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
							Add
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
	components: {EditUserModal},
	data() {
		return {
			users: [],
			isModalOpen: false,
			selectedUser: null,
			toastMessage: '',
			toastClass: '',
			newUser: {
				firstName: '',
				lastName: '',
				email: ''
			},
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
		addUser() {
			axios.post('http://127.0.0.1:8000/api/users', this.newUser)
				.then(response => {
					this.users.push(response.data);
					this.showToast('User added successfully!', 'success');
					this.resetNewUser();
					this.fetchUsers();
				})
				.catch(error => {
					this.showToast('Failed to add user.', 'error');
				});
		},
		deleteUser(id) {
			axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
				.then(() => {
					this.showToast('User deleted successfully!', 'success');
					this.fetchUsers();
				})
				.catch(() => {
					this.showToast('Failed to delete user.', 'error');
				});
		},
		resetNewUser() {
			this.newUser = {
				firstName: '',
				lastName: '',
				email: ''
			};
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

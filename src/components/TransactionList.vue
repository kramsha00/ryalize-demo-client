<template>
	<div>
		<h1 class="text-lg mb-2">Transactions</h1>

		<!-- Filter Form -->
		<form @submit.prevent="applyFilters">
			<div class="flex flex-row gap-4 flex-wrap">
				<div>
					<label for="userId"
						   class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User:</label>
					<select v-model="filters.userId" id="userId"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option value="">All Users</option>
						<option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }}
							{{ user.lastName }}
						</option>
					</select>
				</div>

				<div>
					<label for="locationId" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location:</label>
					<select v-model="filters.locationId" id="locationId"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option value="">All Locations</option>
						<option v-for="location in locations" :key="location.id" :value="location.id">
							{{ location.address }}
						</option>
					</select>
				</div>

				<div>
					<label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start
						Date:</label>
					<input type="date" v-model="filters.startDate" id="startDate"
						   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
				</div>

				<div>
					<label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End
						Date:</label>
					<input type="date" v-model="filters.endDate" id="endDate"
						   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
				</div>
			</div>
			<div class="mt-2">
				<button type="submit"
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
					Apply Filters
				</button>
			</div>
		</form>

		<!-- Transactions Table -->

		<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
				<tr>
					<th scope="col" class="px-6 py-3">#ID</th>
					<th scope="col" class="px-6 py-3">User</th>
					<th scope="col" class="px-6 py-3">Address</th>
					<th scope="col" class="px-6 py-3">Date</th>
					<th scope="col" class="px-6 py-3">Amount (BHD)</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="transaction in transactions" :key="transaction.id"
					class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
					<td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{
							transaction.id
						}}
					</td>
					<td class="px-6 py-4">{{ transaction.user.firstName }} {{ transaction.user.lastName }}</td>
					<td class="px-6 py-4">{{ transaction.location.address }}</td>
					<td class="px-6 py-4">{{ new Date(transaction.date.date).toLocaleDateString() }}</td>
					<td class="px-6 py-4">BHD {{ transaction.amount }}</td>
				</tr>
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		<div class="flex flex-row justify-between text-sm mt-2">
			<span>Page {{ currentPage }} of {{ totalPages }}</span>
			<div class="inline-flex">
				<button @click="goToPage(1)" :disabled="currentPage === 1"
						class="px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
					<i class="pi pi-angle-double-left"></i></button>
				<button @click="prevPage" :disabled="currentPage === 1"
						class="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
					<i class="pi pi-angle-left"></i></button>
				<button @click="nextPage" :disabled="currentPage === totalPages"
						class="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
					<i class="pi pi-angle-right"></i></button>
				<button @click="goToPage(totalPages)" :disabled="currentPage === totalPages"
						class="px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
					<i class="pi pi-angle-double-right"></i></button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			filters: {
				userId: '',
				locationId: '',
				startDate: '',
				endDate: '',
			},
			transactions: [],
			users: [],
			locations: [],
			currentPage: 1,
			limit: 10,
			totalPages: 0,
		};
	},
	created() {
		this.fetchUsers();
		this.fetchLocations();
		this.fetchTransactions();
	},
	methods: {
		async fetchUsers() {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/users/');
				this.users = response.data;
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		},
		async fetchLocations() {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/locations/');
				this.locations = response.data;
			} catch (error) {
				console.error('Error fetching locations:', error);
			}
		},
		async fetchTransactions() {
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/transactions/', {
					params: {
						userId: this.filters.userId,
						locationId: this.filters.locationId,
						startDate: this.filters.startDate,
						endDate: this.filters.endDate,
						page: this.currentPage,
						limit: this.limit,
					},
				});
				this.transactions = response.data.transactions;
				this.totalPages = response.data.totalPages;
			} catch (error) {
				console.error('Error fetching transactions:', error);
			}
		},
		applyFilters() {
			this.currentPage = 1;
			this.fetchTransactions();
		},
		prevPage() {
			if (this.currentPage > 1) {
				this.currentPage--;
				this.fetchTransactions();
			}
		},
		nextPage() {
			if (this.currentPage < this.totalPages) {
				this.currentPage++;
				this.fetchTransactions();
			}
		},
		goToPage(page) {
			this.currentPage = page;
			this.fetchTransactions();
		},
	},
};
</script>

<style scoped>
</style>

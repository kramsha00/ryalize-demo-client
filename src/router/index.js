import {createRouter, createWebHistory} from 'vue-router';
import Users from "@/components/UserList.vue";
import Transactions from "@/components/TransactionList.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/users',
			component: Users,
			name: 'Users'
		},
		{
			path: '/transactions',
			component: Transactions,
			name: 'Transactions'
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/users'
		},
	]
});

export default router;

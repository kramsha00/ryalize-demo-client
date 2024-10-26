import { createRouter, createWebHistory } from 'vue-router';
import Users from "@/components/UserList.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/users', component: Users, name: 'Users' },
    { path: '/:pathMatch(.*)*', redirect: '/users' },
  ]
});

export default router;

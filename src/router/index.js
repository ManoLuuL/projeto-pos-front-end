import { createRouter, createWebHistory } from "vue-router";
import PostsPage from "../views/PostsPage.vue";
import LoginPage from "../views/LoginPage.vue";
import RegisterPage from "../views/RegisterPage.vue";
import UserProfilePage from "../views/UserProfilePage.vue";
import { useAuthStore } from "../store/auth-store";

const routes = [
	{
		path: "/",
		name: "login",
		component: LoginPage,
	},
	{
		path: "/register",
		name: "register",
		component: RegisterPage,
	},
	{
		path: "/posts",
		name: "posts",
		component: PostsPage,
		meta: { requiresAuth: true },
	},
	{
		path: "/user/:id",
		name: "userProfile",
		component: UserProfilePage,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const authStore = useAuthStore();

	if (to.meta.requiresAuth && !authStore.isLoggedIn) {
		next("/login"); // Redireciona para a página de login
	} else if (
		(to.name === "login" || to.name === "register") &&
		authStore.isLoggedIn
	) {
		next("/posts"); // Redireciona para a página de posts se já estiver logado
	} else {
		next(); // Prossegue normalmente se as condições acima não forem atendidas
	}
});
export default router;

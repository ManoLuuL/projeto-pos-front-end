import { createRouter, createWebHistory } from "vue-router";
import PostsPage from "../pages/PostsPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import CommentsPage from "../pages/CommentsPage.vue";
import UserProfilePage from "../pages/UserProfilePage.vue";
import AlbumsPage from "../pages/AlbumsPage.vue";
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
	{
		path: "/comments",
		name: "comments",
		component: CommentsPage,
		meta: { requiresAuth: true },
	},
	{
		path: "/albums",
		name: "albums",
		component: AlbumsPage,
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, _, next) => {
	const authStore = useAuthStore();

	if (to.meta.requiresAuth && !authStore.isLoggedIn) {
		next("/");
	} else if (
		(to.name === "" || to.name === "register") &&
		authStore.isLoggedIn
	) {
		next("/posts");
	} else {
		next();
	}
});
export default router;

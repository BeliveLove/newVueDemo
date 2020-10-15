import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/Login";
import Main from "@/components/main";
import UserManager from "@/components/userManager";
import MenuManager from "@/components/MenuManager";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "HelloWorld",
      component: HelloWorld
    },
    {
      path: "/Login",
      name: "Login",
      component: Login
    },
    {
      path: "/main",
      name: "main",
      component: Main,
      children: [
        {
          path: "/userManager",
          name: "userManager",
          component: UserManager
        },
        {
          path: "/MenuManager",
          name: "MenuManager",
          component: MenuManager
        }
      ]
    }
  ]
});

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MisChatsView from '../views/MisChatsView.vue'
import FlujoConversacional from '../views/FlujoConversacional.vue'
import CrearUsuariosView from '../views/CrearUsuariosView.vue'
import ChatEnVivoView from '../views/ChatEnVivoView.vue'
import estadisticasView from '../views/estadisticasView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/misChats',
    name: 'MisChats',
    component: MisChatsView
  },
  {
    path: '/flujoConversacional/:id',
    name: "FlujoConversacional",
    component: FlujoConversacional
  },
  {
    path: '/usuarios',
    name: "Usuarios",
    component: CrearUsuariosView
  },
  {
    path: '/chatVivo',
    name: "ChatEnVivo",
    component: ChatEnVivoView
  },
  {
    path: '/estadisticas',
    name: "Estadísticas",
    component: estadisticasView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

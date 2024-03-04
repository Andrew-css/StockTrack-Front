import {createRouter, createWebHashHistory} from 'vue-router'
import Nav from '../components/nav.vue'
import Home from '../components/home.vue'
import Ficha from '../components/ficha.vue'
import Cuentas from '../components/registro.vue'
import Login from '../components/login.vue'
import NuevaContra from '../components/nuevaContraseña.vue'
import recuperarContra from '../components/recuperarContraseña.vue'
import solicitar from '../components/solicitarPedido.vue'
import GestionProductos from '../components/gestionProductos.vue'
import Lote from '../components/lote.vue'
import Item from '../components/item.vue'
import Area from '../components/area.vue'
import formatoDevolucion from '../components/formatoDevoluciones.vue'
import historial from '../components/historialDevolucion.vue'
import historialPedido from '../components/historialPedido.vue'
import distribucionItemLote from '../components/distribucionItemLote.vue';
import distribucionLoteFicha from '../components/distribucionLoteFicha.vue';
import editarPerfil from '../components/editarPerfil.vue';
import {useStoreUsuarios} from '../stores/usuarios.js'

const checkAuth = () => {
  const useUsuario = useStoreUsuarios()

  const token = useUsuario.token

  if (!token) return false
  return true
};

const auth = (to, from, next) => {
  console.log(to);
  if (checkAuth()) {
      const useUsuario = useStoreUsuarios()
      const rol = useUsuario.usuario.rol
      console.log(rol);
      if (!to.meta.rol.includes(rol)) {
          return next({ path: '/' })
      }
      next()
  } else {
      return next({ path: '/' })
  }
}

const routes = [
  { path: '/', component: Login},
  { path: '/recuperar-password', component: recuperarContra},
  { path: '/nav', component: Nav, children:[
    { path:'/nav', redirect:'/home'},
    { path: '/home', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, component: Home },
    { path: '/fichas', beforeEnter: auth, meta: {rol: ['admin']}, component: Ficha},
    { path: '/cuentas', beforeEnter: auth, meta: {rol: ['admin']}, component: Cuentas},
    { path: '/nueva-password', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, component: NuevaContra},
    { path: '/solicitar-pedido', beforeEnter: auth, meta: {rol: ['instructor', 'bodega']}, component: solicitar},
    { path: '/productos', beforeEnter: auth, meta: {rol: ['admin', 'bodega']}, component: GestionProductos},
    { path: '/lotes', beforeEnter: auth, meta: {rol: ['admin', 'bodega']}, component: Lote},
    { path: '/lotes/:idDistribucion', name: 'LoteConID', beforeEnter: auth, meta: {rol: ['admin', 'bodega']}, component: Lote},
    { path: '/item', beforeEnter: auth, meta: {rol: ['admin']}, component: Item},
    { path: '/areas', beforeEnter: auth, meta: {rol: ['admin']}, component: Area},
    { path: '/formato-devolucion', beforeEnter: auth, meta: {rol: ['bodega']}, component: formatoDevolucion},
    { path: '/historial', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, component: historial},
    { path: '/historial-pedido', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, component: historialPedido},
    { path: '/distribucion-item-lote/:idDistribucion', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, name: 'LoteConID', component: distribucionItemLote, props: true },
    { path: '/distribucion-lote-ficha', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, component: distribucionLoteFicha},
    { path: '/distribucion-lote-ficha/:idDistribucionPresupuesto', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, name: 'FichasConID', component: distribucionLoteFicha, props:true},
    { path: '/editar-perfil', beforeEnter: auth, meta: {rol: ['admin', 'instructor', 'bodega']}, component: editarPerfil}
  ]}
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
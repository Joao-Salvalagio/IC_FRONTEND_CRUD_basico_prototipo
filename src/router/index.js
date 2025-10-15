import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdminView from '../views/AdminView.vue'
import RecommendationView from '../views/RecommendationView.vue'
import CpuManager from '../components/CpuManager.vue'
import PlacaMaeManager from '../components/PlacaMaeManager.vue'
import GpuManager from '../components/GpuManager.vue'
import MemoriaRamManager from '../components/MemoriaRamManager.vue'
import ArmazenamentoManager from '../components/ArmazenamentoManager.vue'
import FonteManager from '../components/FonteManager.vue'
import GabineteManager from '../components/GabineteManager.vue'
import RefrigeracaoManager from '../components/RefrigeracaoManager.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/montar-pc',
      name: 'montar-pc',
      component: RecommendationView,
    },
    {
      path: '/admin',
      component: AdminView,
      children: [
        { path: '', redirect: '/admin/cpus' },
        { path: 'cpus', name: 'admin-cpus', component: CpuManager },
        { path: 'placas-mae', name: 'admin-placas-mae', component: PlacaMaeManager },
        { path: 'gpus', name: 'admin-gpus', component: GpuManager },
        { path: 'memorias-ram', name: 'admin-memorias-ram', component: MemoriaRamManager },
        { path: 'armazenamentos', name: 'admin-armazenamentos', component: ArmazenamentoManager },
        { path: 'fontes', name: 'admin-fontes', component: FonteManager },
        { path: 'gabinetes', name: 'admin-gabinetes', component: GabineteManager },
        { path: 'refrigeracoes', name: 'admin-refrigeracoes', component: RefrigeracaoManager },
      ],
    },
  ],
})

export default router

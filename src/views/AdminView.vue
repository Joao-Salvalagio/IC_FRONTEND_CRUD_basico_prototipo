<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <h2>Hardware</h2>
      <nav class="admin-nav">
        <RouterLink to="/admin/cpus">Processadores (CPU)</RouterLink>
        <RouterLink to="/admin/placas-mae">Placas-mãe</RouterLink>
        <RouterLink to="/admin/gpus">Placas de Vídeo (GPU)</RouterLink>
        <RouterLink to="/admin/memorias-ram">Memórias RAM</RouterLink>
        <RouterLink to="/admin/armazenamentos">Armazenamento</RouterLink>
        <RouterLink to="/admin/fontes">Fontes (PSU)</RouterLink>
        <RouterLink to="/admin/gabinetes">Gabinetes</RouterLink>
        <RouterLink to="/admin/refrigeracoes">Refrigeração (Cooler)</RouterLink>
      </nav>
    </aside>
    <main class="admin-content">
      <RouterView />
    </main>
  </div>
</template>
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<style scoped>
/* Estilos permanecem os mesmos */
.admin-layout {
  display: flex;
  min-height: calc(100vh - 70px);
}
.admin-sidebar {
  width: 250px;
  padding: 2rem;
  background-color: var(--surface);
  border-right: 1px solid var(--border-color);
}
.admin-sidebar h2 {
  margin-top: 0;
  font-size: 1.2rem;
  color: var(--text-secondary);
}
.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.admin-nav a {
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: background-color 0.2s;
}
.admin-nav a:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
.admin-nav a.router-link-exact-active {
  background-color: var(--primary);
  font-weight: 600;
}
.admin-content {
  flex-grow: 1;
}
</style>

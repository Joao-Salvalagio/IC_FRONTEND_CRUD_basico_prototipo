<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="main-header">
    <nav>
      <RouterLink to="/montar-pc">Montar PC</RouterLink>
      <RouterLink to="/">Gerenciar Usuários</RouterLink>
      <RouterLink to="/admin">Admin Hardware</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
/* O CSS do App.vue continua o mesmo */
.main-header {
  line-height: 1.5;
  padding: 1rem 3rem;
  background-color: var(--surface);
  border-bottom: 1px solid var(--border-color);
}
nav {
  width: 100%;
  font-size: 1rem;
  text-align: left;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--border-color);
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s;
}
nav a:first-of-type {
  border: 0;
  padding-left: 0;
}
nav a:hover {
  color: var(--primary);
}
nav a.router-link-exact-active {
  color: var(--text-primary);
  font-weight: 600;
}
</style>

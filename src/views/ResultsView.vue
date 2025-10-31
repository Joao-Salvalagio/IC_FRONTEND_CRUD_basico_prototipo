<template>
  <main class="results-view">
    <div class="container" v-if="build">
      <header class="view-header">
        <h1>Sua Build Ideal está Pronta!</h1>
        <p>Analisamos suas escolhas e montamos a configuração perfeita para você.</p>
      </header>

      <div class="build-summary">
        <div class="total-price">
          <span>Preço Total Estimado</span>
          <h2>R$ {{ totalPrice.toFixed(2) }}</h2>
        </div>
        <div class="summary-actions">
          <button class="btn-primary">Salvar Build</button>
          <button class="btn-secondary">Exportar</button>
        </div>
      </div>

      <div class="component-list">
        <div class="component-item" v-for="(component, type) in build" :key="type">

          <template v-if="component">
            <div class="component-type">
              <span class="type-icon">{{ componentIcons[type] || '⚙️' }}</span>
              <span class="type-name">{{ componentNames[type] || type }}</span>
            </div>
            <div class="component-details">
              <span class="component-name">{{ component.nome }}</span>
              <span class="component-brand">{{ component.marca }}</span>
            </div>
            <div class="component-price">
              <span>R$ {{ component.preco.toFixed(2) }}</span>
            </div>
          </template>

          <template v-else-if="type === 'refrigeracao'">
            <div class="component-type">
              <span class="type-icon">❄️</span>
              <span class="type-name">Refrigeração</span>
            </div>
            <div v-if="build.cpu && !doesCpuNeedCooler(build.cpu)" class="component-details included">
              <span class="component-name">Cooler Box (Incluso com o Processador)</span>
              <span class="component-brand">Não é necessário comprar um cooler separado.</span>
            </div>
            <div v-else class="component-details not-found">
              <span class="component-name">Nenhum cooler compatível foi encontrado.</span>
            </div>
          </template>

          <template v-else-if="type === 'gpu'">
            <div class="component-type">
              <span class="type-icon">🎮</span>
              <span class="type-name">Placa de Vídeo (GPU)</span>
            </div>
            <div v-if="build.cpu && isApu(build.cpu)" class="component-details included">
              <span class="component-name">Gráficos Integrados</span>
              <span class="component-brand">Já incluso com o processador (APU).</span>
            </div>
            <div v-else class="component-details not-found">
              <span class="component-name">Nenhuma GPU compatível foi encontrada.</span>
            </div>
          </template>

          <template v-else>
            <div class="component-type">
              <span class="type-icon">⚠️</span>
              <span class="type-name">{{ componentNames[type] || type }}</span>
            </div>
            <div class="component-details not-found">
              <span class="component-name">Nenhum(a) {{ componentNames[type] || type }} compatível foi encontrado(a).</span>
            </div>
          </template>

        </div>
      </div>
    </div>

    <div class="container" v-else>
      <header class="view-header">
        <h1>Nenhuma recomendação encontrada</h1>
        <p>Por favor, volte à página "Montar PC" para gerar uma nova build.</p>
      </header>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store.js';

const build = store.recommendedBuild;

const componentNames = {
  cpu: 'Processador (CPU)',
  placaMae: 'Placa-mãe',
  gpu: 'Placa de Vídeo (GPU)',
  memoriaRam: 'Memória RAM',
  armazenamento: 'Armazenamento',
  fonte: 'Fonte (PSU)',
  gabinete: 'Gabinete',
  refrigeracao: 'Refrigeração'
};

const componentIcons = {
  cpu: '🖥️',
  placaMae: '🔌',
  gpu: '🎮',
  memoriaRam: '💾',
  armazenamento: '💿',
  fonte: '⚡',
  gabinete: '📦',
  refrigeracao: '❄️'
};

const totalPrice = computed(() => {
  if (!build) return 0;
  return Object.values(build).reduce((sum, component) => {
    return sum + (component?.preco || 0);
  }, 0);
});

// Helper para saber se a CPU precisa de cooler (lógica do backend replicada)
function doesCpuNeedCooler(cpu) {
    if (!cpu || !cpu.nome) return true;
    const name = cpu.nome.toUpperCase();
    if (name.endsWith("G")) return false;
    if (name.includes("I3-12100F") || name.includes("RYZEN 5 5600")) return false;
    return true;
}

// NOVA Helper para saber se a CPU é uma APU
function isApu(cpu) {
    if (!cpu || !cpu.nome) return false;
    // Nossa lógica de backend define APUs como CPUs que terminam em "G"
    return cpu.nome.toUpperCase().endsWith("G");
}
</script>

<style scoped>
.results-view {
  padding: 2rem 3rem;
  display: flex;
  justify-content: center;
}
.container {
  width: 100%;
  max-width: 900px;
}
.view-header {
  text-align: center;
  margin-bottom: 3rem;
}
.view-header h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.view-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}
.build-summary {
  background-color: var(--surface);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total-price span {
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.total-price h2 {
  margin: 0.25rem 0 0;
  font-size: 2.25rem;
  font-weight: bold;
  color: var(--primary);
}
.summary-actions {
  display: flex;
  gap: 1rem;
}
.summary-actions button {
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary {
  background-color: var(--primary);
  color: var(--text-primary);
}
.btn-primary:hover {
  background-color: var(--primary-hover);
}
.btn-secondary {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.btn-secondary:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}
.component-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.component-item {
  background-color: var(--surface);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--surface);
  transition: border-color 0.2s;
  min-height: 60px;
}
.component-item:hover {
  border-color: var(--border-color);
}
.component-type {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 30%;
}
.type-icon {
  font-size: 1.5rem;
  background-color: rgba(62, 139, 242, 0.1);
  border-radius: 8px;
  padding: 0.5rem;
  line-height: 1;
}
.type-name {
  font-weight: 500;
  color: var(--text-secondary);
}
.component-details {
  width: 50%;
  text-align: left;
}
.component-name {
  display: block;
  font-weight: 600;
  color: var(--text-primary);
}
.component-brand {
  display: block;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.component-price {
  width: 20%;
  text-align: right;
  font-size: 1.1rem;
  font-weight: 600;
}
.not-found {
  width: 70%;
  text-align: left;
}
.not-found .component-name {
  font-style: italic;
  font-weight: 500;
  color: #E53E3E;
}
.included {
  width: 70%;
  text-align: left;
}
.included .component-name {
  font-weight: 500;
  color: #38A169;
}
.included .component-brand {
  font-style: italic;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
</style>

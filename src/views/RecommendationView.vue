<template>
  <main class="recommendation-view">
    <div class="container">
      <header class="view-header">
        <h1>Questionário de Recomendação</h1>
        <p>Conte-nos suas necessidades para criarmos a build perfeita.</p>
      </header>

      <section class="question-card">
        <h2>Qual será o uso principal do PC?</h2>
        <p class="subtitle">Isso nos ajuda a priorizar as peças certas para sua necessidade.</p>
        <div class="options-grid">
          <div
            class="option-item"
            :class="{ selected: selectedUsage === 'Gaming' }"
            @click="selectUsage('Gaming')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 17H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2" />
              <path d="M12 15v4H8l-4 4V15h12Z" />
            </svg>
            <h3>Gaming</h3>
            <p>Jogos e entretenimento</p>
          </div>
          <div
            class="option-item"
            :class="{ selected: selectedUsage === 'Trabalho' }"
            @click="selectUsage('Trabalho')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            <h3>Trabalho</h3>
            <p>Produtividade e profissional</p>
          </div>
          <div
            class="option-item"
            :class="{ selected: selectedUsage === 'Estudos' }"
            @click="selectUsage('Estudos')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="m4 6 8-4 8 4-8 4-8-4Z" />
              <path d="M12 10v12" />
              <path
                d="M18.1 7.4c.5.2.9.7.9 1.3v5.5c0 .6-.4 1.1-.9 1.3L12 18l-6.1-2.5c-.5-.2-.9-.7-.9-1.3V8.7c0-.6.4-1.1.9-1.3L12 4l6.1 3.4Z"
              />
            </svg>
            <h3>Estudos</h3>
            <p>Acadêmico e aprendizado</p>
          </div>
        </div>
      </section>

      <section class="question-card">
        <h2>Qual é seu orçamento?</h2>
        <p class="subtitle">Definiremos as melhores peças dentro da sua faixa de preço.</p>
        <div class="options-grid-4">
          <div
            class="option-item budget"
            :class="{ selected: selectedBudget === 'Econômico' }"
            @click="selectBudget('Econômico')"
          >
            <span>$</span>
            <h3>Econômico</h3>
            <p>R$ 2.000 - 4.000</p>
          </div>
          <div
            class="option-item budget"
            :class="{ selected: selectedBudget === 'Intermediário' }"
            @click="selectBudget('Intermediário')"
          >
            <span>$</span>
            <h3>Intermediário</h3>
            <p>R$ 4.001 - 7.000</p>
          </div>
          <div
            class="option-item budget"
            :class="{ selected: selectedBudget === 'Alto' }"
            @click="selectBudget('Alto')"
          >
            <span>$</span>
            <h3>Alto</h3>
            <p>R$ 7.001 - 12.000</p>
          </div>
          <div
            class="option-item budget"
            :class="{ selected: selectedBudget === 'Extremo' }"
            @click="selectBudget('Extremo')"
          >
            <span>$</span>
            <h3>Extremo</h3>
            <p>R$ 12.000+</p>
          </div>
        </div>
      </section>

      <div class="generate-button-container">
        <button
          class="generate-btn"
          :disabled="!selectedUsage || !selectedBudget"
          @click="generateRecommendation"
        >
          Gerar recomendação
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const selectedUsage = ref(null)
const selectedBudget = ref(null)
const recommendedBuild = ref(null) // Variável para guardar o resultado

function selectUsage(usage) {
  selectedUsage.value = usage
}

function selectBudget(budget) {
  selectedBudget.value = budget
}

// NOVA FUNÇÃO PARA CHAMAR A API
async function generateRecommendation() {
  if (!selectedUsage.value || !selectedBudget.value) return

  try {
    const requestBody = {
      usage: selectedUsage.value,
      budget: selectedBudget.value,
    }

    const response = await fetch('http://localhost:8080/api/recommendations/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error('Falha ao gerar recomendação')
    }

    const buildData = await response.json()
    recommendedBuild.value = buildData

    // A MÁGICA ACONTECE AQUI: Exibimos o resultado no console
    console.log('Build Recomendada:', recommendedBuild.value)
    alert(
      'Recomendação gerada com sucesso! Verifique o console do navegador (F12) para ver os detalhes da build.',
    )
  } catch (error) {
    console.error('Erro ao gerar recomendação:', error)
    alert(
      'Ocorreu um erro ao gerar a recomendação. Verifique se a API está no ar e se há peças cadastradas.',
    )
  }
}
</script>

<style scoped>
/* O CSS permanece o mesmo da versão anterior */
.recommendation-view {
  padding: 2rem 3rem;
  display: flex;
  justify-content: center;
}
.container {
  width: 100%;
  max-width: 800px;
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
.question-card {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}
.question-card h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}
.subtitle {
  color: var(--text-secondary);
  margin-top: 0;
  margin-bottom: 2rem;
}
.options-grid,
.options-grid-4 {
  display: grid;
  gap: 1.5rem;
}
.options-grid {
  grid-template-columns: repeat(3, 1fr);
}
.options-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}
.option-item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.option-item:hover {
  border-color: var(--primary);
  background-color: rgba(62, 139, 242, 0.1);
  transform: translateY(-5px);
}
.option-item.selected {
  border-color: var(--primary);
  background-color: rgba(62, 139, 242, 0.1);
  transform: translateY(-5px);
  box-shadow: 0 0 15px rgba(62, 139, 242, 0.3);
}
.option-item svg {
  color: var(--primary);
  margin-bottom: 1rem;
}
.option-item h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}
.option-item p {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
}
.budget span {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary);
  display: block;
  margin-bottom: 0.5rem;
}
.generate-button-container {
  text-align: center;
  margin-top: 1rem;
}
.generate-btn {
  background-color: var(--primary);
  color: var(--text-primary);
  border: none;
  padding: 1rem 3rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.generate-btn:hover {
  background-color: var(--primary-hover);
}
.generate-btn:disabled {
  background-color: var(--border-color);
  color: var(--text-secondary);
  cursor: not-allowed;
}
</style>

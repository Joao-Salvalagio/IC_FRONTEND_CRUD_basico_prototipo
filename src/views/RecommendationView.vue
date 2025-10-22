<template>
  <main class="recommendation-view">
    <div class="container">
      <header class="view-header">
        <h1>Questionário de Recomendação</h1>
        <p>Conte-nos suas necessidades para criarmos a build perfeita.</p>
      </header>

      <div class="progress-indicator">
        <div class="step" :class="{ active: currentStep >= 1 }"><span>1</span> Uso Principal</div>
        <div class="progress-line"></div>
        <div class="step" :class="{ active: currentStep >= 2 }"><span>2</span> Detalhes</div>
        <div class="progress-line"></div>
        <div class="step" :class="{ active: currentStep >= 3 }"><span>3</span> Orçamento</div>
      </div>

      <section v-if="currentStep === 1" class="question-card">
        <h2>Qual será o uso principal do PC?</h2>
        <p class="subtitle">Isso nos ajuda a priorizar as peças certas para sua necessidade.</p>
        <div class="options-grid">
          <div
            class="option-item"
            :class="{ selected: selectedUsage === 'Jogos' }"
            @click="selectUsage('Jogos')"
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
            <h3>Jogos</h3>
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

      <section v-if="currentStep === 2" class="question-card">
        <div v-if="selectedUsage === 'Jogos'">
          <h2>Que tipo de jogos você pretende jogar?</h2>
          <p class="subtitle">
            Isso define o poder necessário da sua placa de vídeo e processador.
          </p>
          <div class="options-grid">
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Leves' }"
              @click="selectDetail('Leves')"
            >
              <h3>Leves</h3>
              <p>Fortnite, LoL, Valorant</p>
            </div>
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Intermediários' }"
              @click="selectDetail('Intermediários')"
            >
              <h3>Intermediários</h3>
              <p>CS2, Warzone, Apex</p>
            </div>
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Pesados' }"
              @click="selectDetail('Pesados')"
            >
              <h3>Pesados</h3>
              <p>Cyberpunk, Alan Wake 2</p>
            </div>
          </div>
        </div>
        <div v-if="selectedUsage === 'Trabalho'">
          <h2>Qual é sua principal ferramenta de trabalho?</h2>
          <p class="subtitle">Isso nos ajuda a focar em processador, RAM ou placa de vídeo.</p>
          <div class="options-grid">
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Office' }"
              @click="selectDetail('Office')"
            >
              <h3>Office / Navegação</h3>
              <p>Word, Excel, muitas abas</p>
            </div>
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Edição de Vídeo' }"
              @click="selectDetail('Edição de Vídeo')"
            >
              <h3>Edição de Vídeo / Imagem</h3>
              <p>After Effects, Photoshop</p>
            </div>
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Render 3D' }"
              @click="selectDetail('Render 3D')"
            >
              <h3>Render 3D / CAD</h3>
              <p>Blender, AutoCAD</p>
            </div>
          </div>
        </div>
        <div v-if="selectedUsage === 'Estudos'">
          <h2>Como será seu uso para estudos?</h2>
          <p class="subtitle">Isso nos ajuda a equilibrar custo e performance.</p>
          <div class="options-grid">
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Básico' }"
              @click="selectDetail('Básico')"
            >
              <h3>Uso Básico</h3>
              <p>Textos, pesquisas, vídeos</p>
            </div>
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Multitarefa' }"
              @click="selectDetail('Multitarefa')"
            >
              <h3>Multitarefa / Hobby</h3>
              <p>Programação, jogos leves</p>
            </div>
            <div
              class="option-item"
              :class="{ selected: selectedDetail === 'Engenharia' }"
              @click="selectDetail('Engenharia')"
            >
              <h3>Engenharia / Dados</h3>
              <p>Simulações, análise, IA</p>
            </div>
          </div>
        </div>
      </section>

      <section v-if="currentStep === 3" class="question-card">
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

      <div class="navigation-buttons">
        <button v-if="currentStep > 1" @click="prevStep" class="nav-btn secondary">Voltar</button>
        <button
          v-if="currentStep < 3"
          @click="nextStep"
          :disabled="isNextDisabled"
          class="nav-btn primary"
        >
          Avançar
        </button>
        <button
          v-if="currentStep === 3"
          @click="generateRecommendation"
          :disabled="!selectedBudget"
          class="nav-btn primary"
        >
          Gerar Recomendação
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store } from '../store.js'

const router = useRouter()
const currentStep = ref(1)

const selectedUsage = ref(null)
const selectedDetail = ref(null)
const selectedBudget = ref(null)

function selectUsage(usage) {
  selectedUsage.value = usage
  selectedDetail.value = null
}
function selectDetail(detail) {
  selectedDetail.value = detail
}
function selectBudget(budget) {
  selectedBudget.value = budget
}

function nextStep() {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}
function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const isNextDisabled = computed(() => {
  if (currentStep.value === 1) {
    return !selectedUsage.value
  }
  if (currentStep.value === 2) {
    return !selectedDetail.value
  }
  return false
})

async function generateRecommendation() {
  if (!selectedUsage.value || !selectedDetail.value || !selectedBudget.value) return
  try {
    const response = await fetch('http://localhost:8080/api/recommendations/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usage: selectedUsage.value,
        detail: selectedDetail.value,
        budget: selectedBudget.value,
      }),
    })
    if (!response.ok) throw new Error('Falha ao gerar recomendação')
    const buildData = await response.json()
    store.recommendedBuild = buildData
    router.push('/resultado')
  } catch (error) {
    console.error('Erro ao gerar recomendação:', error)
    alert('Ocorreu um erro ao gerar a recomendação.')
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
  margin-bottom: 2rem;
}
h1 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}
.view-header p {
  color: var(--text-secondary);
  font-size: 1rem;
}
.progress-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
}
.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-secondary);
  transition: color 0.4s;
}
.step span {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: 0.5rem;
  background-color: var(--surface);
  transition: all 0.4s;
}
.step.active {
  color: var(--text-primary);
}
.step.active span {
  border-color: var(--primary);
  color: var(--primary);
}
.progress-line {
  flex-grow: 1;
  height: 2px;
  background-color: var(--border-color);
  margin: 0 1rem;
  margin-bottom: 1.5rem;
}
.question-card {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
}
h2 {
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
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.nav-btn {
  border: none;
  padding: 0.8rem 2.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-btn.primary {
  background-color: var(--primary);
  color: var(--text-primary);
}
.nav-btn.primary:hover {
  background-color: var(--primary-hover);
}
.nav-btn.primary:disabled {
  background-color: var(--border-color);
  color: var(--text-secondary);
  cursor: not-allowed;
}
.nav-btn.secondary {
  background-color: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
}
.nav-btn.secondary:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}
.navigation-buttons:has(.generate-btn) {
  justify-content: flex-end;
}
</style>

import { reactive } from 'vue'

// Cria um objeto reativo que pode ser compartilhado entre componentes
export const store = reactive({
  recommendedBuild: null,
})

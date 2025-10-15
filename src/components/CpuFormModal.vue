<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="nome">Nome do Processador</label>
          <input id="nome" v-model="formData.nome" type="text" required />
        </div>
        <div class="form-group">
          <label for="marca">Marca</label>
          <input id="marca" v-model="formData.marca" type="text" required />
        </div>
        <div class="form-group">
          <label for="soquete">Soquete</label>
          <input id="soquete" v-model="formData.soquete" type="text" required />
        </div>
        <div class="form-group">
          <label for="preco">Preço</label>
          <input id="preco" v-model.number="formData.preco" type="number" step="0.01" required />
        </div>

        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  cpu: {
    type: Object,
    default: null,
  },
})

const formData = ref({ id: null, nome: '', marca: '', soquete: '', preco: 0.0 })

const modalTitle = computed(() => {
  return props.cpu ? 'Editar Processador' : 'Adicionar Novo Processador'
})

watch(
  () => props.cpu,
  (newCpu) => {
    if (newCpu) {
      formData.value = { ...newCpu }
    } else {
      formData.value = { id: null, nome: '', marca: '', soquete: '', preco: 0.0 }
    }
  },
  { immediate: true },
)

const emit = defineEmits(['close', 'save'])

function handleSubmit() {
  emit('save', formData.value)
}
</script>

<style scoped>
/* Os estilos são os mesmos do UserFormModal, garantindo consistência */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background-color: var(--surface);
  padding: 2.5rem 3rem;
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.modal-content h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  background-color: var(--background);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}
.modal-actions button {
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.btn-cancel {
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.btn-cancel:hover {
  background-color: var(--border-color);
  color: var(--text-primary);
}
.btn-save {
  background-color: var(--primary);
  color: var(--text-primary);
}
.btn-save:hover {
  background-color: var(--primary-hover);
}
</style>

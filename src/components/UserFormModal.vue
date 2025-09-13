<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>{{ modalTitle }}</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Nome</label>
          <input id="name" v-model="formData.name" type="text" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="formData.email" type="email" required />
        </div>
        <div class="form-group">
          <label for="function">Função</label>
          <input id="function" v-model="formData.function" type="text" required />
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
import { ref, watch, computed } from 'vue';

// 1. O componente agora ACEITA uma "propriedade" chamada 'user'
const props = defineProps({
  user: {
    type: Object,
    default: null
  }
});

// 2. Cria um estado local para o formulário
const formData = ref({ id: null, name: '', email: '', function: '' });

// 3. O título agora é calculado com base se estamos editando ou criando
const modalTitle = computed(() => {
  return props.user ? 'Editar Usuário' : 'Adicionar Novo Usuário';
});

// 4. 'watch' observa a propriedade 'user'. Se ela mudar, o formulário é atualizado
watch(() => props.user, (newUser) => {
  if (newUser) {
    // Se recebemos um usuário (modo edição), preenche o formulário
    formData.value = { ...newUser };
  } else {
    // Se não (modo criação), reseta o formulário
    formData.value = { id: null, name: '', email: '', function: '' };
  }
}, { immediate: true }); // 'immediate: true' faz isso rodar assim que o componente é criado

const emit = defineEmits(['close', 'save']);

function handleSubmit() {
  // Emite o evento 'save' com os dados do formulário
  emit('save', formData.value);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(0, 0, 0, 0.7); display: flex;
  justify-content: center; align-items: center; z-index: 1000;
}
.modal-content {
  background-color: var(--surface);
  padding: 2.5rem 3rem; /* Aumentei o padding horizontal para 3rem */
  border-radius: 12px;
  width: 100%;
  max-width: 550px; /* Aumentei a largura máxima para 550px */
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}
.modal-content h2 { margin-top: 0; margin-bottom: 1.5rem; }
.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block; margin-bottom: 0.5rem; color: var(--text-secondary);
  font-size: 0.9rem; font-weight: 500;
}
.form-group input {
  width: 100%; padding: 0.75rem; border: 1px solid var(--border-color);
  background-color: var(--background); border-radius: 8px;
  color: var(--text-primary); font-size: 1rem;
}
.modal-actions {
  display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem;
}
.modal-actions button {
  border: none; padding: 0.75rem 1.5rem; border-radius: 8px;
  font-size: 0.9rem; font-weight: 600; cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.btn-cancel {
  background-color: transparent; color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
.btn-cancel:hover { background-color: var(--border-color); color: var(--text-primary); }
.btn-save { background-color: var(--primary); color: var(--text-primary); }
.btn-save:hover { background-color: var(--primary-hover); }
</style>
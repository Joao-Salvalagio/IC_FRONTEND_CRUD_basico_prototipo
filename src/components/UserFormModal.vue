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
          <label for="password">Senha</label>
          <input id="password" v-model="formData.password" type="password" :required="!isEditing" />
          <small v-if="isEditing">Deixe em branco para não alterar a senha atual.</small>
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

const props = defineProps({
  user: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);

// formData INICIAL AGORA INCLUI A SENHA (como string vazia)
const formData = ref({ id: null, name: '', email: '', password: '', function: '' });

// Variável para saber se estamos no modo de edição
const isEditing = computed(() => !!props.user);

const modalTitle = computed(() => {
  return isEditing.value ? 'Editar Usuário' : 'Adicionar Novo Usuário';
});

watch(() => props.user, (newUser) => {
  if (newUser) {
    // Em modo de edição, copiamos os dados, mas deixamos a senha em branco
    formData.value = { ...newUser, password: '' };
  } else {
    // Em modo de criação, resetamos tudo
    formData.value = { id: null, name: '', email: '', password: '', function: '' };
  }
}, { immediate: true });

function handleSubmit() {
  emit('save', formData.value);
}
</script>

<style scoped>
/* O CSS permanece o mesmo */
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background-color: var(--surface); padding: 2.5rem 3rem; border-radius: 12px; width: 100%; max-width: 550px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
h2 { margin-top: 0; margin-bottom: 1.5rem; } .form-group { margin-bottom: 1.5rem; }
label { display: block; margin-bottom: 0.5rem; color: var(--text-secondary); font-size: 0.9rem; font-weight: 500; }
input { width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); background-color: var(--background); border-radius: 8px; color: var(--text-primary); font-size: 1rem; }
small { color: var(--text-secondary); font-size: 0.8rem; margin-top: 0.25rem; display: block; }
.modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
button { border: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.2s ease-in-out; }
.btn-cancel { background-color: transparent; color: var(--text-secondary); border: 1px solid var(--border-color); }
.btn-save { background-color: var(--primary); color: var(--text-primary); }
</style>

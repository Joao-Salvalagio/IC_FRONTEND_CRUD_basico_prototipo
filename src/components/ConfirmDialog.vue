<template>
  <div class="modal-overlay">
    <div class="dialog-content">
      <h3>Confirmação</h3>
      <p>{{ message }}</p>
      <div class="dialog-actions">
        <button @click="$emit('cancel')" class="btn-cancel">Cancelar</button>
        <button @click="$emit('confirm')" class="btn-confirm">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
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
  z-index: 1001;
}
.dialog-content {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
}
.dialog-content h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}
.dialog-content p {
  margin-bottom: 2rem;
  color: var(--text-secondary);
}
.dialog-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.dialog-actions button {
  border: none;
  padding: 0.6rem 1.5rem;
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
.btn-confirm {
  background-color: #e53e3e;
  color: var(--text-primary);
}
.btn-confirm:hover {
  background-color: #c53030;
}
</style>

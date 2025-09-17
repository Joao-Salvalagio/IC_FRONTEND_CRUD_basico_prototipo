<template>
  <div class="modal-overlay">
    <div class="dialog-content">
      <h3>Aviso</h3>
      <p>{{ message }}</p>
      <div class="dialog-actions">
        <button @click="$emit('close')" class="btn-ok">OK</button>
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
defineEmits(['close'])
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
  z-index: 1002;
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
  color: var(--primary);
}
.dialog-content p {
  margin-bottom: 2rem;
  color: var(--text-secondary);
  line-height: 1.5;
  white-space: pre-wrap;
}
.dialog-actions {
  display: flex;
  justify-content: center;
}
.dialog-actions button {
  border: none;
  padding: 0.6rem 2.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}
.btn-ok {
  background-color: var(--primary);
  color: var(--text-primary);
}
.btn-ok:hover {
  background-color: var(--primary-hover);
}
</style>

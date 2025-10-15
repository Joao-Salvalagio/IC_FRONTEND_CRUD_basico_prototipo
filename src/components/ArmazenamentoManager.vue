<template>
  <Transition name="fade"
    ><ArmazenamentoFormModal
      v-if="isModalVisible"
      :armazenamento="itemToEdit"
      @close="closeModal"
      @save="handleSaveItem"
  /></Transition>
  <Transition name="fade"
    ><ConfirmDialog
      v-if="showConfirmDialog"
      message="Tem certeza que deseja excluir esta unidade de armazenamento?"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion"
  /></Transition>
  <main class="manager-view" :class="{ 'modal-open': isModalVisible || showConfirmDialog }">
    <header class="page-header">
      <div class="title">
        <div class="title-text">
          <h1>Gerenciar Armazenamento</h1>
          <p>Adicione, edite ou remova unidades de armazenamento da base de dados.</p>
        </div>
      </div>
      <div class="actions">
        <button @click="openCreateModal" class="add-user-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line></svg
          >Nova Unidade
        </button>
      </div>
    </header>
    <section class="user-list-container">
      <div class="list-header">
        <h2>Lista de Unidades de Armazenamento</h2>
        <p>{{ items.length }} itens cadastrados</p>
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Marca</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Preço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="items.length === 0">
            <td colspan="6" class="empty-message">{{ statusMessage }}</td>
          </tr>
          <tr v-else v-for="item in items" :key="item.id">
            <td>{{ item.nome }}</td>
            <td>{{ item.marca }}</td>
            <td>
              <span>{{ item.tipo }}</span>
            </td>
            <td>
              <span>{{ item.capacidadeGb }} GB</span>
            </td>
            <td>R$ {{ item.preco.toFixed(2) }}</td>
            <td>
              <button @click="openEditModal(item)" class="icon-button">✏️</button
              ><button @click="handleDeleteItem(item.id)" class="icon-button">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ArmazenamentoFormModal from './ArmazenamentoFormModal.vue'
import ConfirmDialog from './ConfirmDialog.vue'
const items = ref([])
const statusMessage = ref('Carregando...')
const isModalVisible = ref(false)
const itemToEdit = ref(null)
const showConfirmDialog = ref(false)
const itemToDeleteId = ref(null)
function openCreateModal() {
  itemToEdit.value = null
  isModalVisible.value = true
}
function openEditModal(item) {
  itemToEdit.value = item
  isModalVisible.value = true
}
function closeModal() {
  isModalVisible.value = false
  itemToEdit.value = null
}
function cancelDeletion() {
  showConfirmDialog.value = false
  itemToDeleteId.value = null
}
async function fetchItems() {
  try {
    const response = await fetch('http://localhost:8080/api/armazenamentos')
    if (!response.ok) throw new Error('Erro ao buscar itens')
    items.value = await response.json()
    if (items.value.length === 0) statusMessage.value = 'Nenhum item cadastrado.'
  } catch (error) {
    console.error(error)
    statusMessage.value = 'Falha ao carregar.'
  }
}
async function handleSaveItem(data) {
  try {
    const isUpdating = !!data.id
    const url = isUpdating
      ? `http://localhost:8080/api/armazenamentos/${data.id}`
      : 'http://localhost:8080/api/armazenamentos'
    const method = isUpdating ? 'PUT' : 'POST'
    const payload = isUpdating
      ? data
      : {
          nome: data.nome,
          marca: data.marca,
          tipo: data.tipo,
          capacidadeGb: data.capacidadeGb,
          preco: data.preco,
        }
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Erro ao salvar item')
    closeModal()
    await fetchItems()
  } catch (error) {
    console.error(error)
  }
}
function handleDeleteItem(id) {
  itemToDeleteId.value = id
  showConfirmDialog.value = true
}
async function confirmDeletion() {
  try {
    const response = await fetch(
      `http://localhost:8080/api/armazenamentos/${itemToDeleteId.value}`,
      { method: 'DELETE' },
    )
    if (!response.ok) throw new Error('Erro ao deletar item')
    items.value = items.value.filter((i) => i.id !== itemToDeleteId.value)
  } catch (error) {
    console.error(error)
  } finally {
    cancelDeletion()
  }
}
onMounted(fetchItems)
</script>

<style scoped>
/* Estilos são idênticos aos outros gerenciadores */
.manager-view {
  padding: 2rem 3rem;
  transition:
    filter 0.4s ease,
    transform 0.4s ease;
}
.manager-view.modal-open {
  filter: blur(5px);
  transform: scale(0.98);
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}
h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}
.page-header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.add-user-btn {
  background-color: var(--primary);
  color: var(--text-primary);
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.add-user-btn:hover {
  background-color: var(--primary-hover);
}
.user-list-container {
  background-color: var(--surface);
  padding: 2rem;
  border-radius: 12px;
}
.list-header {
  margin-bottom: 1.5rem;
}
h2 {
  margin: 0;
  font-weight: 600;
}
.list-header p {
  margin: 0.25rem 0 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}
thead tr {
  border-bottom: 1px solid var(--border-color);
}
tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease-in-out;
}
tbody tr:hover {
  background-color: rgba(62, 139, 242, 0.05);
}
th,
td {
  padding: 1rem;
  border-bottom: none;
  text-align: left;
  vertical-align: middle;
}
td span {
  display: inline-block;
  background-color: rgba(62, 139, 242, 0.15);
  color: #82b6fa;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}
.empty-message {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
}
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0.5rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}
.icon-button:hover {
  color: var(--primary);
}
</style>

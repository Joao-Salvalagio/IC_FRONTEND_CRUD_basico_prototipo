<template>
  <Transition name="fade">
    <UserFormModal 
      v-if="isModalVisible" 
      :user="userToEdit"
      @close="closeModal"
      @save="handleSaveUser" 
    />
  </Transition>

  <Transition name="fade">
    <ConfirmDialog
      v-if="showConfirmDialog"
      message="Tem certeza que deseja excluir este usuário?"
      @confirm="confirmDeletion"
      @cancel="cancelDeletion"
    />
  </Transition>
  
  <Transition name="fade">
    <AlertDialog
      v-if="showAlertDialog"
      :message="alertMessage"
      @close="showAlertDialog = false"
    />
  </Transition>

  <main class="user-management" :class="{ 'modal-open': isModalVisible || showConfirmDialog || showAlertDialog }">
    <header class="page-header">
      <div class="title">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        <div class="title-text">
          <h1>Gerenciar Usuários</h1>
          <p>Administração de contas e permissões</p>
        </div>
      </div>
      <div class="actions">
        <button @click="openCreateModal" class="add-user-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Novo usuário
        </button>
      </div>
    </header>

    <section class="user-list-container">
      <div class="list-header">
        <h2>Lista de Usuários</h2>
        <p>{{ userCountMessage }}</p>
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="users.length === 0">
            <td colspan="4" class="empty-message">{{ statusMessage }}</td>
          </tr>
          <tr v-else v-for="user in users" :key="user.id">
            <td>
              <div class="user-profile">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="user-avatar"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <div class="user-details">
                  <div class="user-name">{{ user.name }}</div>
                  <span class="user-id">ID: {{ user.id }}</span>
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span>{{ user.function }}</span>
            </td>
            <td>
              <button @click="openEditModal(user)" class="icon-button">✏️</button>
              <button @click="handleDeleteUser(user.id)" class="icon-button">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script setup>
// O SCRIPT NÃO MUDA. O CÓDIGO É O MESMO DA VERSÃO ANTERIOR.
import { ref, onMounted, computed } from 'vue';
import UserFormModal from '../components/UserFormModal.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import AlertDialog from '../components/AlertDialog.vue';

const users = ref([]);
const statusMessage = ref('Carregando usuários...');
const isModalVisible = ref(false);
const userToEdit = ref(null);
const showConfirmDialog = ref(false);
const userToDeleteId = ref(null);
const showAlertDialog = ref(false);
const alertMessage = ref('');

const userCountMessage = computed(() => {
  const count = users.value.length;
  if (count === 1) { return '1 usuário cadastrado'; }
  return `${count} usuários cadastrados`;
});

function openCreateModal() { userToEdit.value = null; isModalVisible.value = true; }
function openEditModal(user) { userToEdit.value = user; isModalVisible.value = true; }
function closeModal() { isModalVisible.value = false; userToEdit.value = null; }
function cancelDeletion() { showConfirmDialog.value = false; userToDeleteId.value = null; }

async function fetchUsers() {
  try {
    const response = await fetch('http://localhost:8080/usuarios');
    if (!response.ok) throw new Error('Erro ao buscar usuários');
    const data = await response.json();
    users.value = data;
    if (users.value.length === 0) {
      statusMessage.value = 'Nenhum usuário cadastrado.';
    }
  } catch (error) {
    console.error(error);
    statusMessage.value = 'Falha ao carregar usuários. Verifique se a API está no ar.';
  }
}

async function handleSaveUser(userData) {
  try {
    const isUpdating = !!userData.id;
    const url = isUpdating ? `http://localhost:8080/usuarios/${userData.id}` : 'http://localhost:8080/usuarios';
    const method = isUpdating ? 'PUT' : 'POST';
    
    const payload = isUpdating ? userData : {
      name: userData.name, email: userData.email, function: userData.function
    };

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (response.status === 409) {
        const errorData = await response.json();
        alertMessage.value = errorData.message;
        showAlertDialog.value = true;
      } else {
        throw new Error(isUpdating ? 'Erro ao atualizar usuário' : 'Erro ao criar usuário');
      }
      return; 
    }
    
    closeModal();
    await fetchUsers();

  } catch (error) {
    console.error(error);
    alertMessage.value = 'Ocorreu um erro inesperado. Tente novamente.';
    showAlertDialog.value = true;
  }
}

function handleDeleteUser(userId) {
  userToDeleteId.value = userId;
  showConfirmDialog.value = true;
}

async function confirmDeletion() {
  try {
    const response = await fetch(`http://localhost:8080/usuarios/${userToDeleteId.value}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
    
    users.value = users.value.filter(user => user.id !== userToDeleteId.value);
  } catch (error) {
    console.error(error);
  } finally {
    cancelDeletion();
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* O CSS NÃO MUDA. O CÓDIGO É O MESMO DA VERSÃO ANTERIOR. */
.user-management {
  padding: 2rem 3rem;
  transition: filter 0.4s ease, transform 0.4s ease;
}
.user-management.modal-open {
  filter: blur(5px);
  transform: scale(0.98);
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
}
.page-header .title {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.page-header .title-text h1 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}
.page-header .title-text p {
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
.list-header h2 {
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
.user-table thead tr {
  border-bottom: 1px solid var(--border-color);
}
.user-table tbody tr {
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s ease-in-out;
}
.user-table tbody tr:hover {
  background-color: rgba(62, 139, 242, 0.05);
}
.user-table th,
.user-table td {
  padding: 1rem;
  border-bottom: none; 
}
.user-table th {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  text-align: center;
}
.user-table th:first-child {
  text-align: left;
  padding-left: calc(36px + 2rem); 
}
.user-table td {
  text-align: center;
  vertical-align: middle;
}
.user-table td:last-child {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}
.user-table td span {
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
.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
}
.user-avatar {
  color: var(--text-secondary);
}
.user-name {
  font-weight: 500;
  color: var(--text-primary);
}
.user-id {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.15rem;
}
</style>
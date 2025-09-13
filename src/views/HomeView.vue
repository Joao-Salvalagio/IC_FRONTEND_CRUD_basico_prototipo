<template>
  <UserFormModal 
    v-if="isModalVisible" 
    :user="userToEdit"
    @close="closeModal"
    @save="handleSaveUser" 
  />

  <main class="user-management">
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
            <td>{{ user.name }}</td>
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
import { ref, onMounted, computed } from 'vue';
import UserFormModal from '../components/UserFormModal.vue';

const users = ref([]);
const statusMessage = ref('Carregando usuários...');
const isModalVisible = ref(false);
const userToEdit = ref(null);

const userCountMessage = computed(() => {
  const count = users.value.length;
  if (count === 1) { return '1 usuário cadastrado'; }
  return `${count} usuários cadastrados`;
});

function openCreateModal() {
  userToEdit.value = null;
  isModalVisible.value = true;
}

function openEditModal(user) {
  userToEdit.value = user;
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
  userToEdit.value = null;
}

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

// --- LÓGICA FINAL PARA SALVAR (CRIAR E ATUALIZAR) ---
// --- LÓGICA FINAL E CORRIGIDA PARA SALVAR (CRIAR E ATUALIZAR) ---
async function handleSaveUser(userData) {
  try {
    const isUpdating = !!userData.id;
    const url = isUpdating ? `http://localhost:8080/usuarios/${userData.id}` : 'http://localhost:8080/usuarios';
    const method = isUpdating ? 'PUT' : 'POST';

    // Prepara o corpo da requisição (payload)
    // Para criação (POST), enviamos um objeto sem a propriedade 'id'.
    // Para atualização (PUT), enviamos o objeto completo.
    const payload = isUpdating ? userData : {
      name: userData.name,
      email: userData.email,
      function: userData.function
    };

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload), // <-- Usamos o payload limpo
    });

    if (!response.ok) {
      throw new Error(isUpdating ? 'Erro ao atualizar usuário' : 'Erro ao criar usuário');
    }
    
    closeModal();
    await fetchUsers(); // Atualiza a lista para mostrar as mudanças

  } catch (error) {
    console.error(error);
    // Idealmente, mostraríamos uma mensagem de erro para o usuário aqui
  }
}

async function handleDeleteUser(userId) {
  if (!confirm('Tem certeza que deseja excluir este usuário?')) {
    return;
  }
  try {
    const response = await fetch(`http://localhost:8080/usuarios/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao deletar usuário');
    users.value = users.value.filter(user => user.id !== userId);
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  fetchUsers();
});
</script>

<style scoped>
/* O CSS permanece o mesmo, sem alterações */
.user-management {
  padding: 2rem 3rem;
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
}
.user-table th, .user-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}
.user-table th {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
}
.user-table td {
  font-size: 0.95rem;
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
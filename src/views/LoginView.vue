<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h2>🔐 Library Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="loginForm.username"
                  required
                  placeholder="Enter your username"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="loginForm.password"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{ isLoading ? 'Logging in...' : 'Login' }}
                </button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <small class="text-muted">
                Demo credentials: admin / password123
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')
const isLoading = ref(false)

// Hardcoded credentials for demo
const VALID_CREDENTIALS = {
  username: 'admin',
  password: 'password123'
}

import { login } from '../stores/auth.js'

const handleLogin = () => {
  isLoading.value = true
  errorMessage.value = ''
  
  // Simulate API call delay
  setTimeout(() => {
    if (loginForm.value.username === VALID_CREDENTIALS.username && 
        loginForm.value.password === VALID_CREDENTIALS.password) {
      // Use the auth store to login
      login(loginForm.value.username)
      
      // Redirect to home page
      router.push('/')
    } else {
      errorMessage.value = 'Invalid username or password. Please try again.'
    }
    isLoading.value = false
  }, 1000)
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  border-radius: 10px 10px 0 0;
}

.btn-primary {
  background-color: #275fda;
  border-color: #275fda;
}

.btn-primary:hover {
  background-color: #1976d2;
  border-color: #1976d2;
}
</style> 
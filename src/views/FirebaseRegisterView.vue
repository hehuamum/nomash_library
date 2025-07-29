<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h2>📝 Create Account</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                  placeholder="Enter your password"
                />
              </div>
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                {{ errorMessage }}
              </div>
              <div v-if="successMessage" class="alert alert-success" role="alert">
                {{ successMessage }}
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{ isLoading ? 'Creating Account...' : 'Save to Firebase' }}
                </button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <small class="text-muted">
                Already have an account? <router-link to="/fireLogin">Login here</router-link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter()
const auth = getAuth()
const errorMessage = ref("")
const successMessage = ref("")
const isLoading = ref(false)

const register = () => {
  // Reset messages
  errorMessage.value = ""
  successMessage.value = ""
  isLoading.value = true

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Register Successful!")
      successMessage.value = "Account created successfully! Redirecting to login..."
      setTimeout(() => {
        router.push("/fireLogin")
      }, 2000)
    })
    .catch((error) => {
      console.log(error.code)
    })
    .finally(() => {
      isLoading.value = false
    })
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
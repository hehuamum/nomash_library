<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h2>🔐 Firebase Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="signin">
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
              <div class="d-grid">
                <button type="submit" class="btn btn-primary" :disabled="isLoading">
                  {{ isLoading ? 'Signing in...' : 'Sign in via Firebase' }}
                </button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <small class="text-muted">
                Don't have an account? <router-link to="/fireRegister">Register here</router-link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const auth = getAuth();
const errorMessage = ref("");
const isLoading = ref(false);

const signin = () => {
  errorMessage.value = "";
  isLoading.value = true;

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Login Successful!");
      router.push("/");
      console.log(auth.currentUser);
    })
    .catch((error) => {
      console.log(error.code);
    })
    .finally(() => {
      isLoading.value = false;
    });
};
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
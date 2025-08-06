<template>
  <!-- Using Bootstrap's Header template with pill navigation -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page">
            Home (Week 5)
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">
            About
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">
            Add Book
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/members" class="nav-link" active-class="active">
            Members
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/login" class="nav-link" active-class="active">
            Login
          </router-link>
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <router-link to="/fireLogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">
            Get Weather
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">
            Count Book API
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button @click="handleLogout" class="nav-link logout-btn">
            Logout ({{ currentUser }})
          </button>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { isLoggedIn, currentUser, logout } from '../stores/auth.js'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<style scoped>
.nav-pills .nav-link {
  color: #275fda;
  background-color: #e3f2fd;
  border-radius: 20px;
  margin: 0 2px;
  padding: 8px 16px;
  transition: all 0.3s ease;
  border: none;
  text-decoration: none;
  cursor: pointer;
}

.nav-pills .nav-link:hover {
  background-color: #bbdefb;
  color: #1976d2;
}

.nav-pills .nav-link.active {
  background-color: #1976d2;
  color: white;
  font-weight: 500;
}

.logout-btn {
  background-color: #dc3545 !important;
  color: white !important;
}

.logout-btn:hover {
  background-color: #c82333 !important;
  color: white !important;
}
</style>

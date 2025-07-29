<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <div class="card">
          <div class="card-header text-center">
            <h1>🔐 Members Area</h1>
          </div>
          <div class="card-body">
            <div class="alert alert-success" role="alert">
              <h4 class="alert-heading">Welcome, {{ currentUser }}! 👋</h4>
              <p>You have successfully accessed the secure members area.</p>
            </div>
            
            <div class="row mt-4">
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">📚 Your Library</h5>
                    <p class="card-text">Access your personal library collection and reading history.</p>
                    <button class="btn btn-primary">View Library</button>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">📖 Borrowed Books</h5>
                    <p class="card-text">Check your currently borrowed books and due dates.</p>
                    <button class="btn btn-primary">View Borrowed</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="row mt-4">
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">⭐ Favorites</h5>
                    <p class="card-text">Manage your favorite books and reading lists.</p>
                    <button class="btn btn-primary">View Favorites</button>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card h-100">
                  <div class="card-body">
                    <h5 class="card-title">⚙️ Settings</h5>
                    <p class="card-text">Update your profile and preferences.</p>
                    <button class="btn btn-primary">Settings</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { currentUser } from '../stores/auth.js'
</script>

<style scoped>
.card-header {
  background-color: #275fda;
  color: white;
  border-radius: 10px 10px 0 0;
}

.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  border-radius: 10px;
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
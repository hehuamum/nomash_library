<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div class="card mt-5">
          <div class="card-header text-center">
            <h2>🚫 Access Denied</h2>
          </div>
          <div class="card-body text-center">
            <div class="mb-4">
              <i class="fas fa-lock" style="font-size: 4rem; color: #dc3545;"></i>
            </div>
            <h4 class="text-danger mb-3">Authentication Required</h4>
            <p class="text-muted mb-4">
              You need to be logged in to access this page. Please log in with your credentials to continue.
            </p>
            <div class="d-grid gap-2">
              <router-link to="/login" class="btn btn-primary">
                Go to Login
              </router-link>
              <router-link to="/" class="btn btn-outline-secondary">
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for this view
</script>

<style scoped>
.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #dc3545;
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
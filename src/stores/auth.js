import { ref, computed } from 'vue'

// Reactive authentication state
const isAuthenticated = ref(false)
const username = ref('')

// Check if user is already logged in on app start
const checkAuthStatus = () => {
  const authStatus = localStorage.getItem('isAuthenticated')
  const storedUsername = localStorage.getItem('username')
  
  if (authStatus === 'true' && storedUsername) {
    isAuthenticated.value = true
    username.value = storedUsername
  }
}

// Initialize auth status
checkAuthStatus()

// Computed properties
const isLoggedIn = computed(() => isAuthenticated.value)
const currentUser = computed(() => username.value)

// Authentication methods
const login = (user) => {
  isAuthenticated.value = true
  username.value = user
  localStorage.setItem('isAuthenticated', 'true')
  localStorage.setItem('username', user)
}

const logout = () => {
  isAuthenticated.value = false
  username.value = ''
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('username')
}

export {
  isAuthenticated,
  username,
  isLoggedIn,
  currentUser,
  login,
  logout,
  checkAuthStatus
} 
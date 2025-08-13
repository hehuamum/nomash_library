<template>
  <div class="count-book-api">
    <div class="header">
      <h1>Count Book API</h1>
      <p>Displaying JSON data from authors.json</p>
    </div>

    <div v-if="loading" class="loading">
      <p>Loading data...</p>
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div v-if="apiResponse" class="api-response">
      <h2>API Response:</h2>
      <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
    </div>

    <div v-if="authors.length > 0" class="stats">
      <h2>Statistics:</h2>
      <div class="stats-grid">
        <div class="stat-item">
          <h3>Total Authors</h3>
          <p class="stat-number">{{ authorsCount }}</p>
        </div>
        <div class="stat-item">
          <h3>Total Books</h3>
          <p class="stat-number">{{ totalBooks }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authors = ref([])
const loading = ref(false)
const error = ref(null)
const apiResponse = ref(null)

const authorsCount = ref(0)
const totalBooks = ref(0)

const calculateStats = () => {
  authorsCount.value = authors.value.length
  totalBooks.value = authors.value.reduce((total, author) => {
    return total + author.famousWorks.length
  }, 0)
}

const getApiData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch(new URL('../assets/json/authors.json', import.meta.url))
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    authors.value = data
    
    calculateStats()
    
  } catch (err) {
    error.value = `Error loading authors data: ${err.message}`
    console.error('Error loading authors data:', err)
  } finally {
    loading.value = false
  }

  apiResponse.value = {
    success: true,
    data: {
      authorsCount: authorsCount.value,
      totalBooks: totalBooks.value,
      authors: authors.value.map(author => ({
        name: author.name,
        bookCount: author.famousWorks.length,
      }))
    },
    timestamp: new Date().toISOString()
  }
}

onMounted(() => {
  getApiData()
})

defineExpose({
  getApiData
})
</script>

<style scoped>
.count-book-api {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  margin-bottom: 10px;
}

.header p {
  color: #666;
  font-size: 16px;
}

.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #ffcdd2;
}

.api-response {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 20px;
  margin-bottom: 30px;
}

.api-response h2 {
  color: #333;
  margin-bottom: 15px;
  font-size: 20px;
}

.api-response pre {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  overflow-x: auto;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.stats {
  margin-top: 30px;
}

.stats h2 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  background-color: #fff;
  border: 2px solid #e3f2fd;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: #1976d2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.stat-item h3 {
  color: #666;
  margin-bottom: 10px;
  font-size: 16px;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #1976d2;
  margin: 0;
}
</style>

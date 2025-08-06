<template>
  <div>
    <h1>Firestore Query Demonstrations</h1>
    
    <!-- Query Options -->
    <div class="query-controls">
      <h3>Query Options</h3>
      <div class="query-row">
        <label>ISBN Filter:</label>
        <select v-model="selectedFilter">
          <option value="all">All Books</option>
          <option value="gt1000">ISBN > 1000</option>
          <option value="lt1000">ISBN < 1000</option>
          <option value="range">ISBN 500-1500</option>
        </select>
      </div>
      
      <div class="query-row">
        <label>Sort By:</label>
        <select v-model="selectedSort">
          <option value="name">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="isbn">ISBN (Low-High)</option>
          <option value="isbn-desc">ISBN (High-Low)</option>
        </select>
        <small class="query-note" v-if="selectedFilter !== 'all' && (selectedSort === 'name' || selectedSort === 'name-desc')">
          ℹ️ Name sorting will be handled on client-side
        </small>
      </div>
      
      <div class="query-row">
        <label>Limit Results:</label>
        <select v-model="selectedLimit">
          <option value="all">All Results</option>
          <option value="5">5 Books</option>
          <option value="10">10 Books</option>
          <option value="20">20 Books</option>
        </select>
      </div>
      
      <button @click="executeQuery" class="query-btn">Execute Query</button>
    </div>
    
    <!-- Query Results -->
    <div class="results-section">
      <h3>Query Results ({{ books.length }} books found)</h3>
      <div class="query-info">
        <p><strong>Current Query:</strong> {{ currentQueryDescription }}</p>
      </div>
      
      <ul>
        <li v-for="book in books" :key="book.id">
          <div v-if="!book.isEditing">
            {{ book.name }} - ISBN: {{ book.isbn }}
            <div class="actions">
              <button @click="startEdit(book)" class="edit-btn">Edit</button>
              <button @click="deleteBook(book.id)" class="delete-btn">Delete</button>
            </div>
          </div>
          <div v-else class="edit-form">
            <input v-model="book.editName" type="text" placeholder="Book name" />
            <input v-model="book.editIsbn" type="number" placeholder="ISBN" />
            <div class="edit-actions">
              <button @click="saveEdit(book)" class="save-btn">Save</button>
              <button @click="cancelEdit(book)" class="cancel-btn">Cancel</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
  name: 'BookList',
  setup() {
    const books = ref([])
    const selectedFilter = ref('gt1000')
    const selectedSort = ref('name')
    const selectedLimit = ref('all')
    const currentQueryDescription = ref('')
    
    const buildQuery = () => {
      let q = collection(db, 'books')
      let conditions = []
      
      // WHERE conditions
      switch (selectedFilter.value) {
        case 'gt1000':
          conditions.push(where('isbn', '>', 1000))
          break
        case 'lt1000':
          conditions.push(where('isbn', '<', 1000))
          break
        case 'range':
          conditions.push(where('isbn', '>=', 500))
          conditions.push(where('isbn', '<=', 1500))
          break
        case 'all':
        default:
          break
      }
      
      // ORDER BY - Only use server-side sorting when safe
      switch (selectedSort.value) {
        case 'name':
          // Only sort by name if no WHERE condition (to avoid index issues)
          if (selectedFilter.value === 'all') {
            conditions.push(orderBy('name', 'asc'))
          }
          break
        case 'name-desc':
          if (selectedFilter.value === 'all') {
            conditions.push(orderBy('name', 'desc'))
          }
          break
        case 'isbn':
          // Always safe to sort by ISBN
          conditions.push(orderBy('isbn', 'asc'))
          break
        case 'isbn-desc':
          conditions.push(orderBy('isbn', 'desc'))
          break
      }
      
      // LIMIT
      if (selectedLimit.value !== 'all') {
        conditions.push(limit(parseInt(selectedLimit.value)))
      }
      
      // Build query with all conditions
      if (conditions.length > 0) {
        q = query(q, ...conditions)
      }
      
      return q
    }
    
    const getQueryDescription = () => {
      let description = 'SELECT * FROM books'
      let conditions = []
      
      // WHERE description
      switch (selectedFilter.value) {
        case 'gt1000':
          conditions.push('ISBN > 1000')
          break
        case 'lt1000':
          conditions.push('ISBN < 1000')
          break
        case 'range':
          conditions.push('ISBN BETWEEN 500 AND 1500')
          break
        case 'all':
        default:
          break
      }
      
      if (conditions.length > 0) {
        description += ` WHERE ${conditions.join(' AND ')}`
      }
      
      // ORDER BY description
      switch (selectedSort.value) {
        case 'name':
          if (selectedFilter.value === 'all') {
            description += ' ORDER BY name ASC'
          } else {
            description += ' (client-side name sorting)'
          }
          break
        case 'name-desc':
          if (selectedFilter.value === 'all') {
            description += ' ORDER BY name DESC'
          } else {
            description += ' (client-side name sorting)'
          }
          break
        case 'isbn':
          description += ' ORDER BY isbn ASC'
          break
        case 'isbn-desc':
          description += ' ORDER BY isbn DESC'
          break
      }
      
      // LIMIT description
      if (selectedLimit.value !== 'all') {
        description += ` LIMIT ${selectedLimit.value}`
      }
      
      return description
    }
    
    const executeQuery = async () => {
      try {
        const q = buildQuery()
        currentQueryDescription.value = getQueryDescription()
        
        const querySnapshot = await getDocs(q)
        let booksArray = []
        querySnapshot.forEach((doc) => {
          booksArray.push({
            id: doc.id,
            ...doc.data(),
            isEditing: false,
            editName: doc.data().name,
            editIsbn: doc.data().isbn
          })
        })
        
        // Client-side sorting for name when WHERE condition exists
        if (selectedFilter.value !== 'all' && (selectedSort.value === 'name' || selectedSort.value === 'name-desc')) {
          booksArray.sort((a, b) => {
            if (selectedSort.value === 'name') {
              return a.name.localeCompare(b.name)
            } else {
              return b.name.localeCompare(a.name)
            }
          })
        }
        
        books.value = booksArray
      } catch (error) {
        console.error('Error executing query: ', error)
        alert('Error executing query: ' + error.message)
      }
    }
    
    const startEdit = (book) => {
      book.isEditing = true
      book.editName = book.name
      book.editIsbn = book.isbn
    }
    
    const cancelEdit = (book) => {
      book.isEditing = false
    }
    
    const saveEdit = async (book) => {
      try {
        const isbnNumber = Number(book.editIsbn)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }
        
        await updateDoc(doc(db, 'books', book.id), {
          name: book.editName,
          isbn: isbnNumber
        })
        
        book.name = book.editName
        book.isbn = isbnNumber
        book.isEditing = false
        
        alert('Book updated successfully!')
      } catch (error) {
        console.error('Error updating book: ', error)
        alert('Error updating book')
      }
    }
    
    const deleteBook = async (bookId) => {
      if (confirm('Are you sure you want to delete this book?')) {
        try {
          await deleteDoc(doc(db, 'books', bookId))
          books.value = books.value.filter(book => book.id !== bookId)
          alert('Book deleted successfully!')
        } catch (error) {
          console.error('Error deleting book: ', error)
          alert('Error deleting book')
        }
      }
    }
    
    onMounted(() => {
      executeQuery()
    })
    
    return {
      books,
      selectedFilter,
      selectedSort,
      selectedLimit,
      currentQueryDescription,
      executeQuery,
      startEdit,
      cancelEdit,
      saveEdit,
      deleteBook
    }
  }
}
</script>

<style scoped>
div {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

h3 {
  color: #555;
  margin-bottom: 15px;
}

.query-controls {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid #dee2e6;
}

.query-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 15px;
}

.query-row label {
  min-width: 120px;
  font-weight: bold;
  color: #495057;
}

.query-row select {
  padding: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  min-width: 150px;
}

.query-note {
  color: #17a2b8;
  font-size: 12px;
  margin-left: 10px;
}

.query-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
}

.query-btn:hover {
  background-color: #0056b3;
}

.results-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.query-info {
  background-color: #e3f2fd;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  border-left: 4px solid #2196f3;
}

.query-info p {
  margin: 0;
  font-family: monospace;
  font-size: 14px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 15px;
  margin: 10px 0;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li:hover {
  background-color: #e9ecef;
}

.actions {
  display: flex;
  gap: 10px;
}

.edit-btn, .delete-btn, .save-btn, .cancel-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.save-btn {
  background-color: #007bff;
  color: white;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.edit-form {
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
}

.edit-form input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.edit-actions {
  display: flex;
  gap: 5px;
}
</style>

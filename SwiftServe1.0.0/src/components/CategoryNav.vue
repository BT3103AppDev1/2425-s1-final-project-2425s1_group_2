<template>
    <nav>
      <ul>
        <li 
          v-for="category in categories" 
          :key="category" 
          @click="$emit('category-selected', category)" 
          :class="{ active: activeCategory === category }"
        >
          {{ category }}
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      activeCategory: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        categories: ['All', 'Chinese', 'Western', 'Malay', 'Indian', 'Others', 'Beverages'],
      };
    },
  };
  </script>
  
  <style scoped>
  nav ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  display: flex;
  gap: 15px;
  border-bottom: 2px solid #eee; /* Add a bottom border */
}

nav li {
  padding: 8px 12px;
  cursor: pointer;
  border-bottom: 2px solid transparent; /* Add an invisible border for active state */
}

nav li.active {
  border-bottom-color: #007bff; /* Highlight the active category */
  font-weight: bold;
}
  </style>
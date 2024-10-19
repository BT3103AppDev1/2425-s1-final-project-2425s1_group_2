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
        required: true, // Passed from the parent to track the active category
      }
    },
    data() {
      return {
        categories: ['All', 'Chinese', 'Western', 'Malay', 'Indian', 'Others', 'Beverages'], // Category list
      };
    }
  };
  </script>
  
  <style scoped>
  nav ul {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    display: flex;
    gap: 15px;
    border-bottom: 3px solid black; 
  }
  
  nav li {
    padding: 8px 12px;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 2px solid transparent; 
    font-size: 22px;
  }
  
  nav li.active {
    font-weight: bold;
    color: #00ADB5;
  }
  </style>
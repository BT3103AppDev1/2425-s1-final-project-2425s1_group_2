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
  
  <!-- <style scoped>
  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 0.9375rem;
    border-bottom: 0.1875rem solid black; 
    flex-wrap: wrap;
  }
  
  nav li {
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 0.125rem solid transparent; 
    font-size: 1.8rem;
  }

  /* Hover effect */
  nav li:hover {
    color: #00adb5; /* Change text color on hover */
    
  }
  
  nav li.active {
    font-weight: bold;
    color: #00ADB5;
  }
  </style> -->

<style scoped>
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 0.5vw; /* Horizontal gap between items */
  border-bottom: 0.3vh solid black; /* Bottom border for nav */
  flex-wrap: wrap;
}

nav li {
  padding: 0.75vh 0.75vw; 
  cursor: pointer;
  font-weight: bold;
  /* border-bottom: 0.2vh solid transparent;  */
  font-size: 1.75vw; 
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

/* Hover effect */
nav li:hover {
  color: #00adb5;
}

nav li.active {
  font-weight: bold;
  color: #00adb5;
}
</style>
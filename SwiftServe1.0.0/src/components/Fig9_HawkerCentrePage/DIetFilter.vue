<template>
    <div class="filter-buttons">
      <button
        v-for="filter in filters"
        :key="filter.value"
        @click="$emit('filter-selected', filter.value)"
        :class="{ active: activeFilter === filter.value }"
      >
        {{ filter.label }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      filters: {
        type: Array,
        required: true
      },
      activeFilter: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .filter-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
    margin-bottom: 0.625rem;
  }
  
  .filter-buttons button {
    background-color: #ccc;
    border: none;
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
    cursor: pointer;
    width: 9.375rem;
    font-weight: bold;
  }
  
  .filter-buttons button.active {
    background-color: #00ADB5;
    color: white;
  }
  </style>
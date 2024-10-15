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
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .filter-buttons button {
    background-color: #ccc;
    border: none;
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;
    width: 150px;
    font-weight: bold;
  }
  
  .filter-buttons button.active {
    background-color: #00ADB5;
    color: white;
  }
  </style>
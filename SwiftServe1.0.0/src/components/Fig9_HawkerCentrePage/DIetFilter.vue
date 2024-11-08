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
}
</script>

<style scoped>
.filter-buttons {
  display: flex;
  flex-direction: column;
  gap: 1vh; 
  /* margin-bottom: 1vh; */
}

.filter-buttons button {
  background-color: #ccc;
  border: none;
  padding: 0.5vh 0.5vw; 
  border-radius: 2vw; 
  cursor: pointer;
  width: 6vw; 
  font-weight: bold;
  font-size: 1vw; 
  font-family: 'Inria Sans', sans-serif;
}

.filter-buttons button:hover {
  background-color: #00adb5; 
  color: white;
}

.filter-buttons button.active {
  background-color: #00adb5;
  color: white;
}
</style>

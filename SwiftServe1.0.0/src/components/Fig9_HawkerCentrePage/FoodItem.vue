<template>
  <div class="food-area">
    <div class="food-container">
      <div
        class="food-item"
        v-for="item in filteredItems"
        :key="item.id"
        :class="{ unavailable: !item.available }"
        @click="handleClick(item)"
      >
        <img :src="item.foodItemImage" :alt="item.foodItemName" />
        <h3>{{ item.foodItemName }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    handleClick() {
      // Only emit click event if the item is available
      if (this.item.available) {
        this.$emit('click', this.item)
      }
    }
  }
}
</script>

<style scoped>
.food-area {
  position: absolute;
  top: 25vh;
  left: 8vw;
  width: 90vw; /* This makes it stretch from 8vw to 100vw */
  height: 43vh;
}

.food-container {
  display: grid; /* Use grid layout */
  grid-template-columns: repeat(auto-fit, minmax(15vw, 1fr)); /* Adjust columns to fit the space */
  grid-auto-rows: minmax(20vh, auto); /* Allow rows to be at least 20vh */
  gap: 2vw; /* Gap between items */
  width: 100%;
  height: 100%;
  padding: 1vh;
  overflow-y: auto; /* Allow only the food-container div to scroll vertically */
  scrollbar-width: thin; /* For Firefox - make the scrollbar narrower */
  scrollbar-color: #00adb5 #e0e0e0; /* Custom colors for the scrollbar */
}

.food-container::-webkit-scrollbar {
  width: 0.8vw;
}

.food-container::-webkit-scrollbar-thumb {
  background: #00adb5;
  border-radius: 10px;
}

.food-container::-webkit-scrollbar-track {
  background: #e0e0e0;
}

.food-item {
  position: relative; /* Use relative positioning */
  width: 100%; /* Take full width of the grid cell */
  height: auto; /* Let the height be determined by content */
  cursor: pointer;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  text-align: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 1vh;
  box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.1);
  padding: 1vh;
  overflow: hidden; /* Ensure that content stays within the box */
}

.food-item img {
  width: 10vw;
  height: 10vw;
  object-fit: cover;
  margin-bottom: 0.5vh;
  border-radius: 1vh;
}

.food-item:hover img {
  transform: scale(1.05);
}

.food-item h3 {
  padding: 0;
  margin: 0;
  font-size: 1.25vw;
  color: #333;
  font-family: 'Inria Sans', sans-serif;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}

.food-item.unavailable {
  opacity: 0.5;
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>

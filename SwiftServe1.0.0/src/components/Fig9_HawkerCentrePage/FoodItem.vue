<template>
  <div class="food-item" :class="{ unavailable: !item.available }" @click="handleClick">
    <div v-if="item && item.foodItemImage && item.foodItemName">
      <img :src="item.foodItemImage" :alt="item.foodItemName" />
      <h3>{{ item.foodItemName }}</h3>
    </div>
    <div v-else>
      <p>Loading item data...</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    // Log items to check details
    console.log(this.item)
  },
  props: {
    item: {
      type: Object, //it is a dictionary
      required: true
    }
  },
  methods: {
    handleClick(item) {
      // Only emit click event if the item is available
      if (item.available) {
        console.log(item) // Log item to check details
        this.$emit('click', item) // Emit the selected item to parent
      }
    }
  }
}
</script>

<style scoped>
.food-item {
  position: relative;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: opacity 0.3s ease;
  text-align: center;
  height: 12.5vw;
  width: 12vw;
  margin-bottom: 20px; /*CHECK WITH EVERYONE*/
  align-items: center;
  z-index: 10;
}

.food-item img {
  position: relative;
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

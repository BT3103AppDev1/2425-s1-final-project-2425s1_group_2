<template>
  <div class="food-item" :class="{ unavailable: !item.available }" @click="handleClick">
    <img :src="item.foodItemImage" :alt="item.foodItemName" />
    <h3>{{ item.foodItemName }}</h3>
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
.food-item {
  text-overflow: ellipsis;
  cursor: pointer;
  transition: opacity 0.3s ease;
  text-align: center;
  height: 24vh;
  width: 12vw;
  margin-bottom: 5vh;
  align-items: center;
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

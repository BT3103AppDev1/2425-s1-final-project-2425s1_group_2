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
  /* border: 1px solid #e0e0e0;
    border-radius: 8px; */
  overflow: hidden;
  cursor: pointer;
  transition: opacity 0.3s ease;
  text-align: center;
}

.food-item img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 10px;
}

.food-item h3 {
  padding: 10px;
  margin: 0;
  font-size: 16px;
  color: #333;
  font-family: 'Inria Sans', sans-serif;
}

.food-item.unavailable {
  opacity: 0.5;
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>

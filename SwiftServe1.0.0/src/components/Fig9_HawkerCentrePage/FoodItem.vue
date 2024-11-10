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
  mounted() {},
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick(item) {
      if (item.available) {
        this.$emit('click', item)
        this.$forceUpdate()
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
  margin-bottom: 20px;
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

<template>
    <div 
      class="food-item" 
      :class="{ unavailable: !item.available }"
      @click="toggleAvailability"
    >
      <img :src="item.foodItemImage" :alt="item.foodItemName" />
      <h4>{{ item.foodItemName }}</h4>
    </div>
</template>
  
<script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      toggleAvailability() {
        this.$emit('toggle-availability', this.item);
      }
    }
  };
</script>
  
<style scoped>
  .food-item {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  
  .food-item img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .food-item h4 {
    padding: 10px;
    margin: 0;
    text-align: center;
    font-size: 16px;
    color: #333;
  }
  
  .food-item.unavailable {
    opacity: 0.5;
  }
</style>
  
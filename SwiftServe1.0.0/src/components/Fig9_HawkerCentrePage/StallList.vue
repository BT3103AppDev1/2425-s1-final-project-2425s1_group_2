<template>
    <div class="stall-list">
      <div 
        v-for="stall in stalls" 
        :key="stall.id" 
        :class="{ 'stall-item': true, active: stall === activeStall }" 
        @click="selectStall(stall)"
      >
        {{ stall.displayName }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      stalls: {
        type: Array,
        required: true,
      },
      activeStall: {
        type: Object,
        default: null
      }
    },
    methods: {
      selectStall(stall) {
        this.$emit('stall-selected', stall); 
      }
    }
  };
  </script>
  
  <style scoped>
  .stall-list {
    overflow-y: auto;
    width: 200px;
    height: 300px;
    border-right: 1px solid #ccc;
    margin-right: 20px; 
  }
  
  /* Base stall item styling */
  .stall-item {
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  
  /* Styling for active stall */
  .stall-item.active {
    background-color: #f0f0f0; /* Greyed-out background for active stall */
    font-weight: bold;
  }
  </style>
  

  
  
  
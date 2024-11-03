
  <template>
    <div class="stall-list">
      <div 
        v-for="stall in stalls" 
        :key="stall.id" 
        :class="{ 'stall-item': true, active: stall === activeStall }" 
        @click="selectStall(stall)"
      >
        <div class="stall-thumbnail-container" :class="{ 'active-thumbnail': stall === activeStall }">
          <img :src="stall.profilePicture" :alt="stall.displayName" class="stall-thumbnail">
        </div>
        <span class="stall-name">{{ stall.displayName }}</span>
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
    width: 100px;
    height: 300px;
    background-color: #e6f7f5; /* Light green background */
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-right: 10px;
  }
  
  .stall-item {
    display: flex;
    flex-direction: column; /* Stack image and name vertically */
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  
  .stall-item:last-child {
    border-bottom: none;
  }
  
  .stall-item.active {
    background-color: #e8f0fe;
  }
  
  .stall-thumbnail-container {
    width: 56px;
    height: 56px;
    border-radius: 8px;
    overflow: hidden;
    background-color: #f0f0f0;
    margin-bottom: 8px;
  }

  .stall-thumbnail-container:hover {
    transform: scale(1.2); 
    z-index: 1;
  }
  
  .stall-thumbnail-container.active-thumbnail {
    border: 2px solid #333333;
    padding: 6px;
    box-sizing: content-box;
  }
  
  .stall-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .stall-name {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
  }
  </style>
  
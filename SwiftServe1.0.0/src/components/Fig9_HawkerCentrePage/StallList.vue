<template>
  <div class="stall-list">
    <div
      v-for="stall in stalls"
      :key="stall.id"
      :class="{ 'stall-item': true, active: stall === activeStall }"
      @click="selectStall(stall)"
    >
      <div class="stall-thumbnail-container" :class="{ 'active-thumbnail': stall === activeStall }">
        <img :src="stall.profilePicture" :alt="stall.displayName" class="stall-thumbnail" />
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
      required: true
    },
    activeStall: {
      type: Object,
      default: null
    }
  },
  methods: {
    selectStall(stall) {
      this.$emit('stall-selected', stall)
    }
  }
}
</script>

<style scoped>
.stall-list {
  overflow-y: auto;
  position: absolute;
  top: 40vh;
  left: 0.5vw;
  width: 70vw;
  height: 38vh;
  background-color: #e6f7f5;
  border-radius: 1vh;
  box-shadow: 0 0.3vh 0.6vh rgba(0, 0, 0, 0.05);
  margin-right: 2vw;
}

.stall-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5vh 1vw; /* Adjusted padding */
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
  width: 4vw; /* Adjusted width for responsiveness */
  height: 4vw; /* Adjusted height for responsiveness */
  border-radius: 1vh;
  overflow: hidden;
  background-color: #f0f0f0;
  margin-bottom: 1vh;
  transition: transform 0.3s ease;
}

.stall-thumbnail-container:hover {
  transform: scale(1.2);
  z-index: 1;
}

.stall-thumbnail-container.active-thumbnail {
  border: 0.25vh solid #333333;
  padding: 0.7vh;
  box-sizing: content-box;
}

.stall-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stall-name {
  font-size: 0.85vw;
  color: #333333;
  font-weight: bold;
  text-align: center;
}
</style>

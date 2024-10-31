<template>
    <div class="stall-toggle">
      <h3 class="closeStallText">Click to open / close stall</h3>
      <label class="switch">
        <input type="checkbox" :checked="value" @change="$emit('update:value', $event.target.checked)">
        <span class="slider round"></span>
      </label>
    </div>
</template>
  
  <script>
  export default {
    props: {
      value: {
        type: Boolean,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .stall-toggle {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #00ADB5;
  }
  
  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .closeStallText {
    color: black;
  }
  </style>
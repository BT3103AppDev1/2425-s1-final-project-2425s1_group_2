<template>
  <header>
    <img src="../../SwiftServeLogoHoriz.png" alt="SwiftServe">
    <p class="userName">Welcome Spencer!</p>
    <div class="icons">
      <button><i class="fas fa-home"></i></button> 
      <button><i class="fas fa-cog"></i></button> 
      <button><i class="fas fa-filter"></i></button> 
    </div>
  </header>
</template>
  
  <style scoped>
  header {
  display: flex;
  justify-content: space-between; 
  align-items: center;
  padding: 10px 0;
  
}

header h1 {
  font-size: 24px;
  margin: 0;
}

.icons button {
  background: none;
  border: none;
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
}

.userName {
  font-weight: bold;
}

header img {
  width: 180px; 
  height: 60px; 
}
</style>
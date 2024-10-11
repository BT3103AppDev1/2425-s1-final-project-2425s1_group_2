<template>
  <div class="container">
    <form id = "userForm">
        <div class="formData">
          <div id="inputForm">
            <h2 class="inputTitles"> Email: </h2>
            <input type="text" class="inputBoxes" id = "email1" required=""> <br>

            <h2 class="inputTitles"> Username: </h2>
            <input type="text" class="inputBoxes" id = "username1" required=""> <br>

            <h2 class="inputTitles"> Password: </h2>
            <input type="text" class="inputBoxes" id = "password1" required=""> <br>

            <h2 class="inputTitles"> Confirm password: </h2>
            <input type="text" class="inputBoxes" id = "cPassword1" required=""> <br><br>
          </div>
        </div>
        <div class = "save">
                <button id = "savebutton" type="button" v-on:click="savetoFirestore()"> Sign Up </button> <br><br>
        </div>
    </form>
  </div>
</template>

<script>
</script>

<style scoped>
.formData {
  display: flex;
  margin-left: 30vw;
  margin-top: 20vh;
}

.save {
margin-left: 40vw;
}

.inputBoxes {
  width: 40vw;
  border-radius: 5px;
  border: 2px solid #00ADB5;
  
}

.inputTitles {
  color: #00ADB5;
  font-size:2.5vh;
  font-weight: bold;
}


button {
    background-color: #00ADB5;
    font-weight: bold;
    font-size: 3vh;
    color: white;
    border-radius: 5px;
    border: none;
    height: 5vh;
    width: 20vw;
}
</style>
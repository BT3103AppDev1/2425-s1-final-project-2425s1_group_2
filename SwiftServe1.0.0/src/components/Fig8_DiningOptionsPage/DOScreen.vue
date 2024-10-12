<template>
  <div class="diningLocator">
    <h3>Choose Dining Location</h3> <br>

    <div class="inputForm">
        <label for="hawkerCentre">Hawker Centre: </label>

        <select v-model="selectedHawkerCentre" id="hawkerCentre">
            <option v-for="centre in hawkerCentres" :key="centre" :value="centre">
                {{ centre }}
            </option>
        </select>
    </div>
    <br>
    <button @click="goHawkerCentrePage" id="HCButton">Let's go</button>
  </div>
</template>


<script>
export default {
  data() {
    return {

      hawkerCentres: [
        'Bukit Canberra Hawker Centre',
        'Fengshan Hawker Centre',
        'Tiong Bahru Hawker Centre',
        'Old Airport Road',
        'Chai Chee Hawker Centre'
      ],

      selectedHawkerCentre: ''
    };
  },
  //go to particular hawker centre page not done yet [selectedHawkerCentre]
  //goHawkerCentrePage button method not done yet
  //hawker centres hardcoded for now
}
</script>

<style scoped>

.diningLocator {
    margin-top: 20vh;
    text-align: center;
}

.inputForm {
    color: #00ADB5;
    font-size: 2.5vh;
}

h3 {
    font-weight: bold;
    font-size:4vh;
    color: #00ADB5;
}

#hawkerCentre {
    font-size: 2.5vh;
}

button {
    background-color: #00ADB5;
    font-weight: bold;
    font-size: 3vh;
    color: white;
    border-radius: 5px;
    border: none;
    height: 5vh;
    width: 15vw;
}
</style>

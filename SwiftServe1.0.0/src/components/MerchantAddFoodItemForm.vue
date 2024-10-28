<template>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="foodItemName">Food Item Name:</label>
        <input id="foodItemName" v-model="foodItemName" type="text" required />
      </div>
  
      <div class="form-group">
        <label for="foodItemImage">Food Item Image:</label>
        <input id="foodItemImage" type="file" @change="uploadImage" accept="image/*" />
      </div>
  
      <div class="form-group">
        <label for="foodItemPrice">Price:</label>
        <input id="foodItemPrice" v-model="foodItemPrice" type="number" step="0.10" required />
      </div>
  
      <div v-for="(addOn, index) in addOns" :key="index" class="add-on-section">
        <h3>Add-On {{ index + 1 }}</h3>
        <div class="form-group">
          <label for="addOnName">Add-On Name:</label>
          <input :id="addOnName" v-model="addOn.addOnName" type="text" required />
        </div>
        <div class="form-group">
          <label for="addOnPrice">Add-On Price:</label>
          <input :id="addOnPrice" v-model="addOn.addOnPrice" type="number" step="0.1" required />
        </div>
        <button type="button" @click="removeAddOn(index)" class="remove-button">
          Remove Add-On
        </button>
      </div>
  
      <button type="button" @click="addEmptyAddOn" class="add-button">
        Add Add-On
      </button>
      <button type="submit" class="submit-button">Save Food Item</button>
    </form>
  </template>
  
  <script>
  import { storage } from '../firebase.js';

  export default {
    data() {
      return {
        foodItemName: '',
        available: true,
        foodItemImage: null,
        foodItemImageUrl: '',
        foodItemPrice: 0,
        merchantId: 'VScvqRThQSKVCihILf9v',
        merchantName: 'Chin Lee Chicken Rice',
        addOns: [],
      };
    },
    methods: {
      async uploadImage(event) {
        const file = event.target.files[0];
        if (file) {
          // Assuming Firebase storage instance is set up as `this.$fire.storage`
          const storageRef = storage.ref(`images/${file.name}`);
          const snapshot = await storageRef.put(file);
          this.foodItemImageUrl = await snapshot.ref.getDownloadURL();
        }
      },
      addEmptyAddOn() {
        this.addOns.push({ addOnName: '', addOnPrice: 0 });
      },
      removeAddOn(index) {
        this.addOns.splice(index, 1);
      },
      submitForm() {
        const foodItemData = {
          foodItemName: this.foodItemName,
          available: this.available,
          foodItemImage: this.foodItemImageUrl,
          foodItemPrice: parseFloat(this.foodItemPrice),
          merchantId: this.merchantId,
          merchantName: this.merchantName,
          addOn: this.addOns.reduce((obj, item) => ({
            ...obj,
            [item.addOnName]: item.addOnPrice,
          }), {})
        };
        this.$emit('submit', foodItemData);
      }
    }
  };
  </script>
  
  <style scoped>
form {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0 auto;
  font-family: sans-serif;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type='text'],
input[type='number'],
input[type='file'] {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-on-section {
  border: 1px solid #eee;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.add-button,
.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;  

}

.remove-button {
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>
  
<template>
  <div class="form-container">
    <form @submit.prevent="openConfirmationModal" class="food-item-form">
      
      <div class="form-section">
        <div class="form-group">
          <label for="foodItemName">Food Item Name</label>
          <input 
            id="foodItemName" 
            v-model="foodItemName" 
            type="text" 
            @blur="capitalizeFoodItemName" 
            placeholder="Enter food item name"
            required 
          />
        </div>

        <div class="form-group">
          <label for="foodItemPrice">Price</label>
          <div class="price-input">
            <span class="currency-symbol">$</span>
            <input 
              id="foodItemPrice" 
              v-model="foodItemPrice" 
              type="number" 
              step="0.10" 
              placeholder="0.00"
              required 
            />
          </div>
        </div>

        <div class="form-group">
          <label for="foodItemImage">Food Item Image</label>
          <div class="image-upload-container">
            <div 
              class="image-upload-area"
              :class="{ 'has-image': foodItemImageUrl }"
              @click="triggerFileInput"
            >
              <input 
                id="foodItemImage" 
                type="file" 
                @change="uploadImage" 
                accept="image/*"
                ref="fileInput"
                class="hidden-input"
              />
              <div v-if="!foodItemImageUrl" class="upload-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/>
                  <line x1="16" y1="5" x2="22" y2="5"/>
                  <line x1="19" y1="2" x2="19" y2="8"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
                <span>Click to upload image</span>
              </div>
              <img 
                v-if="foodItemImageUrl" 
                :src="foodItemImageUrl" 
                alt="Food Item Preview" 
                class="image-preview" 
              />
            </div>
          </div>
        </div>
      </div>

      <div class="form-section add-ons-section">
        <h3 class="section-title">Add-Ons</h3>
        <div 
          v-for="(addOn, index) in addOns" 
          :key="index" 
          class="add-on-item"
        >
          <div class="add-on-header">
            <h4>Add-On {{ index + 1 }}</h4>
            <button 
              type="button" 
              @click="removeAddOn(index)" 
              class="remove-button"
              aria-label="Remove add-on"
            >
              ×
            </button>
          </div>
          
          <div class="add-on-content">
            <div class="form-group">
              <label :for="'addOnName' + index">Name</label>
              <input 
                :id="'addOnName' + index"
                v-model="addOn.addOnName" 
                type="text" 
                @blur="capitalizeAddOnName(index)"
                placeholder="Enter add-on name"
                required 
              />
            </div>
            
            <div class="form-group">
              <label :for="'addOnPrice' + index">Price</label>
              <div class="price-input">
                <span class="currency-symbol">$</span>
                <input 
                  :id="'addOnPrice' + index"
                  v-model="addOn.addOnPrice" 
                  type="number" 
                  step="0.10"
                  placeholder="0.00"
                  required 
                />
              </div>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          @click="addEmptyAddOn" 
          class="add-button"
        >
          + Add New Add-On
        </button>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">
          Save Food Item
        </button>
      </div>

      <p v-if="errorMessage" class="error-message" role="alert">
        {{ errorMessage }}
      </p>
    </form>

    <!-- Custom Modal for Confirming Addition of Food Item -->
    <div v-if="showConfirmationModal" class="modal-overlay">
      <div class="modal-content">
        <button class="close-button" @click="closeConfirmationModal">&times;</button>
        <div class="modal-text">
          <h2>Confirm Add Food Item</h2>
          <p>Are you sure you want to add this food item?</p>
          <div class="modal-actions">
            <button @click="submitForm()" class="modal-button">Yes, proceed to add</button>
            <button @click="closeConfirmationModal" class="modal-button">
              No, return to food item form
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { storage, db } from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default {
  data() {
    return {
      foodItemName: '',
      available: true,
      foodItemImage: null,
      foodItemImageUrl: '',
      foodItemPrice: 0,
      user: null,
      addOns: [],
      errorMessage: '',
      hawkerCentre: '',
      merchant: null,
      merchantName: '',
      showConfirmationModal: false,
    };
  },
  async mounted() {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;  
        this.fetchMerchant(this.user.uid);
      } 
    });
  },
  methods: {
    openConfirmationModal() {
      if (this.validateForm()) {
        this.showConfirmationModal = true;
      }
    },
    closeConfirmationModal() {
      this.showConfirmationModal = false;
    },
    async fetchMerchant(merchantId) {
      try {
          const merchantDoc = await db.collection('UserProfile').doc(merchantId).get();
          if (merchantDoc.exists) {
            this.merchant = merchantDoc.data();
            this.hawkerCentre = this.merchant.hawkerCentre;
            this.merchantName = this.merchant.displayName;
      
          } else {
          console.error('No such merchant!');
          }
      } catch (error) {
          console.error('Error fetching merchant:', error);
      }
    },
    capitalizeWords(text) {
      return text
        .toLowerCase() 
        .replace(/\b\w/g, (char) => char.toUpperCase()); 
    },
    capitalizeFoodItemName() {
      this.foodItemName = this.capitalizeWords(this.foodItemName);
    },
    capitalizeAddOnName(index) {
      this.addOns[index].addOnName = this.capitalizeWords(this.addOns[index].addOnName);
    },
    async uploadImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.foodItemImageUrl = URL.createObjectURL(file); // Local preview

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
    validateForm() {
      if (!this.foodItemName.trim()) {
        this.errorMessage = "Food Item Name cannot be empty.";
        return false;
      }
      if (this.foodItemPrice<=0) {
        this.errorMessage = "Price cannot be non-negative.";
        return false;
      }
      if (!this.foodItemPrice) {
        this.errorMessage = "Price cannot be empty.";
        return false;
      }
      if (!this.foodItemImageUrl) {
        this.errorMessage = "Image cannot be empty.";
        return false;
      }
      for (const addOn of this.addOns) {
        if (!addOn.addOnName.trim() || addOn.addOnPrice === null) {
          this.errorMessage = "All add-on fields must be filled out.";
          return false;
        }
        if (addOn.addOnPrice<=0) {
          this.errorMessage = "Add-on Price cannot be non-negative.";
          return false;
        }
      }
      this.errorMessage = ''; // Clear any previous error message
      return true;
    },
    submitForm() {
      if (!this.validateForm()) return; 
      const foodItemData = {
        foodItemName: this.foodItemName,
        available: this.available,
        foodItemImage: this.foodItemImageUrl,
        foodItemPrice: parseFloat(this.foodItemPrice),
        merchantId: this.user.uid,
        merchantName: this.merchantName,
        addOn: this.addOns.reduce((obj, item) => ({
          ...obj,
          [item.addOnName]: item.addOnPrice,
        }), {}),
        hawkerCentre: this.hawkerCentre,
      };
      this.$emit('submit', foodItemData);

      this.foodItemName = '';
      this.available = true;
      this.foodItemImage = null;
      this.foodItemImageUrl = '';
      this.foodItemPrice = 0;
      this.addOns = [];
      this.showConfirmationModal = false;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  height: 70vh;
  overflow-y: auto;
}

.food-item-form {
  background: white;
  border-radius: 12px;
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  padding: 2rem;
  font-family: 'Inria Sans', sans-serif;
  height: 70vh;
  /* overflow-y: auto; */
  /* flex: 1; */
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 2rem;
  text-align: center;
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.form-section:last-child {
  border-bottom: none;
}

.section-title {
  font-size: 1.25rem;
  color: #4a5568;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input[type="text"]:focus,
input[type="number"]:focus {
  outline: none;
  border-color: #00ADB5;
  box-shadow: 0 0 0 3px rgba(0, 173, 181, 0.1);
}

.price-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency-symbol {
  position: absolute;
  left: 0.75rem;
  color: #4a5568;
}

.price-input input {
  padding-left: 1.75rem;
}

.image-upload-container {
  width: 100%;
}

.image-upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;
}

.image-upload-area:hover {
  border-color: #00ADB5;
}

.image-upload-area.has-image {
  border-style: solid;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #718096;
}

.hidden-input {
  display: none;
}

.image-preview {
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.375rem;
}

.add-ons-section {
  background-color: #f7fafc;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.add-on-item {
  background: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.add-on-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.add-on-header h4 {
  margin: 0;
  color: #2d3748;
  font-size: 1rem;
}

.add-on-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
}

.remove-button {
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  line-height: 1;
}

.remove-button:hover {
  background-color: #fff5f5;
}

.add-button {
  width: 100%;
  padding: 0.75rem;
  background-color: white;
  border: 1px dashed #00ADB5;
  color: #00ADB5;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.add-button:hover {
  background-color: #f0fdfd;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #00ADB5;
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #009199;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-align: center;
}

@media (max-width: 640px) {
  .add-on-content {
    grid-template-columns: 1fr;
  }
  
  .form-container {
    margin: 1rem auto;
  }
  
  .food-item-form {
    padding: 1.5rem;
  }
}

/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #ffffff;
  border: 2px solid #00adb5;
  width: 400px;
  padding: 30px;
  position: relative;
  z-index: 1010;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #00adb5;
  color: white;
  border: none;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
}

.modal-text h2 {
  margin-bottom: 10px;
  color: #00adb5;
  text-align: center;
  font-size: 24px;
}

.modal-text p {
  font-size: 18px;
  line-height: 1.5;
  text-align: center;
  margin-bottom: 20px;
  color: #00adb5;
}

.modal-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-actions button {
  background-color: #00adb5;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-size: 15px;
  margin-bottom: 10px;
}

.modal-actions button:last-child {
  margin-bottom: 0;
}

.modal-actions button:hover {
  background-color: #007a80;
}

.modalbutton {
  font-family: 'Inria Sans', sans-serif;
}
</style>
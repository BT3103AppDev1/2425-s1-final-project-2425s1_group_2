<template>
  <div class="add-on-section">
    <h2>Add On</h2>
    <div v-for="addOn in addOns" :key="addOn.id" class="add-on-item">
      <span>{{ addOn.name }}</span>
      <span class="price"><span class="currency">$</span>{{ addOn.price }}</span>
      <div class="quantity-controls">
        <button @click="decreaseQuantity(addOn)">-</button>
        <span class="quantity">{{ addOn.quantity }}</span>
        <button @click="increaseQuantity(addOn)">+</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['addOns'],
  methods: {
    increaseQuantity(addOn) {
      addOn.quantity++
      this.$emit('updateAddOn', addOn)
    },
    decreaseQuantity(addOn) {
      if (addOn.quantity > 0) {
        addOn.quantity--
        this.$emit('updateAddOn', addOn)
      }
    }
    /*initialDisplay() {
        console.log(this.addOns);
        for (const addOn in this.addOns) {
          //console.log(addOn);
          //console.log(this.addOns[addOn]);
          let quantity = this.addOns[addOn]['quantity'];
          console.log(quantity)
          for (let i = 0; i < quantity; i++) {
            this.increaseQuantity(this.addOns[addOn]);
          }
          //console.log(this.addOns[addOn]['quantity']);
        }
      }*/
  },
  mounted() {
    console.log(this.addOns)
  }
}
</script>

<style scoped>
.add-on-section {
  margin-top: 20px;
}

.add-on-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.price {
  display: flex;
  align-items: center;
}

.currency {
  margin-right: 2px;
}

.quantity-controls {
  display: flex;
  align-items: center;
}

.quantity-controls .quantity {
  font-size: 1.2rem;
  margin: 0 15px;
  font-weight: bold;
  background-color: #c6d4d4;
  padding: 10px;
  border-radius: 8px;
}

.quantity-controls button {
  border: none;
  color: black;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;
}
</style>

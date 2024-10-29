<template>
    <div class="dashboard-header">
        <h1 class="title">Sales Dashboard</h1>
        <div class="period-buttons">
            <button :class="{ active: selectedPeriod === 'day' }" @click="selectPeriod('day')">
                Day
            </button>
            <button :class="{ active: selectedPeriod === 'week' }" @click="selectPeriod('week')">
                Week
            </button>
            <button :class="{ active: selectedPeriod === 'month' }" @click="selectPeriod('month')">
                Month
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DashboardHeader",
    data() {
        return {
            selectedPeriod: null,
        };
    },
    methods: {
        selectPeriod(period) {
            this.selectedPeriod = period;
            this.$emit("period-selected", period);
            console.log(this.selectedPeriod);
        },
    }
};
</script>

<style scoped>
.dashboard-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
}

.title {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.period-buttons {
    display: flex;
    gap: 10px;
}

.period-buttons button {
    padding: 10px 20px;
    font-size: 1rem;
    background-color: #00adb5;
    /* Light blue color for unselected */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.period-buttons button.active {
    background-color: white;
    /* White background for the selected button */
    color: #00adb5;
    /* Text color to match the unselected button background */
    border: 2px solid #00adb5;
}

.period-buttons button:not(.active):hover {
    background-color: #007a80;
    /* Slightly darker blue on hover */
}
</style>
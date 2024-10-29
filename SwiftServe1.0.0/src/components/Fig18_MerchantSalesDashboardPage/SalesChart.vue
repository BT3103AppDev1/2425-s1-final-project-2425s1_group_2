<template>
    <div class="sales-chart">
        <h2>Revenue Chart</h2>
        <line-chart :data="chartData" :discrete="true"  height = "180px" />
    </div>
</template>

<script>
import 'chartkick/chart.js';

export default {
    name: "SalesChart",
    props: {
        orders: {
            type: Array,
            required: true
        },
        selectedPeriod: {
            type: String,
            default: 'day'
        }
    },
    data() {
        return {
            chartData: []
        };
    },
    watch: {
        orders: "generateChartData",
        selectedPeriod: "generateChartData"
    },
    methods: {
        generateChartData() {
            const today = new Date();
            let intervals = [];

            if (this.selectedPeriod === 'day') {
                // Split the day into 4 six-hour intervals
                intervals = [
                    { label: '00:00 - 06:00', start: new Date(today.setHours(0, 0, 0, 0)), end: new Date(today.setHours(6, 0, 0, 0)) },
                    { label: '06:00 - 12:00', start: new Date(today.setHours(6, 0, 0, 0)), end: new Date(today.setHours(12, 0, 0, 0)) },
                    { label: '12:00 - 18:00', start: new Date(today.setHours(12, 0, 0, 0)), end: new Date(today.setHours(18, 0, 0, 0)) },
                    { label: '18:00 - 24:00', start: new Date(today.setHours(18, 0, 0, 0)), end: new Date(today.setHours(24, 0, 0, 0)) }
                ];
            } else if (this.selectedPeriod === 'week') {
                // Split the week into days (Sunday to Saturday)
                intervals = Array.from({ length: 7 }, (_, i) => {
                    const start = new Date(today);
                    start.setDate(today.getDate() - today.getDay() + i);
                    start.setHours(0, 0, 0, 0);
                    const end = new Date(start);
                    end.setHours(23, 59, 59, 999);
                    return { label: start.toDateString(), start, end };
                });
            } else if (this.selectedPeriod === 'month') {
                // Split the month into 4 weeks
                const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                intervals = Array.from({ length: 4 }, (_, i) => {
                    const start = new Date(firstDayOfMonth);
                    start.setDate(start.getDate() + i * 7);
                    const end = new Date(start);
                    end.setDate(start.getDate() + 6); // End of the week
                    end.setHours(23, 59, 59, 999);
                    return { label: `Week ${i + 1}`, start, end };
                });
            }

            // Calculate revenue for each interval
            this.chartData = intervals.map(interval => {
                const totalRevenue = this.orders
                    .filter(order => order.dateCreated >= interval.start && order.dateCreated <= interval.end)
                    .reduce((sum, order) => sum + (order.foodItemPrice * order.quantity), 0);
                return [interval.label, totalRevenue];
            });
        }
    },
    mounted() {
        this.generateChartData();
    }
};
</script>

<style scoped>
h2 {
    text-align: center;
    font-family: 'Inria Sans', sans-serif;
}
</style>
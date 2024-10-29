<template>
    <div class="sales-chart">
      <h2>Revenue Over Time</h2>
      <line-chart :data="chartData" :discrete="true" />
    </div>
  </template>
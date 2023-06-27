<template>
    <div class="card">
      <div class="card-value">{{ card.value }}</div>
      <div class="card-suit">{{ card.suit }}</div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Card',
    props: {
      card: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    width: 100px;
    height: 150px;
    border: 1px solid black;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px;
  }
  
  .card-value {
    font-size: 20px;
  }
  
  .card-suit {
    font-size: 15px;
  }
  </style>
  
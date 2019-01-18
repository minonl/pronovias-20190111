<template>
  <div id="app">
    <div id="nav">
      <i>links</i> :
      <router-link to="/">Home</router-link> |
      <router-link to="/appointment">Appointment</router-link> |
      <router-link to="/product/1">Product</router-link> |
      <router-link to="/product">Product List</router-link> |
      <router-link to="/upload">Upload Photo</router-link> |
      <router-link to="/result/1">Result</router-link>
    </div>
    <router-view/>
  </div>
</template>

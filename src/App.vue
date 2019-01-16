<template>
  <div id="app">
    <div id="nav">
      <i>links</i> :
      <router-link to="/">Home</router-link> |
      <router-link to="/product/1">Product</router-link> |
      <router-link to="/product">Product List</router-link> |
      <router-link to="/upload">Upload Photo</router-link> |
      <router-link to="/result">Result</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#nav {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(222,222,0,.5);
  padding: 1px;
}
</style>

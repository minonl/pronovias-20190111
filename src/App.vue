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

<style lang="scss">
body, #app {
  margin: 0;
  padding: 0;
  font-family: "PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
}
#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  background: rgba(222,222,0,.5);
  padding: 3px;
  z-index: 999;
}
button {
  border: none;
  border-radius: 3px;
  padding: .5em 1em;
  color: white;
  background-color: #ae9a64;
  outline: none;
  cursor: pointer;
  @media screen and (min-width: 370px){
    font-size: 1rem;
  }
}
</style>

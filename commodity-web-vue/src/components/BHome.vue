<template>
  <div>
    <top class="head"></top>
    <navigation-left class="left"/>
    <!-- <help></help> -->
    <div class="main">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Top from './Home/Top'
import NavigationLeft from './Home/NavigationLeft'
export default {
  components: {
    Top, NavigationLeft
  }
}
</script>

<style scoped>
.main{
    padding: 10px;
    position:absolute;
    top:50px;
    left:200px;
    bottom:0;
    right:0;
    overflow-y:auto;
    overflow-x:hidden;
}
.left{
      position:absolute;
      height:100%;
      top:50px;
      left:0;
      bottom:0;
      width:200px;
      border-right:1px solid rgba(42, 171, 210, 0.36);
      border-top:1px solid rgba(42, 171, 210, 0.36);
      overflow-x:hidden;
      overflow-y:auto;
  }
.head{
      position:absolute;
      top:0;
      left:0;
      right:0;
      height: 50px;
      background-color: #324057;
      color: white;
  }
</style>

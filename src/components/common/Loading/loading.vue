<template>
  <div class="load_win">
    <div id="load_c">
      <div id="load_size"></div>
      <div id="load_pro"><i style="display: inline-block">loading...</i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "loading",
    data() {
      return {
        time: null,
        deg: 360
      }
    },
    /*created() {
      console.log("创建了")
    },*/
    mounted() {
      this.addChange()
      this.time = setInterval(this.addChange, 100)
    },
    methods: {
      addChange() {
        let load = document.getElementById("load_size")
        if (load == null) {
          clearInterval(this.time)
          return
        }
        load.style.transform = "rotate(" + this.deg + "deg)"
        this.deg += 36
      }
    },
    destroyed() {
      //console.log("已经销毁")
      if (this.time != null)
        clearInterval(this.time)
    }
  }
</script>

<style>
  .load_win {
    width: 100%;
    height: 100%;
    background-color: rgb(222,222,222);
    text-align: center;
    z-index: 20000;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    font-size: 14px;
    font-weight: 700;
    position: absolute;
    color: rgb(49,194,124);
  }

  #load_c {
    position: relative;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    margin-top: -50px;
    margin-left: -50px;
  }

  #load_size {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-top: 2px solid skyblue;
    transition-duration: 0.9s;
    position: absolute;
  }

  #load_pro {
    width: 100%;
    height: 100%;
    text-align: center;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
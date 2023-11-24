<template>
  <div id="trigger">
    <span v-for="index in length" class="cir" :class="{'on':showcir(index-1)}"></span>
  </div>
</template>

<script>
  export default {
    name: "trigger",
    props: {
      currentIndex: {
        type: Number,
        default: () => 0
      },
      length: {
        type:Number,
        default: () => 0
      }
    },
    methods: {
      showcir(index) {//正确的展示当前选中的位置
        if (index == this.currentIndex) {
          return true
        } else if (this.currentIndex >= this.length && index == 0) {
          return true
        } else if (this.currentIndex == -1 && index == (this.length - 1)) {
          return true
        }
      },
    }
  }
</script>

<style>
  #trigger {
    position: absolute;
    right: 10px;
    bottom: 5px;
  }

  #trigger .cir {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 2px solid transparent;
    background-color: white;
    margin: 2px;
    transition-duration: 0.2s;
  }

  #trigger .cir:hover {
    cursor: pointer;
    border: 2px solid white;
    background-color: #00A1D6;
    transform: scale(1.2);
  }

  #trigger .on {
    border: 2px solid white;
    background-color: #00A1D6;
    transform: scale(1.2);
  }

</style>
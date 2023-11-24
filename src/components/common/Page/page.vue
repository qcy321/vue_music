<template>
  <div id="page">
    <i class="page_icon page_item" @click="first">首页</i>
    <i class="page_icon iconfont icon-ziyuan" @click="toPre"></i>
    <!--<i class="page_icon page_item" :class="{'page_none':pageCurrent<5}" @click="toSelect(1)" data-index="1">1</i>
    <i class="page_icon page_item" :class="{'page_none':isPreNone}">...</i>-->
    <i class="page_icon page_item" :data-index="pageStart+i-1"
       :class="{'page_current':pageCurrent==pageStart+i-1}"
       v-for="i of isOutFive"
       @click="toSelect(pageStart+i-1)">{{i+pageStart-1}}</i>
    <!--<i class="page_icon page_item" :class="{'page_none':isNextNone}">...</i>
    <i class="page_icon page_item " :class="{'page_none':pageCurrent>=pageTotal-5}" @click="toSelect(pageTotal)"
       :data-index="pageTotal">{{pageTotal}}</i>-->
    <i class="page_icon iconfont icon-ziyuan" style="transform: rotate(180deg)" @click="toNext"></i>
    <i class="page_icon page_item" @click="last">末页</i>
  </div>
</template>

<script>
  export default {
    name: "page",
    props: {
      pageTotal: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        pageStart: 1,
        pageCurrent: 1,
      }
    },
    computed: {
      isOutFive() {//总页数大于5时，保证显示页数按钮不超过5个。
        return this.pageTotal >= 5 ? 5 : this.pageTotal;
      }
    },
    watch: {
      pageCurrent() {
        this.$nextTick(() => {
          this.$emit("Current", this.pageCurrent)
        })
      }
    },
    methods: {
      first() {
        this.pageCurrent = 1
        this.pageStart = 1
      },
      last() {
        this.pageCurrent = this.pageTotal
        if (this.pageTotal <= 5)
          this.pageStart = 1
        else
          this.pageStart = this.pageTotal - 4
      },
      toPre() {
        if (this.pageCurrent <= 1) {//小于一不减
          return
        }
        if (this.pageCurrent + 2 <= this.pageTotal && this.pageCurrent - 2 > 1)//后面是否有两页,图标起始位置发生变化
        {
          this.pageStart--;
        }
        this.pageCurrent--;
      },
      toNext() {
        if (this.pageCurrent >= this.pageTotal)//大于总数不减
          return
        if (this.pageCurrent - 2 >= 1 && this.pageCurrent + 2 < this.pageTotal)//前面是否有两页,图标起始位置发生变化
        {
          this.pageStart++;
        }
        this.pageCurrent++;
      },
      toSelect(index) {
        if (index - 2 >= 1 && index + 2 <= this.pageTotal) {
          this.pageStart = index - 2;
        } else if (index + 2 > this.pageTotal && this.pageTotal > 5) {
          this.pageStart = this.pageTotal - 4;
        } else {
          this.pageStart = 1;
        }
        this.pageCurrent = index;
      },
    },
  }
</script>

<style scoped>
  #page {
    width: 600px;
    height: 100%;
    color: #a2a2a2;
    text-align: center;
    margin: auto;
    font-size: 16px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }

  .page_icon {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    text-align: center;
    padding: 0 17px;
    cursor: pointer;
  }

  .page_item {
    padding: 0 21px;
    margin: 0 5px;
  }

  .page_none {
    display: none;
  }

  .page_current {
    background-color: rgb(49, 194, 124);
    color: white;
  }

  .page_icon:hover {
    background-color: rgb(49, 194, 124);
    color: white;
  }
</style>
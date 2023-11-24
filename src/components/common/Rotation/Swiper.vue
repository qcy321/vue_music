<template>
  <div class="swiper">
    <i class="swiper_but iconfont icon-ziyuan" style="left: 0"
        @mouseenter="stop" @mouseleave="go" ref="pre"></i>
    <div class="swiper_wrap" ref="swiper_wrap">
      <slot><!--默认设置 也可以手动设置slot中的元素-->
        <swiper-item v-for="item in imgs" ref="item">
          <a href="#">
            <img :src="item.url"/>
          </a>
        </swiper-item>
      </slot>
    </div>
    <i class="swiper_but iconfont icon-ziyuan" style="right: 0;transform: rotate(180deg)"
        @mouseenter="stop" @mouseleave="go" ref="next"></i>
    <trigger :current-index="currentIndex" :length="imgLength"></trigger>
  </div>
</template>

<script>
  import SwiperItem from "./SwiperItem";
  import Trigger from "./Trigger";
  import methods from "./RotDiagram";//导入函数

  /**
   * 属性s_distance：滑动多少距离跳转,取值范围0-1
   * 属性imgs：图片数据
   * 属性speed:轮播的速度
   * 使用该组件默认格式为<swiper :imgs=“需要传递的图片信息,地址对应的是url:地址”><swiper/>
   *
   * 也可以自定义
   * <swiper >
   *  <swiper-item> 这个是小组件
   *    这里是自己想要的内容
   *  </swiper-item>
   * </swiper>
   */
  export default {
    name: "RotDiagram",
    components: {
      SwiperItem,
      Trigger
    },
    props: {
      s_distance: {//滑动多少距离轮换
        type: Number,
        default: () => 0.4
      },
      imgs: {//轮播图片数据
        type: Array,
        default: () => []
      },
      speed: {//调节速度
        type: Number,
        default: () => 0.4
      }
    },
    data() {
      return {
        currentIndex: 0,//当前轮播位置
        pre_click: true,//防止短时间内多次点击
        time: null,//定时器
        startX: 0,//触摸位置
        moveX: 0,//滑动距离
        swiper: {},//事件元素
        allEle: [],//所有元素
        nextEle: {},//下个轮播图的属性
        preEle: {},//前一个轮播图的属性
        currentEle: {},//当前轮播图的属性
        imgLength: 0//图片数量
      }
    },
    computed: {
      getWidth() {
        return this.allEle[0].offsetWidth
      }
    },
    methods,
    updated() {
      this.getCurrentEle()//获取当前元素
      this.getEle(this.currentEle)//获取下一个和者前一个元素
      this.show() //变动更改位置
    },
    mounted() {
      this.init()
    },
    destroyed() {
      console.log("销毁")
    }
  }
</script>

<style scoped>
  .swiper {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .swiper_wrap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .swiper_but {
    padding: 20px;
    font-size: 40px;
    position: absolute;
    color: whitesmoke;
    margin-top: -42px;
    top: 50%;
    z-index: 100;
    cursor: pointer;
  }

  .swiper_but:hover {
    color: rgb(49, 194, 124);;
  }
</style>
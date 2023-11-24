<template>
  <li class="song_ul_item"  :class="{'item_bac':index%2!=0}">
    <slot>
      <div class="list_item_i">
        <a class="item_a" href="#">乌鸦</a>
        <i class="song_mv_icon iconfont icon-shipin" v-if="false"></i>
        <ItemOperate/>
      </div>
      <div class="list_item_i">
        <a class="item_a" href="#">许嵩</a>
      </div>
      <div class="list_item_i">
        <a class="item_a" href="#">呼吸之野</a>
      </div>
      <div class="list_item_i">
        <span class="item_time_content">05:29</span>
        <div class="item_rab" v-if="state">
          <i class="song_icon iconfont icon-laji" @click="removeSong"></i>
        </div>
      </div>
    </slot>
  </li>
</template>

<script>
  import ItemOperate from "./ItemOperate";
  export default {
    name: "generalListItem",
    components:{ItemOperate},
    props: {
      lists: {//宽度
        type: Array,
        default() {
          return []
        }
      },
      state: {//状态，控制删除标签的显示
        type: Boolean,
        default() {
          return false;
        }
      },
      index:{
        type:Number,
        default(){
          return 0
        }
      }
    },
    methods:{
      removeSong() {
        //删除歌曲
      }
    }
    /*mounted() {
      this.init()//初始化
    },
    methods: {
      init() {
        this.initWith()//初始化宽度
        this.addEvent(this.state)//添加事件
        console.log("初始化")
      },
      initWith() {
        let songUlItem = document.getElementsByClassName("song_ul_item");
        for (let songUlItemElement of songUlItem) {
          let le = this.lists.length;
          songUlItemElement.children[0].classList.add("list_item_first")//添加标识
          songUlItemElement.children[le - 1].classList.add("list_item_last")//添加标识
          for (let i = 0; i < le; i++) {
            songUlItemElement.children[i].style.width = this.lists[i].width + "%"
          }
        }
      },
      addEvent(bol) {
        let itemTime = document.getElementsByClassName("list_item_last");
        if (bol) {//判断是不是用户的音乐，是的话才能添加鼠标事件
          for (let i = 0; i < itemTime.length; i++) {
            itemTime[i].addEventListener("mouseover", function () {
              itemTime[i].firstChild.style.display = "none";
              itemTime[i].lastChild.style.display = "block";
            })
            itemTime[i].addEventListener("mouseout", function () {
              itemTime[i].firstChild.style.display = "block"
              itemTime[i].lastChild.style.display = "none";
            })
          }
        }
      },
      removeSong() {
        //删除歌曲
      }
    }*/
  }
</script>

<style>
  .song_ul_item {
    width: 100%;
    height: 100%;
    height: 50px;
    line-height: 50px;
    list-style-type: decimal;
    margin-bottom: 5px;
  }

  .song_ul_item:hover .item_operate {
    display: inline-block;
  }

  .song_mv_icon {
    font-size: 24px;
    height: 100%;
    color: rgb(49, 194, 124);
    text-align: center;
    position: absolute;
    margin-left: 5px;
    cursor: pointer;
  }

  .item_a {
    display: inline-block;
    height: 100%;
    cursor: pointer;
    position: relative;
  }

  .item_rab {
    height: 100%;
    position: absolute;
    top: 0px;
    display: none;
  }

  .item_head {
    display: inline-block;
    position: absolute;
    width: 50px;
    height: 50px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
</style>
<template>
  <div id="song_list">
    <ul id="song_ul">
      <div class="song_ul_title item_title item_bac">
        <div class="list_item_i" v-for="list in lists" :style="{'width':list.width+'%'}">{{list.name}}</div>
      </div>
      <slot>
        <general-list-item :index="index" :state="state" :lists="lists" v-for="(i,index) in 10">
          <!--<div class="list_item_i">
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
          </div>-->
        </general-list-item>
      </slot>
    </ul>
  </div>
</template>

<script>
  import ItemOperate from "./ItemOperate";
  import GeneralListItem from "./generalListItem";

  export default {
    name: "generalList",
    components: {GeneralListItem, ItemOperate},
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
      }
    },
    mounted() {
      this.init()//初始化s
    },
    methods: {
      init() {
        this.initWith()//初始化宽度
        this.addEvent(this.state)//添加事件
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
      }
    }
  }
</script>

<style>
  #song_list {
    width: 100%;
    margin-top: 20px;
  }

  #song_ul {
    width: 100%;
    font-size: 14px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }

  .song_ul_title {
    width: 100%;
    height: 100%;
    height: 50px;
    line-height: 50px;
  }

  .item_title {
    color: #999;
  }

  .item_bac {
    background-color: #F7F7F7;
  }

  .list_item_i {
    height: 100%;
    float: left;
    box-sizing: border-box;
    padding: 0 20px;
    position: relative;
  }
</style>
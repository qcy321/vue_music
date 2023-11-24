<template>
  <div id="s_ran_win">
    <div id="s_ran_main">
      <div id="ua_list">
        <div id="ua_title">排行榜</div>
        <ul class="ua_ul">
          <li class="ua_li" :class="{'ua_li_current':current === index}" v-for="(r,index) in rank" @click="isCurrent(index)">{{r}}</li>
        </ul>
      </div>
      <div id="s_ran_content">
        <div id="s_ran_title">
          流量榜
        </div>
        <div>
          <GeneralList :lists="lists" :state="state">
            <GeneralListItem :index="index" :state="state" :lists="lists" v-for="(i,index) in 10">
              <div class="list_item_i">
                <a class="item_a" href="#">乌鸦</a>
                <ItemOperate/>
              </div>
              <div class="list_item_i">
                <a class="item_a" href="#">许嵩</a>
              </div>
              <div class="list_item_i">
                <span class="item_time_content">05:29</span>
                <div class="item_rab" v-if="state">
                  <i class="song_icon iconfont icon-laji" @click="removeSong"></i>
                </div>
              </div>
            </GeneralListItem>
          </GeneralList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import GeneralList from "../../../../components/common/GeneralList/generalList";
  import ItemOperate from "../../../../components/common/GeneralList/ItemOperate";
  import GeneralListItem from "../../../../components/common/GeneralList/generalListItem";
  export default {
    name: "RankingList",
    components: {GeneralListItem, ItemOperate, GeneralList},
    data(){
      return{
        lists: [
          {name: "歌曲", width: 60},
          {name: "歌手", width: 25},
          {name: "时长", width: 15}
        ],
        rank:["流量帮","热歌榜","新歌榜"],
        current:0,
        state:false
      }
    },methods:{
      isCurrent(index){
        this.current = index
      },
    }
  }
</script>

<style>
  #s_ran_win {
    width: 100%;
  }

  #s_ran_main {
    width: 1200px;
    margin: 0 auto;
    padding-top: 60px;
    position: relative;
  }

  #s_ran_title{
    font-size: 22px;
  }

  #ua_title {
    width: 80%;
    height: 40px;
    box-sizing: border-box;
    padding: 3px 0;
    line-height: 34px;
    border-bottom: 1px solid #999;
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
  }

  #ua_list {
    width: 160px;
    border: 1px solid rgba(100, 100, 100, .4);
    font-size: 15px;
    border-radius: 2px;
    float: left;
  }

  #s_ran_content{
    margin-left: 200px;
    width: 1000px;
  }

  .ua_li {
    width: 150px;
    height: 22px;
    padding: 5px 0;
    text-align: center;
    margin: 5px 0;
    cursor: pointer
  }

  .ua_li:hover {
    color: rgb(49, 194, 124);
  }

  .ua_li_current{
    color: rgb(49, 194, 124);
  }

</style>
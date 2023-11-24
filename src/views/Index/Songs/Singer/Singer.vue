<template>
  <div id="s_sin_win">
    <div id="s_img"></div>
    <div id="s_sin_main">
      <div style="margin: 40px 0">
        <TypeList :items="singerTypes" @getData="getSingers" @getTotal="getTotal"/>
      </div>
      <div id="s_sin_content">
        <div v-if="singers.length==0" class="no_value">
          没有找到数据
        </div>
        <PersonList>
          <PersonItem v-for="singer in singers">
            <a class="com_img_a" :href="toSinger(singer.singerId)">
              <img class="com_img" :src="singer.headPortrait"/>
            </a>
            <a class="com_name bigHeight" :href="toSinger(singer.singerId)">
              {{singer.name}}
            </a>
            <!--<p class="com_p">
              0人关注
            </p>
            <a class="com_but" @click="attention(singer.singerId)">
              <i>√</i>
              <span>关注</span>
            </a>-->
          </PersonItem>
        </PersonList>
      </div>
      <div class="com_page" v-if="pageTotal<1"><!--页面数小于2不显示-->
        <Page :pageTotal="pageTotal" @Current=""/>
      </div>
    </div>
  </div>
</template>

<script>
  import TypeList from "../../../../components/common/TypeList/typeList";
  import PersonList from "../../../../components/common/GeneralList/PersonList/personList";
  import Page from "components/common/Page/page.vue";
  import TypeListItem from "components/common/TypeList/typeListItem";
  import {request} from "../../../../network/request";
  import PersonItem from "components/common/GeneralList/PersonList/personItem";
  import {Type} from "../Type";

  export default {
    name: "Singer",
    components: {PersonItem, TypeListItem, PersonList, TypeList, Page},
    data() {
      return {
        singerTypes: [],//列表遍历对象
        pageTotal: 1,
        singers: [],
        current: -1,//当前点击的选项
        currentTypeId: null,//当前种类id
      }
    },
    created() {
      this.init()//初始化加载数据
    },
    methods: {
      init() {
        this.getAllType();
        this.getTotal(null);
        this.getSingers(null, 1)//默认获取所有
      },
      getAllType() {
        request({url: "singerType/selectAllType"}).then((res) => {
          if (res.data != "") {
            this.singerTypes.push(new Type("全部", res.data))//添加进去
          }
        })
      },
      getTotal(id) {//获取当前种类页码总数
        request({url: "singer/selectFkNumber", params: {id: id}}).then((res) => {
          if (res.data != "") {
            this.pageTotal = res.data;
          }
        })
      },
      getSingers(id, page) {
        request({url: "singer/selectTypeLimit", params: {typeId: id, page: page}}).then((res) => {
          this.singers = res.data;
        })
      },
      toSinger(singerId) {//通过歌手id跳转
        return `/Index/Singer/${singerId}/Song`//跳转到歌手页面
      },
      getCurrent(page) {
        this.getSingers(this.currentTypeId, page)//获取某一页数据
        window.scrollTo(0, 300)
      },
    }
  }
</script>

<style>
  #s_img {
    width: 100%;
    height: 450px;
    margin: auto;
    background-image: url("http://localhost/static/Index/typesinger.jpeg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  #s_sin_main {
    width: 1200px;
    margin: auto;
  }

  .no_value {
    width: 100%;
    height: 100%;
    color: #9999;
    font-size: 22px;
    padding: 20px;
    box-sizing: border-box;
  }

  .bigHeight{
    margin: 20px 0 30px 0;
  }

</style>
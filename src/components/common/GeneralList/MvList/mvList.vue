<template>
  <div class="video_list">
    <ul class="video_ul">
      <slot>
        <mv-list-item :mv="mv" v-for="mv in mvs">
        </mv-list-item>
      </slot>
    </ul>
  </div>
</template>

<script>
  import MvListItem from "./mvListItem";
  export default {
    name: "mvList",
    components: {MvListItem},
    props: {
      mvs: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style>
  .video_ul {
    width: 100%;
    font-size: 14px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    display: flex;
    flex-wrap: wrap;
    padding: 0 20px;
  }

</style>
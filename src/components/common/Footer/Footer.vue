<template>
  <div class="footer">
    <FooterCp/>
  </div>
</template>

<script>
  import FooterCp from "./FooterCp";

  export default {
    name: "Footer",
    components: {FooterCp}
  }
</script>

<style scoped>
  .footer {
    width: 100%;
    height: 80px;
    background-color: rgb(51, 51, 51);
    box-sizing: border-box;
    padding: 25px 0;
  }
</style>
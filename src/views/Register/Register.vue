<template>
  <div id="register_win">
    <div style="position: absolute;top:20px">
      <logo/>
    </div>
    <div>
    </div>
    <div id="register_img"></div>
    <div id="right_win">
      <div id="register_content">
        <div id="register_form">
          <div id="reg_top">
            <div id="reg_title">欢迎注册音乐账号</div>
            <div id="reg_cont">倾听美好音乐。</div>
          </div>
          <form id="r_form">
            <div class="input_outer" @click="selectFocus">
              <input class="input_text" autocomplete="off" type="text" tabindex="1" v-model="username" name="username"
                     placeholder="请填写用户名"
                     @focus="inputOn" @blur="inputLeave"/>
              <span class="reg_err"><i class="iconfont icon-jinggao"></i></span>
            </div>
            <div class="input_outer" @click="selectFocus">
              <input class="input_text" autocomplete="off" type="password" tabindex="2" v-model="psw" name="psw"
                     placeholder="请填写密码"
                     @input="illegalCharacter" @focus="inputOn" @blur="inputLeave"/>
              <span class="reg_err"><i class="iconfont icon-jinggao"></i></span>
            </div>
            <div class="input_outer" @click="selectFocus">
              <input class="input_text" autocomplete="off" type="password" tabindex="3" name="cpsw"
                     placeholder="请填写确认密码" @input="illegalCharacter" @focus="inputOn" @blur="inputLeave"/>
              <span class="reg_err"><i class="iconfont icon-jinggao"></i></span>
            </div>
            <div>
              <input id="input_but" type="button" value="注册" tabindex="4" @click="register"/>
            </div>
          </form>
        </div>
        <div id="re_fo">
          <FooterCp/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import input from "../../assets/js/input";

  import Logo from "../../components/common/Logo/Logo";
  import FooterCp from "../../components/common/Footer/FooterCp";
  import {request} from "../../network/request";

  export default {
    name: "register",
    components: {FooterCp, Logo},
    data() {
      return {
        count: 1,
        url: ["/static/register/01-3.webp", "/static/register/01-4.webp"],
        username: "",
        psw: ""
      }
    },
    mounted() {
      let img = document.querySelector("#register_img");
      img.style.backgroundImage = "url(" + this.url[0] + ")"
      setInterval(this.showImage, 5000, img)
    },
    methods: {
      showImage(img) {
        if (this.count === this.url.length) {
          this.count = 1;
        } else {
          this.count++;
        }
        img.style.backgroundImage = "url(" + this.$store.state.staticPath + this.url[this.count - 1] + ")"
      },
      illegalCharacter(e) {
        if (e.target.value.match(/[\s]+/g) !== null) {
          alert("存在非法字符")
        }
      },
      closeErr(obj) {
        obj.style.display = "none";
      },
      selectFocus(e) {
        input.selectFocus(e);
      },
      inputOn(e) {
        input.inputOn(e)
      },
      inputLeave(e) {
        input.inputLeave(e)
      },
      register() {
        if (this.isEmpty()) {
          //前端没有失败，就向后端发送请求
          request({url: "user/register", params: {username: this.username, psw: this.psw}}).then(res => {
            if (res.data.id != "") {
              alert("你的账号为:" + res.data.id)
              this.$router.push({path: "/Sign", query: {id: res.data.id}})
            } else {
              alert("注册失败")
            }
          })
        }
      },
      isEmpty() {//判空
        let text = document.querySelectorAll(".input_text");
        let err = document.querySelectorAll(".reg_err");
        let ti = ["用户名不能为空", "密码不能为空", "确认密码不能为空"]
        let icon = "<i class='iconfont icon-jinggao'></i>"
        let time = null;
        for (let i = 0; i < text.length; i++) {
          if (text[i].value === "") {
            err[i].innerHTML = icon + ti[i];//拼装
            err[i].style.display = "block";//提示
            if (time !== null)
              clearTimeout(time)
            time = setTimeout(this.closeErr, 3000, err[i]);//三秒后隐藏
            text[i].focus();//输入框获取焦点
            return false;
          }
        }
        let le = text.length;
        if (text[le - 1].value !== text[le - 2].value) {
          err[le - 2].innerHTML = icon + "密码不一致";//拼装
          err[le - 2].style.display = "block";
          if (time !== null)
            clearTimeout(time)
          setTimeout(this.closeErr, 3000, err[le - 2]);//三秒后隐藏
          text[le - 1].value = ""
          text[le - 2].value = ""
          text[le - 2].focus();
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>
  #register_win {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: white;
    overflow: auto;
  }

  #right_win {
    margin-left: 480px;
    height: 100%;
  }

  #register_img {
    height: 100%;
    position: fixed;
    width: 480px;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover
  }

  #register_content {
    width: 480px;
    height: 100%;
    position: relative;
    margin: auto;
  }

  #register_form {
    width: 480px;
    top: 100px;
    margin: auto;
    position: relative;
  }

  #reg_top {
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
  }

  #reg_title {
    font-size: 44px;
    margin-bottom: 22px;
  }

  #reg_cont {
    font-size: 28px;
    margin-bottom: 64px;
  }

  #r_form {
    width: 480px;
    margin: auto;
    height: 250px;
  }

  .input_outer {
    position: relative;
    width: 480px;
    border: 1px solid rgba(55, 55, 55, .5);
    float: left;
    margin-bottom: 34px;
    border-radius: 4px;
  }

  .input_text {
    width: 420px;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    border: none;
    outline: none;
    margin-left: 10px;
  }

  #input_but {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: rgb(49, 194, 124);
    border: none;
    font-size: 24px;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    margin-top: 10px;
  }

  #input_but:hover {
    background-color: rgb(34, 179, 109);
  }

  #re_fo {
    width: 480px;
    height: 40px;
    text-align: center;
    position: relative;
    bottom: -220px;
  }

  .reg_err {
    width: 120px;
    height: 20px;
    position: absolute;
    left: 0px;
    font-size: 12px;
    font-family: poppin, Tahoma, Arial, 微软雅黑, sans-serif;
    bottom: -25px;
    color: red;
    display: none;
  }
</style>
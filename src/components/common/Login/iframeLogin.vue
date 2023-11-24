<template>
  <div id="main_form">
    <form id="login_form">
      <div id="login_title">
        <div>
          账号和密码登录
        </div>
        <div style="font-size: 16px;color: #8b8b8b;margin-top: 12px">
          登录需谨慎，防止盗号
        </div>
        <span id="err_m"><i class="iconfont icon-jinggao"></i></span>
      </div>
      <div id="login_content">
        <div class="form_item" @click.prevent="selectFocus">
          <input class="input_text" type="text" v-model="form.id" name="id" autocomplete="off" placeholder="账号"
                 @keyup.enter="submit" @focus="inputOn" @blur="inputLeave" tabindex="1"/>
        </div>
        <div class="form_item" @click.prevent="selectFocus">
          <input class="input_text" type="password" v-model="form.psw" name="psw" autocomplete="off" placeholder="密码"
                 @keyup.enter="submit" @focus="inputOn" @blur="inputLeave" tabindex="2"/>
        </div>
        <div class="form_item border_none">
          <input id="login_sub" type="button" value="登录" @click="submit" tabindex="3"/>
        </div>
      </div>
    </form>
    <div id="bottom_web">
      <div class="bottom_array">
        <a class="b_c" href="javascript:;">忘了密码</a>
      </div>
      <div class="bottom_array">
        <a class="b_c" href="/Register">注册账号</a>
      </div>
    </div>
  </div>
</template>

<script>
  import input from "../../../assets/js/input";
  import {request} from "../../../network/request";

  export default {
    name: "iframeLogin",
    props: {
      an: {//账号
        type: String,
        default() {
          return ""
        }
      }
    },
    data() {
      return {
        form: {
          id: "",
          psw: ""
        },
        time: null
      }
    },
    created() {
      this.form.id = this.an;//赋值
    },
    methods: {
      closeErr(obj) {
        obj.style.display = "none";//隐藏
      },
      selectFocus(e) {
        input.selectFocus(e)
      },
      inputOn(e) {
        input.inputOn(e)
      },
      inputLeave(e) {
        input.inputLeave(e)
      },
      clearTime() {
        if (this.time != null)//清除上次的定时器
          clearTimeout(this.time)
      },
      isEmpty() {//判空
        let text = document.querySelectorAll(".input_text");
        this.clearTime()//清除上次的定时器
        for (let i = 0; i < text.length; i++) {
          if (text[i].value === "") {
            let err = document.querySelector("#err_m")
            if (text[i].name === "id") {
              err.innerHTML = "<i class=\'iconfont icon-jinggao\'></i>你还没有输入账号"
              this.time = setTimeout(this.closeErr, 3000, err)//三秒后隐藏
            } else {
              err.innerHTML = "<i class=\'iconfont icon-jinggao\'></i>你还没有输入密码"
              this.time = setTimeout(this.closeErr, 3000, err)
            }
            err.style.display = "block";
            text[i].focus();
            return false
          }
        }
        return true;
      },
      submit() {
        if (this.isEmpty()) {
          request({url:"user/login", params: this.form}).then((res) => {
            if (res.data == false) {
              this.clearTime()
              let err = document.querySelector("#err_m")
              err.innerHTML = "<i class=\'iconfont icon-jinggao\'></i>账号或者密码有误"
              err.style.display = "block";
              this.time = setTimeout(this.closeErr, 3000, err)//三秒后隐藏
              let input = document.getElementsByClassName("input_text")
              input[1].value = ""//清空密码栏
              input[1].focus();//聚焦
            } else {
              if (this.$route.path.indexOf("/Sign") !== -1)
                this.$router.replace("/Index")
              else
                this.$router.go(0)//重新加载页面
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  #main_form {
    width: 350px;
    height: 350px;
    margin: auto;
    position: relative;
    top: 20px;
  }

  #win_close:hover {
    color: rgb(49, 194, 124);
  }

  #login_form {
    width: 330px;
    margin: auto;
  }

  .form_item {
    width: 270px;
    height: 40px;
    border: 1px solid rgba(55, 55, 55, .5);
    margin: 20px auto 0 auto;
    border-radius: 3px;
  }

  #login_sub {
    width: 100%;
    height: 100%;
    background-color: #1E6FFF;
    border: none;
    font-size: 17px;
    font-weight: 500;
    font-family: "微软黑体", "sans-serif";
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }

  #login_title {
    width: 270px;
    height: 60px;
    text-align: center;
    position: relative;
    left: 50%;
    margin-left: -135px;
    margin-top: 30px;
    font-size: 20px;
  }

  #err_m {
    color: red;
    font-size: 12px;
    width: 100%;
    position: relative;
    left: -10px;
    bottom: 1px;
    display: none;
  }

  .border_none {
    border: none;
  }

  .input_text {
    outline: none;
    border: none;
    font-size: 16px;
    width: 210px;
    box-sizing: border-box;
    height: 40px;
    padding: 10px 0px 10px 10px;
    position: relative;
    left: 1px;
  }

  #bottom_web {
    width: 100%;
    height: 16px;
    position: absolute;
    bottom: 50px;
    font-size: 12px;
  }

  .bottom_array {
    float: left;
    margin-left: 10px;
  }

  .b_c {
    color: grey;
  }

  .b_c:hover {
    text-decoration: underline;
  }

</style>
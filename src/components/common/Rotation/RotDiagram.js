export default {
  show() {//轮播图位置的更替
    const length = this.allEle.length;
    for (let index = 0; index < length; index++) {
      if (index < this.allEle.length - 2) {//主要元素位置的调整
        if (index < this.currentIndex) {
          this.allEle[index].style.transform = `translateX(-${this.getWidth}px)`
        } else if (index > this.currentIndex) {
          this.allEle[index].style.transform = `translateX(${this.getWidth}px)`
        } else {
          this.allEle[index].style.transform = `translateX(0)`
        }
      } else {//克隆元素位置的调整
        if (this.currentIndex == (this.imgLength - 1) && index == (length - 2)) {
          this.allEle[index].style.transform = `translateX(${this.getWidth}px)` //当轮播到最后一张图片时，第一张图片的克隆图片放到右边，以实现循环轮播
        } else if (this.currentIndex == this.imgLength && index == (length - 2)) {//显示第一张图片的克隆图
          this.removeEvent() //移除事件
          this.clearTransitionDuration(this.currentIndex)//滑动后重置位置记录
          this.allEle[index].style.transform = `translateX(0)`
        } else if (this.currentIndex == 0 && index == (length - 1)) {
          this.allEle[index].style.transform = `translateX(-${this.getWidth}px)`
        } else if (this.currentIndex == -1 && index == (length - 1)) {
          this.removeEvent() //移除事件
          this.clearTransitionDuration(this.currentIndex)//滑动后重置位置记录
          this.allEle[index].style.transform = `translateX(0)`
        } else {
          this.allEle[index].style.transform = `translateX(-${this.getWidth}px)`
        }
      }
    }
  },
  showcir(index) {//正确的展示当前选中的位置
    if (index == this.currentIndex) {
      return true
    } else if (this.currentIndex >= this.imgLength && index == 0) {
      return true
    } else if (this.currentIndex == -1 && index == (this.imgLength - 1)) {
      return true
    }
  },
  gonext() {
    this.currentIndex++;
    this.currentEle.style.transitionDuration = `${this.speed}s` //滑动结束开启
    this.nextEle.style.transitionDuration = `${this.speed}s` //下一个滑动开启
  },
  gopre() {
    this.currentIndex--;
    this.currentEle.style.transitionDuration = `${this.speed}s` //滑动结束开启
    this.preEle.style.transitionDuration = `${this.speed}s` //下一个滑动开启
  },
  stop(e) {//触摸的时停止定时器
    clearInterval(this.time)//清除启动器
    this.time = null
    //this.startX = e.touches[0].clientX//获取起始鼠标位置(touch事件才有的)
    //this.currentEle.style.transitionDuration = ""//过渡时间清零，防止滑动图片受影响
  },
  go() {//触摸结束启动定时器
    if (this.time == null) {
      this.time = setInterval(this.gonext, 2000)
    }//防止产生多个定时器,启动启动器
    //this.currentEle.style.transitionDuration = `${this.speed}s` //滑动结束开启
    //this.islocation()
  },
  move(e) {//触摸所滑动的距离计算函数
    this.moveX = e.touches[0].clientX - this.startX//获取滑动的长度
    this.currentEle.style.transform = `translateX(${this.moveX}px)` //实现滑动图片效果
    if (this.moveX < 0) {
      this.nextEle.style.transitionDuration = ""
      this.nextEle.style.transform = `translateX(${(Number.parseInt(this.currentEle.offsetWidth) + this.moveX)}px)` //下个节点往前
    } else {
      this.preEle.style.transitionDuration = ""
      this.preEle.style.transform = `translateX( ${(-Number.parseInt(this.currentEle.offsetWidth) + this.moveX)}px)`//上一个节点的滑动
    }
  },
  islocation() {//判断距离是否能够轮换
    if (this.moveX < 0 && Math.abs(this.moveX) <= this.currentEle.offsetWidth * this.s_distance) {
      this.currentEle.style.transform = `translateX(0)` //滑动回归原位
      this.nextEle.style.transform = `translateX(${this.getWidth}px)` //下个元素回原位置
      this.nextEle.style.transitionDuration = `${this.speed}s` //下一个滑动开启
      this.preEle.style.transform = `translateX(-${this.getWidth}px)` //防止左右滑动产生bug
    } else if (this.moveX >= 0 && Math.abs(this.moveX) <= this.currentEle.offsetWidth * this.s_distance) {
      this.currentEle.style.transform = `translateX(0)` //滑动回归原位
      this.preEle.style.transform = `translateX(-${this.getWidth}px)` //上一个元素回原位置
      this.preEle.style.transitionDuration = this.speed + "s" //上一个滑动开启
      this.nextEle.style.transform = `translateX(${this.getWidth}px)` //防止左右滑动产生bug
    } else if (this.moveX < 0) {
      this.currentEle.style.transform = `translateX(-${this.getWidth}px)` //向左滑
      this.gonext()
    } else {
      this.currentEle.style.transform = `translateX(${this.getWidth}px)`  //向右滑
      this.gopre()
    }
    this.moveX = 0 //重置为零，防止点击就跳转
  },
  getCurrentEle() {//通过判断位置获取当前元素
    if (this.currentIndex >= 0 && this.currentIndex < this.imgLength)//
      this.currentEle = this.allEle[this.currentIndex]
    else if (this.currentIndex <= -1) {//这里时克隆的，所有当前元素应该时最后一个
      this.currentEle = this.allEle[this.imgLength - 1]
    } else {//最后一个对应第一个的克隆元素，所以当前元素应该为第一个
      this.currentEle = this.allEle[0]
    }
  },
  getEle(current) {//获取元素
    if (this.currentIndex > 0 && this.currentIndex < (this.imgLength - 1)) {
      this.preEle = current.previousSibling //获取上个元素
      this.nextEle = current.nextSibling //获取下个元素
    } else if (this.currentIndex == 0) {
      this.nextEle = current.nextSibling
      this.preEle = this.allEle[this.allEle.length - 1]//获取最后一个的克隆元素
    } else {
      this.nextEle = this.allEle[this.allEle.length - 2]//获取第一个的克隆元素
      this.preEle = current.previousSibling
    }
  },
  getCloneEle(Ele) {//给父元素生成第一个和最后一个的克隆元素
    const first = Ele.firstChild.cloneNode(true)//克隆该元素与其子元素(true表示子元素一样复制)
    const last = Ele.lastChild.cloneNode(true)
    first.attributes.class.nodeValue = `${first.attributes.class.nodeValue} clone_item`//给元素添加class属性标识
    last.attributes.class.nodeValue = `${last.attributes.class.nodeValue} clone_item`
    Ele.appendChild(first) //添加到父元素末尾
    Ele.appendChild(last)
  },
  removeEvent() {//删除事件
    /**
     * 移动端事件
     */
    /*this.swiper.removeEventListener("touchend", this.go)
    this.swiper.removeEventListener("touchstart", this.stop)
    this.swiper.removeEventListener("touchmove", this.move)*/

    /**
     * pc端事件
     */
    this.swiper.removeEventListener("mouseleave", this.go)
    this.swiper.removeEventListener("mouseenter", this.stop)
    this.$refs.pre.removeEventListener("click", this.gopre)
    this.$refs.next.removeEventListener("click", this.gonext)
    //this.swiper.removeEventListener("touchmove", this.move)
  },
  addEvent() {//添加事件
    /**
     * 移动端事件
     */
    /*this.swiper.addEventListener("touchend", this.go)
    this.swiper.addEventListener("touchstart", this.stop)
    this.swiper.addEventListener("touchmove", this.move)*/

    /**
     * pc端事件
     */
    this.swiper.addEventListener("mouseleave", this.go)
    this.swiper.addEventListener("mouseenter", this.stop)
    this.$refs.pre.addEventListener("click", this.gopre)
    this.$refs.next.addEventListener("click", this.gonext)
  },
  clearTransitionDuration(current) {//重置当前位置
    const that = this
    setTimeout(function () {
      that.addEvent() //将移除的事件添加回来
      for (let Ele of that.allEle) {
        Ele.style.transitionDuration = ""//清除过度效果
      }
      that.currentIndex = (current > 0 ? 0 : (that.imgLength - 1))//大于零表示this.currentIndex超过了轮播图数量，反之相反
    }, this.speed * 1000)
  },
  init() {
    this.swiper = this.$refs.swiper_wrap //获取需要添加事件的元素
    this.getCloneEle(this.swiper) //获取克隆元素
    //console.log(this.swiper)
    this.allEle = this.swiper.childNodes//获取所有item元素
    this.imgLength = this.allEle.length - 2 //获取图片数量
    this.addEvent()  //给事件元素添加事件
    this.currentEle = this.allEle[this.currentIndex]//初始化当前元素
    this.getEle(this.currentEle) //获取当前元素的前后元素
    this.show()//初始化元素位置
    this.time = setInterval(this.gonext, 2000)//轮播开启
  }
}
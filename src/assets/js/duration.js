export function getDuration(songs,that) {//获取时长
  for (let song of songs) {
    let audio = document.createElement("audio")
    audio.src = song.songUrl
    audio.ondurationchange = () => {
      let duration = Math.round(audio.duration)
      let minute = Math.floor(duration / 60).toString()
      let second = (duration % 60).toString();
      that.$set(song, "duration", (minute.length < 2 ? "0" + minute : minute) + ":" + (second.length < 2 ? "0" + second : second))
    }
  }
}
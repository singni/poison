<template>
  <div>

    <div id ="loginTitle" class="loginTitle"/>

    <div class="dialogDetailAudio" onselectstart="return false">
      <img class="dialogAudioPlay" :src="audioImg" title="播放" @click="playAudio">
      <span class="dialogAudioTime">{{time}}</span>
      <div class="dialogAudioProgress" ref="dialogAudioProgress" @mousedown="controlAudioProgress($event)">
        <span class="progressDot" :style="dotStyle"></span>
        <span class="bar" :style="progressStyle"></span>
      </div>
      <span class="dialogAudioDuration">{{duration}}</span>
      <audio ref="recordAudio" class="recordAudio" type="audio/mpeg"
             @canplay="canPlay" @timeupdate="timeUpdate" @ended="onEnded" :src="audioUrl">
      </audio>
    </div>
  </div>
</template>
<style>

  .dialogDetailAudio {
    margin-top: 300px;
    margin-left: auto;
    margin-right: auto;
    width: 460px;
    height: 49px;
    line-height: 49px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 5px 30px 0px rgba(29, 34, 54, 0.18);
    border-radius: 6px;
  }

  .dialogAudioPlay {
    display: inline-block;
    position: relative;
    top: 6px;
    margin-left: 15px;
    cursor: pointer;
    width: 23px;
    height: 23px;

  }

  .dialogAudioTime {
    margin-left: 11px;
    font-size: 11px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  .dialogAudioProgress {
    display: inline-block;
    width: 300px;
    height: 2px;
    background: rgb(199, 217, 249);
    border-radius: 1px;
    margin-left: 12px;
    position: relative;
  }

  .progressDot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    background-color: rgb(20, 94, 180);
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -5px;
    margin-left: -5px;
    cursor: pointer;
  }

  .bar {
    height: 100%;
    background: rgb(58, 117, 255);
    border-radius: 3px;
    display: inline-block;
    position: absolute;
  }

  .dialogAudioDuration {
    margin-left: 11px;
    font-size: 11px;
    font-weight: 400;
    color: rgba(34, 34, 34, 1);
  }

  .dialogAudioListen,
  .dialogAudioDownload {
    width: 16px;
    height: 13px;
    cursor: pointer;
  }

  .dialogAudioListen {
    margin-left: 8px;
  }

  .dialogAudioDownload {
    margin-left: 5px;
  }
  .loginTitle {
    width: 200px;
    height: 200px;
    border-radius: 200px;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    left: 30px;
    bottom: 30px;
    background-image: url("/static/LUFFY.jpg");
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    animation: myfirst 10s infinite linear ;
    animation-play-state:paused
  }
  @keyframes myfirst
  {
    0% {transform:rotate(0deg);}
    100%{transform:rotate(360deg);}
  }
</style>
<script>
  export default {
    data() {
      return {
        isActive:true,
        time: "00:00",
        duration: "00:00",
        progressStyle: {width: ""},
        dotStyle: {left: ""},
        audioUrl: "/static/sleep away.mp3",
        audioImg: "/static/play.png",
        dialogAudioListenGroup: ["/static/stop.png", "/static/play.png"],
        imgIndex: 0,
      }
    },

    //计算属性 切换静音图片
    computed: {
      dialogAudioListen() {
        return this.dialogAudioListenGroup[this.imgIndex]
      }
    },

    methods: {
      //播放暂停控制

      playAudio() {

        let recordAudio = this.$refs.recordAudio; //获取audio元素

        if (recordAudio.paused) {
          document.getElementById("loginTitle").style="animation-play-state:running"
          this.isActive=false;
          this.audioImg = "/static/stop.png"
          recordAudio.play();
        } else {
          document.getElementById("loginTitle").style="animation-play-state:paused"
          this.isActive=true;
          this.audioImg = "/static/play.png"
          recordAudio.pause();
        }
      },

      //进度条更新
      timeUpdate() {
        this.duration = this.transTime(this.$refs.recordAudio.duration);
        let timeStr = parseInt(this.$refs.recordAudio.currentTime);
        this.time = this.transTime(timeStr);
        let scales = this.$refs.recordAudio.currentTime / this.$refs.recordAudio.duration;
        this.progressStyle.width = scales * 100 + '%';
        this.dotStyle.left = scales * 100 + '%';
      },

      //播放结束
      onEnded() {
        this.audioImg = "/static/play.png";
        this.time = "00:00";
        this.progressStyle.width = 0;
        this.dotStyle.left = 0;
      },

      //用户可以开始播放audio
      canPlay() {
        //获取audio音频文件总时长 并设置到界面并解决出现 NAN 的问题
        this.duration = this.transTime(this.$refs.recordAudio.duration);
      },


      //鼠标点击移动播放进度
      controlAudioProgress(event) {
        let audio = this.$refs.recordAudio;
        let dialogAudioProgress = this.$refs.dialogAudioProgress;
        if (!audio.paused || audio.currentTime != 0) {
          let pgsWidth = parseFloat(window.getComputedStyle(dialogAudioProgress, null).width.replace('px', ''));
          let rate = event.offsetX / pgsWidth;
          audio.currentTime = audio.duration * rate;
          this.timeUpdate();
        }
      },


      //时间转换
      transTime(value) {
        let time = "";
        let h = parseInt(value / 3600);
        value %= 3600;
        let m = parseInt(value / 60);
        let s = parseInt(value % 60);
        if (h > 0) {
          time = this.formatTime(h + ":" + m + ":" + s);
        } else {
          time = this.formatTime(m + ":" + s);
        }
        return time;
      },

      //时间格式化
      formatTime(value) {
        let time = "";
        let s = value.split(':');
        let i = 0;
        for (; i < s.length - 1; i++) {
          time += s[i].length == 1 ? ("0" + s[i]) : s[i];
          time += ":";
        }
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
        return time;
      },
    },computed:{

    }
  }

</script>

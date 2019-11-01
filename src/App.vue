<template>
  <div class="container">
    <div class="traffic-light">
      <div class="light">
        <div class="circle no-light"></div>
        <router-view name="red"></router-view>
      </div>
      <div class="light">
        <div class="circle no-light">
          <countdown :current="timeLeft" :colorName="currentColorName" :path="currentPath"/>
        </div>
        <router-view name="yellow"></router-view>
      </div>
      <div class="light">
        <div class="circle no-light"></div>
        <router-view name="green"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import router from "./AppRouter";
export default {
  name: "App",
  router,
  data: function() {
    return {
      state: {
        red: {
          name: "red",
          path: "/1",
          time: 10,
          next: ""
        },
        green: {
          name: "green",
          path: "/3",
          time: 15,
          next: ""
        },
        yellowToGreen: {
          name: "yellowToG",
          path: "/2",
          time: 3,
          next: ""
        },
        yellowToRed: {
          name: "yellowToR",
          path: "/2",
          time: 3,
          next: ""
        }
      },
      timeLeft: 0,
      currentColorName: "",
      currentPath: ""
    };
  },
  methods: {
    trigger(light, routeReplaceCallback) {
      routeReplaceCallback(light);
      this.currentColorName = light.name;
      this.countdown(light.time);

      setTimeout(() => {
        this.trigger(light.next, routeReplaceCallback);
      }, light.time * 1000);

      if (light.name === "green") {
        setTimeout(() => {
          this.blinker(light.path); // если текущий цвет зеленый, вызывем blinker за 3.5с до желтого,
        }, (light.time - 3.5) * 1000); // чтобы за 3с начать мигать
      }
    },

    blinker(path) {
       this.currentPath = path;

      let blink = setInterval(() => {
        this.currentPath = this.currentPath === path ? "/" : "/3";
        router.replace(this.currentPath);
      }, 500); // каждые 0.5с blinker меняет состояние светофора

      setTimeout(() => {
        clearInterval(blink);
      }, 3000);
    },

    countdown(time) {
      this.timeLeft = time;
      time--;
      if (time > 0) {
        setTimeout(() => {
          this.countdown(time);
        }, 1000);
      }
    }
  },
  mounted() {
    this.state.red.next = this.state.yellowToGreen;
    this.state.yellowToGreen.next = this.state.green;
    this.state.green.next = this.state.yellowToRed;
    this.state.yellowToRed.next = this.state.red;

    this.trigger(this.state.red, light => {
      router.replace(light.path);
    });
  }
};
</script>

<style scoped>
.container {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: -webkit-center;
  margin-top: 60px;
}

.light {
  position: relative;
}

.traffic-light {
  width: 150px;
  height: 405px;
  background: dimgray;
  text-align: -webkit-center;
  padding-top: 5px;
  border-radius: 20px;
}

.countdown {
  position: absolute;
  font-family: "Orbitron", sans-serif;
  font-size: 50px;
  top: 25%;
  left: 0;
  right: 0;
}

.green {
  color: limegreen;
}

.red {
  color: red;
}

.circle {
  width: 120px;
  height: 120px;
  -moz-border-radius: 60px;
  -webkit-border-radius: 60px;
  border-radius: 60px;
  margin-top: 10px;
}

.active {
  position: absolute;
  opacity: 1;
  z-index: 1;
  top: -10px;
  left: 15px;
}

.red-back {
  background: red;
}

.yellow-back {
  background: orange;
}

.green-back {
  background: limegreen;
}

.no-light {
  background: #0c0c0c;
  opacity: 0.5;
  z-index: 0;
}
</style>
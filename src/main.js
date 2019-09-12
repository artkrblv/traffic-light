import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';
import App from './App'
import router from './AppRouter';

Vue.use(VueRouter);

class Light {
    constructor(name, path, time, next) {
        this.name = name;
        this.path = path;
        this.time = time;
        this.next = next;
    }
}

class LightController {
    trigger(light, callback) {
        callback(light);
        setTimeout(() => {
            this.trigger(light.next, callback);
        }, light.time * 1000);

        if (light.name === 'green') {
            setTimeout(() => {
                this.blinker(light.path)            // если текущий цвет зеленый, вызывем blinker за 3.5с до желтого,
            }, (light.time - 3.5) * 1000); // чтобы за 3с начать мигать
        }
    }

    blinker(path) {
        let currentPath = path;

        let blink = setInterval(() => {
            currentPath = (currentPath === path) ? "/" : "/3";
            router.replace(currentPath);
        }, 500); // каждые 0.5с blinker меняет состояние светофора

        setTimeout(() => {
            clearInterval(blink);
        }, 3000);
    }

   /* countdown(count) {
        let countdown = setInterval(() => {
            count--;

        }, 1000);

        setTimeout(() => {
            clearInterval(countdown);
        }, count * 1000);
    }*/
}

new Vue({
    router,
    render: h => h(App),
    data: {
        counter: 0
    },
    mounted() {

        let controller = new LightController();

        const red = new Light('red', '/1', 3);
        const yellowToGreen = new Light('yellowG', '/2', 3);
        const green = new Light('green', '/3', 15);
        const yellowToRed = new Light('yellowR', '/2', 3);

        red.next = yellowToGreen;
        yellowToGreen.next = green;
        green.next = yellowToRed;
        yellowToRed.next = red;

        controller.trigger(red, (light) => {
            router.replace(light.path);
        });
    }
}).$mount('#app');




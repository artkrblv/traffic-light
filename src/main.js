import Vue from 'vue/dist/vue.esm.js';
import VueRouter from 'vue-router';
import App from './App'

Vue.use(VueRouter);

Vue.component('countdown', {
    props: ['current', 'colorName', 'path'],
    data: function () {
        return {
            red: "countdown red",
            green: "countdown green"
        }
    },
    computed: {
        isRed: function () {
            return this.colorName === "red" ? true : false;
        },

        isShow: function () {
            return this.path === "/" ? false : true;
        }
    },
    template: '<span v-bind:class="isRed ? red : green" v-show="isShow" >{{ current }}</span>',
});

new Vue({
    el: "#app",
    render: h => h(App),
});
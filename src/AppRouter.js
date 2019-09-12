import VueRouter from 'vue-router';

const NoLight = {template: `<div class="circle no-light"/>`};
const Red = {template: `<div class="circle red active"/>`};
const Yellow = {template: `<div class="circle yellow active"/>`};
const Green = {template: `<div v-else class="circle green active" />`};

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'noLight',
            components: {
                red: NoLight,
                yellow: NoLight,
                green: NoLight
            }
        },
        {
            path: '/1',
            name: 'red',
            components: {
                red: Red,
                yellow: NoLight,
                green: NoLight
            }
        },
        {
            path: '/2',
            name: 'yellowToGreen',
            components: {
                red: NoLight,
                yellow: Yellow,
                green: NoLight
            }
        },
        {
            path: '/3',
            name: 'green',
            components: {
                red: NoLight,
                yellow: NoLight,
                green: Green
            }
        }
    ]
});

export default router;
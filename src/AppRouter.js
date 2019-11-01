import VueRouter from 'vue-router';

const Red = { template: `<div class="circle red-back active"/>` };
const Yellow = { template: `<div class="circle yellow-back active"/>` };
const Green = { template: `<div class="circle green-back active" />` };

const router = new VueRouter({
    routes: [
        {
            path: '/1',
            name: 'red',
            components: {
                red: Red
            },
        },
        {
            path: '/2',
            name: 'yellowToG',
            components: {
                yellow: Yellow
            }
        },
        {
            path: '/3',
            name: 'green',
            components: {
                green: Green
            },
        }
    ]
});

export default router;
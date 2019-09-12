<template>
    <div class="container">
        <div class="traffic-light">

            <router-view name="red"></router-view>

            <router-view name="yellow"></router-view>

            <router-view name="green"></router-view>

        </div>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped>
    .container {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: -webkit-center;
        color: #2c3e50;
        margin-top: 60px;
    }

    .traffic-light {
        width: 150px;
        height: 405px;
        background: dimgray;
        text-align: -webkit-center;
        padding-top: 5px;
        border-radius: 20px;
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
        opacity: 1;
    }

    .red {
        background: red;
    }

    .yellow {
        background: orange;
    }

    .green {
        background: limegreen;
    }

    .no-light {
        background: #0c0c0c;
        opacity: 0.5;
    }
</style>
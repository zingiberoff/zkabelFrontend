<template>
    <div class="menu-button"
         :class="menuButtonClass" @click="$emit('click')">
        <div class="menu-button__center"></div>
    </div>
</template>

<script>
    export default {
        name: "MenuButton",
        props: {
            state: {
                validator: function (value) {
                    // Значение должно соответствовать одной из этих строк
                    return ['burger', 'open', 'back'].indexOf(value) !== -1
                }
            }
        },
        computed:{
            menuButtonClass: function(){
                    return 'menu-button--'+this.state;
            },
        }
    }
</script>

<style scoped>
    .menu-button {
        z-index: 1;
        min-width: 24px;
        height: 19px;
        display: block;
        position: relative;
    }

    .menu-button:before {
        position: absolute;
        transform-origin: left;
        content: "";
        background: #f04800;
        transition: .5s;
        padding: 0;
        width: 100%;
        height: 2px;
    }

    .menu-button--close:before {
        transform: rotate(45deg);
    }

    .menu-button__center {
        transform-origin: center;
        background: #f04800;
        transition: .5s;
        padding: 0;
        width: 100%;
        height: 2px;
        position: absolute;
        top: calc(50% - 1px);
    }

    .menu-button--close .menu-button__center {
        transform: scaleX(0) translateX(-10px);
    }

    .menu-button:after {
        position: absolute;
        transform-origin: left;
        content: "";
        background: #f04800;
        transition: .5s;
        padding: 0;
        width: 24px;
        height: 2px;
        bottom: 0;
    }

    .menu-button--back > * {
        transition: .2s;
    }

    .menu-button--close:after {
        transform: rotate(-45deg);
    }

    .menu-button--back:before {
        transform: translateY(10px) rotate(-45deg) scaleX(0.6);
    }

    .menu-button--back:after {
        transform: translateY(-9px) rotate(45deg) scaleX(0.6);
    }

    .menu-button--back.touch:before {
        transform: translateY(-5px) rotate(15deg) translateX(5px) scaleX(0.8);
    }

    .menu-button--back.touch:after {
        transform: translateY(6px) rotate(-15deg) translateX(5px) scaleX(0.8);
    }
</style>
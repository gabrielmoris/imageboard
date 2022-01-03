import * as Vue from './vue.js';

Vue.createApp({
    data() {
        return {
            name: "Imageboard",
            seen: "",
            images: [],
            imgClicked: ""
        };
    },
    mounted() {
        fetch("/get-img-info")
            .then((resp) => resp.json())
            .then((data) => {
               console.log(data);
               this.images = data;
            });
    },
}).mount("#main");
import * as Vue from "./vue.js";
import imgComponent from "./imgComponent.js";

Vue.createApp({
    data() {
        return {
            name: "Imageboard",
            images: [],
            title: "",
            description: "",
            username: "",
            file: null,
            success: false,
            imgSelected: null,
            lowerId: 0,
            moreButton: true,
        };
    },
    mounted() {
        fetch("/get-img-info")
            .then((resp) => resp.json())
            .then((data) => {
                // console.log("Data when i mount",data);
                this.images = data;
            });
    },
    components: {
        "img-component": imgComponent,
    },
    methods: {
        clickHandler: function () {
            // console.log("this: ", this);
            const fd = new FormData();
            fd.append("title", this.title);
            fd.append("description", this.description);
            fd.append("username", this.username);
            fd.append("file", this.file);
            fetch("/upload", {
                method: "POST",
                body: fd,
            })
                .then((res) => res.json())
                .then((res) => {
                    // console.log("res: ", res);
                    this.images.unshift(res.img);
                    this.success = true;
                })
                .catch((err) => {
                    console.log("Error uploading new image: ", err);
                });
        },
        fileSelectHandler: function (e) {
            // console.log("fileselected", e);
            this.file = e.target.files[0];
        },
        selectImg(clickedId) {
            this.imgSelected = clickedId;
            // console.log("this is img id from app.js: ", this.imgSelected);
        },
        closeComponent() {
            this.imgSelected = null;
        },
        clickMore() {
            let lowestId = this.images[this.images.length - 1].id;

            fetch(`/get-more-img/${lowestId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    // console.log("data in more images: ",data);
                    let lastImg = data[data.length - 1].lowestId;
                    console.log("lastImg: ", lastImg);
                    let newArray = this.images.concat(data);
                    this.images = newArray;
                    this.lowerId = this.images[this.images.length - 1].id;
                    console.log("lowestId: ", lowestId);
                    if (lastImg === this.lowerId) {
                        this.moreButton = false;
                    }
                })
                .catch((e) => {
                    console.log("Error having more images: ", e);
                });
        },
    },
}).mount("#main");

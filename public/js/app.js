import * as Vue from "./vue.js";

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
                    console.log("res: ", res);
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
    },
}).mount("#main");

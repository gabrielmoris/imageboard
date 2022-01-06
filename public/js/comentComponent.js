const comentComponent = {
    data() {
        return {
            comments: [],
            user: "",
            comment: "",
        };
    },
    props: ["imgId"],
    mounted() {
        fetch(`/get-comment-info/${this.imgId}`)
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    data[i].created_at = this.formatDate(data[i].created_at);
                }
                this.comments = data;
            });
    },
    methods: {
        clickHandlerComment() {
            const commentObj = {
                imageId: this.imgId,
                user: this.user,
                comment: this.comment,
            };
            fetch("/uploadcomment", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(commentObj),
            })
                .then((res) => res.json())
                .then((res) => {
                    res.cmt.created_at = this.formatDate(res.cmt.created_at);
                    this.comments.unshift(res.cmt);
                })
                .catch((err) => {
                    console.log("Error uploading new comment: ", err);
                });
        },
        formatDate(dbDate) {
            let createdAtDateObj = new Date(dbDate);
            let newDate = new Intl.DateTimeFormat("en-GB", {
                dateStyle: "long",
                timeStyle: "short",
            }).format(createdAtDateObj);
            return newDate;
        },
    },
    template: `<div>
    <form>
        <input v-model="user" type="text" name="user" placeholder="username">
        <input v-model="comment" type="text" name="comment" placeholder="write a comment">
        <button @click.prevent="clickHandlerComment">Submit</button>
    </form>
        <h2>Comments:</h2>
        <div class="img-d-component">
            <div v-for='cmt in comments'>
                <p class="user-comment">By: {{cmt.username}}</p>
                <p>{{cmt.comment}}</p>
                <p class="little-data">Created at: {{cmt.created_at}}</p>
                <hr>
            </div>
            </div>
    </div>`,
};

export default comentComponent;

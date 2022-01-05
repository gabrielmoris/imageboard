const imgComponent = {
    data() {
        return {
            imgData: {},
            date: "",
        };
    },
    props: ["passingSomeProp", "imgId"],
    mounted() {
        // console.log("this is this: ", this);
        fetch(`/get-img-by-id/${this.imgId}`)
            .then((resp) => resp.json())
            .then((data) => {
                this.imgData = data;
                let createdAtDateObj = new Date(data.created_at);
                let newDate = new Intl.DateTimeFormat("en-GB", {
                    dateStyle: "long",
                    timeStyle: "short",
                }).format(createdAtDateObj);
                this.date = newDate;
            });
        // console.log("i am the img id in the component!", this.imgId);
    },
    methods: {
        notifyParent() {
            this.$emit("close");
        },
    },
    template: `<div class="big-img-div">
    <h3 class="close-x" @click="notifyParent">X</h3>
    <h1>{{imgData.title}}</h1>
     <img class="img-component" :src="imgData.url" :alt="imgData.title" :key="imgData.id">
    <p class="img-d-component">User: {{imgData.username}}<br> Description: {{imgData.description}}<br> Created: {{date}}</p> 
    </div>
    `,
};

export default imgComponent;

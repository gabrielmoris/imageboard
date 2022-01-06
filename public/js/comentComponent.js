const comentComponent ={
    data(){
        return {
            heading: "i am the coment component"
        }
    },
    mounted(){
        console.log("second component mounted!")
    },
    template: `<div>{{heading}}
        <h2>Comments:</h2>
        
    </div>`
}

export default comentComponent;
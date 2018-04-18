<template>
<section class="container">
    <h2>Upload your images to share with others</h2>
    <form class="form-inline" @submit.prevent="addImage">
        <div class="form-group">
            <label for="title">Title:</label>
            <input type="text" class="form-control" id="title" v-model="newImageTitle">
        </div>
        <div class="form-group">
            <label for="files">Image:</label>
            <input type="file" class="form-control" id="files" name="files[]">
        </div>
        <input type="submit" class="btn btn-default" value="Add Image" />
    </form>
</section>
</template>

<script>
export default {
    name: 'AddImageForm',
    // form specific data
    data () {
        return {
            newImageTitle: ''
        }
    },
    // method provided to respond to form in parent component
    props: [
        'onSubmit'
    ],
    // method to process form data
    methods: {
        addImage () {
            // get input element user used to select local image
            var input = document.getElementById('files')
            // check that all fields in the form been completed
            if (this.newImageTitle && input.files.length > 0) {
                this.onSubmit(this.newImageTitle, input.files[0])
            }
            // reset values displayed in form so user knows to input new data
            this.newImageTitle = ''
            input.value = ''
        }
    }
}
</script>

<style scoped>
form {
    padding: 8px 8px;
    color: firebrick;
}
</style>

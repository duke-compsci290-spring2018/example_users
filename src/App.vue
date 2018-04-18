<template>
<div id="app">
    <header>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand">Shared Images</a>
                </div>
                <authentication class="nav navbar-nav navbar-right"
                    :getUser="getUser"
                    :setUser="setUser">
                </authentication>
            </div>
        </nav>
    </header>
    <main>
        <section class="container">
            <add-image-form
                :onSubmit="storeImage">
            </add-image-form>
        </section>
        <hr>
        <section id="demo" class="section-examples">
            <vue-images
                :imgs="images"
                :showcaption="true"
                :showclosebutton="true"
                :showthumbnails="true">
            </vue-images>
        </section>
    </main>
</div>
</template>

<script>
import { imagesRef, storageRef } from './database'
import Authentication from './components/Authentication'
import AddImageForm from './components/AddImageForm'
import VueImages from 'vue-images'

export default {
    name: 'App',
    data () {
        return {
            // state for vue-images component, must be established BEFORE component is rendered
            images: [],
            // useful data about the current user
            user: null
        }
    },
    firebase: {
        // local representations of firebase data, but separate from vue-images component data
        imagesDB: {
            source: imagesRef,
            readyCallback: function () {
                if (this.imagesDB.length && ! this.images.includes(this.imagesDB[0])) {
                    this.images.push( ...this.imagesDB)
                }
            }
        }
    },
    components: {
        Authentication,
        AddImageForm,
        VueImages
    },
    methods: {
        // get image selected by user and upload it to Firebase for storage
        storeImage (title, imageFile) {
            if (this.user) {
                storageRef.child('images/' + imageFile.name)
                          .put(imageFile)
                          .then(snapshot => {
                                    var toAdd = {
                                        imageUrl: snapshot.downloadURL,
                                        caption: `${title} shared by ${this.user.name}`
                                    }
                                    // vue-images component does not play nicely with Firebase so need to manually add to both
                                    imagesRef.push(toAdd)
                                    this.images.push(toAdd)
                                })
            }
            else {
                alert('You must be logged in to add images')
            }
        },
        // allow child component to change user value
        getUser () {
            return this.user
        },
        setUser (user) {
            this.user = user
        }
    }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h2 {
    color: firebrick;
    text-align: center;
}

section {
    margin-top: 40px;
}
</style>

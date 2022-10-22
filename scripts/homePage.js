import { createPostModal,closeModalCreatePost } from "./modals.js";

function openModalCreationPost (){
    const btnOpenModalAboutCreatePost = document.querySelector('#modal-create-post')

    btnOpenModalAboutCreatePost.addEventListener('click',(e) =>{
        e.preventDefault()
        createPostModal()
        closeModalCreatePost()
    })
}

openModalCreationPost()
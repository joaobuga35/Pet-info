import { createPostModal,closeModalCreatePost,modalExcludes,modalAcessPost,modalEditPost } from "./modals.js";
import {findPost,createPost,findUser, deletePost} from "./requestHome.js"
const token = localStorage.getItem('user')


function openModalCreationPost (){
    const btnOpenModalAboutCreatePost = document.querySelector('#modal-create-post')

    btnOpenModalAboutCreatePost.addEventListener('click',(e) =>{
        e.preventDefault()
        createPostModal()
        closeModalCreatePost()
    })
}
openModalCreationPost()

async function renderAllPosts () {
    const callPost = await findPost(token)
    console.log(callPost)
    const ul = document.querySelector('#user-posts')
    ul.innerHTML = ""
    renderLi(callPost)
}
renderAllPosts()

async function headerProfile(){

    const callProfile = await findUser(token)
    console.log(callProfile)
    renderProfile(callProfile)
}
headerProfile()

function renderProfile (user) {
    const divHeader = document.querySelector('.div-header')

    const img = document.createElement('img')

    img.id = user.id
    img.classList = 'img-profile jojo'
    img.src = user.avatar
    img.alt = 'Foto do usuário'

    divHeader.append(img)
    return divHeader
}

 async function renderLi(arr) {
    const callProfile = await findUser(token)
    const imgProfile = document.querySelector('.img-profile')
    console.log(imgProfile)
    const ul = document.querySelector('#user-posts')
    ul.innerHTML = ""
    arr.forEach((elem) => {
        const li = document.createElement('li')
        li.id = elem.id

        const divProfile = document.createElement('div')
        const divProfileDatas= document.createElement('div')
        const imgProfilePost = document.createElement('img')
        const spanName = document.createElement('span')
        const spanData = document.createElement('span')

        const divButtons = document.createElement('div')
        const buttonEdit = document.createElement('button')
        const buttonDelete = document.createElement('button')

        const divContentPost = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        const buttonAcessPost = document.createElement('button')

        li.classList = "list-items animation"
        divProfile.classList = "div-information-profile"
        divProfileDatas.classList = "profile-datas"
        imgProfilePost.classList = "img-post"
        spanName.classList = "name-profile"
        spanData.classList = "date-profile"
        divButtons.classList = "div-btns-edit-delete"
        buttonEdit.classList = "btn-edit"
        buttonDelete.classList = "btn-delete"
        divContentPost.classList = "content-post"

        imgProfilePost.src = elem.user.avatar
        imgProfilePost.id = elem.user.id
        spanName.innerText = elem.user.username
        spanData.innerText = '| Outubro 2022'

        if (imgProfile.id != imgProfilePost.id) {
            buttonEdit.classList.add('hidden-buttons')
            buttonDelete.classList.add('hidden-buttons')
        }
        buttonEdit.innerText = 'Editar'
        buttonEdit.id = 'edit-post'
        buttonEdit.addEventListener('click', async (e) => {
            e.preventDefault()
            modalEditPost(elem)
            renderAllPosts()
        })

        buttonDelete.innerText = 'Excluir'
        buttonDelete.id = 'delete-post'
        buttonDelete.addEventListener('click',async (e) => {
            e.preventDefault()
            modalExcludes(token,elem.id)
            renderAllPosts()
        })

        h3.innerText = elem.title
        p.innerText = elem.content
        buttonAcessPost.classList = 'btn-acess-post'
        buttonAcessPost.innerText = 'Acessar publicação'
        buttonAcessPost.id = 'btn-open-post'

        buttonAcessPost.addEventListener('click',(e)=> {
            e.preventDefault()
            bringPost(elem.id)
        })

        divProfileDatas.append(imgProfilePost,spanName,spanData)
        divButtons.append(buttonEdit,buttonDelete)
        divContentPost.append(h3,p,buttonAcessPost)
        divProfile.append(divProfileDatas,divButtons)

        li.append(divProfile,divContentPost)
        ul.append(li)
    })
    return ul
}

async function bringPost(id){
    const callPost = await findPost(token)

    const postFind = callPost.find(elem => {
        if (elem.id == id) {
            return elem
        }
    })
    console.log(postFind)
    modalAcessPost(postFind)
}

async function editPost(id){
    const callPost = await findPost(token)

    const postFind = callPost.find(elem => {
        if (elem.id == id) {
            return elem
        }
    })
    console.log(postFind)
    modalEditPost(postFind)
}

const buttonExitProfile = document.querySelector('#button-exit-count')
buttonExitProfile.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('user')
    window.location.replace('../../index.html')
})
export{renderLi,renderAllPosts}

import { createPostModal,closeModalCreatePost,modalExcludes,modalAcessPost } from "./modals.js";
import {findPost,createPost,findUser} from "./requestHome.js"

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
    const token = localStorage.getItem('user')
    console.log(token)
    
    const callPost = await findPost(token)
    const ul = document.querySelector('#user-posts')
    ul.innerHTML = ""
    renderLi(callPost)
}
renderAllPosts()

async function headerProfile(){
    const token = localStorage.getItem('user')

    const callProfile = await findUser(token)
    renderProfile(callProfile)
}
headerProfile()

function renderProfile (user) {
    const divHeader = document.querySelector('.div-header')

    const img = document.createElement('img')

    img.classList = 'img-profile'
    img.src = user.avatar
    img.alt = 'Foto do usuário'

    divHeader.append(img)
    return divHeader
}

function renderLi(arr) {
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

        li.classList = "list-items"
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
        spanName.innerText = elem.user.username
        spanData.innerText = new Date()

        buttonEdit.innerText = 'Editar'
        buttonEdit.id = 'edit-post'
        buttonDelete.innerText = 'Excluir'
        buttonDelete.id = 'delete-post'

        h3.innerText = elem.title
        p.innerText = elem.content
        buttonAcessPost.classList = 'btn-acess-post'
        buttonAcessPost.innerText = 'Acessar publicação'
        buttonAcessPost.id = 'btn-open-post'

        buttonAcessPost.addEventListener('click',(e)=> {
            e.preventDefault()
            modalAcessPost()
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

export{renderLi}

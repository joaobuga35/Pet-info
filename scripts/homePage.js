import { createPostModal,closeModalCreatePost } from "./modals.js";
import {findPost,createPost} from "./requestHome.js"

function openModalCreationPost (){
    const btnOpenModalAboutCreatePost = document.querySelector('#modal-create-post')

    btnOpenModalAboutCreatePost.addEventListener('click',(e) =>{
        e.preventDefault()
        createPostModal()
        closeModalCreatePost()
    })
}

openModalCreationPost()

async function test () {
    const token = localStorage.getItem('user')
    console.log(token)
    
    const callPost = await findPost(token)
    console.log(callPost)
}



test()

function renderLi(arr) {
    const ul = document.querySelector('#user-posts')
     ul.innerHTML = ""
    arr.forEach((elem) => {
        const li = document.createElement('li')

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
        spanData.innerText = '| Outubro 2022'

        buttonEdit.innerText = 'Editar'
        buttonEdit.id = 'edit-post'
        buttonDelete.innerText = 'Excluir'
        buttonDelete.id = 'delete-post'

        h3.innerText = elem.title
        p.innerText = elem.content
        buttonAcessPost.classList = 'btn-acess-post'
        buttonAcessPost.id = 'btn-open-post'

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

{/* <li class="list-items">
                    <div class="div-information-profile">
                        <div class="profile-datas">
                            <img class="img-post" src="/assets/img/Ellipse 1.svg" alt="">
                            <span class="name-profile">Samuel Leão</span>
                            <span class="date-profile">| Outubro 2022</span>
                        </div>

                        <div class="div-btns-edit-delete">
                            <button class="btn-edit" id="edit-post">Editar</button>
                            <button class="btn-delete" id="delete-post">Excluir</button>
                        </div>
                    </div>

                    <div class="content-post">
                        <h3>Outubro Rosa: Detalhes sobre a importância da prevenção do câncer de mama em cadelas e gatas</h3>
                        <p>Assim como em humanos, cadelas e gatas também podem desenvolver câncer de mama. Ainda hoje, para ambas as espécies, o câncer de mama tem maior...</p>
                        <button class="btn-acess-post" id="btn-open-post">Acessar publicação</button>
                    </div> */}
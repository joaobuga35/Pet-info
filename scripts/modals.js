import { renderLi,renderAllPosts } from "./homePage.js"
import {findPost,createPost,deletePost,updatePost} from "../scripts/requestHome.js"
const token = localStorage.getItem('user')

function createPostModal (){
    const body = document.querySelector('body')
    const section = document.createElement('section')
    section.classList = ('modal-wrapper')

    section.insertAdjacentHTML('beforeend', `
    <div class="div-modal-create-post">
    <div class="div-btn-profile-exit">
        <h3>Criando novo post</h3>
        <button id="btn-close-modal" class="btn-exit-modal">X</button>
    </div>

    <form id="form-publi-post">
        <div class="div-title-post">
            <label for="titulo-do-post">Título do post</label>
            <input type="text" name="titulo" id="title" required placeholder="Digite o título aqui...">
        </div>

        <div class="div-text-post">
            <label for="texto-digitado">Conteúdo do post</label>
            <textarea name="texto-digitado" id="content" cols="30" rows="10"></textarea>
        </div>

        <div class="buttons-publi-post">
            <button id="cancel-modal" class="btn-cancel-delete">Cancelar</button>
            <button class="btn-publi-posts-modal" id="publi-post" type="submit">Publicar</button>
        </div>
    </form>
</div>`)
    body.appendChild(section)
    return body
}

function closeModalCreatePost(){
    const btnCloseModal = document.querySelector('#btn-close-modal')
    const btnCancelModal = document.querySelector('#cancel-modal')
    const sectionModal =  document.querySelector('.modal-wrapper')

    btnCloseModal.addEventListener('click', () =>{
        sectionModal.remove()
    })

    btnCancelModal.addEventListener('click', () =>{
        sectionModal.remove()
    })
    const token = localStorage.getItem('user')
    const form = document.querySelector('#form-publi-post')
    console.log(form)
    const elements = [...form.elements]

    // console.log(elements)

    form.addEventListener('submit',async event => {

        event.preventDefault()

        const body = {}

        elements.forEach((elem) => {
            if (elem.tagName !== "BUTTON" && elem.value !== "") {
                body[elem.id] = elem.value
            }
        })
        await createPost(token,body)
        const procuraPost = await findPost(token) 
        const ul = document.querySelector('#user-posts')
        ul.innerHTML = ""
        renderLi(procuraPost)
        form.reset()
        sectionModal.remove()
    })
}

function modalExcludes(token,id){
    const body = document.querySelector('body')
    const section = document.createElement('section')
    section.classList = ('modal-wrapper')

    const divDelete = document.createElement('div')

    const divButtonExit = document.createElement('div')
    const h3 = document.createElement('h3')
    const buttonExitModal = document.createElement('button')

    const divDescription = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')

    const divButtonCancel = document.createElement('div')
    const buttonCancel = document.createElement('button')
    const buttonDelete = document.createElement('button')

    divDelete.classList.add('div-delete-post')

    divButtonExit.classList.add('div-btn-profile-exit')
    h3.innerText = 'Confirmação de exclusão'
    buttonExitModal.innerText = 'X'
    buttonExitModal.classList = 'btn-exit-modal'
    buttonExitModal.addEventListener('click', (e) => {
        e.preventDefault()
        section.remove()
    })

    divDescription.classList = 'description-delete'
    h2.innerText = 'Tem certeza que deseja excluir este post?'
    p.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir'

    divButtonCancel.classList = 'div-btn-cancel-delete'
    buttonCancel.classList = 'btn-cancel-delete'
    buttonCancel.id = 'cancel-delete'
    buttonCancel.innerText = 'Cancelar'
    buttonCancel.addEventListener('click',(e)=> {
        e.preventDefault()
        section.remove()
    })

    buttonDelete.classList =  'btn-delete-post'
    buttonDelete.id = 'button-delete-post'
    buttonDelete.innerText = 'Sim,excluir este post'
    buttonDelete.addEventListener('click',async (e) => {
        e.preventDefault()
        await deletePost(token,id)
        renderAllPosts()
        section.remove()
    })

    divButtonExit.append(h3,buttonExitModal)
    divDescription.append(h2,p)
    divButtonCancel.append(buttonCancel,buttonDelete)
    divDelete.append(divButtonExit,divDescription,divButtonCancel)

    section.append(divDelete)
    body.append(section)
}

function modalAcessPost(object){
    const body = document.querySelector('body')
    const section = document.createElement('section')
    section.classList = ('modal-wrapper')

    const divModal = document.createElement('div')

    const divBtnProfileExit = document.createElement('div')

    const divProfileDatas = document.createElement('div')
    const img = document.createElement('img')
    const spanName = document.createElement('span')
    const spanData = document.createElement('span')
    const divButtonExit = document.createElement('div')
    const buttonExit = document.createElement('button')

    const h2 = document.createElement('h2')
    const p = document.createElement('p')

    divModal.classList = 'div-modal'

    divBtnProfileExit.classList = 'div-btn-profile-exit'
    divProfileDatas.classList = 'profile-datas'
    img.classList = 'img-post'
    spanName.classList = 'name-profile'
    spanData.classList = 'date-profile'
    divButtonExit.classList = 'exit-modal'
    buttonExit.classList = 'btn-exit-modal'

    img.src = object.user.avatar
    spanName.innerText = object.user.username
    spanData.innerText = '| Outubro 2022'

    buttonExit.innerText = 'X'
    buttonExit.addEventListener('click', () => {
        section.remove()
    })

    h2.innerText = object.title
    p.innerText = object.content

    divProfileDatas.append(img,spanName,spanData)
    divButtonExit.append(buttonExit)

    divBtnProfileExit.append(divProfileDatas,divButtonExit)
    divModal.append(divBtnProfileExit,h2,p)

    section.append(divModal)
    body.append(section)
}

function modalEditPost (object) {
    const body = document.querySelector('body')
    const section = document.createElement('section')
    section.classList = ('modal-wrapper')

    const divModal = document.createElement('div')
    divModal.classList = 'div-modal-create-post'

    const divTitle = document.createElement('div')
    divTitle.classList = 'div-btn-profile-exit'
    const h3 = document.createElement('h3')
    h3.innerText = 'Edição'
    const buttonExit = document.createElement('button')
    buttonExit.classList = 'btn-exit-modal'
    buttonExit.innerText = 'X'
    buttonExit.addEventListener('click', () => {
        section.remove()
    })

    const formEdit = document.createElement('form')
    formEdit.id = 'form-publi-post'


    const divTitlePost = document.createElement('div')
    divTitlePost.classList = 'div-title-post'
    const labelInput = document.createElement('label')
    labelInput.innerText = 'Título do post'
    const input = document.createElement('input')
    input.type = 'text'
    input.name = 'titulo'
    input.id = 'titulo-post'
    input.placeholder = 'Digite o título aqui...'
    input.value = object.title

    const divText = document.createElement('div')
    divText.classList = 'div-text-post'
    const labelTextArea = document.createElement('label')

    labelTextArea.innerText = 'Conteúdo do post'
    const textArea = document.createElement('textArea')
    textArea.name = 'texto-digitado'
    textArea.id = 'text-from-user'
    textArea.value = object.content

    const divButtons = document.createElement('div')
    divButtons.classList = 'buttons-publi-post'
    const buttonCancel = document.createElement('button')
    buttonCancel.classList = 'btn-cancel-delete'
    buttonCancel.innerText = 'Cancelar'
    buttonCancel.addEventListener('click', () => {
        section.remove()
    })

    const buttonSave = document.createElement('button')
    buttonSave.classList = 'btn-publi-posts-modal'
    buttonSave.id = 'btn-save-newpost'
    buttonSave.type = 'submit'
    buttonSave.innerText = 'Salvar alterações'

    formEdit.addEventListener('submit', async (e) => {
        e.preventDefault()

        const body = {
            title: input.value,
            content: textArea.value,
        }
        console.log(body)
        await updatePost(body,token,object.id)
        renderAllPosts()
        section.remove()
    })

    divTitle.append(h3,buttonExit)
    divTitlePost.append(labelInput,input)
    divText.append(labelTextArea,textArea)
    divButtons.append(buttonCancel,buttonSave)
    formEdit.append(divTitlePost,divText,divButtons)

    divModal.append(divTitle,formEdit)
    section.append(divModal)
    body.appendChild(section)

    return body
}

export{createPostModal,closeModalCreatePost,modalExcludes,modalAcessPost,modalEditPost}

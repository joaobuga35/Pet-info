import { renderLi } from "./homePage.js"
import {findPost,createPost} from "../scripts/requestHome.js"

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

function modalExcludes(){
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

    divDescription.classList = 'description-delete'
    h2.innerText = 'Tem certeza que deseja excluir este post?'
    p.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir'

    divButtonCancel.classList = 'div-btn-cancel-delete'
    buttonCancel.classList = 'btn-cancel-delete'
    buttonCancel.id = 'cancel-delete'
    buttonCancel.innerText = 'Cancelar'
    buttonDelete.classList =  'btn-delete-post'
    buttonDelete.id = 'button-delete-post'
    buttonDelete.innerText = 'Sim,excluir este post'

    divButtonExit.append(h3,buttonExitModal)
    divDescription.append(h2,p)
    divButtonCancel.append(buttonCancel,buttonDelete)
    divDelete.append(divButtonExit,divDescription,divButtonCancel)

    section.append(divDelete)
    body.append(section)
}

function modalAcessPost(){
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

    spanName.innerText = 'doido'
    spanData.innerText = new Date()

    buttonExit.innerText = 'X'
    buttonExit.addEventListener('click', () => {
        section.remove()
    })

    // h2.innerText = objeto.title
    // p.innerText = objeto.content

    divProfileDatas.append(img,spanName,spanData)
    divButtonExit.append(buttonExit)

    divBtnProfileExit.append(divProfileDatas,divButtonExit)
    divModal.append(divBtnProfileExit,h2,p)

    section.append(divModal)
    body.append(section)
}
export{createPostModal,closeModalCreatePost,modalExcludes,modalAcessPost}


// <!-- <section class="modal-wrapper" id="modal-open-post">
// <div class="div-modal">
//     <div class="div-btn-profile-exit">
//         <div class="profile-datas">
//             <img class="img-post" src="/assets/img/Ellipse 1.svg" alt="">
//             <span class="name-profile">Samuel Leão</span>
//             <span class="date-profile">| Outubro 2022</span>
//         </div>

//         <div class="exit-modal">
//             <button class="btn-exit-modal" id="btn-exit-modal-post">X</button>
//         </div>
//     </div>

//     <h2>Outubro Rosa: Detalhes sobre a importância da prevenção do câncer de mama em cadelas e gatas</h2>
//     <p>Assim como em humanos, cadelas e gatas também podem desenvolver câncer de mama. Ainda hoje, para ambas as espécies, o câncer de mama tem maior incidência. Mesmo com a evolução da medicina veterinária e da oncologia, o câncer de mama muitas vezes não tem cura, sendo o tratamento paliativo uma alternativa para dar conforto às fêmeas. 

//         Por isso, a conscientização sobre o tema é uma das ações de prevenção de maior importância, principalmente para a campanha do outubro rosa. Então como podemos ajudar a prevenir o câncer de mama em cadelas e gatas?
        
//         Assim como outros tipos de câncer, o câncer de mama pode ter inúmeras causas. Entre  as mais comuns, temos fatores genéticos, como predisposição de algumas raças, exposição à poluição, tabagismo passivo, obesidade, além do fato de os pets estarem vivendo mais, o que também pode causar maior chances de tumores. No caso do câncer de mama, a influência hormonal é um dos fatores de maior contribuição para o aparecimento dessa doença.
//     </p>
// <div>                           
// </section> -->

{/* <div class="div-modal-create-post">
    <div class="div-btn-profile-exit">
        <h3>Criando novo post</h3>
        <button class="btn-exit-modal">X</button>
    </div>

    <form id="form-publi-post">
        <div class="div-title-post">
            <label for="titulo-do-post">Título do post</label>
            <input type="text" name="titulo" id="titulo-post" required placeholder="Digite o título aqui...">
        </div>

        <div class="div-text-post">
            <label for="texto-digitado">Conteúdo do post</label>
            <textarea name="texto-digitado" id="text-from-user" cols="30" rows="10"></textarea>
        </div>

        <div class="buttons-publi-post">
            <button class="btn-cancel-delete">Cancelar</button>
            <button class="btn-publi-posts-modal" id="publi-post" type="submit">Publicar</button>
        </div>
    </form>
</div> */}

{/* <section class="modal-wrapper">
    <div class="div-modal-create-post">
        <div class="div-btn-profile-exit">
            <h3>Edição</h3>
            <button class="btn-exit-modal">X</button>
        </div>

        <form id="form-publi-post">
            <div class="div-title-post">
                <label for="titulo-do-post">Título do post</label>
                <input type="text" name="titulo" id="titulo-post" required placeholder="Digite o título aqui...">
            </div>

            <div class="div-text-post">
                <label for="texto-digitado">Conteúdo do post</label>
                <textarea name="texto-digitado" id="text-from-user" cols="30" rows="10"></textarea>
            </div>

            <div class="buttons-publi-post">
                <button class="btn-cancel-delete">Cancelar</button>
                <button class="btn-publi-posts-modal" id="btn-save-newpost" type="submit">Salvar Alterações</button>
            </div>
        </form>
    </div>
</section> */}

function renderToast(){
    const body = document.querySelector('body')

    const divToast = document.createElement('div')
    const divInformationToast = document.createElement('div')
    const img = document.createElement('img')
    const h2  = document.createElement('h2')
    const p = document.createElement('p')

    divToast.classList = 'container-toast'
    divInformationToast.classList = 'title-toast'
    
    img.src = '/assets/img/check.svg'
    h2.innerText = 'Sua conta foi criada com sucesso!'
    p.innerHTML = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="/index.html">Acessar página de login</a>'

    divInformationToast.append(img,h2)
    divToast.append(divInformationToast,p)

    body.appendChild(divToast)
}

function renderToastExcludes(){
    const body = document.querySelector('body')

    const divToast = document.createElement('div')
    const divInformationToast = document.createElement('div')
    const img = document.createElement('img')
    const h2  = document.createElement('h2')
    const p = document.createElement('p')

    divToast.classList = 'container-toast'
    divInformationToast.classList = 'title-toast'
    
    img.src = '/assets/img/check.svg'
    h2.innerText = 'Post deletado com sucesso!'
    p.innerText= 'O post selecionado para exlusão foi deletado, a partir de agora não aparecerá no seu feed '

    divInformationToast.append(img,h2)
    divToast.append(divInformationToast,p)

    body.appendChild(divToast)
    setTimeout(() => {
        divToast.remove()
    },4000)
}

{/* <div class="container-toast">
    <div class="title-toast">
        <img src="/assets/img/check.svg" alt="check">
            <h2>Sua conta foi criada com sucesso!</h2>
    </div>

    <p>Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="/index.html">Acessar página de login</a></p>
</div> */}

export {renderToast,renderToastExcludes};
import { renderToast } from "./toasts.js";

const baseUrl = "http://localhost:3333"

async function register(body){
    try {
        const request = await fetch(`${baseUrl}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const btnRegister = document.querySelector('#register-datas')
      btnRegister.innerHTML = `<img src = "/assets/img/spinner.svg" class="img-spinner">`

      if (request.ok) {
        renderToast()
        setTimeout(() => {
          window.location.replace('/index.html')
        },6000)
      } else {
        setTimeout(() => {
          btnRegister.innerText = "Cadastrar"
        },6000)
      }
    } catch (err) {
      console.log(err)
    }
}

async function login(body) {
    try {
        const request = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const btnLogin = document.querySelector('#btn-direct-home')
      btnLogin.innerHTML = '<img src = "./assets/img/spinner.svg" class="img-spinner">'

      if (request.status == 200) {
        setTimeout(() => {
          window.location.replace("./pages/homePage/homePage.html")
        },3700)

      } else {
        const spanMessageNotFound = document.querySelector('#password-error')
        const inputPassword = document.querySelector('#password')

        setTimeout(() => {
          btnLogin.innerText = "Acessar"
          spanMessageNotFound.classList.remove('hidden')
          inputPassword.classList.add('input-password-error')
        },3700)
      }

    } catch (err) {
        console.log(err)
    }
}

function cleanError() {
  const spanMessageNotFound = document.querySelector('#password-error')
  const inputPassword = document.querySelector('#password')

  inputPassword.addEventListener("keyup",() => {
    spanMessageNotFound.classList.add("hidden")
    inputPassword.classList.remove("input-password-error")
  })
}

cleanError()


export {register, login};
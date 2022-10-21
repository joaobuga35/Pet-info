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
      
    } catch (err) {

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
        setTimeout(() => {
          btnLogin.innerText = "Acessar"
        },3700)
      }

    } catch (err) {
        console.log(err)
    }
}

export {register, login};
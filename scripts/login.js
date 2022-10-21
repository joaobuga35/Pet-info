import { login } from "./request.js";

const btnLogar = document.querySelector('#btn-direct-home')
const inputsLogin = [...document.querySelectorAll('input')]

inputsLogin.forEach(inputs => {
    inputs.addEventListener('keyup',() => {
        if (inputs.value != "") {
            btnLogar.classList.remove('opacity')
        } else {
            btnLogar.classList.add('opacity')
        }
    })
})

const datasLogin = () => {
    const formLogin = document.querySelector('#form-login')
    const elements = [...formLogin.elements]
    console.log(elements)

    formLogin.addEventListener('submit', async (event) => {
        event.preventDefault()

        const body = {}

        elements.forEach(elem => {
            if (elem.tagName == "INPUT" && elem.value !== "") {
				body[elem.id] = elem.value
			}
        })
        console.log(body)
        await login(body)
    })
}

datasLogin()
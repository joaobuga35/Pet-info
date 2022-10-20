import { login } from "./request.js";

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
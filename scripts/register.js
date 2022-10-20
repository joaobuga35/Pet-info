import { register } from "./request.js";

const datasRegister = () => {
    const formRegister = document.querySelector('#form-register')
    const elements = [...formRegister.elements]
    console.log(elements)

    formRegister.addEventListener('submit', async (event) => {
        event.preventDefault()

        const body = {}

        elements.forEach(elem => {
            if (elem.tagName == "INPUT" && elem.value !== "") {
				body[elem.id] = elem.value
			}
        })
        console.log(body)
        await register(body)
    })
}

datasRegister()
import { register } from "./request.js";

const inputs = [...document.querySelectorAll('input')]
const btnRegister = document.querySelector('#register-datas')

inputs.forEach(datas => {
    datas.addEventListener("keyup",() => {
        if (datas.value != "") {
            btnRegister.classList.remove('opacity')
        } else {
            btnRegister.classList.add('opacity')
        }
    })
})

console.log(inputs)

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
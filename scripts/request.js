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
      console.log("oi")
    } catch (err) {
        console.log(err)
    }
}

export {register, login};
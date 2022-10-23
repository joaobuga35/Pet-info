async function findPost (token) {
    try {
        const response = await fetch('http://localhost:3333/posts',{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        })
        if (response.ok) {
            return response.json()
        } else {
            window.location.replace('../../index.html')
        }
    } catch (err) { 
        console.log(err)
    }
}

async function createPost(token,body) {
    try {
        const response = await fetch('http://localhost:3333/posts/create',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
        })
        return response.json()
    } catch(err) {
        console.log(err)
    }
}

export {findPost,createPost}
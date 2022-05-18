const backend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5500"

async function handleSignup() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const response = await fetch(`${backend_base_url}/signup`, {
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )

    console.log(response)

    // 회원가입 성공 시 로그인 페이지로 이동
    if (response.status == 201) {
        alert('회원가입 성공!')
        window.location.replace(`${frontend_base_url}/login.html`)
    }
    // 회원가입 실패 시
    else {
        alert('잘못된 입력입니다.')
        window.location.reload()
    }
}


async function handleLogin() {
    console.log("handleLogin")

    const loginData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)
    }
    )

    // if (response.status == 200) {
    //     alert('')
    //     window.location.replace(`${frontend_base_url}/index.html`);
    // }

    console.log(response)

    response_json = await response.json()
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

}

async function getName() {

    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    )
    response_json = await response.json()
    console.log(response_json)

    const username = document.getElementById("username")
    username.innerText = response_json.email
}
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

// 로그인
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

    if (response.status == 200) {
        alert('환영합니다!')
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert('아이디나 비밀번호가 옳지 않습니다.')
    }

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

async function postArticle(title, content) {

    const articleData = {
        title: title,
        content: content,
    }
    console.log(articleData)

    const response = await fetch(`${backend_base_url}/article`, {
        method: 'POST',
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(articleData)
    }
    )

    response_json = await response.json()
    console.log(response_json)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}


async function getArticles() {
    const response = await fetch(`${backend_base_url}/article`, {
        method: 'GET'
    }
    )

    response_json = await response.json()

    return response_json.articles

}

// 로그아웃
// backend와 송신을 하지 않기 때문에 async 필요 없음
function logout() {
    localStorage.removeItem("token")
    window.location.replace(`${frontend_base_url}/`);
}
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

    // console.log(response)

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
    // console.log("handleLogin")

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

    // console.log(response)

    response_json = await response.json()
    // console.log(response_json)
    localStorage.setItem("token", response_json.token)

}

async function getName() {

    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        // console.log(response_json)
        return response_json
    }
    else {
        return null
    }

}
// 게시글 등록하기
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
    // console.log(response_json)

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}

// 게시글 목록 보여주기
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
// 게시글 상세 페이지로 이동
function articleDetail(article_id) {
    // console.log(article_id)
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    location.href = url
}

// 게시글 상세 fatch
async function getArticleDetail(article_id) {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: 'GET'
    }
    )
    response_json = await response.json()
    // console.log(response_json)

    return response_json.article
}

// 게시글 수정
async function patchArticle(article_id, title, content) {

    const articleData = {
        "title": title,
        "content": content
    }
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: 'PATCH',
        body: JSON.stringify(articleData)
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }


}
// 게시글 삭제
async function deleteArticle() {
    const response = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: 'DELETE'

    }
    )

    if (response.status == 200) {
        window.location.replace(`${frontend_base_url}/`);
    } else {
        alert(response.status)
    }
}

// 댓글 작성
async function postComment(article_id, comment_content) {
    const commentData = {
        "content": comment_content
    }
    const response = await fetch(`${backend_base_url}/article/${article_id}/comment`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: 'POST',
        body: JSON.stringify(commentData)
    }
    )

    if (response.status == 200) {
        return response
    } else {
        alert(response.status)
    }

}

async function postLike(article_id) {
    const response = await fetch(`${backend_base_url}/article/${article_id}/like`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: 'POST'

    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.status)
    }

}
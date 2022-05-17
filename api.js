async function handleSignup() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )

    console.log(response)

    // 회원가입 성공 시 로그인 페이지로 이동
    if (response.status == 201) {
        alert('회원가입 성공!')
        window.location.replace("http://127.0.0.1:5500/login.html")
    }
    // 회원가입 실패 시
    else {
        alert('잘못된 입력입니다.')
    }

}

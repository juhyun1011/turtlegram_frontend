async function handleSignin() {

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
    if (response.status == 200) {
        alert(response['msg'])
        window.location.replace("http://127.0.0.1:5500/login.html")
    }
    else {
        alert(response['msg'])
    }

}

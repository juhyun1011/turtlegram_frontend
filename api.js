async function handleSignin() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json",
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(signupData)
    })
    return response.json();

}
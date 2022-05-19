async function loadArticles() {
    console.log("here")
    articles = await getArticles()
    console.log(articles)
    const article_list = document.getElementById("articles")

    articles.forEach(article => {
        console.log(article)
        const newArticle = document.createElement("li");
        newArticle.setAttribute("id", article._id)
        newArticle.innerText = article.title
        article_list.appendChild(newArticle)
    });


}

async function checkLogin() {
    const name = await getName();
    console.log(name)
    const username = document.getElementById("username")
    const loginoutButton = document.getElementById("loginout")
    if (name) {
        username.innerText = name
        loginoutButton.innerText = "로그아웃"
        loginoutButton.setAttribute("onclick", "logout()")
    } else {
        username.innerText = "로그인해주세요"
        loginoutButton.innerText = "로그인"
        loginoutButton.setAttribute("onclick", "location.href='/login.html'")
    }
}

checkLogin();
loadArticles();

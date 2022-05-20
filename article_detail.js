// url 불러오기
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('id');
console.log(article_id)


async function loadArticle(article_id) {
    const article = await getArticleDetail(article_id);
    ///////////
    console.log(article)
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    const user_email = document.getElementById("user_email")
    const time = document.getElementById("time")
    title.innerText = article.title
    content.innerText = article.content
    user_email.innerText = article.user_email
    time.innerText = article.time


}

loadArticle(article_id)
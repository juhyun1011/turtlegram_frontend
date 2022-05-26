// url 불러오기
const urlParams = new URLSearchParams(window.location.search);
const article_id = urlParams.get('id');
console.log(article_id)

// 게시글 보여주기
async function loadArticle(article_id) {
    const article = await getArticleDetail(article_id);

    // console.log(article)

    const title = document.getElementById("title")
    const content = document.getElementById("content")
    const user_email = document.getElementById("user_email")
    const time = document.getElementById("time")
    title.innerText = article.title
    content.innerText = article.content
    user_email.innerText = article.user_email
    time.innerText = article.time
    console.log(article.comments)

    //댓글 보여주기
    const comment_section = document.getElementById("comment_section")
    comment_section.innerHTML = ''  //comment_section에 있는 댓글들 비워주기

    for (let i = 0; i < article.comments.length; i++) {
        const new_comment = document.createElement("p")
        new_comment.innerText = article.comments[i].content
        comment_section.appendChild(new_comment)

    }




    const user = await getName()
    if (user.id != article.user) {
        const update_button = document.getElementById("update_button")
        const delete_button = document.getElementById("delete_button")
        update_button.style.visibility = "hidden"
        delete_button.style.visibility = "hidden"

    }


}

function updateMode() {
    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.style.visibility = "hidden"
    content.style.visibility = "hidden"

    //새롭게 생긴 박스 안에 원래 있던 내용 넣어주기
    const input_title = document.createElement("textarea")
    input_title.setAttribute("id", "input_title")
    input_title.innerText = title.innerHTML

    const input_content = document.createElement("textarea")
    input_content.setAttribute("id", "input_content")
    input_content.innerText = content.innerHTML
    input_content.rows = 10

    const body = document.body
    body.insertBefore(input_title, title)   //title 앞에 input_title 배치
    body.insertBefore(input_content, content)

    const update_button = document.getElementById("update_button")
    update_button.setAttribute("onclick", "updateArticle()")


}

async function updateArticle() {
    // 새롭게 작성한 내용 불러오기
    var input_title = document.getElementById("input_title")
    var input_content = document.getElementById("input_content")
    console.log(input_title.value, input_content.value)

    const article = await patchArticle(article_id, input_title.value, input_content.value);

    input_title.remove()
    input_content.remove()

    const title = document.getElementById("title")
    const content = document.getElementById("content")
    title.style.visibility = "visible"
    content.style.visibility = "visible"
    update_button.setAttribute("onclick", "updateMode()")

    loadArticle(article_id)


}

async function removeArticle() {
    await deleteArticle(article_id)

}


async function writeComment() {
    const comment_content = document.getElementById("comment_content")
    const comment = await postComment(article_id, comment_content.value)
    loadArticle(article_id)
    comment_content.value = ''

}





loadArticle(article_id)
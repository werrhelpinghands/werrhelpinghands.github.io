$(document).ready(function () {
  $(".btnn1").click(function () {
    $("#slidersec").slideToggle();
  });
});

async function loadProject() {
  console.log("loading");

  let _id = window.location.search.split("=")[1];
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects/${_id}`,
    method: "GET",
  })
    .then((res) => {
      let data = res.data;
      let html = `${data.ppt}
    <div class="contitledes">
      <h3>${data.title}</h3>
      <p>
        ${data.description}
      </p>
    </div>
    <div class="publish">
      <div><span class="pub-d">Published by : </span><span class="pub-da">${data.contactName}</span></div>
      <div><span class="pub-d">Contact : </span><span class="pub-da">${data.contactEmail}</span></div>
    </div>
    <div class="social-lin">
 
      <div class="linkssocial">
        <a href="#"><img class="linksocialicons" src="./images/facebook.png" alt="social share links "></a>
        <a href="#"><img class="linksocialicons" src="./images/linkedin.png" alt="social share links "></a>
        <a href="#"><img class="linksocialicons" src="./images/twitter.png" alt="social share links "></a>
      </div>

      <div class="tsurvey">
        <a href="https://forms.gle/HZhbibgeLb5RgtJu6"><button class="bt-ppts">TAKE SURVEY</button></a>
      </div>
    </div>
    <div class="commentsecmain">
      <button id="btnn1" class="maincommentbtn btnn1"><i class="fas fa-comment"></i> &nbsp; COMMENTS</button>
      <button class="maincommentbtn btnn2" onclick="addLike()"><i class="fas fa-thumbs-up"></i></button>
      <p style="margin-top: 13px;" id="likes">${data.likes} upvotes</p>
    </div>
    <div id="slidersec">
      <div class="commentssec">
        <div class="formclass">
          <form id="newComment">
            <input id="formtextbox" placeholder="Share your thoughts...." type="text"> <input id="formtextbutton"
              type="button" onclick="addComment()" value="SUBMIT">
          </form>
        </div>
      </div>
      <div class="commentsfromform">`;

      data.comments.reverse();
      data.comments.forEach((comment) => {
        html =
          html +
          `<div class="commentform">
      <h4>${comment.user}</h4>
      <h5>${comment.comment}</h5>
    </div>`;
      });
      html =html + `</div></div>`;
      document.getElementById("projectContainer").innerHTML = html;
      document.getElementById("newComment").hidden = localStorage.getItem('token') ? true : false
    })
    .catch((err) => {
      console.log("error", err);
    });
}

async function addComment(e) {
  let _id = window.location.search.split("=")[1];
  let body = {
    comment: document.getElementById('formtextbox').value
  }
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects/addComment/${_id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).then(()=>{
    window.location.assign(window.location.reload())
  })
}

async function addLike() {
  let _id = window.location.search.split("=")[1];
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects/addLike/${_id}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  }).then(()=>{
    let upvote = document.getElementById('likes').value
    let newCount = parseInt(upvote.split(" ")[0]) + 1
    document.getElementById('likes').value = `${newCount} upvotes`
  })
}
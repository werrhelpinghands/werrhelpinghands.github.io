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
      <!-- AddToAny BEGIN -->
      <div class="linkssocial">
        <a href="#"><img class="linksocialicons" src="./images/facebook.png" alt="social share links "></a>
        <a href="#"><img class="linksocialicons" src="./images/linkedin.png" alt="social share links "></a>
        <a href="#"><img class="linksocialicons" src="./images/twitter.png" alt="social share links "></a>
      </div>
      <!-- AddToAny END -->
      <div class="tsurvey">
        <a href="https://forms.gle/HZhbibgeLb5RgtJu6"><button class="bt-ppts">TAKE SURVEY</button></a>
      </div>
    </div>
    <div class="commentsecmain">
      <button id="btnn1" class="maincommentbtn btnn1"><i class="fas fa-comment"></i> &nbsp; COMMENTS</button>
      <button class="maincommentbtn btnn2"><i class="fas fa-thumbs-up"></i></button>
      <p style="margin-top: 13px;">40 upvotes</p>
    </div>
    <div id="slidersec">
      <div class="commentssec">
        <div class="formclass">
          <form action="">
            <input id="formtextbox" placeholder="Share your thoughts...." type="text"> <input id="formtextbutton"
              type="button" value="SUBMIT">
          </form>
        </div>
      </div>
      <div class="commentsfromform">
        <div class="commentform">
          <h4>User</h4>
          <h5>this is a comment</h5>
        </div>
        <div class="commentform">
          <h4>User</h4>
          <h5>this is a comment</h5>
        </div>
        <div class="commentform">
          <h4>User</h4>
          <h5>this is a comment</h5>
        </div>
      </div>
    </div>`;
      document.getElementById("projectConatiner").innerHTML = html;
    })
    .catch((err) => {
      console.log("error", err);
    });
}


$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})



function submitForm() {
  // Get the first form with the name
  // Usually the form name is not repeated
  // but duplicate names are possible in HTML
  // Therefore to work around the issue, enforce the correct index
  var frm = document.getElementsByTagName("FORM");

  frm.submit(); // Submit the form
  frm.reset(); // Reset all form data
  return false;
}
function myFunction() {
  let page = document.body.scrollTop;
  if (page >= 300) {
    document.querySelector(".itemactive").classList.add("scroll");
  } else {
    document.querySelector(".itemactive").classList.remove("scroll");
  }
}
setInterval(() => {
  window.addEventListener("scroll", myFunction());
}, 100);


async function getProjects() {
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects`,
    method: "GET",
  })
    .then((res) => {
      let projects = res.data;

      html = "";
      projects.forEach((project) => {
        html =
          html + `<li>
          <a href="/projectdes.html?id=${project._id}">
          <div>
            <img src="${project.image}" class="proimg" alt="projectpic">
            <div id="imageh4"><p>${project.title}</p></div>
            <h6 id="changemargin">${project.description.substr(0, 100)}.... Read more!</h6>
          </div></a>       
        </li>`;
      });
      document.getElementById("projects-box").innerHTML = html;
    })
    .catch((err) => {
      console.log("error", err);
    });
}

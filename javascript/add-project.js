document.getElementById("projectForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("sub-btn").disabled = false
  addProject();
});

async function addProject(title, ppt, description, contactName, contactEmail) {
  var title = document.getElementById("title").value;
  var ppt = document.getElementById("ppt").value;
  var description = document.getElementById("textar1").value;
  var contactName = document.getElementById("contactName").value;
  var contactEmail = document.getElementById("formtemptxt").value;

  let body = { title, ppt, description, contactName, contactEmail };

  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/projects/addProject",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).then((res) => {
    title = "";
    description = "";
    ppt = "";
    contactName = "";
    contactEmail = "";
    document.getElementById("sub-btn").disabled = false;
    window.location.assign(`/projectdes_admin.html?id=${res.id}`);
  });
}

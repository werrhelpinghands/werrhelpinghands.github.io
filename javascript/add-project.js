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
  var image = document.getElementById("inputfile").files[0]

  const formBody = new FormData();

  formBody.set('title',title)
  formBody.set('ppt',ppt)
  formBody.set('description',description)
  formBody.set('contactName',contactName)
  formBody.set('contactEmail',contactEmail)
  formBody.append('file', image)

  let body = { title, ppt, description, contactName, contactEmail };

  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/projects/addProject",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: formBody,
  }).then((res) => {
    title = "";
    description = "";
    ppt = "";
    contactName = "";
    contactEmail = "";
    document.getElementById("sub-btn").disabled = false;
    window.location.assign(`/projectdes.html?id=${res.data.id}`);
  });
}

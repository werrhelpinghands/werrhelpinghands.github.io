async function addNews() {
  document.getElementById("postBtn").innerHTML = `Loading...`;
  document.getElementById("postBtn").disabled = true;

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let url = document.getElementById("url").value;

  const formBody = new FormData();

  formBody.set("title", title);
  formBody.set("description", description);
  formBody.set("url", url);

  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/jobs/news",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: formBody,
  }).then((res) => {
    title = "";
    description = "";
    url = "";
    document.getElementById("postBtn").disabled = false;
    window.location.assign(`/dashboard-manage-applications_admin.html`);
  });
}

async function deleteNews(id) {
    console.log('delete');
    
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/jobs/news/delete/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    window.location.reload();
  }).catch(err=>{
      console.log(err);
  })
}
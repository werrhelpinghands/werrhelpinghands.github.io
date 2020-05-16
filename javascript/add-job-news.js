async function addNews() {
  document.getElementById("postBtn").innerHTML = `Loading...`;
  document.getElementById("postBtn").disabled = true;

  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let url = document.getElementById("url").value;

  let body = {
    title : title,
    description: description,
    url : url
  }

  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/news",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: body,
  }).then((res) => {
    title = "";
    description = "";
    url = "";
    document.getElementById("postBtn").disabled = false;
    window.location.assign(`/dashboard-manage-applications_admin.html`);
  });
}

function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/index_job_common.html");
}

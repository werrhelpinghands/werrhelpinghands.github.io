async function getJobs() {
  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/jobs",
    method: "GET",
  }).then((res) => {
    console.log(res.data);
    let body = `<tr>
      <th><i class="fa fa-file-text"></i> Title</th>
      <th><i class="fa fa-calendar"></i> Date Posted</th>
      <th><i class="fa fa-calendar"></i> Date Expires</th>
      <th></th>
  </tr>`;
    res.data.forEach((post) => {
      body = `${body} 
      <tr>
      <td class="title"><a href="job-page.html?id=${post._id}">${post.title}</span></a></td>
      <td>${post.createdAt.split("T")[0]}</td>
      <td>${post.expireAt.split("T")[0]}</td>
      <td class="action">
          <a href="#" onclick="deleteJob('${post._id}')" class="delete"><i class="fa fa-remove"></i> Delete</a>
      </td>
  </tr>`;
    });
    document.getElementById("jobs-container").innerHTML = body;
    document.getElementsByClassName("stacktable")[0].innerHTML = body
    document.getElementById("jobs-count").innerHTML = res.data.length
  });
}

function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/index_job_common.html");
}

async function deleteJob(id) {
    console.log('delete');
    
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/jobs/delete/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res) => {
    alert('Job Deleted')
    window.location.reload();
  }).catch(err=>{
      console.log(err);
  })
}

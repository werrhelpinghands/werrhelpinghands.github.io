function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/index_job_common.html");
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

function getNews() {
  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/jobs/news",
    method: "GET",
  }).then((res) => {
    console.log(res.data);
    let body = "";
    res.data.forEach((news) => {
      body = `${body} 
      <div class="application">
      <div class="app-content">

        <!-- Name / Avatar -->
        <div class="info">
          <span><a href="${news.url}" target="_blank">${news.title}</a></span>
          <br>
          <label>${news.description}</label>
          <a href=${news.url} target="_blank"><h4>Read more</h4></a>
          <br>
          <button onclick="deleteNews('${news._id}')" >Delete</button>
        </div>

        <div class="clearfix"></div>
      </div>
    </div>`;
    });
    document.getElementById('news-container').innerHTML = body
  });
}
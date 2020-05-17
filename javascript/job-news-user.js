async function getNews() {
  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/news",
    method: "GET",
  })
    .then((res) => {
      let body = "";
      res.data.forEach((news) => {
        body = `${body} 
        <div class="application">
        <div class="app-content">
  
          <div class="info">
            <span><a href="${news.url}" target="_blank">${news.title}</a></span>
            <br>
            <label>${news.description}</label>
            <a href=${news.url} target="_blank"><h4>Read more...</h4></a>
          </div>
  
          <div class="clearfix"></div>
        </div>
      </div>`;
      });
      document.getElementById("news-container").innerHTML = body;
    })
    .catch((err) => {
      console.log(err);
    });
}

function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/index_job_common.html");
}

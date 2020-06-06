async function getProjects() {
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/projects`,
    method: "GET",
  }).then((res) => {
      let projects = res.data;
      console.log(projects);
      
      html = ''
      projects.forEach(project=>{
          html = html + `<a class="card" href="/projectdes.html/?id=${project._id}">
          <span class="card-header" style="background-image: url(http://placeimg.com/400/400/people)">
            <span class="card-title">
              <h3>${project.title}</h3>
            </span>
          </span>
          <span class="card-summary">
            ${project.description.substr(0,130)}.... Read more!
          </span>
          
          <span class="card-meta">
            Published: ${project.createdAt.split('T')[0]}
          </span>
        </a>`
      })
      document.getElementById('projects').innerHTML = html
  }).catch((err)=>{
      console.log('error',err)
  })
}

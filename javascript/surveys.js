async function getSurveys() {
    await axios({
      url: `https://helpinghands-server.herokuapp.com/api/projects`,
      method: "GET",
    })
      .then((res) => {
        let projects = res.data;
  
        html = "";
        projects.forEach((project) => {
          html =
            html +
            `<div class="survey-card-1">

            <div class="survey-p-head">
              <h3>${project.title}</h3>
            </div>
            <div class="survey-p-d">
              <h5><a href="./projectdes.html?id=${project._id}">${project.description.substr(0, 110)}.... Read more!</a></h5>
            </div>
            <div class="surveybtn"><a href="${project.survey}"><button class="btnstext">Take
                  Survey</button></a>
            </div>
            
          </div>`;
        });
        document.getElementById("surveys").innerHTML = html;
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
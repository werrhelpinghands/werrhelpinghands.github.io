async function getJobs() {
  await axios({
    url: "https://helpinghands-server.herokuapp.com/api/jobs",
    method: "GET",
  }).then((res) => {
    console.log(res.data);
    let body = "";
    res.data.forEach((post) => {
      if (post.type === "Internship") {
        body = `${body} 
              <a href="job-page.html?id=${post._id}" class="listing full-time">
                              <div class="listing-logo">
                                  <img src=${post.logo} alt="">
                              </div>
                              <div class="listing-title">
                                  <h6 style="font-weight: bold;">${post.title}</h6>
                                  <h6>${post.company}</h6>
                                  <h6><span class="listing-type">APPLY</span></h6>
                                  <h6>${post.location}</h6>
                                  <h6>${post.pay}</h6>
                                  <h6>TYPE : ${post.type}</h6>
                              </div>
                          </a>`;
      } else {
        body = `${body} 
              <a href="job-page.html?id=${post._id}" class="listing full-time">
                              <div class="listing-logo">
                                  <img src=${post.logo} alt="">
                              </div>
                              <div class="listing-title">
                                  <h6 style="font-weight: bold;">${
                                    post.title
                                  }</h6>
                                  <h6>${post.company}</h6>
                                  <h6><span class="listing-type">APPLY</span></h6>
                                  <h6>Total Postions/Vacancies: ${
                                    post.available
                                  }</h6>
                                  <h6>Last Day to apply : ${
                                    post.expireAt.split("T")[0]
                                  }</h6>
                              </div>
                          </a>`;
      }
    });
    document.getElementById("jobs-container").innerHTML = body;
  });
}

async function handleFilter() {
  let categoryIndex = document.getElementById("category").value;
  category = document.getElementById("category").options[categoryIndex].text;
  let location = document.getElementById("location").value;
  let jobs = document.getElementById("check-2").checked;
  let internship = document.getElementById("check-3").checked;

  console.log(jobs, internship);

  let afterFilter = Alljobs;

  if (jobs && internship) {
    afterFilter = Alljobs;
  } else if (jobs)
    afterFilter = await Alljobs.filter((job) => {
      return job.type.toLowerCase() === "job";
    });
  else if (internship)
    afterFilter = await Alljobs.filter((job) => {
      return job.type.toLowerCase() === "internship";
    });

  if (categoryIndex !== "0") {
    afterFilter = await afterFilter.filter((job) => {
      return job.category === category;
    });
  }

  if (location) {
    afterFilter = await afterFilter.filter((job) => {
      return job.location.toLowerCase() === location.toLowerCase();
    });
  }

  let body = "";

  afterFilter.forEach((post) => {
    if (post.type === "Internship") {
      body = `${body} 
            <a href="job-page.html?id=${post._id}" class="listing full-time">
                            <div class="listing-logo">
                                <img src=${post.logo} alt="">
                            </div>
                            <div class="listing-title">
                                <h6 style="font-weight: bold;">${post.title}</h6>
                                <h6>${post.company}</h6>
                                <h6><span class="listing-type">APPLY</span></h6>
                                <h6>${post.location}</h6>
                                <h6>${post.pay}</h6>
                                <h6>TYPE : ${post.type}</h6>
                            </div>
                        </a>`;
    } else {
      body = `${body} 
            <a href="job-page.html?id=${post._id}" class="listing full-time">
                            <div class="listing-logo">
                                <img src=${post.logo} alt="">
                            </div>
                            <div class="listing-title">
                                <h6 style="font-weight: bold;">${
                                  post.title
                                }</h6>
                                <h6>${post.company}</h6>
                                <h6><span class="listing-type">APPLY</span></h6>
                                <h6>Total Postions/Vacancies: ${
                                  post.available
                                }</h6>
                                <h6>Last Day to apply : ${
                                  post.expireAt.split("T")[0]
                                }</h6>
                            </div>
                        </a>`;
    }
  });
  document.getElementById("jobs-container").innerHTML = body;
}

function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/login.html");
}

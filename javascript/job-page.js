async function getJob() {
  let _id = window.location.search.split("=")[1];
  await axios({
    url: `https://helpinghands-server.herokuapp.com/api/jobs/${_id}`,
    method: "GET",
  }).then((res) => {
    let data = res.data;
    console.log(data);
    let body = `<div id="titlebar">
        <div class="container">
            <div class="ten columns">
                <h2>${data.title}&nbsp;<span class="full-time">${
      data.type
    }</span></h2>
            </div>
        </div>
    </div>

    <div class="container">

        <!-- Recent Jobs -->
        <div class="eleven columns">
            <div class="padding-right">

                <!-- Company Info -->
                <div class="company-info">
                    <img src=${data.logo} alt="">
                    <div class="content">
                        <h4>${data.company}</h4>
                        <span><a href=${
                          data.website
                        }><i class="fa fa-link"></i>Website</a></span>

                    </div>
                    <div class="clearfix"></div>
                </div>

                <p class="margin-reset">
                <h3>About Company</h3>
                ${data.about}
                </p>

                <br>
                <h3>Roles</h3>
                <ul class="list-1">
                    ${roles(data.roles)}
                </ul>

                <br>

                <h4 class="margin-bottom-10">Requirment / Skills</h4>

                <ul class="list-1">
                    ${skills(data.skills)}
                </ul>

            </div>
        </div>


        <!-- Widgets -->
        <div class="five columns">

            <!-- Sort by -->
            <div class="widget">
                <h4>Overview</h4>

                <div class="job-overview">

                    <ul>
                        <li>
                            <i class="fa fa-map-marker"></i>
                            <div>
                                <strong>Location:</strong>
                                <span>${data.location}</span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-user"></i>
                            <div>
                                <strong>Job Title:</strong>
                                <span>${data.title}</span>
                            </div>
                        </li>
                        <li>
                            <i class="ln ln-icon-Add-User"></i>
                            <div>
                                <strong>
                                    <Table>Available Applications:</Table>
                                </strong>
                                <span>${data.available}</span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-clock-o"></i>
                            <div>
                                <strong>Duration</strong>
                                <span>${data.duration}</span>
                            </div>
                        </li>
                        <li>
                        <li>
                            <i class="ln ln-icon-Close-Window"></i>
                            <div>
                                <strong>Closing Date</strong>
                                <span>${data.expireAt.split('T')[0]}</span>
                            </div>
                        </li>
                        <li>
                            <i class="fa fa-money"></i>
                            <div>
                                <strong>Pay</strong>
                                <span>${data.pay}</span>
                            </div>
                        </li>
                    </ul>


                    <a href=${data.portal} target="_blank" class="button">Apply For This Job</a>
                    <a href=${data.notification} target="_blank" class="button">Download Notification</a>

                </div>

            </div>
        </div>

        <!-- Widgets / End -->
    </div>`;


    document.getElementById("jobContent").innerHTML = body;
  });
}

function roles(val) {
  let string = "";
  val.forEach((role) => {
    string = `${string}<li>${role}</li>`;
  });
  return string;
}

function skills(val) {
  let string = "";
  val.forEach((skill) => {
    string = `${string}<li>${skill}</li>`;
  });
  return string;
}

function logout() {
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
    window.location.replace("/index_job_common.html");
  }
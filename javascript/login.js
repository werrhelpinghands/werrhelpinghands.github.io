const loginBtn = document.getElementById("loginSubmit");

loginBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  if (document.getElementById("password").value) {
    let body = {
      email: document.getElementById("email").value,
      plainPassword: document.getElementById("password").value,
    };
    await axios({
      headers: {
        "Content-type": "application/json",
      },
      method: "post",
      url: "https://helpinghands-server.herokuapp.com/api/auth/signin",
      data: body,
      withCredentials: true,
    })
      .then((res) => {
        localStorage.setItem("admin", res.data.user.admin);
        localStorage.setItem("token", res.data.token);
        document.getElementById("error").innerHTML = "";
        document.getElementById("success").innerHTML = "Login Successful";
        // if(res.data.user.admin) window.location.assign('/index_job_admin.html')
        // else window.location.assign('/index_job_user.html')
        window.history.back()
      })
      .catch((err) => {
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("success").innerHTML = "";
        document.getElementById("error").innerHTML =
          "Email and Password didn't match";
      });
  } else {
    console.log("pass");
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }
});

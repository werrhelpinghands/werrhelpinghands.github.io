document.getElementById("resetPassword").addEventListener("click", (e) => {
  e.preventDefault();
  let password = document.getElementById("ConPass").value;
  let token = window.location.search.split("=")[1];
  console.log("start");
  console.log(password, token);
  axios({
    headers: {
      "Content-type": "application/json",
    },
    method: "post",
    url: "https://helpinghands-server.herokuapp.com/api/auth/resetPassword",
    data: {
      code: token,
      newPassword: password,
    },
  })
    .then((res) => {
      document.getElementById("NewPass").value = "";
      document.getElementById("ConPass").value = ""
      document.getElementById("error").innerHTML = "";
      document.getElementById("success").innerHTML =
        "Password Reset Successfull";
    })
    .catch((err) => {
      document.getElementById("NewPass").value = "";
      document.getElementById("ConPass").value = ""
      document.getElementById("success").innerHTML = "";
      document.getElementById("error").innerHTML = "User not Found";
    });
});

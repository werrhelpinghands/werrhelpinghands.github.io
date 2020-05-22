function resetPassword() {
  let password = document.getElementById("ConPass").value;
  let token = window.location.search.split("=")[1];
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
      password = "";
      document.getElementById("error").innerHTML = "";
      document.getElementById("success").innerHTML =
        "Password Reset Successfull";
    })
    .catch((err) => {
      document.getElementById("success").innerHTML = "";
      document.getElementById("error").innerHTML = "User not Found";
    });
}

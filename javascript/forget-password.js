document.getElementById("sendMail").addEventListener("click", (e) => {
  e.preventDefault()
  console.log("start");
  let email = document.getElementById("email").value;
  axios({
    headers: {
      "Content-type": "application/json",
    },
    method: "post",
    url: "https://helpinghands-server.herokuapp.com/api/auth/recoverAccount",
    data: { email: email },
  })
    .then((res) => {
      if (res.data.error === "google login") {
        email = "";
        document.getElementById("error").innerHTML = "";
        document.getElementById("success").innerHTML =
          "You already have a account linked to Google. Login using Google to continue";
      } else {
        email = "";
        document.getElementById("error").innerHTML = "";
        document.getElementById("success").innerHTML =
          "Check your Email to recover your account";
      }
    })
    .catch((err) => {
      document.getElementById("success").innerHTML = "";
      document.getElementById("error").innerHTML = "User not Found";
    });
});

document.getElementById("registerSubmit").addEventListener("click", () => {
  var firstname = document.getElementById("firstname").value;
  var lastname = document.getElementById("lastname").value;
  var email = document.getElementById("email").value;
  var date = document.getElementById("dob").value;
  var mob = document.getElementById("mob").value;
  var password = document.getElementById("password").value;
  var regx = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})$/;
  var regxm = /^[1-9][0-9]{9}$/;
  var regxp =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  if (
    firstname.trim() != "" &&
    lastname.trim() != "" &&
    mob.trim() != "" &&
    date.trim() != "" &&
    email.trim() != "" &&
    password.trim() != ""
  ) {
    if (regx.test(email)) {
      if (regxm.test(mob) && mob.length === 10) {
        if (regxp.test(password) && password.length >= 4) {
          if (date.length) {            
            register();
          }
        } else {
          alert("Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.");
          document.getElementById("password").style.border = "2px solid red";
          return false;
        }
      } else {
        alert("Please Enter Valid Mobile Number!!");
        document.getElementById("mob").style.border = "2px solid red";
        return false;
      }
    } else {
      alert("Please enter Valid Email Address!!");
      document.getElementById("email").style.border = "2px solid red";

      return false;
    }
  } else {
    alert("All Fields Are Required");
    return false;
  }
});

function register() {
  let body = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("mob").value,
    plainPassword: document.getElementById("password").value,
    dob: document.getElementById("dob").value,
  };
  axios({
    headers: {
      "Content-type": "application/json",
    },
    method: "post",
    url: "https://helpinghands-server.herokuapp.com/api/auth/signup",
    data: body,
  })
    .then((res) => {
      document.getElementById("firstname").value = "";
      document.getElementById("lastname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mob").value = "";
      document.getElementById("password").value = "";
      document.getElementById("dob").value = "";
      document.getElementById("error").innerHTML = "";
      document.getElementById("success").innerHTML = "Account Created";
    })
    .catch((err) => {
      document.getElementById("success").innerHTML = "";
      document.getElementById("error").innerHTML = "User already exist";
    });
}

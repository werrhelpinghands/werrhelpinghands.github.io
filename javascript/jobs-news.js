function logout() {
  localStorage.removeItem("admin");
  localStorage.removeItem("token");
  window.location.replace("/login.html");
}

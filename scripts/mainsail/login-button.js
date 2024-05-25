window.onload = function() {
  if (localStorage.getItem("isAuthorized") === "true") {
    document.getElementById("auth-button").style.display = "none";
  }
  else {
      document.getElementById("auth-button").addEventListener("click", function() {
      window.location.href = "/pages/login.html";
    });
  }
};



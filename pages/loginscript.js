const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    if (response.status === 200) {
        const data = await response.json();
        isAuthorized = data.success;

        if (isAuthorized) {
            localStorage.setItem("isAuthorized", true);
            window.location.href = "/";
        } else {
            alert("Неверный логин или пароль");
        }
    } else {
        alert("Ошибка при авторизации");
    }
});
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
        const isAuthorized = data.success;

        if (isAuthorized) {
            localStorage.setItem("isAuthorized", true);
            window.location.href = "/";
        } else {
            showModal(); // Показываем всплывающее окно с сообщением об ошибке
        }
    } else {
        showModal(); // Показываем всплывающее окно с сообщением об ошибке
    }
});

// Отображаем всплывающее окно
function showModal() {
    const errorModal = document.getElementById("errorModal");
    errorModal.style.display = "block";

    // Закрываем всплывающее окно через 5 секунд
    setTimeout(() => {
        errorModal.style.display = "none";
    }, 5000);

    // Добавляем обработчик события для кнопки закрытия
    const closeBtn = document.querySelector(".close-btn");
    closeBtn.addEventListener("click", () => {
        errorModal.style.display = "none";
    });
}

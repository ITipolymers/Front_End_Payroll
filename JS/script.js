// ======== Pagkuha ng elements ========
const container = document.querySelector('.container'); // Main container ng login/register
const registerBtn = document.querySelector('.register-btn'); // Button para mag-register
const loginBtn = document.querySelector('.login-btn'); // Button para bumalik sa login

// ======== Switching between forms ========

// Kapag pinindot ang "Register" button
registerBtn.addEventListener('click', () => {
    container.classList.add('active'); // Magdadagdag ng 'active' class para ipakita ang registration form
});

// Kapag pinindot ang "Login" button
loginBtn.addEventListener('click', () => {
    container.classList.remove('active'); // Tatanggalin ang 'active' class para ipakita ang login form
});

// ======== Registration Form Handling ========
const registerForm = document.querySelector(".form-box.register form"); // Kuhanin ang registration form

registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Iwasang mag-refresh ang page kapag nag-submit

    // Kuhanin ang mga input value
    const username = registerForm.querySelector("input[placeholder='Username']").value;
    const password = registerForm.querySelector("input[placeholder='Password']").value;

    // Isave ang username at password sa localStorage (parang simpleng database)
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Registered successfully! Now login."); // Abiso sa user

    container.classList.remove("active"); // Bumalik sa login form pagkatapos ng registration
});

// ======== Login Form Handling ========
const loginForm = document.querySelector(".form-box.login form"); // Kuhanin ang login form

loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Iwasang mag-refresh ang page

    // Kuhanin ang mga input value
    const username = loginForm.querySelector("input[placeholder='Username']").value;
    const password = loginForm.querySelector("input[placeholder='Password']").value;

    // I-compare ang input ng user sa nakasave na data sa localStorage
    if (username === localStorage.getItem("username") && password === localStorage.getItem("password")) {
        window.location.href = "dashboard.html"; // Kapag tama, redirect sa dashboard.html
    } else {
        alert("Invalid username or password!"); // Kapag mali ang login details
    }
});

// ======== Toggle Show/Hide Password ========
const passwordInput = document.getElementById("LoginPassword"); // Password input field
const toggleIcon = document.getElementById("ShowPassword"); // Icon para i-toggle ang visibility

toggleIcon.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    // Kung naka-hide ang password, ipakita ito
    passwordInput.type = "text";
    toggleIcon.classList.remove("bxs-lock-alt"); // Palitan ang icon sa "open"
    toggleIcon.classList.add("bxs-lock-open-alt");
  } else {
    // Kung naka-show ang password, itago ito
    passwordInput.type = "password";
    toggleIcon.classList.remove("bxs-lock-open-alt"); // Palitan ang icon pabalik sa "locked"
    toggleIcon.classList.add("bxs-lock-alt");
  }
});
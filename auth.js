// FR-03 and FR-04: simple front-end demo account flow.
document.addEventListener("DOMContentLoaded", () => {
  const signup = document.getElementById("signupForm");
  if (signup) {
    signup.addEventListener("submit", event => {
      event.preventDefault();
      const email = document.getElementById("signupEmail").value.trim();
      const password = document.getElementById("signupPassword").value;
      const terms = document.getElementById("terms").checked;
      const message = document.getElementById("signupMessage");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || password.length < 8 || !terms) {
        message.textContent = "Enter a valid email, use at least 8 password characters, and accept the Terms of Service.";
        message.style.color = "var(--danger)";
        return;
      }
      localStorage.setItem("libraDeskAccount", JSON.stringify({ email, password }));
      message.textContent = "Account created in this browser. You can now sign in.";
      message.style.color = "var(--success)";
      signup.reset();
    });
  }

  const signin = document.getElementById("signinForm");
  if (signin) {
    const passwordInput = document.getElementById("signinPassword");
    document.getElementById("showPassword").addEventListener("click", () => {
      const showing = passwordInput.type === "text";
      passwordInput.type = showing ? "password" : "text";
      document.getElementById("showPassword").setAttribute("aria-label", showing ? "Show password" : "Hide password");
    });
    signin.addEventListener("submit", event => {
      event.preventDefault();
      const email = document.getElementById("signinEmail").value.trim();
      const password = passwordInput.value;
      const alertBox = document.getElementById("signinAlert");
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      if (!validEmail || password.length < 8) {
        alertBox.textContent = "Invalid credential format. Check your email and ensure the password has at least 8 characters.";
        alertBox.hidden = false;
        return;
      }
      const account = JSON.parse(localStorage.getItem("libraDeskAccount") || "null");
      if (!account || account.email !== email || account.password !== password) {
        alertBox.textContent = "Account not found or password does not match. Create an account on the Sign Up page first.";
        alertBox.hidden = false;
        return;
      }
      alertBox.hidden = true;
      window.location.href = "home.html";
    });
  }
});

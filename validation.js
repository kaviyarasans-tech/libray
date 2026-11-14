// FR-02: Registration validation on blur and submit.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  const fields = {
    fullName: {
      el: document.getElementById("fullName"),
      test: value => /^[a-zA-Z\s]{2,50}$/.test(value.trim()),
      message: "Use 2–50 alphabetic characters and spaces only."
    },
    empId: {
      el: document.getElementById("empId"),
      test: value => /^[A-Z0-9]{6,12}$/i.test(value.trim()),
      message: "ID must contain 6–12 letters or numbers."
    },
    email: {
      el: document.getElementById("email"),
      test: value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()),
      message: "Enter a valid email address."
    },
    mobile: {
      el: document.getElementById("mobile"),
      test: value => /^[6-9]\d{9}$/.test(value.trim()),
      message: "Enter a 10-digit number starting with 6–9."
    },
    dept: {
      el: document.getElementById("dept"),
      test: value => value !== "",
      message: "Please select your division."
    },
    password: {
      el: document.getElementById("password"),
      test: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value),
      message: "Use 8+ characters with uppercase, lowercase, number and symbol (@$!%*?&)."
    },
    confirmPassword: {
      el: document.getElementById("confirmPassword"),
      test: value => value !== "" && value === document.getElementById("password").value,
      message: "Passwords do not match."
    }
  };

  const submitButton = document.getElementById("registerSubmit");
  const success = document.getElementById("registerSuccess");

  function validateField(key) {
    const field = fields[key];
    const valid = field.test(field.el.value);
    field.el.classList.toggle("invalid", !valid);
    field.el.setAttribute("aria-invalid", String(!valid));
    const error = field.el.parentElement.querySelector(".error-msg");
    if (error) error.textContent = valid ? "" : field.message;
    field.el.dataset.valid = String(valid);
    return valid;
  }

  function validateAll() {
    return Object.keys(fields).map(validateField).every(Boolean);
  }

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener("blur", () => {
      validateField(key);
      if (key === "password" && fields.confirmPassword.el.value) validateField("confirmPassword");
      submitButton.disabled = !Object.values(fields).every(field => field.el.dataset.valid === "true");
    });
    fields[key].el.addEventListener("input", () => {
      // Recheck live after a field has first been visited, and keep the button state current.
      if (fields[key].el.dataset.valid !== undefined) validateField(key);
      if (key === "password" && fields.confirmPassword.el.value) validateField("confirmPassword");
      submitButton.disabled = !Object.values(fields).every(field => field.el.dataset.valid === "true");
    });
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validateAll()) {
      submitButton.disabled = true;
      return;
    }
    const member = {
      name: fields.fullName.el.value.trim(),
      empId: fields.empId.el.value.trim(),
      email: fields.email.el.value.trim(),
      mobile: fields.mobile.el.value.trim(),
      dept: fields.dept.el.value
    };
    localStorage.setItem("libraDeskMember", JSON.stringify(member));
    success.hidden = false;
    success.textContent = "Registration successful. Your member details have been saved in this browser. You can now sign in.";
    form.reset();
    Object.values(fields).forEach(field => {
      field.el.classList.remove("invalid");
      field.el.removeAttribute("aria-invalid");
      delete field.el.dataset.valid;
      const error = field.el.parentElement.querySelector(".error-msg");
      if (error) error.textContent = "";
    });
    submitButton.disabled = true;
  });
});

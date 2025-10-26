document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegisterLink = document.getElementById('show-register-form');
  const showLoginLink = document.getElementById('show-login-form');

  if (Parse.User.current()) {
    window.location.href = 'index.html';
  }

  showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form-container').classList.add('d-none');
    document.getElementById('register-form-container').classList.remove('d-none');
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form-container').classList.remove('d-none');
    document.getElementById('register-form-container').classList.add('d-none');
  });

  registerForm.addEventListener('submit', handleRegister);
  loginForm.addEventListener('submit', handleLogin);
});
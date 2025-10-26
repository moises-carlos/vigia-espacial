const handleRegister = async (event) => {
  event.preventDefault();
  const username = event.target['register-username'].value;
  const password = event.target['register-password'].value;
  
  const user = new Parse.User();
  user.set('username', username);
  user.set('password', password);

  try {
    await user.signUp();
    alert('Usuário registrado com sucesso! Agora você pode fazer login.');
    document.getElementById('show-login-form').click();
  } catch (error) {
    alert(`Erro ao registrar: ${error.message}`);
  }
};

const handleLogin = async (event) => {
  event.preventDefault();
  const username = event.target['login-username'].value;
  const password = event.target['login-password'].value;

  try {
    await Parse.User.logIn(username, password);
    window.location.href = 'index.html';
  } catch (error) {
    alert(`Erro ao fazer login: ${error.message}`);
  }
};

const handleLogout = async () => {
  try {
    await Parse.User.logOut();
    window.location.href = 'login.html';
  } catch (error) {
    alert(`Erro ao fazer logout: ${error.message}`);
  }
};
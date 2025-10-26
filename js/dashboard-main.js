Chart.defaults.color = '#e0e0e0';

document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout-button');
  const annotationForm = document.getElementById('annotation-form');

  if (!Parse.User.current()) {
    window.location.href = 'login.html';
    return;
  }

  fetchNeoData();
  fetchAnnotations();

  logoutButton.addEventListener('click', handleLogout);
  annotationForm.addEventListener('submit', handleCreateAnnotation);
});
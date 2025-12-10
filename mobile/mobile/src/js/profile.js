// Logout functionality
  document.getElementById('logoutBtn').onclick = () => {
    localStorage.removeItem('token'); // remove token
    window.location.href = 'signIn.html'; // redirect to login
};

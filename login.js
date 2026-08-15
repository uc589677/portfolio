async function login() {

  const email =
    document.getElementById("email")
      .value.trim();

  const password =
    document.getElementById("password")
      .value;


  if (!email || !password) {

    showMessage("Email and password required.");

    return;
  }


  const { error } =
    await supabaseClient.auth
      .signInWithPassword({
        email,
        password
      });


  if (error) {

    showMessage(error.message);

    return;
  }


  location.href = "admin.html";
}


function showMessage(message) {

  document.getElementById("message")
    .textContent = message;
}

/*
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'
*/

const form = document.getElementById("ticketForm");
const errorsDiv = document.getElementById("errors");
const avatarInput = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatarPreview");
const avatarMessage = document.querySelector(".avatar-message");

// Preview e Validação do avatar
avatarInput.addEventListener("change", function() {
  const file = this.files[0];
  // const acceptedTypes = ['image/jpeg', 'image/png'];
  if (file) {
    if (file.size > 500 * 1024) {
      avatarPreview.src = "";
      avatarPreview.style.display = "none";
      avatarMessage.style.display = "flex";
      errorsDiv.textContent = "The file is too large. Please upload an image that is 500 KB or smaller.";
      this.value = "";
      return;
    }
    /*
    if (!acceptedTypes.includes(file.type)) {
      errorsDiv.textContent = "Please upload a valid image file (JPEG or PNG).";
      this.value = "";
      avatarPreview.src = "";
      avatarPreview.style.display = "none";
      avatarMessage.style.display = "flex";
      return;
    }
    */
    const reader = new FileReader();
    reader.onload = function(e) {
      avatarPreview.src = e.target.result;
      avatarPreview.style.display = "block";
      avatarMessage.style.display = "none";
    };
    reader.readAsDataURL(file);
    errorsDiv.textContent = "";
  } else {
    avatarPreview.src = "";
    avatarPreview.style.display = "none";
    avatarMessage.style.display = "flex";
    errorsDiv.textContent = "";
  }
});

/*
const nameInput = document.getElementById("name");
const nameError = document.createElement('small');
nameError.className = 'error-message';
nameInput.parentNode.insertBefore(nameError, nameInput.nextSibling);

nameInput.addEventListener("input", () => {
    const name = nameInput.value.trim();
    if (name.length < 3) {
        nameError.textContent = "Please enter a name with at least 3 characters.";
    } else {
        nameError.textContent = "";
    }
});
*/

form.addEventListener("submit", (e) => {
  e.preventDefault();
  errorsDiv.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const github = document.getElementById("github").value.trim();
  const ticketId = Math.floor(Math.random() * 99999 + 1).toString().padStart(5, '0');
  const today = new Date();
  const formattedDate = formatDateToText(today);

  let errors = [];

  // Transforma a data em texto
  function formatDateToText(dateObj) {
    return dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Valida os dados
  if (!name) errors.push("Please enter your name."); 
  // if (name.trim().includes(' '))  - Aceita apenas o primeiro nome
  // if (!name.trim().includes(' '))  - Requer o nome completo
  // const nameError = document.getElementById("name-error");
  // document.getElementById('name-error').textContent = 'Please enter your name.'; - Adiciona o erro embaixo do campo

  if (!email || !/\S+@\S+\.\S+/.test(email)) errors.push("Please enter a valid email address.");
  if (!avatarInput.files[0]) {
    errors.push("Please select an avatar image.");
  }
  if (!github || !/^@(?!-)(?!.*--)[a-zA-Z0-9-]{1,39}(?<!-)$/.test(github)) {
    errors.push("Please enter a valid GitHub username.");
  }
  // if (!github.startsWith('@')) { github = '@' + github; } - Adiciona @ se não tiver
  /*
  const ticketGitHub = document.getElementById("ticketGitHub");
  const cleanGithub = github.startsWith('@') ? github.substring(1) : github;  - Garante que o @ nao seja duplicado
  ticketGitHub.textContent = '@' + cleanGithub;
  */

  if (errors.length > 0) {
    errorsDiv.innerHTML = errors.join("<br>");
    // alert(errors.join("\n")); - Mostra o erro atraves de alertas
    /*
    errors.forEach(error => {
      Toastify({
        text: error,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #ff416c, #ff4b2b)", // Um gradiente vermelho para destacar o erro
          borderRadius: "5px"
        },
        onClick: function(){} // Callback after click
      }).showToast();
    });
    return;
    */
    return;
  }

  // Preenche os dados no ticket
  document.getElementById('ticketNameHeader').textContent = name;
  document.getElementById('ticketEmailHeader').textContent = email;
  document.getElementById("ticketName").textContent = name;
  document.getElementById("ticketGitHub").textContent = github;
  document.getElementById("ticketDate").textContent = formattedDate;
  document.getElementById("ticketId").textContent = ticketId;

  const ticketAvatar = document.getElementById("ticketAvatar");
  if (avatarInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      ticketAvatar.src = e.target.result;
    };
    reader.readAsDataURL(avatarInput.files[0]);
  } else {
    ticketAvatar.src = "assets/images/image-avatar.jpg";
  }

  // Altera seção do ticket
  document.getElementById("formSection").classList.add("hidden");
  document.getElementById("ticketSection").classList.remove("hidden");
});
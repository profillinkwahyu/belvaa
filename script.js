document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelector("img");
  const msg = document.createElement("p");
  msg.textContent = "Aku bikin ini sambil mikirin kamu.";
  msg.style.display = "none";
  msg.style.fontSize = "18px";
  msg.style.marginTop = "12px";

  document.body.appendChild(msg);

  img.addEventListener("click", () => {
    msg.style.display = "block";
  });
});

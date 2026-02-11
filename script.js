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
function spawnHeart(x, y) {
  const heart = document.createElement("span");
  heart.textContent = "❤";
  heart.style.position = "absolute";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = "24px";
  heart.style.opacity = "1";
  heart.style.transition = "all 1s ease-out";

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.style.transform = "translateY(-40px) scale(1.3)";
    heart.style.opacity = "0";
  }, 10);

  setTimeout(() => {
    heart.remove();
  }, 1000);
}

document.addEventListener("click", (e) => {
  spawnHeart(e.pageX, e.pageY);
});

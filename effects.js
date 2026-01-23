const canvas = document.getElementById("effects");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* ======================
   ❤️ TRÁI TIM RƠI (CHẬM)
====================== */
const hearts = [];

function createHeart() {
  hearts.push({
    x: Math.random() * canvas.width,
    y: -20,
    size: 8 + Math.random() * 6,
    speed: 0.4 + Math.random() * 0.6,
    sway: Math.random() * 2
  });
}

function drawHeart(h) {
  ctx.fillStyle = "rgba(233, 30, 99, 0.5)";
  ctx.beginPath();
  ctx.moveTo(h.x, h.y);
  ctx.bezierCurveTo(h.x - h.size, h.y - h.size, h.x - h.size * 1.5, h.y + h.size / 2, h.x, h.y + h.size);
  ctx.bezierCurveTo(h.x + h.size * 1.5, h.y + h.size / 2, h.x + h.size, h.y - h.size, h.x, h.y);
  ctx.fill();
}

/* ======================
   🎆 PHÁO HOA
====================== */
const fireworks = [];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = 100 + Math.random() * canvas.height * 0.4;

  for (let i = 0; i < 40; i++) {
    fireworks.push({
      x,
      y,
      angle: Math.random() * Math.PI * 2,
      speed: 1 + Math.random() * 2,
      life: 60,
      color: `hsl(${Math.random() * 360}, 80%, 60%)`
    });
  }
}

function drawFirework(p) {
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
  ctx.fill();
}

/* ======================
   🎥 ANIMATION LOOP
====================== */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Hearts
  hearts.forEach((h, i) => {
    h.y += h.speed;
    h.x += Math.sin(h.y * 0.01) * h.sway;
    drawHeart(h);

    if (h.y > canvas.height) hearts.splice(i, 1);
  });

  // Fireworks
  fireworks.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.life--;
    drawFirework(p);

    if (p.life <= 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

/* ======================
   ⏱️ TỐC ĐỘ HIỆU ỨNG
====================== */
// Tim rơi chậm
setInterval(createHeart, 500);

// Pháo hoa nổ nhẹ, không dồn dập
setInterval(createFirework, 3000);

animate();


/* ======================
   👀 SCROLL REVEAL
====================== */
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15
  }
);

reveals.forEach(section => {
  observer.observe(section);
});




const images = document.querySelectorAll('.slides img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

images.forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightbox.classList.add('show');
  });
});

// Click nền để đóng
lightbox.addEventListener('click', () => {
  lightbox.classList.remove('show');
});



/* =====================
   COUNTDOWN WEDDING
===================== */
const weddingDate = new Date("2026-03-29T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = days.toString().padStart(2, "0");
  document.getElementById("hours").innerText = hours.toString().padStart(2, "0");
  document.getElementById("minutes").innerText = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").innerText = seconds.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();




document.getElementById("rsvpForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const attendance = document.querySelector(
    'input[name="attendance"]:checked'
  ).value;

  console.log({
    name,
    message,
    attendance
  });

  alert("Cảm ơn bạn đã xác nhận ❤️");

  this.reset();
});







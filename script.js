// ======================================================
// EDITE SOMENTE ESTA PARTE
// ======================================================
const CONFIG = {
  nomeBebe: "NOME DA BEBÊ",
  data: "00/00/2026",
  horario: "00:00",
  local: "Local do evento",

  // IMPORTANTE:
  // Troque pelo seu e-mail antes de publicar.
  // Exemplo: "seuemail@gmail.com"
  emailDestino: "SEU_EMAIL_AQUI"
};
// ======================================================

document.getElementById("babyName").textContent = CONFIG.nomeBebe;
document.getElementById("eventDate").textContent = CONFIG.data;
document.getElementById("eventTime").textContent = CONFIG.horario;
document.getElementById("eventPlace").textContent = CONFIG.local;

const form = document.getElementById("rsvpForm");
const guestQuestion = document.getElementById("guestQuestion");
const guestCountBox = document.getElementById("guestCountBox");
const guestCountEl = document.getElementById("guestCount");
const guestCountInput = document.getElementById("guestCountInput");
const success = document.getElementById("success");
const submitButton = form.querySelector(".submit");
let guestCount = 1;

document.querySelectorAll('input[name="presenca"]').forEach(radio => {
  radio.addEventListener("change", e => {
    const going = e.target.value.startsWith("Sim");
    guestQuestion.classList.toggle("hidden", !going);
    if (!going) {
      guestCountBox.classList.add("hidden");
      document.querySelectorAll('input[name="leva_acompanhantes"]').forEach(r => r.checked = false);
      guestCountInput.value = "0";
    }
  });
});

document.querySelectorAll('input[name="leva_acompanhantes"]').forEach(radio => {
  radio.addEventListener("change", e => {
    const hasGuests = e.target.value === "Sim";
    guestCountBox.classList.toggle("hidden", !hasGuests);
    guestCountInput.value = hasGuests ? String(guestCount) : "0";
  });
});

document.getElementById("minus").addEventListener("click", () => {
  guestCount = Math.max(1, guestCount - 1);
  updateCount();
});
document.getElementById("plus").addEventListener("click", () => {
  guestCount = Math.min(20, guestCount + 1);
  updateCount();
});
function updateCount() {
  guestCountEl.textContent = guestCount;
  guestCountInput.value = String(guestCount);
}

form.addEventListener("submit", async e => {
  e.preventDefault();

  if (!CONFIG.emailDestino || CONFIG.emailDestino === "SEU_EMAIL_AQUI") {
    alert("Antes de publicar, coloque seu e-mail em CONFIG.emailDestino no arquivo script.js.");
    return;
  }

  const presence = new FormData(form).get("presenca");
  if (presence && presence.startsWith("Sim")) {
    const companionChoice = new FormData(form).get("leva_acompanhantes");
    if (!companionChoice) {
      alert("Informe se você vai levar acompanhantes.");
      return;
    }
  }

  submitButton.disabled = true;
  submitButton.innerHTML = "⏳ ENVIANDO...";

  const data = new FormData(form);
  data.append("evento", `VolleyFralda da ${CONFIG.nomeBebe}`);
  data.append("data_evento", CONFIG.data);
  data.append("horario_evento", CONFIG.horario);
  data.append("local_evento", CONFIG.local);

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONFIG.emailDestino)}`, {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: data
    });

    if (!response.ok) throw new Error("Falha ao enviar");

    const nome = data.get("nome");
    const acompanhantes = Number(data.get("acompanhantes") || 0);
    const vai = String(data.get("presenca")).startsWith("Sim");

    form.classList.add("hidden");
    success.classList.remove("hidden");
    document.getElementById("successText").textContent = vai
      ? `${nome}, sua presença foi confirmada${acompanhantes ? ` com ${acompanhantes} acompanhante${acompanhantes > 1 ? "s" : ""}` : ""}. Nos vemos lá! 🏐💕`
      : `${nome}, recebemos sua resposta. Obrigado por avisar! 💕`;
  } catch (err) {
    alert("Não foi possível enviar agora. Tente novamente em alguns instantes.");
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = "<span>🏐</span> CONFIRMAR RESPOSTA";
  }
});

document.getElementById("newResponse").addEventListener("click", () => {
  form.reset();
  guestCount = 1;
  updateCount();
  guestQuestion.classList.add("hidden");
  guestCountBox.classList.add("hidden");
  guestCountInput.value = "0";
  success.classList.add("hidden");
  form.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

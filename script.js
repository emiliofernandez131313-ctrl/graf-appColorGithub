const redRange = document.getElementById("redRange");
const greenRange = document.getElementById("greenRange");
const blueRange = document.getElementById("blueRange");

const redInput = document.getElementById("redInput");
const greenInput = document.getElementById("greenInput");
const blueInput = document.getElementById("blueInput");

const colorBox = document.getElementById("colorBox");
const hexCode = document.getElementById("hexCode");
const rgbCode = document.getElementById("rgbCode");
const colorPicker = document.getElementById("colorPicker");
const copyBtn = document.getElementById("copyBtn");

// Actualizar color
function updateColor(r, g, b) {
  let rgb = `rgb(${r}, ${g}, ${b})`;
  let hex = "#" + [r, g, b].map(x => {
    let h = parseInt(x).toString(16);
    return h.length === 1 ? "0" + h : h;
  }).join("");

  colorBox.style.backgroundColor = rgb;
  hexCode.textContent = hex.toUpperCase();
  rgbCode.textContent = rgb;
  colorPicker.value = hex;
}

// Sincronizar sliders y inputs
function syncInputs() {
  redInput.value = redRange.value;
  greenInput.value = greenRange.value;
  blueInput.value = blueRange.value;
  updateColor(redRange.value, greenRange.value, blueRange.value);
}

// Eventos sliders
[redRange, greenRange, blueRange].forEach(slider => {
  slider.addEventListener("input", syncInputs);
});

// Eventos inputs numéricos
[redInput, greenInput, blueInput].forEach((input, i) => {
  input.addEventListener("input", () => {
    let value = Math.min(255, Math.max(0, input.value || 0));
    input.value = value;
    if (i === 0) redRange.value = value;
    if (i === 1) greenRange.value = value;
    if (i === 2) blueRange.value = value;
    updateColor(redRange.value, greenRange.value, blueRange.value);
  });
});

// Evento color picker
colorPicker.addEventListener("input", () => {
  let hex = colorPicker.value;
  let r = parseInt(hex.substr(1, 2), 16);
  let g = parseInt(hex.substr(3, 2), 16);
  let b = parseInt(hex.substr(5, 2), 16);

  redRange.value = r;
  greenRange.value = g;
  blueRange.value = b;

  redInput.value = r;
  greenInput.value = g;
  blueInput.value = b;

  updateColor(r, g, b);
});

// Botón copiar
copyBtn.addEventListener("click", () => {
  const code = `${hexCode.textContent} (${rgbCode.textContent})`;
  navigator.clipboard.writeText(code).then(() => {
    copyBtn.textContent = "✅ ¡Copiado!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copiar código";
    }, 1500);
  });
});

// Inicializar
syncInputs();


const malla = [
  { codigo: "CORE101", nombre: "Civilización Contemporánea Core I", creditos: 5, prerequisitos: [], color: "gris" },
  { codigo: "CORE102", nombre: "Civilización Contemporánea Core II", creditos: 5, prerequisitos: ["CORE101"], color: "gris" },
  { codigo: "EAL204", nombre: "Electivo de Ciencias Sociales", creditos: 4, prerequisitos: ["CORE101"], color: "gris" },
  { codigo: "DER104", nombre: "Razonamiento Jurídico", creditos: 6, prerequisitos: ["DER102"], color: "verde" },
  { codigo: "DER211", nombre: "Persona y Negocio Jurídico", creditos: 6, prerequisitos: ["DER102"], color: "azul" },
  { codigo: "DER243", nombre: "Organización Judicial", creditos: 4, prerequisitos: ["DER102", "DER124"], color: "naranja" },
  { codigo: "DER290", nombre: "Derecho Internacional Público", creditos: 4, prerequisitos: ["DER124"], color: "amarillo" },
  { codigo: "GYM102", nombre: "Deporte II", creditos: 1, prerequisitos: [], color: "blanco" },
  { codigo: "DER102", nombre: "Sistema Jurídico", creditos: 6, prerequisitos: [], color: "gris" },
  { codigo: "DER124", nombre: "Derecho Constitucional: El Estado", creditos: 6, prerequisitos: [], color: "gris" },
  { codigo: "GYM101", nombre: "Deporte I", creditos: 1, prerequisitos: [], color: "blanco" },
  { codigo: "CORE103", nombre: "Escritura Argumentativa Core", creditos: 4, prerequisitos: [], color: "gris" },
  { codigo: "DER106", nombre: "Destrezas Forenses", creditos: 4, prerequisitos: [], color: "gris" },
  { codigo: "DER109", nombre: "Historia del Derecho", creditos: 4, prerequisitos: [], color: "gris" }
];

const aprobados = new Set();

function crearTarjeta(ramo) {
  const div = document.createElement("div");
  div.className = `card ${ramo.color}`;
  div.id = ramo.codigo;

  const nombre = document.createElement("div");
  nombre.innerHTML = `<span class='codigo'>${ramo.codigo}</span><br>${ramo.nombre}`;
  div.appendChild(nombre);

  const creditos = document.createElement("div");
  creditos.className = "creditos";
  creditos.textContent = `${ramo.creditos} créditos`;
  div.appendChild(creditos);

  const prereq = document.createElement("div");
  prereq.className = "prereq";
  prereq.textContent = ramo.prerequisitos.length > 0 ? "Requiere: " + ramo.prerequisitos.join(", ") : "";
  div.appendChild(prereq);

  if (ramo.prerequisitos.length === 0) {
    div.classList.add("approved");
    aprobados.add(ramo.codigo);
  }

  div.addEventListener("click", () => {
    if (div.classList.contains("approved")) return;
    const puedeAprobar = ramo.prerequisitos.every(req => aprobados.has(req));
    if (puedeAprobar) {
      div.classList.add("approved");
      aprobados.add(ramo.codigo);
      actualizarRamos();
    }
  });

  return div;
}

function actualizarRamos() {
  malla.forEach(ramo => {
    const div = document.getElementById(ramo.codigo);
    if (!div.classList.contains("approved")) {
      const puede = ramo.prerequisitos.every(req => aprobados.has(req));
      div.style.opacity = puede ? "1" : "0.4";
      div.style.cursor = puede ? "pointer" : "not-allowed";
    }
  });
}

function inicializar() {
  const contenedor = document.getElementById("malla");
  malla.forEach(ramo => {
    const tarjeta = crearTarjeta(ramo);
    contenedor.appendChild(tarjeta);
  });
  actualizarRamos();
}

document.addEventListener("DOMContentLoaded", inicializar);

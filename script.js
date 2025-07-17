const ramos = [
  {
    id: "MAT101",
    nombre: "Cálculo I",
    semestre: 1,
    prerequisitos: [],
  },
  {
    id: "FIS101",
    nombre: "Física I",
    semestre: 1,
    prerequisitos: [],
  },
  {
    id: "MAT102",
    nombre: "Cálculo II",
    semestre: 2,
    prerequisitos: ["MAT101"],
  },
  {
    id: "FIS102",
    nombre: "Física II",
    semestre: 2,
    prerequisitos: ["FIS101"],
  },
];

const estadoRamos = JSON.parse(localStorage.getItem("estadoRamos")) || {};

function guardarEstado() {
  localStorage.setItem("estadoRamos", JSON.stringify(estadoRamos));
}

function crearMalla() {
  const container = document.getElementById("malla");
  container.innerHTML = "";

  const semestres = [...new Set(ramos.map(r => r.semestre))];

  semestres.forEach(semestre => {
    const columna = document.createElement("div");
    columna.className = "bg-white rounded-lg shadow p-4";
    columna.innerHTML = `<h2 class="text-xl font-semibold mb-4">Semestre ${semestre}</h2>`;

    ramos
      .filter(r => r.semestre === semestre)
      .forEach(ramo => {
        const btn = document.createElement("button");
        btn.textContent = ramo.nombre;
        btn.className = "w-full p-2 mb-2 rounded text-left transition-all";

        const aprobado = estadoRamos[ramo.id] === true;
        const prereqCumplidos = ramo.prerequisitos.every(pr => estadoRamos[pr]);

        if (aprobado) {
          btn.classList.add("bg-purple-400", "line-through", "text-white");
        } else if (!prereqCumplidos && ramo.prerequisitos.length > 0) {
          btn.classList.add("bg-gray-400", "cursor-not-allowed", "text-white");
          btn.disabled = true;
        } else {
          btn.classList.add("bg-pink-300", "hover:bg-pink-400");
        }

        btn.onclick = () => {
          if (ramo.prerequisitos.every(pr => estadoRamos[pr])) {
            estadoRamos[ramo.id] = !estadoRamos[ramo.id];
            guardarEstado();
            crearMalla();
          }
        };

        columna.appendChild(btn);
      });

    container.appendChild(columna);
  });
}

crearMalla();

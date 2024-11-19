const animales = [];
const tablaAnimales = document.getElementById("tablaAnimales");

// Inputs del formulario
const idInput = document.getElementById("idAnimal");
const nombreInput = document.getElementById("nombreAnimal");
const especieInput = document.getElementById("especieAnimal");
const razaInput = document.getElementById("razaAnimal");
const edadInput = document.getElementById("edadAnimal");
const pesoInput = document.getElementById("pesoAnimal");
const fechaInput = document.getElementById("fechaRegistro");

// Inicialización del gráfico
const ctxEspecies = document.getElementById('graficoEspecies').getContext('2d');
let graficoEspecies = new Chart(ctxEspecies, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Cantidad por especie',
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8DD1E1', '#FF9F40'],
    }],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  },
});

// Función para actualizar la gráfica
function actualizarGrafica() {
  const especies = {};
  animales.forEach(animal => {
    especies[animal.especie] = (especies[animal.especie] || 0) + 1;
  });

  graficoEspecies.data.labels = Object.keys(especies);
  graficoEspecies.data.datasets[0].data = Object.values(especies);
  graficoEspecies.update();
}

// Función para agregar un registro
function agregarAnimal(e) {
  e.preventDefault();

  const id = idInput.value.trim();
  const nombre = nombreInput.value.trim();
  const especie = especieInput.value.trim();
  const raza = razaInput.value.trim();
  const edad = parseInt(edadInput.value.trim(), 10);
  const peso = parseFloat(pesoInput.value.trim());
  const fecha = fechaInput.value;

  if (id && nombre && especie && raza && edad > 0 && peso > 0 && fecha) {
    animales.push({ id, nombre, especie, raza, edad, peso, fecha });
    idInput.value = '';
    nombreInput.value = '';
    especieInput.value = '';
    razaInput.value = '';
    edadInput.value = '';
    pesoInput.value = '';
    fechaInput.value = '';
    renderizarTabla();
    actualizarGrafica();
  } else {
    alert('Por favor, ingresa datos válidos.');
  }
}

// Función para renderizar la tabla
function renderizarTabla() {
  tablaAnimales.innerHTML = '';
  animales.forEach((animal, index) => {
    const fila = `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${animal.id}</td>
        <td>${animal.nombre}</td>
        <td>${animal.especie}</td>
        <td>${animal.raza}</td>
        <td>${animal.edad}</td>
        <td>${animal.peso.toFixed(2)} kg</td>
        <td>${animal.fecha}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarAnimal(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarAnimal(${index})">Eliminar</button>
        </td>
      </tr>
    `;
    tablaAnimales.innerHTML += fila;
  });
}

// Función para eliminar un registro
function eliminarAnimal(index) {
  animales.splice(index, 1);
  renderizarTabla();
  actualizarGrafica();
}

// Función para editar un registro
function editarAnimal(index) {
  const animal = animales[index];
  idInput.value = animal.id;
  nombreInput.value = animal.nombre;
  especieInput.value = animal.especie;
  razaInput.value = animal.raza;
  edadInput.value = animal.edad;
  pesoInput.value = animal.peso;
  fechaInput.value = animal.fecha;
  eliminarAnimal(index);
}

// Event Listener para agregar animal
document.getElementById('formAnimal').addEventListener('submit', agregarAnimal);
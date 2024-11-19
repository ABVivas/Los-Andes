const registros = [];
const tablaRegistros = document.getElementById("tablaRegistros");
const tipoInput = document.getElementById("tipoAlimentacion");
const cantidadInput = document.getElementById("cantidad");
const fechaInput = document.getElementById("fecha");

// Inicialización del gráfico
const ctxPie = document.getElementById('graficoPie').getContext('2d');
let graficoPie = new Chart(ctxPie, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }],
  },
});

// Función para actualizar la gráfica
function actualizarGrafica() {
  const tipos = registros.map(reg => reg.tipo);
  const cantidades = registros.map(reg => reg.cantidad);

  graficoPie.data.labels = tipos;
  graficoPie.data.datasets[0].data = cantidades;
  graficoPie.update();
}

// Función para agregar un registro
function agregarRegistro(e) {
  e.preventDefault();

  const tipo = tipoInput.value.trim();
  const cantidad = parseInt(cantidadInput.value.trim(), 10);
  const fecha = fechaInput.value;

  if (tipo && cantidad > 0 && fecha) {
    registros.push({ tipo, cantidad, fecha });
    tipoInput.value = '';
    cantidadInput.value = '';
    fechaInput.value = '';
    renderizarTabla();
    actualizarGrafica();
  } else {
    alert('Por favor, ingresa datos válidos.');
  }
}

// Función para renderizar la tabla
function renderizarTabla() {
  tablaRegistros.innerHTML = '';
  registros.forEach((registro, index) => {
    const fila = `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${registro.tipo}</td>
        <td>${registro.cantidad}</td>
        <td>${registro.fecha}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="editarRegistro(${index})">Editar</button>
          <button class="btn btn-sm btn-danger" onclick="eliminarRegistro(${index})">Eliminar</button>
        </td>
      </tr>
    `;
    tablaRegistros.innerHTML += fila;
  });
}

// Función para eliminar un registro
function eliminarRegistro(index) {
  registros.splice(index, 1);
  renderizarTabla();
  actualizarGrafica();
}

// Función para editar un registro
function editarRegistro(index) {
  const registro = registros[index];
  tipoInput.value = registro.tipo;
  cantidadInput.value = registro.cantidad;
  fechaInput.value = registro.fecha;
  eliminarRegistro(index);
}

// Event Listener para agregar registro
document.getElementById('formRegistro').addEventListener('submit', agregarRegistro);
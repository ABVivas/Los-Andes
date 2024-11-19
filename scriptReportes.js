const reportes = [];
let idReporteCounter = 1;

// Tabla para mostrar los reportes
const tablaReportes = document.getElementById("tablaReportes");

// Inputs del formulario
const idUsuarioInput = document.getElementById("idUsuario");
const tipoReporteInput = document.getElementById("tipoReporte");
const fechaInicioInput = document.getElementById("fechaInicio");
const fechaFinInput = document.getElementById("fechaFin");
const contenidoInput = document.getElementById("contenidoReporte");

// Generar un nuevo reporte
function generarReporte(e) {
  e.preventDefault();

  const idUsuario = idUsuarioInput.value.trim();
  const tipoReporte = tipoReporteInput.value;
  const fechaInicio = fechaInicioInput.value;
  const fechaFin = fechaFinInput.value;
  const contenido = contenidoInput.value.trim();

  if (!idUsuario || !tipoReporte || !fechaInicio || !fechaFin || !contenido) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const nuevoReporte = {
    idReporte: `R${idReporteCounter.toString().padStart(3, "0")}`,
    idUsuario,
    tipoReporte,
    fechaInicio,
    fechaFin,
    contenido,
    fechaGeneracion: new Date().toISOString().split("T")[0],
  };

  reportes.push(nuevoReporte);
  idReporteCounter++;
  renderizarTabla();
  limpiarFormulario();
}

// Renderizar tabla de reportes
function renderizarTabla() {
  tablaReportes.innerHTML = "";

  reportes.forEach((reporte) => {
    const fila = `
      <tr>
        <td>${reporte.idReporte}</td>
        <td>${reporte.idUsuario}</td>
        <td>${reporte.tipoReporte}</td>
        <td>${reporte.fechaInicio}</td>
        <td>${reporte.fechaFin}</td>
        <td>${reporte.contenido}</td>
        <td>${reporte.fechaGeneracion}</td>
      </tr>
    `;
    tablaReportes.innerHTML += fila;
  });
}

// Limpiar formulario
function limpiarFormulario() {
  idUsuarioInput.value = "";
  tipoReporteInput.value = "Animales";
  fechaInicioInput.value = "";
  fechaFinInput.value = "";
  contenidoInput.value = "";
}

// Exportar a PDF
function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Reporte de Reportes", 10, 10);
  let y = 20;

  reportes.forEach((reporte) => {
    doc.text(
      `${reporte.idReporte} - ${reporte.tipoReporte} - ${reporte.fechaGeneracion}`,
      10,
      y
    );
    y += 10;
  });

  doc.save("reportes.pdf");
}

// Exportar a Excel
function exportarExcel() {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(reportes);
  XLSX.utils.book_append_sheet(wb, ws, "Reportes");
  XLSX.writeFile(wb, "reportes.xlsx");
}

// Eventos
document
  .getElementById("formGenerarReporte")
  .addEventListener("submit", generarReporte);
document
  .getElementById("exportarPDF")
  .addEventListener("click", exportarPDF);
document
  .getElementById("exportarExcel")
  .addEventListener("click", exportarExcel);
 
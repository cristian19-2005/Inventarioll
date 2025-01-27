const mov = document.getElementById('oculto');
    const bot = document.getElementById('menu1');

    function mostrar(){
      mov.style.display = 'block';
    }

    bot.addEventListener('click', mostrar);

const bot2 = document.getElementById('menu2');

    function ocultar() {
      mov.style.display = 'none';
    }

    bot2.addEventListener('click', ocultar);
//agregar
    const mov2 = document.getElementById('add');
    const bot3 = document.getElementById('agregar');

    function mostrar2(){
      mov2.style.display = 'block';
    }

    bot3.addEventListener('click', mostrar2);

const bot4 = document.getElementById('close');

    function ocultar2() {
      mov2.style.display = 'none';
    }

    bot4.addEventListener('click', ocultar2);

//agregar los elementos a la tabla
const form = document.getElementById('form');
const tablaref = document.getElementById('productos');

// Escuchar el envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que la página se recargue

    // Obtener los valores del formulario
    let nombre = document.getElementById('nombre').value;
    let sale = document.getElementById('sale').value;
    let venta1 = document.getElementById('venta1').value;
    let venta2 = document.getElementById('venta2').value;
    let cantidad = document.getElementById('cantidad').value;

    // Crear un objeto con los datos del formulario
    let producto = { nombre, sale, venta1, venta2, cantidad };

    // Obtener los datos existentes en LocalStorage
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Agregar el nuevo producto a la lista
    productos.push(producto);

    // Guardar la lista actualizada en LocalStorage
    localStorage.setItem('productos', JSON.stringify(productos));

    // Agregar el producto a la tabla
    agregarFila(producto);

    // Limpiar el formulario
    form.reset();
});

// Función para agregar una fila a la tabla
function agregarFila(producto) {
    let filaref = tablaref.insertRow(-1);

    let addcell = filaref.insertCell(0);
    addcell.textContent = producto.nombre;

    let addcell1 = filaref.insertCell(1);
    addcell1.textContent = producto.sale;

    let addcell2 = filaref.insertCell(2);
    addcell2.textContent = producto.venta1;

    let addcell3 = filaref.insertCell(3);
    addcell3.textContent = producto.venta2;

    let addcell4 = filaref.insertCell(4);
    addcell4.textContent = producto.cantidad;
}

// Función para cargar los datos almacenados al abrir la página
function cargarDatos() {
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    productos.forEach(producto => {
        agregarFila(producto);
    });
}

// Llamar a cargarDatos() cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarDatos);

//ocultar inventario y venta
const ventatabla = document.getElementById('ventastabla');
const productostabla= document.getElementById('productos');
const ventabot= document.getElementById('venta');
const productosbot= document.getElementById('inventario');
const botvendi= document.getElementById('vendi');
function ventacambio(){
  mov.style.display = 'none';
  productostabla.style.display='none';
  bot3.style.display='none';
  botvendi.style.display='block';
  ventatabla.style.display='block';
}
function productoscambio(){
  mov.style.display = 'none';
  productostabla.style.display='block';
  bot3.style.display='block';
  botvendi.style.display='none';
  ventatabla.style.display='none';
}
ventabot.addEventListener('click',ventacambio);
productosbot.addEventListener('click',productoscambio);
const botvendido = document.getElementById('vendi');
const vendidoform = document.getElementById('vendido');
const closeventa = document.getElementById('closeventa');
function ocultvendido(){
  vendidoform.style.display='none'
}
function mostrarvendido(){
  vendidoform.style.display='block'
}
botvendido.addEventListener('click',mostrarvendido);
closeventa.addEventListener('click',ocultvendido);
//productos en la lista desplegable
const desplegable= document.getElementById('produc');
  document.addEventListener('DOMContentLoaded', function () {
    // Cargar productos desde LocalStorage
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    // Obtener la referencia al <select>
    const desplegable = document.getElementById('produc');

    // Llenar el desplegable con las opciones
    productos.forEach(producto => {
        const opcion = document.createElement('option');
        opcion.value = producto.nombre; // Valor de la opción
        opcion.textContent = producto.nombre; // Texto visible
        desplegable.appendChild(opcion); // Agregar opción al <select>
    });
    
});
//venta de productos tabla
// Manejar el evento de envío del formulario
const ventaform = document.getElementById('formventa');
const ventatable = document.getElementById('ventastabla');
// Manejar el evento de envío del formulario de venta
ventaform.addEventListener('submit', function (vender) {
  vender.preventDefault();

  // Obtener los valores del formulario
  let nombre = document.getElementById('produc').value;
  let cantidad = parseInt(document.getElementById('cantidadlitros').value); // Asegurarnos de que es un número
  let bidon = parseInt(document.getElementById('bidones').value) || 0;  // Asegurarse de que el bidón tiene un valor
  const fechaactual = new Date();
  const dia = fechaactual.getDate();
  const mes = fechaactual.getMonth() + 1; // Meses comienzan en 0
  const anio = fechaactual.getFullYear();
  const fecha = `${dia}/${mes}/${anio}`;

  // Verificar si la cantidad es válida (no NaN ni 0)
  if (isNaN(cantidad) || cantidad <= 0) {
    alert('Por favor, ingresa una cantidad válida');
    return; // Si no es válida, no continuar con el proceso
  }

  // Cargar productos desde LocalStorage
  let productos = JSON.parse(localStorage.getItem('productos')) || [];
  let productoEncontrado = productos.find(producto => producto.nombre === nombre);
  let precio = productoEncontrado ? parseFloat(productoEncontrado.venta2) : 0;  // Asegurarse de que el precio es un número

  // Calcular el precio total (producto * cantidad + precio del bidón)
  let precioTotal = (precio * cantidad) + obtenerPrecioBidon(bidon);

  // Crear el objeto de venta
  let venta = { nombre, cantidad, bidon, fecha, mes, precioTotal };

  // Cargar ventas existentes desde LocalStorage o iniciar con un array vacío
  let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
  ventas.push(venta);

  // Guardar las ventas actualizadas en LocalStorage
  localStorage.setItem('ventas', JSON.stringify(ventas));

  // Agregar la venta a la tabla
  agregarventa(venta);

  // Resetear el formulario
  ventaform.reset();
});

// Función para obtener el precio según el tipo de bidón
function obtenerPrecioBidon(bidon) {
  const preciosBidon = {
    0: 0,
    100: 100,  // 250 ml
    200: 200,  // 500 ml y 1 litro
    500: 500,  // 5 litros
  };
  return preciosBidon[bidon] || 0;
}

// Función para agregar una fila de venta a la tabla
function agregarventa(venta) {
  let fila = ventatable.insertRow(-1);

  let celda6 = fila.insertCell(0);
  celda6.textContent = venta.nombre;

  let celda7 = fila.insertCell(1);
  celda7.textContent = venta.cantidad;

  let celda8 = fila.insertCell(2);
  celda8.textContent = venta.bidon;

  let celda9 = fila.insertCell(3);
  celda9.textContent = venta.fecha;

  let celda10 = fila.insertCell(4);
  celda10.textContent = venta.precioTotal;  // Mostrar el total calculado
}

// Función para cargar todas las ventas guardadas al cargar la página
function cargarventas() {
  let ventas = JSON.parse(localStorage.getItem('ventas')) || [];
  ventas.forEach(venta => {
    agregarventa(venta);
  });
}

// Cargar las ventas al cargar la página
document.addEventListener('DOMContentLoaded', cargarventas);4
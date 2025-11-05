document.addEventListener('DOMContentLoaded', function() {
 const tituloPrincipal = document.getElementById('titulo-catalogo');
 const mainContainer = document.getElementById('catalogo-container');
 // 1. MANIPULACIÓN INICIAL: Confirmar que JS está activo
 if (tituloPrincipal) {
 tituloPrincipal.textContent = 'Catálogo Dinámico (Cargando datos XML...)';
 }
 function cargarYGenerarCatalogo() {
 // 2. FETCH/AJAX: Solicitar el archivo XML
 fetch('micatalogo.xml')
 .then(response => response.text()) // Convertir la respuesta a texto plano
 .then(xmlTexto => {
 // 3. PARSEO XML: Convertir el texto a un objeto manipulable
 const parser = new DOMParser();
 const xmlDoc = parser.parseFromString(xmlTexto, "application/xml");
 // Actualizar el título al tener los datos listos
 if (tituloPrincipal) {
 tituloPrincipal.textContent = 'Catálogo de figuras';
 }
 // 4. RECORRIDO Y GENERACIÓN DINÁMICA
 const productosXML = xmlDoc.querySelectorAll('producto');
 productosXML.forEach((productoXML, index) => {
 // a) Extracción de datos (Lectura de nodos y atributos)
 const nombre = productoXML.querySelector('nombre').textContent;
 const descripcion = productoXML.querySelector('descripcion').textContent;
 const precio = productoXML.querySelector('precio').textContent;
 const moneda = productoXML.querySelector('precio').getAttribute('moneda');
 const categoria = productoXML.querySelector('categoria').textContent;
 const imagenUrl = productoXML.querySelector('imagen').getAttribute('url');
 const idProducto = productoXML.getAttribute('id');
	// b) CREACIÓN DE LA ESTRUCTURA HTML (se usa innerHTML para simplificar)
	const section = document.createElement('section');
	section.classList.add('producto-destacado');
	// Añadir id al contenedor para que coincida con los selectores de CSS (por ejemplo #Producto1)
	section.id = idProducto;
 section.innerHTML = `
 <img src="${imagenUrl}" alt="${nombre}" class="producto-img"> 
<h2>${nombre}</h2>
 <p>${descripcion}</p>
 <p class="precio">Precio: ${precio} ${moneda}</p>
 <a href="#" class="enlace-compra">Comprar ahora</a>
 <button id="btn-detalles-${index}">Ver Detalles Técnicos</button>
 <div id="detalles-${index}" class="detalles-extra oculto">
 <p><strong>Referencia:</strong> ${idProducto}</p>
 <p><strong>Categoría:</strong> ${categoria}</p>
 </div>
 `;
 // c) INYECCIÓN en el DOM
 mainContainer.appendChild(section);
		// 5. ASIGNACIÓN DE EVENTOS (Interactividad)
		const botonDetalles = document.getElementById(`btn-detalles-${index}`);
		const detallesDiv = document.getElementById(`detalles-${index}`);
		if (botonDetalles && detallesDiv) {
			botonDetalles.addEventListener('click', function(e) {
				e.preventDefault();
				// Alternar clase 'oculto' para mostrar/ocultar detalles y actualizar texto del botón
				if (detallesDiv.classList.contains('oculto')) {
					detallesDiv.classList.remove('oculto');
					this.textContent = 'Ocultar Detalles';
				} else {
					detallesDiv.classList.add('oculto');
					this.textContent = 'Ver Detalles Técnicos';
				}
			});
		}
 });
 })
 .catch(error => {
 // Manejo de errores de carga del XML
 if (tituloPrincipal) {
 tituloPrincipal.textContent = 'ERROR: No se pudo cargar el catálogo. Revise la consola.';
 }
 console.error('Error en la carga del catálogo XML:', error);
 });
 }
 // Iniciar el proceso
 cargarYGenerarCatalogo();
 });
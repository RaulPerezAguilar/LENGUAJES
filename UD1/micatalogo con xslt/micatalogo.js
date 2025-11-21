/**
 * Función que ejecuta una consulta XPath y muestra los resultados en la Consola.
 * @param {string} xpathQuery - La ruta XPath que se desea comprobar.
 * @param {Document} xmlDoc - El objeto DOM del XML parseado.
 */
function comprobarXPath(xpathQuery, xmlDoc) {
 console.groupCollapsed(`RESULTADOS DE LA CONSULTA: "${xpathQuery}"`);

 // El método evaluate() de JavaScript ejecuta la consulta XPath
 // XPathResult.ORDERED_NODE_ITERATOR_TYPE es el tipo de resultado para listas de nodos
 const resultado = xmlDoc.evaluate(
 xpathQuery,
 xmlDoc,
 null,
 XPathResult.ORDERED_NODE_ITERATOR_TYPE,
 null
 );
 let nodo = resultado.iterateNext();
 let contador = 0;
 // Recorrer e imprimir los nodos
 while (nodo) {
 // Comprobamos si es un ATRIBUTO o un ELEMENTO y mostramos su valor.
 const valor = (nodo.nodeType === 2) ? nodo.value : nodo.textContent;
 console.log(`[${contador + 1}] Tipo: ${nodo.nodeName || 'Valor'} -> Valor: ${valor.trim()}`);
 contador++;
 nodo = resultado.iterateNext();
 }

 if (contador === 0) {
 console.warn('La consulta XPath NO devolvió ningún nodo. Revisa la ruta.');
 } else {
 console.info(`Consulta finalizada. Total de ${contador} nodos encontrados.`);
 }
 console.groupEnd();
}

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
 fetch('micatalogo.xml')
 .then(response => response.text())
 .then(xmlTexto => {
 // ... (código existente de DOMParser) ...
 const parser = new DOMParser();
 const xmlDoc = parser.parseFromString(xmlTexto, "application/xml");

 // =======================================================
 // A PARTIR DE AQUÍ: LLAMADAS DE PRUEBA DE XPATH
 // =======================================================

 // Desafío 1: Todos los atributos 'url'
 comprobarXPath("//imagen/@url", xmlDoc);
 // Desafío 2: Todos los productos de 'Personajes'
 comprobarXPath("//producto[categoria='Hollow Knight Silksong']", xmlDoc);
 // Desafío 3: Productos caros
 comprobarXPath("//producto[number(cuantia) > 100]/nombre", xmlDoc);
 // Desafío 4: Búsqueda Específica por ID
 comprobarXPath("//producto[@id='Producto3']/descripcion", xmlDoc);
 // Desafío 5: Operador Lógico (o)
 comprobarXPath("//producto[categoria='Uncharted' or categoria='The last of us']/nombre", xmlDoc);
 // Desafío 6: Categoria y precio mayor a 100
 comprobarXPath("//producto[categoria='Uncharted' and number(cuantia) > 100]/nombre", xmlDoc);
 // Desafio 7: Seleccionar descripcion del ultimo producto con count
 comprobarXPath("//producto[count(//producto)=position()]/descripcion", xmlDoc);
 // Desafio 8: Selecciona la url de una id y moneda EUR
 comprobarXPath("//producto[@id='Producto2']/cuantia[@moneda='EUR']/../imagen/@url", xmlDoc);
 // Desafio 9: Seleccionar la categoria de todos los productos pero usando el nodo descripcion como punto de partida
 comprobarXPath("//catalogo/producto/descripcion/../categoria", xmlDoc);
 // Desafio 10: Selecciona solo nodos de texto, de los productos mayor a 50€, mostrando solo la cuantia
 comprobarXPath("//producto[number(cuantia) > 50]/cuantia/text()", xmlDoc);
 // ... (código existente para generar el catálogo, etc.) ...
 // ...
 })
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
 const cuantia = productoXML.querySelector('cuantia').textContent;
 const moneda = productoXML.querySelector('cuantia').getAttribute('moneda');
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
 <p class="cuantia">cuantia: ${cuantia} ${moneda}</p>
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
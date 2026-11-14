const ADMIN_USER = "admin";
const ADMIN_PASS = "2026";

const cursosData = {
    "frontend": {
        titulo: "Desarrollo Web Frontend Moderno",
        desc: "Domina HTML5, CSS3 y JavaScript moderno creando interfaces de usuario adaptables, interactivas y profesionales orientadas a la experiencia del usuario.",
        importancia: "El frontend es la carta de presentación de cualquier sistema en internet. Aprender estas tecnologías te permite transformar ideas en aplicaciones web reales y accesibles.",
        precio: "$49.00 USD",
        thumb: '<i class="fa-brands fa-html5"></i>'
    },
    "database": {
        titulo: "Bases de Datos y Consultas SQL",
        desc: "Diseño conceptual y relacional de bases de datos, administración de registros y optimización de consultas complejas mediante lenguaje SQL.",
        importancia: "Toda aplicación moderna depende de un manejo seguro y eficiente de la información. Conocer bases de datos te otorga la capacidad de construir sistemas robustos.",
        precio: "$65.00 USD",
        thumb: '<i class="fa-solid fa-database"></i>'
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const paginaActual = window.location.pathname.split("/").pop();
    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    // 1. Seguridad de rutas
    if ((paginaActual === "curso.html" || paginaActual === "evaluacion.html" || paginaActual === "estudiante.html" || paginaActual === "modulo.html") && !usuarioActivo) {
        alert("Debe iniciar sesión para acceder a esta sección.");
        window.location.href = "index.html";
    }

    if (paginaActual === "admin.html" && (!usuarioActivo || usuarioActivo.rol !== "admin")) {
        alert("Acceso exclusivo para administradores.");
        window.location.href = "index.html";
    }

    // 2. Renderizar detalle de curso
    if (paginaActual === "curso-detalle.html") {
        const cursoKey = localStorage.getItem("cursoSeleccionado") || "frontend";
        const info = cursosData[cursoKey];
        if (info) {
            document.getElementById("detalleTitulo").textContent = info.titulo;
            document.getElementById("detalleDesc").textContent = info.desc;
            document.getElementById("detalleImportancia").textContent = info.importancia;
            document.getElementById("detallePrecio").textContent = info.precio;
            document.getElementById("detalleThumb").innerHTML = info.thumb;
        }
    }

    // 3. Renderizar Panel del Estudiante
    if (paginaActual === "estudiante.html" && usuarioActivo) {
        document.getElementById("nombreEstudianteNav").textContent = usuarioActivo.nombre;
        renderizarPanelEstudiante(usuarioActivo);
    }

    // 4. Aula virtual
    if (paginaActual === "curso.html" && usuarioActivo) {
        const cursoActivoNombre = localStorage.getItem("cursoActivoAula") || (usuarioActivo.misCursos && usuarioActivo.misCursos.length > 0 ? usuarioActivo.misCursos[0].nombre : 'Desarrollo Web');
        document.getElementById("tituloCursoAula").textContent = `Aula Virtual: ${cursoActivoNombre}`;
        document.getElementById("usuarioBienvenida").textContent = usuarioActivo.nombre;

        if (usuarioActivo.rol === "admin") {
            const enlaceVolver = document.getElementById("enlaceVolverAula");
            if (enlaceVolver) {
                enlaceVolver.href = "admin.html";
                enlaceVolver.innerHTML = '<i class="fa-solid fa-arrow-left"></i> Volver al Panel Admin TecnoCampus';
            }
        }
    }

    // 5. Módulo de Capacitación Dinámico con sus respectivos videos
    if (paginaActual === "modulo.html" && usuarioActivo) {
        const cursoActivoNombre = localStorage.getItem("cursoActivoAula") || "Capacitación Profesional";
        document.getElementById("tituloModulo").textContent = `Módulo de Capacitación: ${cursoActivoNombre}`;
        document.getElementById("usuarioModulo").textContent = usuarioActivo.nombre;

        const textoTeorico = document.getElementById("textoContenidoTeorico");
        const tituloTeorico = document.getElementById("tituloContenidoTeorico");
        const videoFrame = document.getElementById("videoFrame");

        if (cursoActivoNombre.includes("Frontend")) {
            tituloTeorico.innerHTML = `<i class="fa-solid fa-code"></i> Desarrollo Web Frontend Moderno`;
            textoTeorico.innerHTML = `
                <p>El desarrollo frontend en la actualidad abarca mucho más que estructurar páginas con HTML. Hoy en día, los usuarios exigen interfaces rápidas, adaptables a cualquier dispositivo y altamente interactivas impulsadas por arquitecturas basadas en componentes.</p>
                <p>Para profundizar en las tendencias, herramientas y el ecosistema actual del desarrollo frontend, puedes consultar el artículo especializado de referencia:</p>
                <p style="margin-top: 1rem;"><a href="https://archisacademy.com/es/blogs/desarrollo-web-frontend-2026" target="_blank" style="color: #a435f0; font-weight: bold; text-decoration: underline;">Leer guía completa sobre Desarrollo Web Frontend (Archis Academy)</a></p>
                <h3 style="margin-top: 1.5rem; color: #fff;">Puntos clave a dominar:</h3>
                <ul style="color: var(--text-muted); line-height: 1.6; margin-top: 0.5rem;">
                    <li>Estructura semántica moderna con HTML5.</li>
                    <li>Estilos avanzados, diseños responsivos y metodologías CSS.</li>
                    <li>Interactividad y dinamismo mediante JavaScript moderno (ES6+).</li>
                </ul>
            `;
            if (videoFrame) {
                videoFrame.src = "https://www.youtube.com/embed/N8mFHB7JDkw?si=agRXQkkwNf8D6jGc";
            }
        } else {
            tituloTeorico.innerHTML = `<i class="fa-solid fa-database"></i> Bases de Datos y Consultas SQL`;
            textoTeorico.innerHTML = `
                <p>Las bases de datos relacionales son sistemas organizados que almacenan y permiten acceder a puntos de datos relacionados entre sí. Utilizan Structured Query Language (SQL), el estándar de la industria para administrar, consultar y manipular la información de forma segura y eficiente.</p>
                <p>Para comprender a fondo cómo funcionan las bases de datos relacionales y su infraestructura en la nube, te invitamos a revisar la documentación oficial:</p>
                <p style="margin-top: 1.5rem;"><a href="https://cloud.google.com/discover/what-are-sql-databases?hl=es" target="_blank" style="color: #a435f0; font-weight: bold; text-decoration: underline;">¿Qué son las bases de datos SQL? (Guía Google Cloud)</a></p>
                <h3 style="margin-top: 1.5rem; color: #fff;">Puntos clave a dominar:</h3>
                <ul style="color: var(--text-muted); line-height: 1.6; margin-top: 0.5rem;">
                    <li>Concepto de tablas, filas, columnas y claves primarias/foráneas.</li>
                    <li>Uso de sentencias fundamentales como SELECT, WHERE, INSERT y UPDATE.</li>
                    <li>Optimización y rendimiento en la recuperación de registros.</li>
                </ul>
            `;
            if (videoFrame) {
                videoFrame.src = "https://www.youtube.com/embed/knVwokXITGI?si=-52dvAxvlq35kutL";
            }
        }
    }

    // 6. Evaluación Dinámica según el curso activo
    if (paginaActual === "evaluacion.html" && usuarioActivo) {
        const cursoActivoNombre = localStorage.getItem("cursoActivoAula") || "";
        const evalFrontend = document.getElementById("evaluacionFrontend");
        const evalSql = document.getElementById("evaluacionSql");
        const tituloEval = document.getElementById("tituloEvaluacionPagina");

        if (cursoActivoNombre.includes("SQL") || cursoActivoNombre.includes("Bases de Datos")) {
            if (evalSql) evalSql.style.display = "block";
            if (tituloEval) tituloEval.textContent = "Evaluación: Bases de Datos y Consultas SQL";
        } else {
            if (evalFrontend) evalFrontend.style.display = "block";
            if (tituloEval) tituloEval.textContent = "Evaluación: Desarrollo Web Frontend Moderno";
        }
    }

    // 7. Manejo del Login Inteligente (Estudiante o Admin)
    const formLogin = document.getElementById("formLogin");
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const esAdmin = document.getElementById("camposAdmin").style.display === "block";

            if (esAdmin) {
                const user = document.getElementById("loginAdminUser").value.trim();
                const pass = document.getElementById("loginPass").value.trim();
                if (user === ADMIN_USER && pass === ADMIN_PASS) {
                    const adminData = { nombre: "Administrador", rol: "admin" };
                    localStorage.setItem("usuarioActivo", JSON.stringify(adminData));
                    window.location.href = "admin.html";
                } else {
                    alert("Usuario o contraseña de administrador incorrectos.");
                }
            } else {
                const usuario = document.getElementById("loginUsuario").value.trim();
                const correo = document.getElementById("loginCorreo").value.trim();
                const pass = document.getElementById("loginPass").value.trim();
                const lista = JSON.parse(localStorage.getItem("baseDatosEstudiantes")) || [];
                const estudiante = lista.find(est => (est.nombre.toLowerCase() === usuario.toLowerCase() || est.correo === correo) && est.pass === pass);

                if (estudiante) {
                    estudiante.rol = "estudiante";
                    if (!estudiante.misCursos) {
                        estudiante.misCursos = estudiante.curso ? [{ nombre: estudiante.curso, calificacion: estudiante.calificacion, estado: estudiante.estado }] : [];
                    }
                    localStorage.setItem("usuarioActivo", JSON.stringify(estudiante));
                    window.location.href = "estudiante.html";
                } else {
                    alert("Datos incorrectos o usuario no registrado.");
                }
            }
        });
    }

    // 8. Registro de Estudiante desde curso-detalle
    const formRegistro = document.getElementById("formRegistro");
    if (formRegistro) {
        formRegistro.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombre = document.getElementById("regUsuario").value.trim();
            const correo = document.getElementById("regCorreo").value.trim();
            const pass = document.getElementById("regPass").value.trim();

            let lista = JSON.parse(localStorage.getItem("baseDatosEstudiantes")) || [];
            
            if (lista.some(est => est.correo === correo)) {
                alert("Este correo ya está registrado. Por favor inicie sesión.");
                cerrarModalRegistro();
                abrirModalLogin();
                return;
            }

            const nuevoAlumno = {
                nombre,
                correo,
                pass,
                misCursos: [],
                fecha: new Date().toLocaleDateString(),
                rol: "estudiante"
            };

            lista.push(nuevoAlumno);
            localStorage.setItem("baseDatosEstudiantes", JSON.stringify(lista));
            localStorage.setItem("usuarioActivo", JSON.stringify(nuevoAlumno));

            cerrarModalRegistro();
            document.getElementById("modalExito").style.display = "flex";
        });
    }

    // 9. Pago y Asignación desde el Panel del Estudiante
    const formPagoEstudiante = document.getElementById("formPagoEstudiante");
    if (formPagoEstudiante) {
        formPagoEstudiante.addEventListener("submit", (e) => {
            e.preventDefault();
            const tarjeta = document.getElementById("pagoEstudianteTarjeta").value;
            const cursoAsignado = document.getElementById("pagoCursoEstudianteDisplay").value;

            if (tarjeta.length < 12) {
                alert("Número de tarjeta inválido.");
                return;
            }

            let lista = JSON.parse(localStorage.getItem("baseDatosEstudiantes")) || [];
            const index = lista.findIndex(est => est.correo === usuarioActivo.correo);

            if (index !== -1) {
                if (!lista[index].misCursos) lista[index].misCursos = [];

                const yaInscrito = lista[index].misCursos.some(c => c.nombre === cursoAsignado);
                if (yaInscrito) {
                    alert("Ya forma parte de este curso");
                    cerrarModalPagoEstudiante();
                    return;
                }

                lista[index].misCursos.push({
                    nombre: cursoAsignado,
                    calificacion: "Pendiente",
                    estado: "Cursando"
                });

                localStorage.setItem("baseDatosEstudiantes", JSON.stringify(lista));
                localStorage.setItem("usuarioActivo", JSON.stringify(lista[index]));
            }

            alert("¡Inscripción y pago exitosos!");
            cerrarModalPagoEstudiante();
            window.location.href = "estudiante.html";
        });
    }

    // 10. Modo Admin en Evaluación
    if (usuarioActivo && usuarioActivo.rol === "admin") {
        const badge = document.getElementById("adminBadge");
        if (badge) badge.style.display = "inline-block";

        document.querySelectorAll(".admin-helper").forEach(div => {
            div.textContent = div.getAttribute("data-answer");
            div.style.display = "block";
        });
    }

    // 11. Calificación de Examen
    const evalForm = document.getElementById("evalForm");
    if (evalForm) {
        evalForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let puntaje = 0;
            const cursoActivoAula = localStorage.getItem("cursoActivoAula") || "";
            const esSql = cursoActivoAula.includes("SQL") || cursoActivoAula.includes("Bases de Datos");

            if (esSql) {
                if (document.querySelector('input[name="sql_p1"]:checked')?.value === "correcta") puntaje += 16.6;
                if (document.querySelector('input[name="sql_p2"]:checked')?.value === "correcta") puntaje += 16.6;
                if (document.getElementById("sql_p3").value === "correcta") puntaje += 16.6;
                if (document.getElementById("sql_p4").value === "correcta") puntaje += 16.6;
                
                const checkboxesSqlP5 = document.querySelectorAll('input[name="sql_p5"]:checked');
                if (checkboxesSqlP5.length === 2 && Array.from(checkboxesSqlP5).every(cb => cb.value === "correcta")) {
                    puntaje += 16.8;
                }

                const respSqlP6 = document.getElementById("sql_p6").value.trim().toLowerCase();
                if (respSqlP6.includes("relacional")) {
                    puntaje += 16.8;
                }
            } else {
                if (document.querySelector('input[name="fe_p1"]:checked')?.value === "correcta") puntaje += 16.6;
                if (document.querySelector('input[name="fe_p2"]:checked')?.value === "correcta") puntaje += 16.6;
                if (document.getElementById("fe_p3").value === "correcta") puntaje += 16.6;
                if (document.getElementById("fe_p4").value === "correcta") puntaje += 16.6;
                
                const checkboxesFeP5 = document.querySelectorAll('input[name="fe_p5"]:checked');
                if (checkboxesFeP5.length === 2 && Array.from(checkboxesFeP5).every(cb => cb.value === "correcta")) {
                    puntaje += 16.8;
                }

                const respFeP6 = document.getElementById("fe_p6").value.trim().toLowerCase();
                if (respFeP6 === "javascript" || respFeP6 === "js") {
                    puntaje += 16.8;
                }
            }

            const notaFinal = Math.round(puntaje);
            localStorage.setItem("notaFinal", notaFinal);

            if (usuarioActivo && usuarioActivo.rol === "admin") {
                alert(`[MODO ADMIN] Examen probado con éxito. Nota obtenida: ${notaFinal}/100`);
                window.location.href = "admin.html";
                return;
            }

            if (usuarioActivo && usuarioActivo.rol === "estudiante") {
                let lista = JSON.parse(localStorage.getItem("baseDatosEstudiantes")) || [];
                const index = lista.findIndex(est => est.correo === usuarioActivo.correo);
                if (index !== -1) {
                    if (!lista[index].misCursos) lista[index].misCursos = [];
                    const cursoIndex = lista[index].misCursos.findIndex(c => c.nombre === cursoActivoAula);
                    
                    if (cursoIndex !== -1) {
                        lista[index].misCursos[cursoIndex].calificacion = `${notaFinal} / 100`;
                        lista[index].misCursos[cursoIndex].estado = notaFinal >= 60 ? "Aprobado 🎓" : "Reprobado ❌";
                    }

                    localStorage.setItem("baseDatosEstudiantes", JSON.stringify(lista));
                    localStorage.setItem("usuarioActivo", JSON.stringify(lista[index]));
                }
            }

            if (notaFinal >= 60) {
                alert(`¡Examen aprobado! Nota: ${notaFinal}/100`);
                window.location.href = "diploma.html";
            } else {
                alert(`Calificación insuficiente: ${notaFinal}/100. Necesitas al menos 60 puntos.`);
                window.location.href = "estudiante.html";
            }
        });
    }

    // 12. Tabla Admin
    const tablaAdmin = document.getElementById("tablaEstudiantesAdmin");
    if (tablaAdmin) {
        renderizarTablaAdmin();
    }

    // 13. Diploma
    const nombreDip = document.getElementById("nombreEstudianteDiploma");
    const notaDip = document.getElementById("calificacionDiploma");
    if (nombreDip && notaDip && usuarioActivo) {
        nombreDip.textContent = usuarioActivo.nombre;
        notaDip.textContent = `${localStorage.getItem("notaFinal") || "100"} / 100`;
    }
});

function seleccionarCurso(tipo) {
    localStorage.setItem("cursoSeleccionado", tipo);
    window.location.href = "curso-detalle.html";
}

function abrirModalRegistro() { document.getElementById("modalRegistro").style.display = "flex"; }
function cerrarModalRegistro() { document.getElementById("modalRegistro").style.display = "none"; }

function cambiarLoginDesdeRegistro(e) {
    e.preventDefault();
    cerrarModalRegistro();
    abrirModalLogin();
}

function irAVerCursosDisponibles() {
    document.getElementById("modalExito").style.display = "none";
    window.location.href = "estudiante.html";
}

function abrirModalLogin() { document.getElementById("modalLogin").style.display = "flex"; }
function cerrarModalLogin() { document.getElementById("modalLogin").style.display = "none"; }

function toggleModoAdmin(e) {
    e.preventDefault();
    const adminCampos = document.getElementById("camposAdmin");
    const estCampos = document.getElementById("camposEstudiante");
    const titulo = document.getElementById("tituloLoginModal");
    const enlace = document.getElementById("enlaceModoAdmin");

    if (adminCampos.style.display === "none") {
        adminCampos.style.display = "block";
        estCampos.style.display = "none";
        titulo.textContent = "Acceso Administrador";
        enlace.textContent = "Acceder como estudiante";
    } else {
        adminCampos.style.display = "none";
        estCampos.style.display = "block";
        titulo.textContent = "Iniciar Sesión de Estudiante";
        enlace.textContent = "Acceder como administrador";
    }
}

function cambiarTab(e, tabId) {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    e.currentTarget.classList.add("active");
}

function cambiarTabAdmin(e, tabId) {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
    document.getElementById(tabId).classList.add("active");
    e.currentTarget.classList.add("active");
}

function renderizarPanelEstudiante(usuario) {
    const listaMisCursos = document.getElementById("listaMisCursos");
    const listaDiplomas = document.getElementById("listaDiplomas");
    const misCursos = usuario.misCursos || (usuario.curso ? [{ nombre: usuario.curso, calificacion: usuario.calificacion, estado: usuario.estado }] : []);

    if (misCursos.length === 0) {
        listaMisCursos.innerHTML = `<p style="color:var(--text-muted);">Aún no estás asignado a ningún curso. Ve a la pestaña "Inscribirse a Nuevo Curso" para adquirir uno.</p>`;
        listaDiplomas.innerHTML = `<p style="color:var(--text-muted);">No hay diplomas disponibles.</p>`;
        return;
    }

    let htmlCursos = "";
    let htmlDiplomas = "";
    let tieneAprobados = false;

    misCursos.forEach(c => {
        htmlCursos += `
            <div style="background:#1c1d1f; padding:1.5rem; border-radius:6px; margin-top:1rem; display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="margin:0 0 0.5rem 0;">${c.nombre}</h3>
                    <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">Estado: <strong>${c.estado}</strong> | Nota: ${c.calificacion}</p>
                </div>
                <button onclick="entrarAlAula('${c.nombre}')" class="btn-subscribe" style="max-width:180px; margin:0;">Entrar al Aula</button>
            </div>
        `;

        if (c.estado && c.estado.includes("Aprobado")) {
            tieneAprobados = true;
            htmlDiplomas += `
                <div style="background:#1c1d1f; padding:1.5rem; border-radius:6px; margin-top:1rem; display:flex; justify-content:space-between; align-items:center;">
                    <div>
                        <h3 style="margin:0 0 0.5rem 0; color:#34d399;">${c.nombre}</h3>
                        <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">Calificación final: ${c.calificacion}</p>
                    </div>
                    <button onclick="verDiplomaEstudiante('${usuario.nombre}', '${c.calificacion}')" class="btn-subscribe" style="max-width:200px; margin:0; background:#198754;"><i class="fa-solid fa-download"></i> Descargar Diploma PDF</button>
                </div>
            `;
        }
    });

    listaMisCursos.innerHTML = htmlCursos;
    listaDiplomas.innerHTML = tieneAprobados ? htmlDiplomas : `<p style="color:var(--text-muted);">Aún no tienes cursos aprobados. Completa tu evaluación con 60 puntos o más para desbloquear tus diplomas.</p>`;
}

function entrarAlAula(nombreCurso) {
    localStorage.setItem("cursoActivoAula", nombreCurso);
    window.location.href = "curso.html";
}

function verDiplomaEstudiante(nombre, nota) {
    localStorage.setItem("notaFinal", nota.split(" ")[0]);
    localStorage.setItem("nombreDiplomaTemp", nombre);
    localStorage.removeItem("origenAdmin");
    window.location.href = "diploma.html";
}

function inscribirDesdePanel(nombreCurso) {
    document.getElementById("pagoCursoEstudianteDisplay").value = nombreCurso;
    document.getElementById("modalPagoEstudiante").style.display = "flex";
}
function cerrarModalPagoEstudiante() { document.getElementById("modalPagoEstudiante").style.display = "none"; }

function renderizarTablaAdmin() {
    const tbody = document.getElementById("tablaEstudiantesAdmin");
    const lista = JSON.parse(localStorage.getItem("baseDatosEstudiantes")) || [];
    tbody.innerHTML = "";

    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:#94a3b8;">No hay estudiantes registrados.</td></tr>`;
        return;
    }

    lista.forEach(est => {
        const cursos = est.misCursos || (est.curso ? [{ nombre: est.curso, calificacion: est.calificacion, estado: est.estado }] : []);
        
        if (cursos.length === 0) {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${est.nombre}</strong></td>
                    <td>${est.correo}</td>
                    <td>Ninguno</td>
                    <td>N/A</td>
                    <td><span style="color: #f87171; font-weight:bold;">Sin curso</span></td>
                    <td>${est.fecha}</td>
                    <td>N/A</td>
                </tr>
            `;
        } else {
            cursos.forEach(c => {
                tbody.innerHTML += `
                    <tr>
                        <td><strong>${est.nombre}</strong></td>
                        <td>${est.correo}</td>
                        <td>${c.nombre}</td>
                        <td>${c.calificacion}</td>
                        <td><span style="color: ${c.estado && c.estado.includes('Aprobado') ? '#34d399' : '#f87171'}; font-weight:bold;">${c.estado}</span></td>
                        <td>${est.fecha}</td>
                        <td>${c.estado && c.estado.includes('Aprobado') ? '<button onclick="verDiplomaAdmin(\''+est.nombre+'\', \''+c.calificacion+'\')" class="btn-subscribe" style="padding:0.3rem 0.6rem; font-size:0.8rem;">Ver PDF</button>' : 'N/A'}</td>
                    </tr>
                `;
            });
        }
    });
}

function verDiplomaAdmin(nombre, nota) {
    localStorage.setItem("notaFinal", nota.split(" ")[0]);
    localStorage.setItem("nombreDiplomaTemp", nombre);
    localStorage.setItem("origenAdmin", "true");
    window.location.href = "diploma.html";
}

function volverAlPanel() {
    const origenAdmin = localStorage.getItem("origenAdmin");
    if (origenAdmin === "true") {
        localStorage.removeItem("origenAdmin");
        localStorage.removeItem("nombreDiplomaTemp");
        const adminData = { nombre: "Administrador", rol: "admin" };
        localStorage.setItem("usuarioActivo", JSON.stringify(adminData));
        window.location.href = "admin.html";
    } else {
        localStorage.removeItem("nombreDiplomaTemp");
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
        if (usuario && usuario.rol === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "estudiante.html";
        }
    }
}

function descargarCSV() {
    const lista = JSON.parse(localStorage.getItem("baseDatosEstudiantes")) || [];
    if (lista.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,Estudiante,Correo,Curso,Calificacion,Estado,Fecha\n";
    lista.forEach(est => {
        const cursos = est.misCursos || (est.curso ? [{ nombre: est.curso, calificacion: est.calificacion, estado: est.estado }] : []);
        cursos.forEach(c => {
            csvContent += `"${est.nombre}","${est.correo}","${c.nombre}","${c.calificacion}","${c.estado}","${est.fecha}"\n`;
        });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "base_datos_tecnocampus.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function limpiarBaseDatos() {
    if (confirm("¿Deseas reiniciar la base de datos de estudiantes?")) {
        localStorage.removeItem("baseDatosEstudiantes");
        renderizarTablaAdmin();
        alert("Base de datos reiniciada.");
    }
}

function cerrarSesion() {
    localStorage.removeItem("usuarioActivo");
    localStorage.removeItem("origenAdmin");
    localStorage.removeItem("nombreDiplomaTemp");
    window.location.href = "index.html";
}

function irAEvaluacion() {
    window.location.href = "evaluacion.html";
}

function adminProbarCurso(nombreCurso) {
    localStorage.setItem("cursoActivoAula", nombreCurso);
    const adminData = { nombre: "Administrador", rol: "admin" };
    localStorage.setItem("usuarioActivo", JSON.stringify(adminData));
    window.location.href = "curso.html";
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js");
  });
}

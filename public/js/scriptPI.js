document.addEventListener("DOMContentLoaded", function () {
  
    // Hacer una solicitud GET para obtener los datos de los acontecimientos
    fetch("http://localhost:3000/api/acontecimientos")
        .then((response) => response.json())
        .then((acontecimientos) => {
            console.log("Datos obtenidos de la base de datos:", JSON.stringify(acontecimientos, null, 2));
  
            // Filtramos los acontecimientos para obtener solo los de Marta
            const acontecimientosDePers = acontecimientos.filter(
                (acontecimiento) => acontecimiento.pers_acontecimiento === "Marta"
            );
  
            // Si hay datos de Marta, mostramos el nombre y descripción del participante
            if (acontecimientosDePers.length > 0) {
                const { nombre_participante, descripcion_participante } = acontecimientosDePers[0];
  
                // Actualizamos el contenido de la presentación
                const participantNameElement = document.getElementById("participant-name");
                const nombreParticipante = nombre_participante; // Aquí asignas el valor dinámico del json
                typeWriterEffect(participantNameElement, nombreParticipante || "Sin nombre");
                document.getElementById("participant-description").textContent =
                    descripcion_participante || "Sin descripción";
            }
  
            const timeline = document.querySelector(".timeline");
  
            // Iteramos sobre los datos de los acontecimientos de Marta
            acontecimientosDePers.forEach((acontecimiento, index) => {
                // Creamos un nuevo contenedor para cada acontecimiento
                const timelineItem = document.createElement("div");
                timelineItem.classList.add("timeline-item");
                timelineItem.classList.add(index % 2 === 0 ? "left" : "right");
  
                // Creamos el punto de la línea del tiempo
                const dot = document.createElement("div");
                dot.classList.add("timeline-dot");
  
                // Creamos el contenido del acontecimiento
                const content = document.createElement("div");
                content.classList.add("timeline-content");
                content.classList.add("hidden");
  
                // Verificamos si hay imagen
                const img = document.createElement("img");
                if (acontecimiento.img_acontecimiento && acontecimiento.img_acontecimiento !== "") {
                    img.src = acontecimiento.img_acontecimiento;
                    img.alt = acontecimiento.nombre_acontecimiento;
                } else {
                    // Si no hay imagen, mostramos un cuadrado rosa
                    const placeholder = document.createElement("div");
                    placeholder.classList.add("image-placeholder");
                    content.appendChild(placeholder);
                }
  
                const textContent = document.createElement("div");
                const title = document.createElement("h3");
                title.textContent = acontecimiento.nombre_acontecimiento;
  
                const description = document.createElement("p");
                description.textContent = acontecimiento.descripcion_acontecimiento;
  
                textContent.appendChild(title);
                textContent.appendChild(description);
  
                content.appendChild(img);
                content.appendChild(textContent);
  
                // Añadimos el contenido y el punto a la línea del tiempo
                timelineItem.appendChild(dot);
                timelineItem.appendChild(content);
  
                // Añadir la etiqueta si es necesario
                const label = document.createElement("div");
                label.classList.add("timeline-label");
                label.textContent = acontecimiento.nombre_acontecimiento;
                timelineItem.appendChild(label);
  
                timeline.appendChild(timelineItem);
            });
  
            // Agregar el evento para mostrar el contenido al hacer clic en el punto
            document.querySelectorAll(".timeline-dot").forEach((dot) => {
                dot.addEventListener("click", () => {
                    const content = dot.nextElementSibling;
                    dot.classList.toggle("clicked");
                    content.classList.toggle("hidden");
                });
            });
            
        })
        .catch((error) => console.error("Error al cargar los acontecimientos:", error));
  });
  
  function typeWriterEffect(element, text, speed = 100) {
    element.textContent = ""; // Limpia el contenido del elemento
    let i = 0;
  
    const interval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i === text.length) {
        clearInterval(interval); // Detenemos el intervalo cuando termina el texto
      }
    }, speed);
  }
  
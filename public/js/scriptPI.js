
document.addEventListener("DOMContentLoaded", function () {

    
    // Hacer una solicitud GET para obtener los datos de los acontecimientos

    fetch(`http://localhost:3000/api/acontecimientos`)

        .then((response) => response.json())
        .then((acontecimientos) => {
            console.log("Datos obtenidos de la base de datos:", JSON.stringify(acontecimientos, null, 2));
            const participantNamePassing = localStorage.getItem('participantName');
            // Filtramos los acontecimientos para obtener solo los de Marta
            const acontecimientosDePers = acontecimientos.filter(
                (acontecimiento) => acontecimiento.pers_acontecimiento === participantNamePassing
            );
  
            if(participantNamePassing === 'Alba'){
                let parrafoIntro = document.getElementById('participant-description'); 
                parrafoIntro.style.color = 'white'; 

                let tituloNombre = document.getElementById('participant-name'); 
                tituloNombre.style.color = 'white';

                let githubLink = document.getElementById('github-link');
                githubLink.style.color = 'white';
                githubLink.href = 'https://github.com/AlbaCastilla';
                githubLink.innerHTML = '<i class="fab fa-github"></i> ' + participantNamePassing + ' - ' + githubLink.innerHTML;
                
            }
            if(participantNamePassing === 'Pedro'){
              let githubLink = document.getElementById('github-link');
              githubLink.style.color = 'black';
              githubLink.href = 'https://github.com/Pedromrtzz';
              githubLink.innerHTML = '<i class="fab fa-github"></i> ' + participantNamePassing + ' - ' + githubLink.innerHTML;
            }
            if(participantNamePassing === 'Beatriz'){
              let githubLink = document.getElementById('github-link');
              githubLink.style.color = 'black';
              githubLink.href = 'https://github.com/beamm536';
              githubLink.innerHTML = '<i class="fab fa-github"></i> ' + participantNamePassing + ' - ' + githubLink.innerHTML;
            }


            // Si hay datos de Marta, mostramos el nombre y descripción del participante
            if (acontecimientosDePers.length > 0) {

                // Nombre dinámico de la imagen

                const imageName = `${participantNamePassing}.png`;
                const imageName2 = `${participantNamePassing}2.png`;

                // Selecciona los elementos
                const presentation = document.querySelector('.presentation');
                const imgMovil = document.querySelector('.imgMovil');
              
                // Crea una nueva instancia de un objeto Image para verificar si la imagen existe
                const img = new Image();
                img.src = `../assets/imgsIndiv/${imageName}`;
                console.log(img.src);

                const img2 = new Image();
                img2.src = `../assets/imgsIndiv/${imageName2}`;
                console.log(img.src);
              
                // Verifica si la imagen se carga correctamente
                img.onload = function() {
                  // Si la pantalla es lo suficientemente grande (tablet y ordenador)
                  if (window.innerWidth >= 1025) {
                    presentation.style.backgroundImage = `url('../assets/imgsIndiv/${imageName}')`;
                    presentation.style.backgroundSize = "cover";
                    presentation.style.backgroundPosition = "center";
                  } else {
                    // Si la pantalla es pequeña (móvil), muestra la imagen en el div imgMovil
                    imgMovil.style.backgroundImage = `url('../assets/imgsIndiv/${imageName2}')`;
                    imgMovil.style.backgroundSize = "cover";
                    imgMovil.style.backgroundPosition = "center";
                  }
                };
              
                // Si la imagen no se carga (error 404 o cualquier otro), establece el fondo gris
                img.onerror = function() {
                  presentation.style.backgroundColor = "gray";
                  imgMovil.style.backgroundColor = "gray"; // También asegúrate de que el div tenga fondo gris en caso de error
                  console.error("Error al cargar la imagen", imgMovil);
                };
              

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
  
                // Verificamos si hay imagen--> TIMELINE
                const rutasImgsTimeline = "../assets/imgsIndiv/"; //ruta general de dnd va a sacar las imgs

                const img = document.createElement("img");
                if (acontecimiento.img_acontecimiento && acontecimiento.img_acontecimiento !== "") {
                    img.src = `${rutasImgsTimeline}${acontecimiento.img_acontecimiento}`;//acontecimiento.img_acontecimiento;
                    img.alt = acontecimiento.nombre_acontecimiento || "Imagen asociada";
                } else {
                    console.error("No hay imagen asociada a este acontecimiento");

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

  function setParticipantName(name) {
    localStorage.setItem('participantName', name);
  }
  
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
  
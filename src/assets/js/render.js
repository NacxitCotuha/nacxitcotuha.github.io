let typingInterval; // Para poder cancelar una animación si el usuario hace clic rápido en otro botón

const renderUI = (data) => {
    console.log("Renderizando UI con datos:", data);
    // Actualizamos el título
    document.getElementById('title').innerText = data.title;
    // Actualizamos los campos de información personal

    for (const key of data.personal_data_keys) {
        const lblId = `lbl_${key}`;
        const valId = key;
        console.log(`Actualizando ${lblId} y ${valId} con:`, data.personal_data[key]);
        document.getElementById(lblId).innerText = data.personal_data[lblId];
        document.getElementById(valId).innerText = data.personal_data[valId];
    }

    for (const key of data.btn_keys) {
        const btnId = `btn_${key}`;
        console.log(`Actualizando ${btnId} con:`, data.btn_data[key]);
        document.getElementById(btnId).innerText = data.btn_data[key];
    }

    loadContent('experience'); // Cargamos la pestaña de experiencia por defecto
}

const loadContent = async (key) => {
    console.log(`Cargando contenido para: ${key}`);
    const container = document.getElementById('dynamic-content');
    container.innerText = ""; // Limpiamos el contenido anterior
    // container.innerText = "<p>Cargando...</p>"; // Indicador de carga
    // container.innerHTML = `<pre style="font-family: inherit;white-space: pre-wrap;">Cargando...<span class="typing-cursor"></span></pre>`; // Indicador de carga

    typeWriterEffect(container, "Cargando...");

    if (key === 'cv') {
        loadCV();
        return;
    }
}

const loadCV = async () => {
    const langSelector = document.getElementById('lang-selector');
    const lang = langSelector.value;
    console.log(`Cargando CV en idioma: ${lang}`);
    // langSelector.setAttribute("value", lang);
}

const typeWriterEffect = (container, text) => {
    let index = 0;

    // 1. Creamos un único contenedor para el texto y el cursor
    const wrapper = document.createElement('pre');
    wrapper.className = "typing-wrapper";
    
    // 2. Creamos el span donde se escribirá el texto
    const textSpan = document.createElement('span');
    
    // 3. Creamos el cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    
    // 4. Metemos todo dentro del wrapper y el wrapper al contenedor
    wrapper.appendChild(textSpan);
    wrapper.appendChild(cursor);
    container.appendChild(wrapper);

    typingInterval = setInterval(() => {
        if (index < text.length) {
            textSpan.textContent += text.charAt(index); // Escribimos en el span
            index++;
            
            // Scroll automático para no perder de vista el cursor
            container.scrollTop = container.scrollHeight;
        } else {
            // Terminó la escritura, pero NO borramos nada. 
            // El cursor sigue ahí porque es un hijo del wrapper.
            clearInterval(typingInterval);
            console.log("Escritura de la Super Tierra finalizada.");
        }
    }, 15); // Velocidad de escritura (en ms)
};

export { renderUI, loadContent };
window.loadContent = loadContent;
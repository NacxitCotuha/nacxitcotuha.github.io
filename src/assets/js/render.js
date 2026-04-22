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
    clearInterval(typingInterval); // Si el usuario hace clic rápido, cancelamos la animación anterior
    container.innerText = ""; // Limpiamos el contenido anterior
    // container.innerText = "<p>Cargando...</p>"; // Indicador de carga
    // container.innerHTML = `<pre style="font-family: inherit;white-space: pre-wrap;">Cargando...<span class="typing-cursor"></span></pre>`; // Indicador de carga

    typeWriterEffect(container, "Cargando...");

    if (key === 'cv') { loadCV(container); return; }

    const rawContent = data_json.btn_content[key];
    let textToType = "";

    if (Array.isArray(rawContent)) {
        rawContent.forEach(item => {
            if (typeof item === 'object') {
                textToType += `> ${item.title || item.name}\n`;
                textToType += `  ${item.company || ''} ${item.time || ''}\n`;
                textToType += `  ${item.description || item.desc}\n\n`;
            } else {
                textToType += `• ${item}\n`;
            }
        });
    }

    clearInterval(typingInterval); // Si el usuario hace clic rápido, cancelamos la animación anterior
    container.innerText = ""; // Limpiamos el contenido anterior

    typeWriterEffect(container, textToType);

}

const loadCV = async (container) => {
    const langSelector = document.getElementById('lang-selector');
    const lang = langSelector.value;
    console.log(`Cargando CV en idioma: ${lang}`);
    clearInterval(typingInterval); // Si el usuario hace clic rápido, cancelamos la animación anterior
    container.innerText = ""; // Limpiamos el contenido anterior

    typeWriterEffect(container, "404 NOT FOUND\n\nLo siento, el CV no está disponible en este momento. Por favor, contáctame para más información.");
    // langSelector.setAttribute("value", lang);
}

const typeWriterEffect = (container, text) => {
    let index = 0;

    // 1. Creamos un único contenedor para el texto y el cursor
    const wrapper = document.createElement('p');
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
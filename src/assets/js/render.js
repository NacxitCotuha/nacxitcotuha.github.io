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

    loadContent("experience"); // Cargamos la pestaña de experiencia por defecto
}

const loadContent = async (key) => {
    console.log(`Cargando contenido para: ${key}`);
    updateActiveTab(key);
    const container = document.getElementById('dynamic-content');
    clearInterval(typingInterval); // Si el usuario hace clic rápido, cancelamos la animación anterior
    container.innerText = ""; // Limpiamos el contenido anterior
    // container.innerText = "<p>Cargando...</p>"; // Indicador de carga
    // container.innerHTML = `<pre style="font-family: inherit;white-space: pre-wrap;">Cargando...<span class="typing-cursor"></span></pre>`; // Indicador de carga

    typeWriterEffect(container, [{ text: "Cargando...", className: "style-desc" }]);

    if (key === 'cv') { loadCV(container); return; }

    const rawContent = data_json.btn_content[key];
    let segments = []; // Aquí guardaremos los fragmentos con su estilo

    if (Array.isArray(rawContent)) {
        rawContent.forEach(item => {
            if (typeof item === 'object') {
                // Título en Amarillo y Negrita
                segments.push({ text: `> ${item.title || item.name}\n`, className: "style-title" });
                // Compañía y Fecha en Blanco y Negrita
                segments.push({ text: `  ${item.company || ''} ${item.time || ''}\n`, className: "style-meta" });
                // Descripción normal
                segments.push({ text: `  ${item.description || item.desc}\n\n`, className: "style-desc" });
            } else {
                // Para Habilidades/Hobbies usamos un estilo genérico o el de descripción
                segments.push({ text: `• ${item}\n`, className: "style-desc" });
            }
        });
    }

    clearInterval(typingInterval); // Si el usuario hace clic rápido, cancelamos la animación anterior
    container.innerText = ""; // Limpiamos el contenido anterior

    typeWriterEffect(container, segments);
};

const updateActiveTab = (key) => {
    // 1. Buscamos todos los botones con la clase 'tab-btn'
    const buttons = document.querySelectorAll('.tab-btn');
    
    // 2. Quitamos la clase 'active' a todos
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 3. Se la ponemos al botón correspondiente (usando el ID que pusiste)
    const activeBtn = document.getElementById(`btn_${key}`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

const loadCV = async (container) => {
    const langSelector = document.getElementById('lang-selector');
    const lang = langSelector.value;
    console.log(`Cargando CV en idioma: ${lang}`);
    // loadError(container, "Lo siento, el CV no está disponible en este momento. Por favor, contáctame para más información.");
    if (lang === 'en') {
        container.innerHTML = `<iframe class="cv-frame" src="/src/assets/pdf/CV_EN.pdf"></iframe>`;
    } else {
        container.innerHTML = `<iframe class="cv-frame" src="/src/assets/pdf/CV_ES.pdf"></iframe>`;
    }
    // langSelector.setAttribute("value", lang);
}

const loadError = (container, message) => {
    clearInterval(typingInterval);
    container.innerText = "";
    const segments = [
        { text: "404 NOT FOUND\n\n", className: "style-title" },
        { text: message, className: "style-desc" }
    ];
    typeWriterEffect(container, segments);
};

const typeWriterEffect = (container, segments) => {
    const wrapper = document.createElement('pre');
    wrapper.className = "typing-wrapper";
    
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    
    container.appendChild(wrapper);
    wrapper.appendChild(cursor);

    let segmentIndex = 0;
    let charIndex = 0;
    let currentSpan = null;

    typingInterval = setInterval(() => {
        // Si ya no hay más segmentos, detenemos todo
        if (segmentIndex >= segments.length) {
            clearInterval(typingInterval);
            return;
        }

        // Si estamos empezando un segmento nuevo, creamos su span
        if (charIndex === 0) {
            currentSpan = document.createElement('span');
            currentSpan.className = segments[segmentIndex].className;
            // Insertamos el span justo antes del cursor para que el cursor siempre esté al final
            wrapper.insertBefore(currentSpan, cursor);
        }

        const currentText = segments[segmentIndex].text;

        // Escribimos el caracter actual
        if (charIndex < currentText.length) {
            currentSpan.textContent += currentText.charAt(charIndex);
            charIndex++;
            container.scrollTop = container.scrollHeight;
        } else {
            // Pasamos al siguiente segmento
            segmentIndex++;
            charIndex = 0;
        }
    }, 15);
};

export { renderUI, loadContent };
window.loadContent = loadContent;
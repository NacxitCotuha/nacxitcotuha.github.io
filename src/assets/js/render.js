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
    // container.innerText = "<p>Cargando...</p>"; // Indicador de carga
    container.innerHTML = `<pre style="font-family: inherit;white-space: pre-wrap;">Cargando...<span class="typing-cursor"></span></pre>`; // Indicador de carga

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

export { renderUI, loadContent };
window.loadContent = loadContent;
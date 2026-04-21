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
}

const loadContent = async (content) => {
    console.log(`Cargando contenido para: ${content}`);
}

export { renderUI, loadContent };
window.loadContent = loadContent;
let currentLang = 'es';
let translations = {};

// 1. Cargar el JSON de traducciones
async function init() {
    const response = await fetch('assets/lang.json');
    translations = await response.json();
    updateUI();
    loadContent('experiencia');
}

// 2. Cambiar el idioma
function changeLanguage(lang) {
    currentLang = lang;
    updateUI();
    // Recargamos el contenido actual en el nuevo idioma
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('onclick').match(/'([^']+)'/)[1];
    loadContent(activeTab);
}

// 3. Actualizar textos de la interfaz
function updateUI() {
    document.querySelector('.rank').innerText = translations[currentLang].rank;
    const btns = document.querySelectorAll('.tab-btn');
    btns[0].innerText = translations[currentLang].tab_exp;
    btns[1].innerText = translations[currentLang].tab_skills;
    btns[2].innerText = translations[currentLang].tab_projects;
    btns[3].innerText = translations[currentLang].tab_info;
}

// 4. Cargar el HTML dinámico según el idioma
async function loadContent(page) {
    const container = document.getElementById('dynamic-content');
    
    try {
        // Buscamos en subcarpetas: pages/es/archivo.html o pages/en/archivo.html
        const response = await fetch(`pages/${currentLang}/${page}.html`);
        if (!response.ok) throw new Error();
        
        const html = await response.text();
        container.innerHTML = html;
        
    } catch (error) {
        container.innerHTML = `<h2>${translations[currentLang].error_msg}</h2>`;
    }
}

window.onload = init;
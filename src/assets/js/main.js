import { loadLanguage } from './i18n.js';

async function loadComponent(placeholderId, url) {
    const placeholder = document.getElementById(placeholderId);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error al cargar: ${url}`);
        const html = await response.text();
        placeholder.innerHTML = html;
    } catch (error) {
        console.error("Fallo en la carga del componente:", error);
    }
}

// Orquestador de inicio
async function initApp() {
    console.log("Sistema Iniciado...");
    // 1. Cargamos el header primero
    await loadComponent('header-placeholder', 'src/assets/components/header.html');
    await loadComponent('content-placeholder', 'src/assets/components/content.html');
    
    // 2. Cargamos el idioma (tu lógica de locales)
    await loadLanguage('es'); 
}

window.onload = initApp;


// // 3. Actualizar textos de la interfaz
// function updateUI() {
//     document.querySelector('.rank').innerText = translations[currentLang].rank;
//     const btns = document.querySelectorAll('.tab-btn');
//     btns[0].innerText = translations[currentLang].tab_exp;
//     btns[1].innerText = translations[currentLang].tab_skills;
//     btns[2].innerText = translations[currentLang].tab_projects;
//     btns[3].innerText = translations[currentLang].tab_info;
// }

// // 4. Cargar el HTML dinámico según el idioma
// async function loadContent(page) {
//     const container = document.getElementById('dynamic-content');
    
//     try {
//         // Buscamos en subcarpetas: pages/es/archivo.html o pages/en/archivo.html
//         const response = await fetch(`pages/${currentLang}/${page}.html`);
//         if (!response.ok) throw new Error();
        
//         const html = await response.text();
//         container.innerHTML = html;
        
//     } catch (error) {
//         container.innerHTML = `<h2>${translations[currentLang].error_msg}</h2>`;
//     }
// }

// window.onload = init;
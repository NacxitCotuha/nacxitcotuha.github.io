import { renderUI } from "./render.js";

// 1. Cambiar el idioma
const loadLanguage = async (lang) => {
    console.log(`Idioma cambiado a: ${lang}`);
    const btnLang = document.getElementById('lang-selector');
    btnLang.innerText = `🌐 LANG_${lang.toUpperCase()}`;
    btnLang.value = lang; // Actualizamos el valor del selector para reflejar el idioma actual
    try {
        const res = await fetch(`/src/locales/${lang}.json`);
        let  auxData = await res.json();
        auxData = JSON.stringify(auxData);
        const data = JSON.parse(auxData);
        window.data_json = data; // Guardamos globalmente para acceso desde otros módulos
        // console.log(`/src/locales/${lang}.json - Status: ${auxData}`);
        // console.log(data);
        renderUI(data);
    } catch (error) {
        console.error("Error al cargar el idioma:", error);
    }
}

window.loadLanguage = loadLanguage;
export { loadLanguage };

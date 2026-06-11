document.addEventListener("DOMContentLoaded", () => {
    
    // Selectores del DOM
    const btnDropdownToggle = document.getElementById('btnDropdownToggle');
    const accessibilityMenu = document.getElementById('accessibilityMenu');
    
    const chkVoiceReader = document.getElementById('chkVoiceReader');
    const chkContrast = document.getElementById('chkContrast');
    const chkTextSize = document.getElementById('chkTextSize');
    
    const cards = document.querySelectorAll('.card');

    // Inicialización del motor de síntesis de voz nativo
    let synth = window.speechSynthesis;
    let speechUtterance = null;
    let audioUnlocked = false;

    // Desbloqueo del motor por políticas de privacidad de los navegadores modernos
    document.body.addEventListener('click', () => {
        if (!audioUnlocked) {
            audioUnlocked = true;
            console.log("Audio Engine Ready.");
        }
    }, { once: true });

    // ==========================================
    // CONTROL DEL DROPDOWN (MENÚ)
    // ==========================================
    btnDropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = accessibilityMenu.classList.toggle('show');
        btnDropdownToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cierra el menú al hacer clic en zonas exteriores
    document.addEventListener('click', (e) => {
        if (!accessibilityMenu.contains(e.target) && e.target !== btnDropdownToggle) {
            accessibilityMenu.classList.remove('show');
            btnDropdownToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // ==========================================
    // SISTEMA DE LOCUCIÓN (LECTOR DE VOZ)
    // ==========================================
    function speakText(text) {
        // Validación obligatoria: si el interruptor está apagado, no emite sonido
        if (!chkVoiceReader.checked) return;

        synth.cancel(); // Limpia lecturas en cola
        
        speechUtterance = new SpeechSynthesisUtterance(text);
        speechUtterance.lang = 'en-US'; // Idioma configurado para el texto del sitio
        speechUtterance.rate = 1.0;     // Velocidad normal de habla
        
        synth.speak(speechUtterance);
    }

    function stopSpeaking() {
        synth.cancel();
    }

    // Vinculación de lectura automática a las tarjetas (Mouse y Teclado)
    cards.forEach(card => {
        const textToRead = card.getAttribute('data-text');

        // Eventos de Mouse
        card.addEventListener('mouseenter', () => speakText(textToRead));
        card.addEventListener('mouseleave', () => stopSpeaking());

        // Eventos de Accesibilidad por Teclado (Tecla TAB)
        card.addEventListener('focus', () => speakText(textToRead));
        card.addEventListener('blur', () => stopSpeaking());
    });


    // ==========================================
    // PROGRAMACIÓN DE LOS INTERRUPTORES (SWITCHES)
    // ==========================================

    // Lógica: Alto Contraste
    chkContrast.addEventListener('change', () => {
        if (chkContrast.checked) {
            document.body.classList.add('high-contrast');
            speakText("High contrast activated");
        } else {
            document.body.classList.remove('high-contrast');
            speakText("High contrast deactivated");
        }
    });

    // Lógica: Texto Grande
    chkTextSize.addEventListener('change', () => {
        if (chkTextSize.checked) {
            document.body.classList.add('large-text');
            speakText("Large text size activated");
        } else {
            document.body.classList.remove('large-text');
            speakText("Text size returned to normal");
        }
    });

    // Monitor de estado del Lector de Voz
    chkVoiceReader.addEventListener('change', () => {
        if (!chkVoiceReader.checked) {
            stopSpeaking();
        } else {
            speakText("Voice reader enabled");
        }
    });

    // ==========================================
    // ENLACE DIRECTO DESDE CLIC EN LAS TARJETAS 
    // ==========================================
    const cardTextSize = document.getElementById('cardTextSize');
    const cardContrast = document.getElementById('cardContrast');

    if (cardTextSize) {
        cardTextSize.addEventListener('click', (e) => {
            e.stopPropagation();
            chkTextSize.checked = !chkTextSize.checked;
            chkTextSize.dispatchEvent(new Event('change')); // Sincroniza el menú
        });
    }

    if (cardContrast) {
        cardContrast.addEventListener('click', (e) => {
            e.stopPropagation();
            chkContrast.checked = !chkContrast.checked;
            chkContrast.dispatchEvent(new Event('change')); // Sincroniza el menú
        });
    }
});
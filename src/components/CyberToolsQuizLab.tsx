import React from 'react';
import { Shield, CheckCircle, XCircle, ChevronRight, Download, RotateCcw, User, Lock, Globe, Eye, ShieldCheck, Zap, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';
import type { CertificateRecord } from '../types';
import IntroModal from './IntroModal';
import type { IntroSlide } from './IntroModal';

const INTRO_SLIDES: IntroSlide[] = [
    {
        icon: <Shield size={40} />,
        subtitle: 'Herramientas de ciberseguridad',
        title: 'Tu Arsenal de Defensa Digital',
        body: 'Un profesional de seguridad no solo conoce los ataques — sabe exactamente qué herramienta usar en cada situación. VPNs, gestores de contraseñas, navegadores seguros, verificadores de URLs: cada una tiene un propósito específico y un momento correcto de uso.',
        highlight: 'El 95% de los incidentes de seguridad son evitables con el uso correcto de herramientas disponibles gratuitamente.',
    },
    {
        icon: <Lock size={40} />,
        subtitle: 'Contraseñas y gestores',
        title: 'La Primera Línea de Defensa',
        body: 'Una contraseña débil es una puerta abierta. Los gestores de contraseñas generan y almacenan credenciales únicas y complejas para cada servicio. Combinados con autenticación de dos factores (2FA), hacen casi imposible el acceso no autorizado.',
        highlight: 'Reutilizar contraseñas es el error #1: si un sitio es hackeado, todos tus demás cuentas quedan expuestas.',
    },
    {
        icon: <Globe size={40} />,
        subtitle: 'VPN y navegación segura',
        title: 'Protege Tu Tráfico',
        body: 'Una VPN cifra tu conexión y oculta tu IP real, esencial en redes Wi-Fi públicas. Los navegadores seguros como Firefox o Brave bloquean rastreadores, fingerprinting y anuncios maliciosos que los navegadores comerciales permiten por defecto.',
        highlight: 'Una VPN no te hace anónimo — te protege en redes no confiables. Para anonimato real se necesita Tor.',
    },
    {
        icon: <Eye size={40} />,
        subtitle: 'Verificación de amenazas',
        title: 'Antes de Hacer Clic, Verifica',
        body: 'VirusTotal analiza archivos y URLs contra más de 70 motores antivirus simultáneamente. Los verificadores de URLs como URLVoid detectan phishing, malware y reputación de dominios antes de que visites el sitio.',
        highlight: 'Un archivo limpio en VirusTotal no garantiza 100% seguridad — algunos malware de día cero aún no están en las bases de datos.',
    },
    {
        icon: <Zap size={40} />,
        subtitle: 'Tu misión',
        title: '30 Preguntas — 50 Minutos',
        body: 'Pondrás a prueba tu conocimiento sobre cuándo y cómo usar cada herramienta. Cada pregunta presenta un escenario real y cuatro opciones. Lee con atención — los detalles importan en ciberseguridad.',
        highlight: 'Aprueba con 70% o más (21/30) para demostrar competencia profesional en herramientas de seguridad.',
    },
];

interface Question {
    id: number;
    category: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
}

const QUESTIONS: Question[] = [
    // ── VPN ──────────────────────────────────────────────────
    {
        id: 1,
        category: 'VPN',
        question: 'Estás en un café y necesitas acceder a tu cuenta bancaria desde el Wi-Fi público. ¿Cuál es la acción más segura?',
        options: [
            'Conectarte directamente — el banco usa HTTPS así que ya estás protegido',
            'Activar tu VPN primero y luego acceder al banco',
            'Usar el modo incógnito del navegador',
            'Cambiar la contraseña del Wi-Fi antes de conectarte',
        ],
        correct: 1,
        explanation: 'HTTPS solo cifra el tráfico entre tú y el servidor, pero no protege contra ataques de intermediario (MITM) en redes locales no confiables. Una VPN cifra todo tu tráfico desde el dispositivo, incluyendo el DNS, protegiéndote del operador de la red Wi-Fi.',
    },
    {
        id: 2,
        category: 'VPN',
        question: '¿Cuál de estas afirmaciones sobre las VPNs es CORRECTA?',
        options: [
            'Una VPN te hace completamente anónimo en internet',
            'Una VPN protege tu tráfico de ser espiado en redes locales no confiables',
            'Una VPN evita que los sitios web rastreen tus cookies',
            'Una VPN acelera tu conexión a internet en todos los casos',
        ],
        correct: 1,
        explanation: 'Una VPN cifra tu tráfico entre tu dispositivo y el servidor VPN, protegiéndote en redes no confiables. No te hace anónimo (el proveedor VPN puede ver tu tráfico), no elimina cookies, y generalmente agrega latencia, no velocidad.',
    },
    {
        id: 3,
        category: 'VPN',
        question: 'Tu empresa te exige usar VPN corporativa para acceder a los servidores internos desde casa. ¿Por qué es necesaria esta medida?',
        options: [
            'Para que la empresa pueda espiar tu navegación personal',
            'Para crear un túnel cifrado que extiende la red privada corporativa a tu conexión doméstica',
            'Para bloquear sitios web no relacionados con el trabajo',
            'Para aumentar la velocidad de descarga de archivos corporativos',
        ],
        correct: 1,
        explanation: 'La VPN corporativa crea un túnel cifrado entre tu dispositivo y la red interna de la empresa. Esto permite que tu computador actúe como si estuviera físicamente dentro de la oficina, accediendo a recursos internos que no están expuestos a internet.',
    },
    {
        id: 4,
        category: 'VPN',
        question: '¿En cuál de estos escenarios una VPN NO es la herramienta principal que necesitas?',
        options: [
            'Acceder a contenido bloqueado geográficamente',
            'Navegar de forma privada en Wi-Fi de aeropuerto',
            'Eliminar un virus ya instalado en tu computadora',
            'Ocultar tu actividad del proveedor de internet (ISP)',
        ],
        correct: 2,
        explanation: 'Para eliminar malware ya instalado necesitas un antivirus/antimalware, no una VPN. La VPN protege el tráfico de red pero no puede detectar ni eliminar software malicioso en tu dispositivo local.',
    },
    // ── Gestores de contraseñas ───────────────────────────────
    {
        id: 5,
        category: 'Gestor de contraseñas',
        question: '¿Cuál es la ventaja principal de usar un gestor de contraseñas como Bitwarden o 1Password?',
        options: [
            'Permite usar la misma contraseña segura en todos los sitios',
            'Genera y almacena contraseñas únicas y complejas para cada cuenta sin que debas memorizarlas',
            'Guarda tus contraseñas en un archivo de texto cifrado en tu escritorio',
            'Comparte automáticamente tus contraseñas con contactos de confianza',
        ],
        correct: 1,
        explanation: 'La ventaja principal es poder tener contraseñas únicas, largas y aleatorias para cada cuenta sin tener que memorizarlas. Solo debes recordar una contraseña maestra robusta. Esto elimina el riesgo de que una brecha en un sitio comprometa otras cuentas.',
    },
    {
        id: 6,
        category: 'Gestor de contraseñas',
        question: 'Tu contraseña maestra del gestor es "Mi_Perro_Se_Llama_Toby2019". Un compañero dice que es débil porque contiene palabras del diccionario. ¿Quién tiene razón?',
        options: [
            'Tu compañero — cualquier contraseña con palabras comunes es débil',
            'Tú — una frase larga con variaciones es más resistente que una cadena corta de caracteres aleatorios',
            'Ninguno — la longitud y los números son lo único que importa',
            'Tu compañero — debes usar solo caracteres especiales como @#$%',
        ],
        correct: 1,
        explanation: 'Las frases de contraseña (passphrases) largas son muy resistentes. Con 30+ caracteres, el costo computacional del ataque de fuerza bruta es astronómico. Una contraseña corta de caracteres aleatorios como "Xk!9mP" es más fácil de atacar que una frase larga aunque contenga palabras comunes.',
    },
    {
        id: 7,
        category: 'Gestor de contraseñas',
        question: 'Recibes un email que dice: "Hemos detectado actividad sospechosa en tu Bitwarden. Haz clic aquí para verificar tu contraseña maestra." ¿Qué haces?',
        options: [
            'Haces clic y verificas inmediatamente — la seguridad es prioritaria',
            'Ignoras el email y accedes directamente a bitwarden.com para revisar tu cuenta',
            'Cambias tu contraseña maestra desde el enlace del email',
            'Reenvías el email a tus contactos para que también estén alertados',
        ],
        correct: 1,
        explanation: 'Este es un ataque de phishing clásico dirigido a usuarios de gestores de contraseñas. Nunca hagas clic en enlaces de emails de seguridad — siempre ve directamente al sitio oficial escribiendo la URL. Los gestores legítimos nunca te piden tu contraseña maestra por email.',
    },
    {
        id: 8,
        category: 'Gestor de contraseñas',
        question: '¿Qué hace la función "auditoría de contraseñas" incluida en la mayoría de gestores de contraseñas?',
        options: [
            'Cambia automáticamente todas tus contraseñas cada 30 días',
            'Identifica contraseñas reutilizadas, débiles o que aparecen en bases de datos de brechas conocidas',
            'Comprueba si los sitios web que usas tienen certificado SSL',
            'Genera un reporte para compartir con tu empleador',
        ],
        correct: 1,
        explanation: 'La auditoría de contraseñas cruza tus credenciales contra bases de datos como HaveIBeenPwned, detecta reutilización de contraseñas entre sitios, identifica contraseñas cortas o simples, y te alerta para que las cambies antes de que sean explotadas.',
    },
    // ── Contraseñas seguras ───────────────────────────────────
    {
        id: 9,
        category: 'Contraseñas Seguras',
        question: '¿Cuál de estas contraseñas es la MÁS SEGURA para una cuenta crítica?',
        options: [
            'Colombia2024!',
            'Tr0ub4dor&3',
            'hV$9kP!mQx2#nL7@wE4z',
            'admin123',
        ],
        correct: 2,
        explanation: '"hV$9kP!mQx2#nL7@wE4z" es la más segura: 20 caracteres con mayúsculas, minúsculas, números y símbolos sin patrón reconocible. "Colombia2024!" usa información predecible. "Tr0ub4dor&3" es popular pero aparece en diccionarios de ataques. "admin123" es trivial.',
    },
    {
        id: 10,
        category: 'Contraseñas Seguras',
        question: '¿Cuánto tiempo estimado tarda un ataque de fuerza bruta en romper una contraseña de 8 caracteres con solo letras minúsculas en hardware moderno?',
        options: [
            'Varios años',
            'Varios meses',
            'Menos de un día',
            'Varias décadas',
        ],
        correct: 2,
        explanation: 'Con hardware moderno (GPU), una contraseña de 8 caracteres en minúsculas (26^8 = ~200 billones de combinaciones) puede romperse en minutos u horas. Agregar mayúsculas, números y símbolos y extender a 12+ caracteres aumenta el tiempo a décadas o siglos.',
    },
    {
        id: 11,
        category: 'Contraseñas Seguras',
        question: 'Tu servicio de email te pide cambiar tu contraseña cada 90 días obligatoriamente. Según las guías modernas del NIST (Instituto Nacional de Estándares), ¿es esta una buena práctica?',
        options: [
            'Sí — cambiar contraseñas frecuentemente siempre mejora la seguridad',
            'No — el cambio forzado lleva a contraseñas predecibles como "Empresa2024" → "Empresa2025"',
            'Solo si la contraseña tiene menos de 8 caracteres',
            'Sí, pero solo para cuentas bancarias',
        ],
        correct: 1,
        explanation: 'El NIST (SP 800-63B) ya no recomienda rotación periódica obligatoria de contraseñas. Los usuarios tienden a crear variaciones predecibles. La recomendación actual es: contraseñas largas y únicas, cambiadas solo cuando hay evidencia de compromiso, y con 2FA activado.',
    },
    {
        id: 12,
        category: 'Contraseñas Seguras',
        question: '¿Qué es un ataque de "credential stuffing"?',
        options: [
            'Adivinar contraseñas probando todas las combinaciones posibles',
            'Usar listas de usuario/contraseña robadas de una brecha para probar acceso en otros servicios',
            'Instalar un keylogger para capturar lo que el usuario escribe',
            'Engañar al usuario para que revele su contraseña por teléfono',
        ],
        correct: 1,
        explanation: 'El credential stuffing explota la reutilización de contraseñas. Los atacantes toman millones de credenciales filtradas de una brecha (ej: una app de delivery) y las prueban automáticamente en bancos, email, etc. La única defensa efectiva es usar contraseñas únicas + 2FA.',
    },
    // ── Navegadores seguros ───────────────────────────────────
    {
        id: 13,
        category: 'Navegadores Seguros',
        question: '¿Cuál es la diferencia principal entre Firefox con uBlock Origin y Chrome sin extensiones de privacidad?',
        options: [
            'Firefox es más lento pero descarga archivos más rápido',
            'Firefox bloquea rastreadores de terceros por defecto; Chrome permite que Google y socios rastreen tu actividad entre sitios',
            'Chrome tiene mejor soporte para estándares web modernos',
            'No hay diferencia significativa en privacidad entre los dos navegadores',
        ],
        correct: 1,
        explanation: 'Firefox con uBlock Origin bloquea rastreadores entre sitios, fingerprinting y anuncios maliciosos. Chrome, al ser desarrollado por Google (una empresa publicitaria), permite más rastreo por defecto. Brave va aún más lejos bloqueando scripts de rastreo a nivel del navegador.',
    },
    {
        id: 14,
        category: 'Navegadores Seguros',
        question: 'Visitas un sitio y el navegador muestra un candado junto a la URL (HTTPS). ¿Esto garantiza que el sitio es legítimo y seguro?',
        options: [
            'Sí — HTTPS garantiza que el sitio es auténtico y no malicioso',
            'No — HTTPS solo cifra la conexión, pero un sitio de phishing puede tener certificado SSL válido',
            'Sí — los sitios con HTTPS están verificados por el gobierno',
            'No — HTTPS ya no es relevante para la seguridad web moderna',
        ],
        correct: 1,
        explanation: 'HTTPS solo garantiza que la comunicación está cifrada y que el dominio corresponde al certificado. Un atacante puede crear "https://paypa1.com" con certificado SSL válido. El candado no valida que el sitio sea legítimo — debes verificar la URL completa con atención.',
    },
    {
        id: 15,
        category: 'Navegadores Seguros',
        question: '¿Para qué sirve el modo incógnito/privado del navegador?',
        options: [
            'Oculta tu actividad de tu proveedor de internet (ISP)',
            'No guarda historial, cookies ni datos de formulario en el dispositivo local',
            'Protege contra virus y malware durante la sesión',
            'Te hace invisible para los sitios web que visitas',
        ],
        correct: 1,
        explanation: 'El modo incógnito solo evita que el navegador guarde historial, cookies y caché en tu dispositivo. Tu ISP, empleador (si usas la red de la empresa), y los sitios web que visitas aún pueden ver tu actividad. No proporciona privacidad en la red ni protección contra malware.',
    },
    {
        id: 16,
        category: 'Navegadores Seguros',
        question: '¿Qué extensión del navegador representa el mayor riesgo de seguridad si se instala sin verificar?',
        options: [
            'Un bloqueador de anuncios de una empresa reconocida',
            'Una extensión de "traductor" de una fuente desconocida que solicita leer y modificar todos los datos del sitio',
            'El gestor de contraseñas oficial de Bitwarden',
            'La extensión oficial de tu banco para pagos seguros',
        ],
        correct: 1,
        explanation: 'Las extensiones con permisos para "leer y modificar todos los datos en todos los sitios" de fuentes desconocidas son extremadamente peligrosas. Pueden robar contraseñas, interceptar sesiones bancarias e inyectar código malicioso en cualquier página que visites. Solo instala extensiones de fuentes verificadas.',
    },
    // ── VirusTotal ────────────────────────────────────────────
    {
        id: 17,
        category: 'VirusTotal',
        question: 'Descargas un archivo ejecutable (.exe) de internet. ¿Cuál es el procedimiento correcto usando VirusTotal?',
        options: [
            'Ejecutar el archivo primero y subirlo a VirusTotal si el antivirus lo detecta',
            'Subir el archivo a VirusTotal ANTES de ejecutarlo y revisar el resultado de los 70+ motores',
            'VirusTotal solo sirve para URLs, no para archivos',
            'Subir el archivo a VirusTotal y ejecutarlo si al menos 1 motor dice que es limpio',
        ],
        correct: 1,
        explanation: 'Siempre analiza archivos ANTES de ejecutarlos. VirusTotal corre el archivo contra 70+ motores antivirus simultáneamente. Si varios motores lo detectan como malicioso, no lo ejecutes. Si está "limpio" pero es de fuente desconocida, aún procede con cautela — el malware de día cero puede no estar catalogado.',
    },
    {
        id: 18,
        category: 'VirusTotal',
        question: 'Subes un archivo a VirusTotal y 3 de 72 motores lo marcan como sospechoso. Los otros 69 dicen que es limpio. ¿Cómo interpretas este resultado?',
        options: [
            'El archivo es definitivamente malicioso — cualquier detección es señal de peligro',
            'El archivo es definitivamente seguro — la mayoría lo aprueba',
            'Es un "falso positivo" probable, pero si el archivo es de fuente desconocida, investiga más antes de ejecutar',
            'VirusTotal tiene un error — debes subir el archivo de nuevo',
        ],
        correct: 2,
        explanation: 'Las detecciones de 1-3 motores cuando la mayoría está limpio son frecuentemente falsos positivos, especialmente en software legítimo nuevo. Sin embargo, si el archivo es de origen desconocido o sospechoso, investiga más: busca el nombre del archivo, verifica el hash SHA256, y considera no ejecutarlo.',
    },
    {
        id: 19,
        category: 'VirusTotal',
        question: '¿Qué información adicional valiosa ofrece VirusTotal además del análisis antivirus?',
        options: [
            'Solo muestra si el archivo tiene virus o no',
            'Muestra comportamiento del archivo, relaciones con otros archivos/IPs, metadatos, y historial de detecciones',
            'Repara automáticamente los archivos infectados',
            'Bloquea el archivo malicioso antes de que llegue a tu computadora',
        ],
        correct: 1,
        explanation: 'VirusTotal es mucho más que un escáner: muestra análisis de comportamiento en sandbox, relaciones con dominios/IPs/archivos relacionados, metadatos (fecha de compilación, strings internos), y el historial temporal de detecciones. Esta información es invaluable para análisis forense.',
    },
    {
        id: 20,
        category: 'VirusTotal',
        question: 'Un investigador de seguridad te advierte: "No subas documentos confidenciales a VirusTotal." ¿Por qué?',
        options: [
            'VirusTotal cobra por analizar documentos con datos privados',
            'Los archivos subidos se comparten con los socios de VirusTotal y pueden ser descargados por otros investigadores',
            'VirusTotal solo puede analizar archivos ejecutables (.exe)',
            'No hay razón — VirusTotal es completamente privado',
        ],
        correct: 1,
        explanation: 'VirusTotal comparte muestras con sus socios (empresas de seguridad) y los archivos pueden ser accedidos por investigadores con cuentas premium. Nunca subas documentos con datos personales, contratos confidenciales, código fuente propietario o cualquier información sensible.',
    },
    // ── Verificadores de URL ──────────────────────────────────
    {
        id: 21,
        category: 'Verificadores de URL',
        question: 'Recibes el link "http://amaz0n-ofertas.com/descuento-50". ¿Qué herramienta usarías para verificarlo antes de hacer clic?',
        options: [
            'Google Maps — para ver si la empresa existe físicamente',
            'URLVoid o VirusTotal para verificar la reputación y seguridad del dominio',
            'Simplemente buscar el dominio en Google',
            'Copiar la URL en el chat de WhatsApp para que otros opinen',
        ],
        correct: 1,
        explanation: 'URLVoid, VirusTotal y URLScan.io analizan la reputación del dominio contra múltiples bases de datos de phishing y malware. En este caso, "amaz0n" usa un cero en lugar de la letra "o" — técnica de typosquatting clásica. Nunca hagas clic en URLs con sustituciones de caracteres.',
    },
    {
        id: 22,
        category: 'Verificadores de URL',
        question: '¿Qué es el "typosquatting" en el contexto de URLs maliciosas?',
        options: [
            'Registrar dominios con errores tipográficos comunes para engañar usuarios que escriben mal la URL',
            'Un ataque que modifica los paquetes de red para cambiar la URL de destino',
            'El uso de URLs muy largas para ocultar el destino real',
            'Crear subdominios que parecen dominios legítimos (ej: paypal.com.malicioso.xyz)',
        ],
        correct: 0,
        explanation: 'El typosquatting registra dominios como "gooogle.com", "faceboook.com" o "paypa1.com" para capturar usuarios que escriben mal la URL. Cuando el usuario llega al sitio falso, parece legítimo y puede robar credenciales. Siempre verifica la URL completa antes de ingresar datos.',
    },
    {
        id: 23,
        category: 'Verificadores de URL',
        question: 'Usas un acortador de URL (bit.ly) para compartir un enlace. ¿Por qué esto puede representar un riesgo de seguridad?',
        options: [
            'Los acortadores siempre añaden malware a los enlaces',
            'Ocultan el destino real del enlace, impidiendo verificar la URL antes de hacer clic',
            'Los acortadores solo funcionan en navegadores inseguros',
            'Los acortadores revelan tu dirección IP al receptor',
        ],
        correct: 1,
        explanation: 'Los acortadores de URL ocultan el destino real. Un link como "bit.ly/xK3m9" puede llevar a cualquier sitio, incluyendo phishing o malware. Usa servicios como "checkshorturl.com" o añade "+" al final de links de bit.ly (bit.ly/xK3m9+) para ver el destino antes de visitar.',
    },
    {
        id: 24,
        category: 'Verificadores de URL',
        question: 'Analizas una URL con URLScan.io y ves que el dominio fue registrado hace 2 días, tiene un certificado SSL válido, y su contenido imita la página de login de tu banco. ¿Qué concluyes?',
        options: [
            'Es seguro porque tiene certificado SSL',
            'Es casi definitivamente un sitio de phishing — dominio nuevo + imitación de banco = señales de alarma críticas',
            'Es probablemente una página de pruebas del banco',
            'No hay suficiente información para concluir nada',
        ],
        correct: 1,
        explanation: 'Dominio recién creado + copia visual de un banco = phishing con alta probabilidad. Los atacantes compran dominios nuevos para cada campaña (evitan reputación negativa acumulada) y pueden obtener SSL gratuito con Let\'s Encrypt en minutos. Reporta el sitio y no ingreses ningún dato.',
    },
    // ── 2FA / MFA ─────────────────────────────────────────────
    {
        id: 25,
        category: 'Autenticación 2FA/MFA',
        question: '¿Cuál de estas opciones de segundo factor (2FA) es la MÁS SEGURA?',
        options: [
            'Código SMS enviado al celular',
            'Email de verificación a la cuenta de correo',
            'Aplicación autenticadora (Google Authenticator, Authy) basada en TOTP',
            'Pregunta de seguridad como "¿Nombre de tu primera mascota?"',
        ],
        correct: 2,
        explanation: 'Las aplicaciones TOTP (Time-based One-Time Password) son más seguras que SMS o email porque los códigos se generan localmente y no pueden ser interceptados por SIM-swapping. Las preguntas de seguridad son el método más débil — las respuestas suelen ser públicas o adivinables.',
    },
    {
        id: 26,
        category: 'Autenticación 2FA/MFA',
        question: '¿Qué es un ataque de "SIM swapping" y cómo afecta la seguridad del 2FA por SMS?',
        options: [
            'Un ataque físico para robar la tarjeta SIM del teléfono de la víctima',
            'Engañar al operador telefónico para transferir el número de la víctima a una SIM del atacante, recibiendo así sus SMS de verificación',
            'Un virus que intercepta mensajes SMS en el dispositivo',
            'Clonar la señal Bluetooth del teléfono para recibir SMS en otro dispositivo',
        ],
        correct: 1,
        explanation: 'En SIM swapping, el atacante llama al operador haciéndose pasar por la víctima (usando datos robados de redes sociales) y transfiere el número a una nueva SIM. A partir de ahí recibe todos los SMS, incluyendo los códigos 2FA del banco o email. Esto hace al 2FA por SMS vulnerable.',
    },
    // ── Antivirus / Firewall ──────────────────────────────────
    {
        id: 27,
        category: 'Antivirus y Firewall',
        question: '¿Cuál es la diferencia fundamental entre un antivirus y un firewall?',
        options: [
            'El antivirus es de pago y el firewall es gratuito',
            'El antivirus detecta y elimina malware en el sistema; el firewall controla el tráfico de red entrante y saliente',
            'El firewall protege contra virus y el antivirus protege contra hackers',
            'Son la misma herramienta con diferentes nombres',
        ],
        correct: 1,
        explanation: 'El antivirus analiza archivos y procesos buscando código malicioso conocido. El firewall actúa como guardia de tráfico de red, bloqueando conexiones no autorizadas. Son complementarios: el antivirus protege contra amenazas en el dispositivo, el firewall controla lo que entra y sale por la red.',
    },
    {
        id: 28,
        category: 'Antivirus y Firewall',
        question: 'Tu antivirus no detecta nada sospechoso, pero notas que tu computador envía tráfico inusual a IPs desconocidas a las 3 AM. ¿Qué tipo de amenaza podría ser?',
        options: [
            'No es una amenaza — el antivirus dice que todo está bien',
            'Posiblemente un malware de día cero o APT (Amenaza Persistente Avanzada) que el antivirus aún no tiene en su base de firmas',
            'El sistema operativo enviando actualizaciones automáticas',
            'Definitivamente el proveedor de internet realizando mantenimiento',
        ],
        correct: 1,
        explanation: 'Los antivirus basados en firmas no detectan malware nuevo (día cero) o APTs diseñados para evadir detección. Tráfico saliente no explicado hacia IPs desconocidas a horas inusuales es señal de compromiso. Solución: análisis de comportamiento de red, EDR (Endpoint Detection & Response), y aislamiento del equipo.',
    },
    // ── Escenarios combinados ─────────────────────────────────
    {
        id: 29,
        category: 'Escenario Integrado',
        question: 'Un colega te envía por WhatsApp: "Urgent! Tu cuenta fue hackeada. Haz clic en bit.ly/r3c0ver-acc para recuperarla en los próximos 10 minutos." ¿Cuál es tu respuesta correcta?',
        options: [
            'Haces clic inmediatamente — 10 minutos es poco tiempo para pensar',
            'Verificas la URL con CheckShortURL, llamas directamente a tu colega para confirmar que él lo envió, y revisas tu cuenta desde el sitio oficial',
            'Reenvías el mensaje a 5 amigos para que te ayuden a decidir',
            'Respondes al mensaje pidiendo más información',
        ],
        correct: 1,
        explanation: 'Este es un ataque de urgencia con múltiples señales de alerta: URL acortada, urgencia extrema ("10 minutos"), por mensaje informal. El procedimiento correcto: 1) No hagas clic. 2) Expande la URL primero. 3) Verifica directamente con tu colega por llamada. 4) Accede a tu cuenta desde la URL oficial.',
    },
    {
        id: 30,
        category: 'Escenario Integrado',
        question: '¿Cuál de estos conjuntos de herramientas y prácticas representa la "postura de seguridad" más completa para un usuario cotidiano?',
        options: [
            'Solo un buen antivirus de pago',
            'VPN + gestor de contraseñas + 2FA en cuentas críticas + navegador con bloqueador de rastreadores + verificar URLs sospechosas',
            'Cambiar contraseñas cada semana y no guardarlas en ningún lado',
            'No descargar nada de internet y solo usar aplicaciones preinstaladas',
        ],
        correct: 1,
        explanation: 'La seguridad en capas es el enfoque correcto. VPN protege en redes no confiables, el gestor de contraseñas garantiza credenciales únicas y fuertes, 2FA dificulta el acceso aunque te roben la contraseña, el navegador configurado reduce el rastreo y anuncios maliciosos, y verificar URLs previene phishing. Ninguna herramienta sola es suficiente.',
    },
];

const CATEGORY_COLORS: Record<string, string> = {
    'VPN': 'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Gestor de contraseñas': 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Contraseñas Seguras': 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Navegadores Seguros': 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    'VirusTotal': 'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Verificadores de URL': 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
    'Autenticación 2FA/MFA': 'text-accent-secondary border-accent-secondary-20 bg-accent-secondary-5',
    'Antivirus y Firewall': 'text-accent-primary border-accent-primary-20 bg-accent-primary-5',
    'Escenario Integrado': 'text-accent-tertiary border-accent-tertiary-20 bg-accent-tertiary-5',
};

interface CyberToolsQuizLabProps {
    onComplete: (cert: CertificateRecord) => void;
}

const CyberToolsQuizLab: React.FC<CyberToolsQuizLabProps> = ({ onComplete }) => {
    const [showIntro, setShowIntro] = React.useState(true);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [selected, setSelected] = React.useState<number | null>(null);
    const [answered, setAnswered] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);
    const [userName, setUserName] = React.useState(() => localStorage.getItem('cyberlab-username') ?? '');
    const [isGenerating, setIsGenerating] = React.useState(false);

    const question = QUESTIONS[currentIndex];
    const progress = ((currentIndex) / QUESTIONS.length) * 100;
    const categoryColor = CATEGORY_COLORS[question?.category] ?? 'text-accent-primary border-accent-primary-20 bg-accent-primary-5';

    const handleSelect = (optionIndex: number) => {
        if (answered) return;
        setSelected(optionIndex);
        setAnswered(true);
        if (optionIndex === question.correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setSelected(null);
        setAnswered(false);
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setSelected(null);
        setAnswered(false);
        setScore(0);
        setCompleted(false);
        setUserName('');
    };

    const passing = Math.round(QUESTIONS.length * 0.7);
    const passed = score >= passing;

    if (showIntro) {
        return (
            <IntroModal
                slides={INTRO_SLIDES}
                onStart={() => setShowIntro(false)}
                accentClass="text-accent-primary"
                borderClass="border-accent-primary-25"
                bgClass="bg-accent-primary-5"
                buttonClass="neon-button"
            />
        );
    }

    if (completed) {
        return (
            <div className="p-10 animate-fade-in max-w-1024 mx-auto flex flex-col items-center justify-center min-h-full h-full text-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-10 rounded-full mb-10 shadow-neon border ${passed ? 'bg-accent-primary-10 text-accent-primary border-accent-primary-20' : 'bg-accent-tertiary-10 text-accent-tertiary border-accent-tertiary-20'}`}
                >
                    {passed ? <ShieldCheck size={100} /> : <AlertTriangle size={100} />}
                </motion.div>

                <h2 className="text-5xl font-black text-white mb-4 tracking-tight uppercase">
                    {passed ? '¡Quiz Completado!' : 'Sigue Practicando'}
                </h2>
                <p className="text-xl text-text-secondary max-w-2xl mb-6">
                    {passed
                        ? 'Demostraste competencia en el uso correcto de herramientas de ciberseguridad.'
                        : `Necesitabas ${passing} respuestas correctas para aprobar. Repasa los temas y vuelve a intentarlo.`}
                </p>

                <div className={`text-6xl font-mono mb-4 ${passed ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                    {score} / {QUESTIONS.length}
                </div>
                <div className="text-sm text-text-muted mb-12 uppercase tracking-widest">
                    {Math.round((score / QUESTIONS.length) * 100)}% — {passed ? 'APROBADO' : 'NO APROBADO'}
                </div>

                {passed ? (
                    <div className="cyber-card p-12 bg-bg-secondary border-accent-primary-30 max-w-xl w-full mb-10">
                        <h3 className="text-accent-primary font-bold uppercase tracking-widest text-sm mb-6 flex items-center justify-center gap-3">
                            <User className="inline" size={18} /> Nombre para el certificado
                        </h3>
                        <input
                            type="text"
                            placeholder="TU NOMBRE COMPLETO"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full bg-black border-2 border-white-10 rounded-2xl py-5 px-8 text-center text-2xl font-black text-white focus:border-accent-primary focus:shadow-neon outline-none transition-all placeholder:opacity-20 mb-8"
                        />
                        <div className="flex gap-4">
                            <button onClick={handleRestart} className="flex-1 py-5 bg-bg-tertiary border rounded-2xl text-text-muted hover:text-white transition-all text-sm font-bold uppercase tracking-widest">
                                REINICIAR
                            </button>
                            <button
                                disabled={!userName.trim() || isGenerating}
                                onClick={() => {
                                    setIsGenerating(true);
                                    setTimeout(async () => {
                                        const moduleName = 'Cyber Tools Quiz — Grado 11';
                                        await generateCertificate(userName, moduleName);
                                        onComplete({
                                            moduleId: 'cyber-tools-quiz',
                                            moduleName,
                                            userName,
                                            date: new Date().toLocaleDateString('es-CO'),
                                        });
                                        setIsGenerating(false);
                                    }, 1000);
                                }}
                                className="flex-2 neon-button py-5 text-lg disabled:opacity-20 disabled:grayscale transition-all"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center gap-3"><RotateCcw className="animate-spin" /> GENERANDO...</span>
                                ) : (
                                    <span className="flex items-center gap-3"><Download size={24} /> OBTENER CERTIFICADO</span>
                                )}
                            </button>
                        </div>
                    </div>
                ) : (
                    <button onClick={handleRestart} className="neon-button py-5 px-16 text-lg">
                        <RotateCcw size={20} className="inline mr-3" /> INTENTAR DE NUEVO
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="p-10 animate-fade-in max-w-1200 mx-auto min-h-full">
            {/* Header */}
            <header className="mb-8">
                <div className="flex items-center gap-2 text-accent-primary text-xs font-bold uppercase tracking-widest mb-1">
                    Grado 11 — Herramientas de Ciberseguridad
                </div>
                <h2 className="text-4xl font-extrabold text-white">Quiz: Uso Correcto de Herramientas</h2>
                <p className="text-text-secondary">Demuestra que sabes cuándo y cómo aplicar cada herramienta de seguridad.</p>
            </header>

            {/* Progress bar */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-text-muted font-bold uppercase tracking-widest">Pregunta {currentIndex + 1} de {QUESTIONS.length}</span>
                    <span className="text-xs text-accent-primary font-mono font-bold">{score} correctas</span>
                </div>
                <div className="w-full h-2 bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent-primary rounded-full"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.4 }}
                    />
                </div>
            </div>

            {/* Question card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.25 }}
                    className="cyber-card bg-bg-secondary border p-0 overflow-hidden mb-6"
                >
                    {/* Category badge + question */}
                    <div className="p-8 border-b bg-bg-tertiary">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-widest mb-4 ${categoryColor}`}>
                            <Shield size={12} />
                            {question.category}
                        </div>
                        <h3 className="text-xl font-bold text-white leading-relaxed">{question.question}</h3>
                    </div>

                    {/* Options */}
                    <div className="p-8 grid grid-cols-1 gap-3">
                        {question.options.map((option, i) => {
                            const isCorrect = i === question.correct;
                            const isSelected = i === selected;
                            let cls = 'border-white-10 text-text-secondary hover:border-accent-primary hover:text-white hover:bg-accent-primary-5 cursor-pointer';

                            if (answered) {
                                if (isCorrect) {
                                    cls = 'border-accent-primary bg-accent-primary-10 text-white cursor-default';
                                } else if (isSelected && !isCorrect) {
                                    cls = 'border-accent-tertiary bg-accent-tertiary-10 text-accent-tertiary cursor-default';
                                } else {
                                    cls = 'border-white-5 text-text-muted cursor-default opacity-50';
                                }
                            }

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    disabled={answered}
                                    className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${cls}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black shrink-0 border ${
                                        answered && isCorrect ? 'bg-accent-primary border-accent-primary text-bg-primary' :
                                        answered && isSelected && !isCorrect ? 'bg-accent-tertiary border-accent-tertiary text-white' :
                                        'bg-bg-tertiary border-white-10'
                                    }`}>
                                        {answered && isCorrect ? <CheckCircle size={16} /> :
                                         answered && isSelected && !isCorrect ? <XCircle size={16} /> :
                                         String.fromCharCode(65 + i)}
                                    </div>
                                    <span className="font-medium leading-relaxed">{option}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Explanation */}
                    <AnimatePresence>
                        {answered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mx-8 mb-8 p-6 rounded-2xl border flex gap-4 ${
                                    selected === question.correct
                                        ? 'bg-accent-primary-5 border-accent-primary-20'
                                        : 'bg-accent-tertiary-5 border-accent-tertiary-20'
                                }`}
                            >
                                <HelpCircle className={`shrink-0 mt-0.5 ${selected === question.correct ? 'text-accent-primary' : 'text-accent-tertiary'}`} size={20} />
                                <div>
                                    <p className={`font-bold text-sm mb-1 uppercase tracking-widest ${selected === question.correct ? 'text-accent-primary' : 'text-accent-tertiary'}`}>
                                        {selected === question.correct ? '¡Correcto!' : 'Respuesta incorrecta'}
                                    </p>
                                    <p className="text-text-secondary text-sm leading-relaxed">{question.explanation}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {/* Next button */}
            {answered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                    <button
                        onClick={handleNext}
                        className="neon-button px-12 py-4 text-base flex items-center gap-3"
                    >
                        {currentIndex < QUESTIONS.length - 1 ? 'SIGUIENTE PREGUNTA' : 'VER RESULTADOS'}
                        <ChevronRight size={20} />
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default CyberToolsQuizLab;

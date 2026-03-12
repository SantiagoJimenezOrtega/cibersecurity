import React from 'react';
import { Mail, ShieldCheck, ShieldAlert, BadgeInfo, CheckCircle, XCircle, User, Calendar, ExternalLink, HelpCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCertificate } from '../utils/certificate';

interface PhishingLabProps {
    onComplete: () => void;
}

const PhishingLab: React.FC<PhishingLabProps> = ({ onComplete }) => {
    const phishingEmails = [
        {
            id: 1,
            sender: "security-alert@amazon-shipping-update.com",
            subject: "⚠️ ¡Acción requerida! Tu pedido ha sido bloqueado",
            content: "Estimado usuario, su cuenta ha sido suspendida por actividad inusual. Haga clic aquí para verificar sus datos y evitar cargos adicionales o el cierre permanente de su cuenta.",
            isPhishing: true,
            indicators: [
                "Remitente sospechoso: Amazon usa 'amazon.com', no 'amazon-shipping-update.com'",
                "Urgencia artificial: Amenaza con 'cierre permanente'",
                "Enlace falso: No ves a dónde lleva el botón hasta que haces clic"
            ]
        },
        {
            id: 2,
            sender: "google-accounts-noreply@google.com",
            subject: "Nuevo inicio de sesión en tu cuenta",
            content: "Alguien acaba de iniciar sesión en tu cuenta desde un nuevo dispositivo (Linux, Bogotá). Si no has sido tú, revisa tu actividad aquí. Si has sido tú, puedes ignorar este mensaje.",
            isPhishing: false,
            indicators: [
                "Remitente oficial: 'google-accounts-noreply@google.com'",
                "Tono informativo: No usa miedo o urgencia extrema",
                "Información real: Indica ciudad y dispositivo"
            ]
        },
        {
            id: 3,
            sender: "netflix-billing@payments-info.net",
            subject: "Actualiza tu método de pago - Membresía en pausa",
            content: "Lamentamos informarte que tu último pago fue rechazado. Para seguir disfrutando de tus series favoritas, actualiza tus datos de facturación en las próximas 24 horas o tu cuenta será eliminada.",
            isPhishing: true,
            indicators: [
                "Dominio falso: @payments-info.net no es @netflix.com",
                "Sentido de urgencia: 'en las próximas 24 horas'",
                "Amenaza extrema: 'tu cuenta será eliminada'"
            ]
        },
        {
            id: 4,
            sender: "soporte-tecnico@institucion-educativa.edu.co",
            subject: "Mantenimiento preventivo de plataforma estudiantil",
            content: "Hola estudiantes, este sábado de 2:00 PM a 6:00 PM la plataforma de notas estará fuera de servicio por mantenimiento. No es necesario realizar ninguna acción.",
            isPhishing: false,
            indicators: [
                "Correo institucional correcto (.edu.co)",
                "No pide contraseñas ni clics en enlaces",
                "Informativo y planificado con antelación"
            ]
        },
        {
            id: 5,
            sender: "alertas@bancolombia-sucursal-virtual.xyz",
            subject: "¡Bloqueo preventivo de seguridad - Tarjeta de Crédito!",
            content: "Detectamos una compra de $1.200.000 en un comercio desconocido. Si no reconoce esta transacción, haga clic en el siguiente enlace de forma INMEDIATA para cancelar el cargo.",
            isPhishing: true,
            indicators: [
                "Extensión de dominio sospechosa (.xyz)",
                "Uso de mayúsculas para generar pánico",
                "Solicitud de acción inmediata vía enlace externo"
            ]
        },
        {
            id: 6,
            sender: "updates@discord.com",
            subject: "Actualización de los Términos de Servicio",
            content: "Estamos actualizando nuestras políticas para mejorar tu experiencia. Puedes leer los cambios detallados en nuestro blog oficial. Gracias por ser parte de Discord.",
            isPhishing: false,
            indicators: [
                "Remitente verificado: discord.com",
                "Referencia a un canal de comunicación oficial (blog)",
                "Asunto rutinario y administrativo sin alarmas"
            ]
        },
        {
            id: 7,
            sender: "hr-payroll@microsoft-rewards.org",
            subject: "🎁 ¡Tu bono especial de empleado está listo!",
            content: "Como agradecimiento por tu desempeño, Microsoft te ha otorgado un bono de $500 USD. Para reclamarlo, ingresa tus credenciales corporativas en este formulario seguro.",
            isPhishing: true,
            indicators: [
                "Cebo de premio (Bono de $500)",
                "Solicitud de 'credenciales corporativas'",
                "No eres empleado de Microsoft, ¿por qué recibirías esto?"
            ]
        },
        {
            id: 8,
            sender: "soporte@spotify.com",
            subject: "Recibo de tu pago de Spotify Premium",
            content: "Gracias por tu suscripción mensual. El cargo de $18.900 ha sido procesado exitosamente. Puedes ver tu factura descargándola en tu perfil de usuario.",
            isPhishing: false,
            indicators: [
                "Correo transaccional esperado",
                "No hay urgencia ni amenazas",
                "El enlace (si lo hubiera) debería llevar a spotify.com"
            ]
        },
        {
            id: 9,
            sender: "instagram-security@notice-verify.com",
            subject: "Violación de Derechos de Autor - Tu cuenta será eliminada",
            content: "Una de tus fotos infringe nuestras normas. Tienes 12 horas para apelar la decisión o eliminaremos tu cuenta permanentemente. Clic aquí para apelar.",
            isPhishing: true,
            indicators: [
                "Dominio 'notice-verify.com' falso",
                "Urgencia extrema (12 horas)",
                "Táctica de miedo común en redes sociales"
            ]
        },
        {
            id: 10,
            sender: "notificaciones@dian.gov.co",
            subject: "Información sobre tu declaración de renta",
            content: "Le informamos que ya puede consultar sus obligaciones tributarias ingresando a nuestra sede electrónica a través del portal oficial www.dian.gov.co.",
            isPhishing: false,
            indicators: [
                "Dominio gubernamental oficial (.gov.co)",
                "Redirección a URL real y conocida",
                "Lenguaje formal y sin amenazas financieras inmediatas"
            ]
        }
    ];

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [showResult, setShowResult] = React.useState<'correct' | 'wrong' | null>(null);
    const [score, setScore] = React.useState(0);
    const [completed, setCompleted] = React.useState(false);

    const checkDecision = (decision: boolean) => {
        if (decision === phishingEmails[currentIndex].isPhishing) {
            setShowResult('correct');
            setScore(prev => prev + 1);
        } else {
            setShowResult('wrong');
        }
    };

    const nextEmail = () => {
        setShowResult(null);
        if (currentIndex < phishingEmails.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setCompleted(true);
        }
    };

    const email = phishingEmails[currentIndex];

    if (completed) {
        return (
            <div className="p-10 animate-fade-in max-w-1024 mx-auto flex flex-col items-center justify-center min-h-full h-full text-center">
                <div className="p-10 bg-accent-secondary-10 rounded-full text-accent-secondary mb-10 shadow-neon border border-accent-secondary-20">
                    <ShieldCheck size={100} />
                </div>
                <h2 className="text-6xl font-black text-white mb-6 tracking-tight">¡ENTRENAMIENTO COMPLETADO!</h2>
                <p className="text-2xl text-text-secondary max-w-2xl mb-4">
                    Has analizado los 10 correos de la base de datos.
                </p>
                <div className="text-5xl font-mono text-accent-primary mb-12">
                    Puntaje: {score} / 10
                </div>
                <div className="flex gap-4">
                    <button onClick={() => { setCompleted(false); setCurrentIndex(0); setScore(0); }} className="px-8 py-4 bg-bg-tertiary border rounded-xl text-text-muted hover:text-white transition-all text-sm font-bold">
                        REPETIR ENTRENAMIENTO
                    </button>
                    <button
                        onClick={() => {
                            generateCertificate("Recluta CyberLab", "Detección de Phishing");
                            onComplete();
                        }}
                        className="neon-button px-12 py-5 text-xl flex items-center gap-3"
                    >
                        <Download size={24} /> DESCARGAR CERTIFICADO
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-10 animate-fade-in max-w-1400 mx-auto min-h-full">
            <header className="mb-8">
                <div className="flex items-center gap-2 text-accent-secondary text-xs font-bold uppercase tracking-widest mb-1">
                    Desafío #03 - Ingeniería Social
                </div>
                <h2 className="text-4xl font-extrabold text-white">Detector de Phishing</h2>
                <p className="text-text-secondary">Analiza los correos y decide si son seguros o una trampa.</p>
            </header>

            <div className="flex-1 max-w-5xl mx-auto w-full flex flex-col gap-8">
                <div className="cyber-card p-4 bg-accent-secondary-5 border border-accent-secondary-20 flex items-center gap-4">
                    <HelpCircle className="text-accent-secondary shrink-0" size={24} />
                    <p className="text-sm text-text-secondary leading-relaxed">
                        <strong>Tu misión:</strong> ¿Puedes detectar las señales de peligro? Un correo electrónico puede ser la entrada a un gran ciberataque. Analiza el remitente y el contenido.
                    </p>
                </div>

                <div className="cyber-card bg-bg-secondary flex-1 shadow-2xl relative overflow-hidden flex flex-col p-0 border min-h-500">
                    <div className="bg-bg-tertiary p-5 border-b flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-accent-secondary-10 rounded-xl text-accent-secondary shadow-neon">
                                <Mail size={24} />
                            </div>
                            <div>
                                <span className="font-bold text-white block">Servicio de Correo Seguro</span>
                                <div className="flex items-center gap-3 text-[10px] text-text-muted font-bold uppercase tracking-widest mt-1">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> Hoy, 09:45 am</span>
                                    <span className="flex items-center gap-1 text-accent-primary animate-pulse"><ShieldCheck size={12} /> Protegido</span>
                                </div>
                            </div>
                        </div>
                        <div className="px-3 py-1 bg-white-5 rounded-full text-[10px] text-text-muted font-bold tracking-widest uppercase">Mensaje {currentIndex + 1} de {phishingEmails.length}</div>
                    </div>

                    <div className="p-10 overflow-y-auto bg-bg-secondary flex-1 custom-scrollbar">
                        <div className="mb-10 pb-6 border-b">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-accent-secondary-10 flex items-center justify-center text-accent-secondary border border-accent-secondary-20">
                                    <User size={24} />
                                </div>
                                <div>
                                    <div className="text-xs text-text-muted font-bold uppercase tracking-widest mb-1">De:</div>
                                    <div className="text-white font-bold text-lg">{email.sender}</div>
                                </div>
                            </div>
                            <div className="text-2xl text-white font-extrabold mb-1 tracking-tight">Asunto: {email.subject}</div>
                        </div>

                        <div className="text-xl leading-relaxed text-text-secondary mb-12 p-10 bg-glass rounded-3xl border shadow-inner relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Mail size={120} />
                            </div>
                            <p className="relative z-10">"{email.content}"</p>
                            <div className="mt-10 relative z-10">
                                <div className="w-fit px-8 py-4 bg-accent-primary-10 border border-accent-primary-20 rounded-2xl text-accent-primary font-black text-sm cursor-pointer hover:bg-accent-primary-20 transition-all flex items-center gap-3 shadow-lg">
                                    <ExternalLink size={20} /> CLICK AQUÍ PARA RESOLVER
                                </div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {showResult && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-10 rounded-3xl border shadow-2xl overflow-hidden relative ${showResult === 'correct' ? 'bg-accent-primary-5 border-accent-primary-30 text-accent-primary' : 'bg-accent-tertiary-5 border-accent-tertiary-30 text-accent-tertiary'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 p-10 opacity-10">
                                        {showResult === 'correct' ? <ShieldCheck size={200} /> : <ShieldAlert size={200} />}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            {showResult === 'correct' ? <CheckCircle size={40} /> : <XCircle size={40} />}
                                            <h4 className="font-extrabold text-3xl mb-1 uppercase tracking-tighter">{showResult === 'correct' ? '¡Respuesta Correcta!' : '¡Caíste en la trampa!'}</h4>
                                        </div>

                                        <div className="text-lg text-text-secondary mb-8 leading-relaxed max-w-2xl">
                                            {email.isPhishing
                                                ? 'Correcto. Este correo era un ataque de **PHISHING** diseñado para robar tus datos.'
                                                : 'Este era un **CORREO LEGÍTIMO** de seguridad. Es importante no bloquearlo.'
                                            }
                                        </div>

                                        <div className="bg-white-5 p-6 rounded-2xl mb-8 border border-white-5">
                                            <h5 className="font-bold text-xs uppercase tracking-widest mb-4 opacity-70">Indicadores de seguridad:</h5>
                                            <ul className="space-y-3">
                                                {email.indicators.map((ind, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                                        {ind}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <button
                                            onClick={nextEmail}
                                            className={`px-10 py-4 rounded-xl font-extrabold uppercase tracking-widest border-2 shadow-neon transition-all hover:scale-105 active:scale-95 ${showResult === 'correct' ? 'border-accent-primary bg-accent-primary text-bg-primary' : 'border-accent-tertiary bg-accent-tertiary text-bg-primary'
                                                }`}
                                        >
                                            CONTINUAR ENTRENAMIENTO
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {!showResult && (
                        <div className="p-8 bg-bg-tertiary border-t grid grid-cols-2 gap-6 shrink-0 mt-auto">
                            <button
                                onClick={() => checkDecision(true)}
                                className="flex items-center justify-center gap-3 p-6 border-2 border-accent-tertiary rounded-2xl text-accent-tertiary hover:bg-accent-tertiary hover:text-white transition-all font-extrabold uppercase tracking-widest text-sm shadow-inner"
                            >
                                <ShieldAlert size={24} /> ESTO ES PHISHING
                            </button>
                            <button
                                onClick={() => checkDecision(false)}
                                className="flex items-center justify-center gap-3 p-6 border-2 border-accent-secondary rounded-2xl text-accent-secondary hover:bg-accent-secondary hover:text-white transition-all font-extrabold uppercase tracking-widest text-sm shadow-inner"
                            >
                                <ShieldCheck size={24} /> ES UN CORREO SEGURO
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-3 gap-8 pb-12">
                    <div className="cyber-card flex flex-col gap-4 border-accent-secondary-20 bg-accent-secondary-5">
                        <BadgeInfo className="text-accent-secondary" size={32} />
                        <h5 className="font-bold text-xs text-accent-secondary uppercase tracking-widest">TIP #1</h5>
                        <p className="text-xs text-text-secondary leading-normal italic">
                            "Busca errores ortográficos o un sentido de urgencia exagerado."
                        </p>
                    </div>
                    <div className="cyber-card flex flex-col gap-4 border-accent-secondary-20 bg-accent-secondary-5">
                        <BadgeInfo className="text-accent-secondary" size={32} />
                        <h5 className="font-bold text-xs text-accent-secondary uppercase tracking-widest">TIP #2</h5>
                        <p className="text-xs text-text-secondary leading-normal italic">
                            "Pasa el mouse sobre los enlaces para ver la URL real antes de hacer clic."
                        </p>
                    </div>
                    <div className="cyber-card flex flex-col gap-4 border-accent-secondary-20 bg-accent-secondary-5">
                        <BadgeInfo className="text-accent-secondary" size={32} />
                        <h5 className="font-bold text-xs text-accent-secondary uppercase tracking-widest">TIP #3</h5>
                        <p className="text-xs text-text-secondary leading-normal italic">
                            "Las empresas serias nunca te piden contraseñas o datos bancarios por email."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhishingLab;

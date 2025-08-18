import {useState} from "react";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const estilos = {
    contenedor: {
        maxWidth: "480px",
        margin: "0 auto",
        padding: "32px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        fontFamily: "sans-serif"
    },
    formulario: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    titulo: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#1e1e1e",
        marginBottom: "10px"
    },
    campo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
    },
    label: {
        marginBottom: "6px",
        fontWeight: "500",
        fontSize: "14px"
    },
    input: {
        width: "94%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "14px"
    },
    textarea: {
        width: "94%",
        minHeight: "50px",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "14px",
        resize: "none"
    },
    error: {
        color: "crimson",
    },
    botonContenedor: {
        display: "flex",
        justifyContent: "flex-end"
    },
    boton: {
        padding: "12px 24px",
        backgroundColor: "#1d4ed8",
        color: "#fff",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    }
};

export default function FormularioPostulacion({onAdd}) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [skills, setSkills] = useState("");
    const [linkCV, setLinkCV] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim()) return setError("El nombre es obligatorio.");
        if (!emailOk(email)) return setError("El email es inválido.");
        if (!linkCV.trim()) return setError("Por favor, agregue un link a su CV");

        setEnviando(true);
        try {
            const data = {
                nombre: nombre.trim(),
                email: email.trim(),
                experiencia: Number(experiencia),
                skills: skills.split(",").map((s) => s.trim()).filter(Boolean),
                linkCV: linkCV.trim()
            };

            onAdd?.(data);
            setNombre("");
            setEmail("");
            setExperiencia("");
            setSkills("");
            setLinkCV("");
            console.log("Postulante (frontend):", data);
        } catch (err) {
            setError("Ocurrió un error inesperado.");
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div style={estilos.contenedor}>
            <form onSubmit={onSubmit} style={estilos.formulario}>
                <h2 style={estilos.titulo}>Formulario de Postulación</h2>

                {error && <div style={estilos.error}>{error}</div>}

                {/* NOMBRE */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Nombre *</label>
                    <input
                        style={estilos.input}
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ana Pérez"
                    />
                </div>

                {/* EMAIL */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Email *</label>
                    <input
                        style={estilos.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ana@mail.com"
                    />
                </div>

                {/* AÑOS DE EXPERIENCIA */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Años de experiencia</label>
                    <input
                        style={estilos.input}
                        type="number" min="0" value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                        placeholder="0"
                    />
                </div>

                {/* EMAIL */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Experiencia </label>
                    <textarea
                        style={estilos.textarea}
                        value={experiencia}
                        onChange={(e) => setExperiencia(e.target.value)}
                    />
                </div>

                {/* SKILLS */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Skills</label>
                    <input
                        style={estilos.input}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        placeholder="React, Node, SQL"
                    />
                </div>

                {/* CV */}
                <div style={estilos.campo}>
                    <label style={estilos.label}>Link al CV *</label>
                    <input
                        style={estilos.input}
                        value={linkCV}
                        onChange={(e) => setLinkCV(e.target.value)}
                        placeholder="https://..."
                    />
                </div>

                {/* BOTON */}
                <div style={estilos.botonContenedor}>
                    <button
                        type="submit"
                        style={{
                            ...estilos.boton,
                            backgroundColor: enviando ? "#3b82f6" : "#1d4ed8"
                        }}
                        disabled={enviando}
                    >
                        {enviando ? "Enviando..." : "Guardar"}
                    </button>
                </div>
            </form>
        </div>
    );
}

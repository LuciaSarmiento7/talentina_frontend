import { useState } from "react";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const estilos = {
    contenedor: {
        maxWidth: "420px",
        margin: "0 auto",
        padding: "32px",
        borderRadius: "12px",
        backgroundColor: "#ffffff",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
    },
    formulario: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
    },
    titulo: {
        fontSize: "24px",
        fontWeight: "700",
        marginBottom: "24px",
        color: "#1e1e1e"
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
        width: "100%",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "14px"
    },
    error: {
        color: "red",
        fontWeight: "bold"
    },
    boton: {
        marginTop: "12px",
        padding: "12px",
        backgroundColor: "#1d4ed8",
        color: "#fff",
        fontWeight: "600",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer"
    },
    botonContenedor: {
        display: "flex",
        justifyContent: "flex-end"
    },
};

export default function FormularioPostulacion({ onAdd }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [skills, setSkills] = useState("");
    const [linkCV, setLinkCV] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault(); //PARA QUE NO SE ACTUALICE
        setError("");

        if (!nombre.trim()) return setError("El nombre es obligatorio.");
        if (!emailOk(email)) return setError("Email inválido.");
        if (experiencia === "" || Number(experiencia) < 0) return setError("Experiencia inválida (>= 0).");

        setEnviando(true);
        try {
            const data = {
                nombre: nombre.trim(),
                email: email.trim(),
                experiencia: Number(experiencia),
                skills: skills.split(",").map(s => s.trim()).filter(Boolean), //ACA
                linkCV: linkCV.trim(),
            };

            //"subo" los datos y que se encarguen los del backend (no??)
            onAdd?.(data); //ACA

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

            <div style={estilos.campo}>
            <label style={estilos.label}>Nombre *<br />
                <input style={estilos.input} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Ana Pérez" />
            </label>
            </div>

            <div style={estilos.campo}>
            <label style={estilos.label}>Email *<br />
                <input style={estilos.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@mail.com" />
            </label>
            </div>

            <div style={estilos.campo}>
            <label style={estilos.label}>Experiencia<br />
                <input style={estilos.input} type="number" min="0" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} placeholder="0" />
            </label>
            </div>

            <div style={estilos.campo}>
            <label style={estilos.label}>Skills<br />
                <input style={estilos.input} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node, SQL" />
            </label>
            </div>

                <div style={estilos.campo}>
            <label style={estilos.label}>Link al CV<br />
                <input style={estilos.input} value={linkCV} onChange={(e) => setLinkCV(e.target.value)} placeholder="https://..." />
            </label>
                </div>

            <div style={estilos.botonContenedor}>
            <button type="submit" style={estilos.boton}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                    disabled={enviando}>{enviando ? "Enviando..." : "Guardar"}</button>
            </div>
        </form>
        </div>
    );




}

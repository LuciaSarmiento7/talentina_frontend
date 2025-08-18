import { useState } from "react";

//las cosas que tiene que tener el mail para que sea valido?
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const estiloFormulario = {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    maxWidth: 400,
    width: "100%",
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

            //limpiar
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
        <form onSubmit={onSubmit} style={estiloFormulario}>
            <h2>Formulario de Postulación</h2>

            {error && <div style={{ color: "crimson" }}>{error}</div>}

            <label>Nombre*<br />
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Ana Pérez" />
            </label>

            <label>Email*<br />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ana@mail.com" />
            </label>

            <label>Experiencia (años)*<br />
                <input type="number" min="0" value={experiencia} onChange={(e) => setExperiencia(e.target.value)} placeholder="0" />
            </label>

            <label>Skills (separadas por coma)<br />
                <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="React, Node, SQL" />
            </label>

            <label>Link al CV<br />
                <input value={linkCV} onChange={(e) => setLinkCV(e.target.value)} placeholder="https://..." />
            </label>

            <button type="submit" style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "12px 20px",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.3s",
            }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                    disabled={enviando}>{enviando ? "Enviando..." : "Guardar"}</button>
        </form>
    );


}

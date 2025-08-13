import { useState } from "react";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function FormularioPostulacion() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!nombre.trim()) return setError("El nombre es obligatorio.");
        if (!emailOk(email)) return setError("Email inválido.");

        console.log("Postulante:", { nombre, email });
        setNombre("");
        setEmail("");
    };

    return (
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 420 }}>
            <h2>Formulario de Postulación</h2>

            {error && <div style={{ color: "crimson" }}>{error}</div>}

            <label>
                Nombre*
                <input
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Ana Pérez"
                />
            </label>

            <label>
                Email*
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ana@mail.com"
                />
            </label>

            <button type="submit">Guardar</button>
        </form>
    );
}

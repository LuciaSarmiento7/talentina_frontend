export default function TablaCandidatos({ candidatos }) {
    return (
        <div style={estilos.contenedor}>
            <h2 style={estilos.titulo}>Candidatos</h2>
            <table style={estilos.tabla}>
                <thead>
                <tr>
                    <th style={estilos.th}>Nombre</th>
                    <th style={estilos.th}>Email</th>
                    <th style={estilos.th}>Experiencia</th>
                    <th style={estilos.th}>CV</th>
                </tr>
                </thead>
                <tbody>
                {candidatos.map((c) => (
                    <tr key={c.id} style={estilos.fila}>
                        <td style={estilos.td}>{c.nombre}</td>
                        <td style={estilos.td}>{c.email}</td>
                        <td style={estilos.td}>{c.experiencia} años</td>
                        <td style={estilos.td}>
                            <a href={c.linkCV} target="_blank" rel="noopener noreferrer" style={estilos.link}>Ver CV</a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

// Estilos
const estilos = {
    contenedor: {
        padding: "32px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "sans-serif"
    },
    titulo: {
        fontSize: "24px",
        marginBottom: "16px",
        fontWeight: "600"
    },
    tabla: {
        width: "100%",
        borderCollapse: "collapse"
    },
    th: {
        textAlign: "left",
        padding: "12px",
        borderBottom: "2px solid #e2e8f0",
        color: "#1e3a8a",
        fontSize: "14px"
    },
    td: {
        padding: "12px",
        borderBottom: "1px solid #f1f1f1",
        fontSize: "14px"
    },
    fila: {
        backgroundColor: "#fff",
        transition: "background-color 0.2s ease-in-out"
    },
    link: {
        color: "#2563eb",
        textDecoration: "none",
        fontWeight: "500"
    }
};
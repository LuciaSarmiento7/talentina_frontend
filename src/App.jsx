import './App.css'

import FormularioPostulacion from './components/FormularioPostulacion'
import TablaCandidatos from './components/TablaCandidatos';
import {useState} from "react";

const candidatosTabla = [
    { id: 1, nombre: "Ana Pérez", email: "ana@mail.com", experiencia: 3, linkCV: "https://" },
    { id: 2, nombre: "Luis Gómez", email: "luis@mail.com", experiencia: 5, linkCV: "https://" }
];

export default function App() {

    const [vista, setVista] = useState("tabla");

    return (
        <div style={estilos.app}>

            {/* ""MENU DE NAVEGACION"" */}
            <nav style={estilos.nav}>

                {/* TABLA */}
                <button
                    onClick={() => setVista("tabla")}
                    style={vista === "tabla" ? estilos.botonActivo : estilos.boton}
                >
                    Tabla de candidatos
                </button>

                {/* FORMULARIO */}
                <button
                    onClick={() => setVista("formulario")}
                    style={vista === "formulario" ? estilos.botonActivo : estilos.boton}
                >
                    Formulario
                </button>
            </nav>

            {vista === "tabla" && <TablaCandidatos candidatos={candidatosTabla} />}
            {vista === "formulario" && <FormularioPostulacion onAdd={(nuevo) => console.log(nuevo)} />}
        </div>
    );
}


const estilos = {
    app: {
        fontFamily: "sans-serif",
        padding: "32px"
    },
    nav: {
        display: "flex",
        gap: "12px",
        marginBottom: "24px"
    },
    boton: {
        padding: "10px 16px",
        backgroundColor: "#e5e7eb",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "500"
    },
    botonActivo: {
        padding: "10px 16px",
        backgroundColor: "#1d4ed8",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
    }
};

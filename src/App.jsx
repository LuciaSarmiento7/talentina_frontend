import './App.css'

import FormularioPostulacion from './components/FormularioPostulacion'
import TablaCandidatos from './components/TablaCandidatos';

const candidatosDummy = [
    { id: 1, nombre: "Ana Pérez", email: "ana@mail.com", experiencia: 3, linkCV: "https://" },
    { id: 2, nombre: "Luis Gómez", email: "luis@mail.com", experiencia: 5, linkCV: "https://" }
];

function App() {
    return (
        <div className="App">
            <h1>Talentina</h1>
            <FormularioPostulacion />

            <TablaCandidatos candidatos={candidatosDummy} />
        </div>


    )
}
export default App

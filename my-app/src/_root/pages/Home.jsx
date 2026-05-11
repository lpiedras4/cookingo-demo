import ExperienciaUsuario from "../../components/home/ExperienciaUsuario";
import RecetasScroll from "../../components/home/RecetasScroll";
import Categorias from "../../components/home/Categorias";
import ReCompletadas from "../../components/home/ReCompletadas";

export default function Home() {
    return (
        <div style={styles.contenido}>

            <div style={styles.topbar}>

        <span style={styles.titulo}>

          Cookin<span style={{ color: "#F85E00" }}>Go</span>

        </span>

                <button style={styles.btnDesafios}>+ Desafíos</button>

            </div>

            <ExperienciaUsuario />
            <RecetasScroll />
            <Categorias />
            <ReCompletadas />

        </div>
    );
}

const styles = {
    contenido: {
        flex: 1,
        padding: "24px 32px",
        fontFamily: "var(--font-body)",

    },


    topbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px",
    },

    titulo: {
        fontFamily: "var(--font-body)",
        fontSize: "28px",
        fontWeight: 900,
        color: "#1a3a1a",
    },


    btnDesafios: {
        background: "var(--color-forest)",
        color: "#ffffff",
        border: "none",
        borderBottom: "3px solid var(--color-forest-dark)",
        borderRadius: "99px",
        padding: "10px 20px",
        fontFamily: "var(--font-body)",
        fontSize: "14px",
        fontWeight: 800,
        cursor: "pointer",
    },
};
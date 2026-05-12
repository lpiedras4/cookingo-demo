const categorias = [
    {
        id: 1,
        nombre: "Desayuno",
        color: "#f9a825",
        bg: "#fff9c4",
        imagen:
            "https://i.ytimg.com/vi/GWz9fZ5xQcE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAQks1m7t_EkV1C2BzitDVnrxBE6A",
    },
    {
        id: 2,
        nombre: "Comida",
        color: "#2e7d32",
        bg: "#c8e6c9",
        imagen:
            "https://media.gq.com.mx/photos/5f317fa2356b187cffb8431b/16:9/w_1920,c_limit/comida%20saludable.jpg",
    },
    {
        id: 3,
        nombre: "Cena",
        color: "#1565c0",
        bg: "#bbdefb",
        imagen:
            "https://content-cocina.lecturas.com/medio/2024/01/26/macedonia-con-yogur-y-tahin_00000000_260114130423_1200x1200.jpg",
    },
];

export default function Categorias() {
    return (
        <div>
            <div style={styles.titulo}>
                Categoría <span style={styles.flecha}>→</span>
            </div>
            <div style={styles.grid}>
                {categorias.map((cat) => (
                    <div key={cat.id} style={styles.card}>
                        <img src={cat.imagen} alt={cat.nombre} style={styles.imagen} />
                        <div style={styles.label}>
                            <div style={{ ...styles.dot, background: cat.color }} />
                            <span style={styles.nombre}> {cat.nombre} </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    titulo: {
        fontFamily: "Nunito, sans-serif",
        fontSize: "18px",
        fontWeight: 800,
        color: "#1a3a1a",
        margin: "24px 0 14px",
    },
    flecha: {
        color: "#2e7d32",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
    },
    card: {
        borderRadius: "16px",
        overflow: "hidden",
        border: "2px solid #e0ede0",
        cursor: "pointer",
    },
    imagen: {
        width: "100%",
        height: "90px",
        objectFit: "cover",
        display: "block",
    },
    label: {
        background: "#ffffff",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },
    dot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        flexShrink: 0,
    },
    nombre: {
        fontSize: "13px",
        fontWeight: 700,
        color: "#1a3a1a",
    },
};

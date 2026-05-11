const recetas = [
    {
        id: 1,
        nombre: "Sandwich",
        imagen:
            "https://www.southernliving.com/thmb/UW4kKKL-_M3WgP7pkL6Pb6lwcgM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ham_Sandwich_011-1-49227336bc074513aaf8fdbde440eafe.jpg",
    },
    {
        id: 2,
        nombre: "Chilaquiles",
        imagen:
            "https://patijinich.com/es/wp-content/uploads/sites/3/2017/07/207-chilaquiles-verdes.jpg",
    },
    {
        id: 3,
        nombre: "Cereal",
        imagen:
            "https://media.gq.com.mx/photos/5f5bcac54464f9b88fb2695d/1:1/w_1701,h_1701,c_limit/cereal%20desayuno.jpg",
    },
    {
        id: 4,
        nombre: "Enfrijoladas",
        imagen:
            "https://img-global.cpcdn.com/steps/6982b8f4aaff4701/400x400cq80/photo.jpg",
    },
    {
        id: 5,
        nombre: "Molletes", //Molletes del Festival de Sanborns
        imagen:
            "https://www.dondeir.com/wp-content/uploads/2025/05/festival-de-molletes-2025-cdmx-sanborns-.jpg",
    },
    {
        id: 6,
        nombre: "Pizza",
        imagen:
            "https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480/img/recipe/ras/Assets/5802fab5-fdce-468a-a830-43e8001f5a72/Derivates/c00dc34a-e73d-42f0-a86e-e2fd967d33fe.jpg",
    },
];

export default function Recetas() {
    return (
        <div>
            <div style={styles.titulo}>
                Aprender recetas <span style={styles.flecha}> → </span>
            </div>
            <div style={styles.scroll}>
                {recetas.map((receta) => (
                    <div key={receta.id} style={styles.card}>
                        <img
                            src={receta.imagen}
                            alt={receta.nombre}
                            style={styles.imagen}
                        />
                        <span style={styles.nombre}> {receta.nombre}</span>
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
    scroll: {
        display: "flex",
        gap: "14px",
        overflowX: "auto",
        paddingBottom: "6px",
        scrollbarWidth: "none",
    },
    card: {
        flexShrink: 0,
        width: "90px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer",
    },
    imagen: {
        width: "72px",
        height: "72px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "3px solid #e0ede0",
    },
    nombre: {
        fontSize: "13px",
        fontWeight: 750,
        color: "#2e5d2e",
        textAlign: "center",
    },
};

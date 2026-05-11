export default function ExperienciaUsuario() {
    const nivel = 3;
    const xpActual = 18;
    const xpTotal = 50;
    const porcentaje = (xpActual / xpTotal) * 100;

    return (
        <div style={styles.wrap}>
            <div style={styles.badge}>{nivel}</div>
            <div style={styles.info}>
                <div style={styles.label}>
                    <span>Nivel {nivel} </span>
                    <span>
            {xpActual} / {xpTotal} XP
          </span>
                </div>
                <div style={styles.track}>
                    <div style={{ ...styles.fill, width: `${porcentaje}%` }} />
                </div>
            </div>
        </div>
    );
}

const styles = {
    wrap: {
        background: "#ffffff",
        borderRadius: "20px",
        border: "2px solid #e0ede0",
        padding: "16px 20px",
        marginBottom: "20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
    },
    badge: {
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        background: "#2e7d32",
        border: "3px solid #1b5e20",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 900,
        fontSize: "18px",
        flexShrink: 0,
    },
    info: {
        flex: 1,
    },
    label: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "11px",
        fontWeight: 700,
        color: "#4a7c59",
        marginBottom: "6px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    track: {
        height: "14px",
        background: "#e8f5e9",
        borderRadius: "99px",
        border: "2px solid #c8e6c9",
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        background: "linear-gradient(90deg, #43a047, #66bb6a)",
        borderRadius: "99px",
        transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
    },
};

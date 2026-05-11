export default function Navbar() {
    return (
        <nav style={styles.nav}>
      <span style={styles.titulo}>
        Cookin<span style={{ color: "#ff9800" }}> Go </span>
      </span>
            <div style={styles.pills}>
                <div style={styles.streak}>🔥 99999</div>
                <div style={styles.xp}>⭐ 99999 XP</div>
                <div style={styles.avatar}>NG</div>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        background: "#ffffff",
        borderBottom: "2px solid #e0ede0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        height: "60px",
        position: "sticky",
        top: 0,
        zIndex: 10,
    },
    logo: {
        fontFamily: "Nunito, sans-serif",
        fontSize: "22px",
        fontWeight: 900,
        color: "#2e7d32",
    },
    logoAccent: {
        color: "#ff9800",
    },
    pills: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    streak: {
        background: "#fff8e1",
        border: "2px solid #ffe082",
        borderRadius: "99px",
        padding: "5px 12px",
        fontSize: "13px",
        fontWeight: 700,
        color: "#ff9800",
    },
    xp: {
        background: "#e8f5e9",
        border: "2px solid #a5d6a7",
        borderRadius: "99px",
        padding: "5px 12px",
        fontSize: "13px",
        fontWeight: 700,
        color: "#2e7d32",
    },
    avatar: {
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        background: "#2e7d32",
        border: "2px solid #1b5e20",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: "14px",
        cursor: "pointer",
    },
};

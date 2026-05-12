import { useNavigate} from "react-router-dom";

export default function Profile(){
    const recientes = [
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
            nombre: "Molletes",
            imagen:
                "https://www.dondeir.com/wp-content/uploads/2025/05/festival-de-molletes-2025-cdmx-sanborns-.jpg",
        },
    ];

    const logros = [
        { id: 1, emoji: "🥇", bg: "#fff9c4", border: "#f9a825", ganado: true },
        { id: 2, emoji: "🔥", bg: "#e8f5e9", border: "#0C7C59", ganado: true },
        { id: 3, emoji: "🗺️", bg: "#e3f2fd", border: "#1565c0", ganado: true },
        { id: 4, emoji: "", ganado: false },
        { id: 5, emoji: "", ganado: false },
        { id: 6, emoji: "", ganado: false },
    ];

    export default function Profile() {
        const navigate = useNavigate();

        const xpActual = 18;
        const xpTotal = 50;
        const porcentaje = (xpActual / xpTotal) * 100;

        return (
            <div style = {styles.main} >
                <div style = {styles.topbar}  >
        <span style = {styles.titulo} >
          Cookin<span style={{ color: "#F85E00" }}>Go</span>
        </span>
                    <button style={styles.btnVolver} onClick={() => navigate("/")}>
                        ← Volver
                    </button>
                </div>

                {/* Card principal */}
                <div style={styles.card}>
                    <div style={styles.perfilRow}>
                        <div style={styles.avatar}>PLC</div>
                        <div>
                            <div style={styles.nombre}>Pepe La Cabra</div>
                            <div style={styles.rol}>Cocinero · Nivel 3</div>
                            <div style={styles.statsRow}>
                                <div style={styles.stat}>
                                    <div style={styles.statVal}>3</div>
                                    <div style={styles.statLbl}>Recetas</div>
                                </div>
                                <div style={styles.stat}>
                                    <div style={styles.statVal}>18</div>
                                    <div style={styles.statLbl}>XP</div>
                                </div>
                                <div style={styles.stat}>
                                    <div style={{ ...styles.statVal, color: "#F85E00" }}>3🔥</div>
                                    <div style={styles.statLbl}>Racha</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid de cards */}
                <div style={styles.grid}>
                    {/* Nivel */}
                    <div style={styles.mini}>
                        <div style={styles.miniTit}>Tu Nivel</div>
                        <div style={styles.nivelRow}>
                            <div style={styles.nivelBadge}>3</div>
                            <div style={{ flex: 1 }}>
                                <div style={styles.barTrack}>
                                    <div style={{ ...styles.barFill, width: `${porcentaje}%` }} />
                                </div>
                                <div style={styles.xpLabel}>
                                    {xpActual} / {xpTotal} XP
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recetas */}
                    <div style={styles.mini}>
                        <div style={styles.miniTit}>Recetas</div>
                        <div style={styles.rachaRow}>
                            <span style={{ fontSize: "28px" }}>🔥</span>
                            <div>
                                <div style={styles.rachaNum}>3 Recetas</div>
                                <div style={styles.rachaSub}>¡Eso tilín!</div>
                            </div>
                        </div>
                    </div>

                    {/* Logros */}
                    <div style={{ ...styles.mini, gridColumn: "1 / -1" }}>
                        <div style={styles.miniTit}>Logros</div>

                        <div style={styles.badges}>
                            {logros.map((logro) => (
                                <div
                                    key={logro.id}
                                    style={
                                        logro.ganado
                                            ? {
                                                ...styles.badge,
                                                background: logro.bg,
                                                border: `2px solid ${logro.border}`,
                                            }
                                            : styles.badgeLocked
                                    }
                                >
                                    {logro.emoji}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recetas recientes */}
                <div style={styles.seccion}>Recetas recientes</div>

                <div style={styles.recientesGrid}>
                    {recientes.map((r) => (
                        <div key={r.id} style={styles.recCard}>
                            <div style={{ position: "relative" }}>
                                <img src={r.imagen} alt={r.nombre} style={styles.recImg} />

                                <div style={styles.check}>✓</div>
                            </div>

                            <div style={styles.recNombre}>{r.nombre}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const styles = {
        main: {
            flex: 1,
            padding: "24px 32px",
            background: "#f0f8f0",
            minHeight: "100vh",
        },

        titulo: {
            fontFamily: "Nunito, sans-serif",
            fontSize: "28px",
            fontWeight: 900,
            color: "#1a3a1a",
        },

        topbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
        },

        logo: {
            fontFamily: "Nunito, sans-serif",
            fontSize: "28px",
            fontWeight: 900,
            color: "#1a3a1a",
        },

        btnVolver: {
            background: "transparent",
            border: "2px solid #0C7C59",
            borderRadius: "99px",
            padding: "8px 20px",
            fontFamily: "Nunito, sans-serif",
            fontSize: "13px",
            fontWeight: 800,
            color: "#1D9E75",
            cursor: "pointer",
        },

        card: {
            background: "#ffffff",
            borderRadius: "20px",
            border: "2px solid #e0ede0",
            padding: "20px",
            marginBottom: "14px",
        },

        perfilRow: {
            display: "flex",
            alignItems: "center",
            gap: "20px",
        },

        avatar: {
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#0C7C59",
            border: "3px solid #085041",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 900,
            fontSize: "24px",
            flexShrink: 0,
        },

        nombre: {
            fontFamily: "Nunito, sans-serif",
            fontSize: "20px",
            fontWeight: 900,
            color: "#1a3a1a",
            marginBottom: "2px",
        },

        rol: {
            fontSize: "12px",
            fontWeight: 700,
            color: "#7a9c7a",
            marginBottom: "10px",
        },

        statsRow: {
            display: "flex",
            gap: "8px",
        },

        stat: {
            background: "#f0f8f0",
            border: "2px solid #e0ede0",
            borderRadius: "10px",
            padding: "6px 12px",
            textAlign: "center",
        },
        statVal: {
            fontFamily: "Nunito, sans-serif",
            fontSize: "16px",
            fontWeight: 900,
            color: "#0C7C59",
        },
        statLbl: {
            fontSize: "9px",
            fontWeight: 700,
            color: "#7a9c7a",
            textTransform: "uppercase",
            letterSpacing: "0.3px",
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "20px",
        },
        mini: {
            background: "#ffffff",
            borderRadius: "16px",
            border: "2px solid #e0ede0",
            padding: "14px",
        },
        miniTit: {
            fontSize: "10px",
            fontWeight: 700,
            color: "#7a9c7a",
            textTransform: "uppercase",
            letterSpacing: "0.4px",
            marginBottom: "10px",
        },
        nivelRow: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
        },
        nivelBadge: {
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#0C7C59",
            border: "2px solid #085041",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 900,
            fontSize: "14px",
            flexShrink: 0,
        },
        barTrack: {
            height: "10px",
            background: "#e8f5e9",
            borderRadius: "99px",
            border: "2px solid #c8e6c9",
            overflow: "hidden",
        },
        barFill: {
            height: "100%",
            background: "linear-gradient(90deg, #0C7C59, #1D9E75)",
            borderRadius: "99px",
        },
        xpLabel: {
            fontSize: "10px",
            fontWeight: 700,
            color: "#0C7C59",
            marginTop: "4px",
        },
        rachaRow: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
        },
        rachaNum: {
            fontFamily: "Nunito, sans-serif",
            fontSize: "20px",
            fontWeight: 900,
            color: "#F85E00",
        },
        rachaSub: {
            fontSize: "11px",
            fontWeight: 700,
            color: "#7a9c7a",
        },
        badges: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
        },
        badge: {
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
        },
        badgeLocked: {
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            background: "#f0f0f0",
            opacity: 0.4,
            filter: "grayscale(1)",
        },
        seccion: {
            fontFamily: "Nunito, sans-serif",
            fontSize: "16px",
            fontWeight: 800,
            color: "#1a3a1a",
            marginBottom: "12px",
        },
        recientesGrid: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
        },
        recCard: {
            borderRadius: "14px",
            overflow: "hidden",
            border: "2px solid #e0ede0",
            background: "#ffffff",
        },
        recImg: {
            width: "100%",
            height: "72px",
            objectFit: "cover",
            display: "block",
        },
        check: {
            position: "absolute",
            top: "5px",
            right: "5px",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#0C7C59",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 900,
        },
        recNombre: {
            fontSize: "11px",
            fontWeight: 700,
            color: "#2e5d2e",
            textAlign: "center",
            padding: "6px 4px",
        },
    };

import React from 'react'
import {useProgress} from "../../hooks/useProgress"
const Profile = () => {
  const {xp, completedLessons, badges, resetProgress} = useProgress();
  const level = Math.floor(xp / 100) + 1;

  const handleReset = () => {
//Ventana de confirmación antes de borrar todo
const confirmed = window.confirm( "¿Estás seguro? Esto borrará todo tu progreso (XP, lecciones, badges). Esta acción no se puede deshacer.");
if(confirmed){
  resetProgress();
}
  };


  return (
    <div className="mx-auto max-w-md px-5 py-6">
      <header className="mb-6 text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-amber to-orange flex items-center justify-center text-4xl">
          👤
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold text-forest">
          Mi Perfil
        </h1>
      </header>

      <div className="space-y-4">
        {/* Cards de stats (igual que antes) */}
        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-stone-400">Nivel actual</p>
          <p className="mt-1 font-display text-5xl font-bold text-amber">{level}</p>
          <div className="mt-4 h-2 rounded-full bg-stone-100">
            <div
              className="h-full rounded-full bg-amber transition-all"
              style={{ width: `${(xp % 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-stone-500">
            {xp % 100} / 100 XP para nivel {level + 1}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-stone-400">Experiencia total</p>
          <p className="mt-1 font-display text-5xl font-bold text-forest">{xp} XP</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card">
          <p className="text-sm uppercase tracking-wide text-stone-400">Lecciones completadas</p>
          <p className="mt-1 font-display text-5xl font-bold text-stone-800">
            {completedLessons.length}
          </p>
        </div>

        {/* Botón de reset — zona de peligro */}
        <div className="mt-8 rounded-2xl border-2 border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Zona de peligro</p>
          <p className="mt-1 text-xs text-red-600">
            Restablecer tu progreso borrará todo tu XP, lecciones y badges.
          </p>
          <button
            onClick={handleReset}
            className="mt-3 w-full rounded-xl border-2 border-red-400 bg-white px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 transition-colors"
          >
            Restablecer progreso
          </button>
        </div>
      </div>
    </div>
  )
}


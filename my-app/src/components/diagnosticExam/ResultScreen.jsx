const ResultScreen = ({ username, level, onContinue }) => (
  <div className="space-y-8 text-center">

    {/* Progress bar*/}
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 bg-amber rounded-full" />
      <span className="text-xs text-stone-500">100%</span>
    </div>

    <h1 className="font-display text-3xl font-bold text-stone-800">
      ¡Bien hecho {username}!
    </h1>

    <p className="text-stone-600 leading-relaxed">
      Has dado el primer paso: ahora que completaste tu examen
      diagnóstico, estás listo para comenzar un viaje hacia una
      cocina más saludable, práctica y deliciosa.
    </p>

    <p className="font-display text-2xl font-bold text-forest">
      Nivel asignado: {level}
    </p>

    <button
      onClick={onContinue}
      className="rounded-2xl bg-forest px-8 py-3 font-bold
                 text-white hover:bg-forest-dark transition-all"
    >
      Continuar
    </button>

  </div>
);

export default ResultScreen;
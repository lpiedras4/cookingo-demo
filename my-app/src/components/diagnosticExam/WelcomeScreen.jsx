const WelcomeScreen = ({username, onTakeExam}) => {
  return (
    <div className="space-y-8 text-center">
      <h1 className="font-display text-3xl font-bold text-stone-800">
        ¡Bienvenido {username}!
      </h1>
    <p className="text-stone-600 leading-relaxed">
      A continuación, realizaras un examen
      diagnóstico para determinar tu nivel y acceder a recetas
      personalizadas.
    </p>
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={onTakeExam}
        className="rounded-2xl bg-forest px-4 py-4 font-semibold
                   text-white hover:bg-forest-dark transition-all"
      >
        Empezar examen diagnóstico
      </button>
    </div>
    </div>
  );
};

export default WelcomeScreen;

const diagnosticQuestions = [
  {
    id: 1,
    question: "¿Cuánto tiempo llevas cocinando?",
    image: "/img/cocinando.jpg",
    options: [
      { label: "Apenas empecé", value: 1 },
      { label: "Llevo días",    value: 2 },
      { label: "Llevo meses",   value: 3 },
      { label: "Llevo años",    value: 4 },
    ],
  },
  {
    id: 2,
    question: "¿Qué tan seguido cocinas?",
    image: "/img/rutina.jpeg",
    options: [
      { label: "Nunca",                  value: 1 },
      { label: "1 o 2 veces por semana", value: 2 },
      { label: "Casi todos los días",    value: 3 },
      { label: "Todos los días",         value: 4 },
    ],
  },
  {
    id: 3,
    question: "¿Qué tan cómodo te sientes usando cuchillos y utensilios de cocina?",
    image: "/img/utencilios.jpg",
    options: [
      { label: "Nada cómodo",  value: 1 },
      { label: "Poco cómodo",  value: 2 },
      { label: "Cómodo",       value: 3 },
      { label: "Muy cómodo",   value: 4 },
    ],
  },
  {
    id: 4,
    question: "¿Has preparado recetas completas por tu cuenta?",
    image: "/img/platillo-cocinado.jpg",
    options: [
      { label: "Nunca",                          value: 1 },
      { label: "Solo recetas sencillas",         value: 2 },
      { label: "Sí, algunas recetas intermedias", value: 3 },
      { label: "Sí, recetas complejas",          value: 4 },
    ],
  },
  {
    id: 5,
    question: "¿Conoces técnicas básicas de cocina?",
    subtitle: "Ejemplo: hervir, freír, hornear o picar ingredientes",
    image: "/img/tecnicas-culinarias-ejemplos.png",
    options: [
      { label: "No conozco ninguna",   value: 1 },
      { label: "Conozco pocas",        value: 2 },
      { label: "Conozco varias",       value: 3 },
      { label: "Domino la mayoría",    value: 4 },
    ],
  },
  {
    id: 6,
    question: "¿Qué tan bien sigues instrucciones paso a paso?",
    image: "/img/siguiendo-receta.jpg",
    options: [
      { label: "Me cuesta mucho",              value: 1 },
      { label: "A veces me confundo",          value: 2 },
      { label: "Generalmente las sigo bien",   value: 3 },
      { label: "Las sigo fácilmente",          value: 4 },
    ],
  },
  {
    id: 7,
    question: "¿Qué tipo de comidas sabes preparar?",
    image: "/img/tipos-comida.jpg",
    options: [
      { label: "Solo snacks o instantáneos",       value: 1 },
      { label: "Desayunos básicos",                value: 2 },
      { label: "Comidas completas sencillas",      value: 3 },
      { label: "Platillos variados y complejos",   value: 4 },
    ],
  },
  {
    id: 8,
    question: "¿Qué tan importante es para ti aprender a cocinar saludable?",
    image: "/img/comida-saludable.jpg",
    options: [
      { label: "No es importante",   value: 1 },
      { label: "Poco importante",    value: 2 },
      { label: "Importante",         value: 3 },
      { label: "Muy importante",     value: 4 },
    ],
  },
];

export default diagnosticQuestions;
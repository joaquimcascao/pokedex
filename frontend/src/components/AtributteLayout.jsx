export const AtributteLayout = ({ attribute }) => {
  const ELEMENT = {
    electric: "bg-yellow-300",
    water: "bg-blue-600",
    dragon: "bg-blue-400",
    flying: "bg-blue-200",
    grass: "bg-green-400",
    ground: "bg-yellow-700",
    psychic: "bg-pink-400",
    fire: "bg-red-500",
    bug: "bg-green-500",
    ghost: "bg-purple-500",
    ice: "bg-blue-300",
    rock: "bg-amber-500",
    poison: "bg-purple-300",
    steel: "bg-gray-400",
    fighting: "bg-amber-300",
    normal: "bg-gray-600",
    dark: "bg-black",
    fairy: "bg-pink-500",
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        {attribute.map((type) => (
          <span
            key={type}
            className={`${ELEMENT[type]} text-white font-bold text-sm uppercase px-3 py-1 rounded-full shadow-md`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
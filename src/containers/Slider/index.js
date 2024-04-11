import { useEffect, useState } from "react"; // Importation des hooks useEffect et useState de React
import { useData } from "../../contexts/DataContext"; // Importation du hook useData du contexte DataContext
import { getMonth } from "../../helpers/Date"; // Importation de la fonction getMonth depuis l'utilitaire Date
import "./style.scss"; // Importation du fichier de style

const Slider = () => {
  const { data } = useData(); // Extraction des données depuis le contexte DataContext
  const [index, setIndex] = useState(0); // Déclaration d'un état pour l'index du carrousel

  // Tri des événements par date décroissante
  const byDateDesc = data?.focus
    ? data?.focus.sort(
        (evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)
      )
    : [];

  useEffect(() => {
    // Utilisation de l'effet useEffect pour gérer le changement automatique d'index
    const interval = setInterval(() => {
      // Définition d'un intervalle pour changer l'index automatiquement
      setIndex((current) =>
        current < byDateDesc.length - 1 ? current + 1 : 0
      ); // Incrémentation de l'index ou retour au début s'il atteint la fin
    }, 5000); // Changement toutes les 5 secondes
    return () => clearInterval(interval); // Nettoyage de l'intervalle lorsque le composant est démonté
  }, [index, byDateDesc.length]); // Déclenchement de l'effet lorsque l'index ou la longueur des événements change

  const handleOptionChange = (e) => {
    // Gestion du changement d'option dans la pagination
    setIndex(parseInt(e.target.value, 10)); // Mise à jour de l'index en fonction de la valeur sélectionnée
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map(
        (
          event,
          idx // Mapping des événements pour les cartes du carrousel
        ) => (
          <div
            key={event.id} // Clé unique pour chaque événement
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide" // Ajout de la classe display ou hide en fonction de l'index actuel
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        )
      )}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map(
            (
              event,
              radioIdx // Mapping des événements pour les boutons de la pagination
            ) => (
              <input
                key={event.id} // Clé unique pour chaque bouton
                type="radio"
                name="radio-button"
                value={radioIdx}
                checked={index === radioIdx} // Vérification si l'index correspond au bouton
                onChange={handleOptionChange} // Gestion du changement d'option
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Slider; // Exportation de la composante Slider

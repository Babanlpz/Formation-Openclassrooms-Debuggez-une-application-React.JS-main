import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // setTimeout(
    //   () => setIndex(index < byDateDesc.length ? index + 1 : 0),
    //   5000
    // );

    // Ajout d'une vérification pour s'assurer que byDateDesc n'est pas undefined
    if (byDateDesc !== undefined) {
      setTimeout(
        // Ajout d'un -1 pour éviter de dépasser la limite de la longueur du tableau
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };
  // Utilisation de useEffect pour lancer la fonction nextCard lorsque le composant est monté
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
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
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Ajout de focus en paramétre pour créer des bullets en fonction de la clé focus dans notre tableau  */}
              {byDateDesc.map((focus, radioIdx) => (
                <input
                  key={`${focus.title}`}
                  type="radio"
                  name="radio-button"
                  // Syntaxe modifiée pour la condition, initialement idx === index pour avoir un ordre croissant.
                  checked={index === radioIdx}
                  // Ajout de readOnly pour empêcher la modification de la valeur de l'input.
                  readOnly
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;

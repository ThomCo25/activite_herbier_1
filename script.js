const dragItems = document.querySelectorAll(".drag-item");
const dropItems = document.querySelectorAll(".drop-item");
const checkButton = document.getElementById("check-button");
const resultDiv = document.getElementById("result");
/*const resetButton = document.getElementById("reset-button");*/

// Variable pour stocker l'élément en cours de déplacement
let dragItem = null;

/*resetButton.addEventListener("click", () => {
  // Réinitialisation des éléments HTML à leur état initial
  dragItems.forEach((item) => {
    item.style.display = "flex";
  });
  
  dropItems.forEach((item) => {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  });
  
  resultDiv.textContent = "";
  resultDiv.style.color = "";
});*/

// Écouteurs d'événements pour les éléments à déplacer
dragItems.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
});

// Fonction appelée lorsque l'utilisateur commence à déplacer un élément
function dragStart(event) {
  dragItem = event.target;
  dragItem.classList.add("dragging"); // Ajouter la classe "dragging" pour un effet visuel
  setTimeout(() => {
    event.target.style.display = "none";// Rendre l'élément invisible au début du déplacement pour éviter les problèmes
  }, 0);
}

// Écouteurs d'événements pour les boîtes de réception
dropItems.forEach((item) => {
  item.addEventListener("dragover", dragOver);// Empêcher le comportement par défaut de l'événement "dragover"
  item.addEventListener("dragenter", dragEnter);// Ajouter la classe "drag-over" lors du survol de l'élément
  item.addEventListener("dragleave", dragLeave);// Supprimer la classe "drag-over" lorsque l'élément quitte la zone de survol
  item.addEventListener("drop", drop);// Déplacer l'élément en cours de déplacement dans cette boîte
});

// Fonction pour empêcher le comportement par défaut de l'événement "dragover"
function dragOver(event) {
  event.preventDefault();
}

// Fonction pour ajouter la classe "drag-over" lors du survol de l'élément
function dragEnter(event) {
  event.preventDefault();
  this.classList.add("drag-over");
}

// Fonction pour supprimer la classe "drag-over" lorsque l'élément quitte la zone de survol
function dragLeave(event) {
  this.classList.remove("drag-over");
}

// Fonction pour déplacer l'élément en cours de déplacement dans la boîte de réception
function drop(event) {
  event.preventDefault();
  this.classList.remove("drag-over");// Supprimer la classe "drag-over" après le dépôt

  // Vérifier si l'élément en cours de déplacement est dans une nouvelle boîte ou non
  if (dragItem.parentNode !== this) {
    dragItem.parentNode.removeChild(dragItem); // Supprimer l'élément de la boîte d'origine
    this.appendChild(dragItem); // Ajouter l'élément à la nouvelle boîte
  }
  dragItem.style.display = "flex";// Rétablir l'affichage de l'élément après le déplacement
}

// Gestion de l'événement dragend pour empêcher les éléments de disparaître
dragItems.forEach((item) => {
  item.addEventListener("dragend", dragEnd);
});

// Fonction pour gérer l'événement "dragend" et rétablir l'affichage de l'élément si nécessaire
function dragEnd(event) {
  // Vérifier si l'élément est toujours dans une boîte
  let inDropItem = false;
  dropItems.forEach((item) => {
    if (item.contains(dragItem)) {
      inDropItem = true;
    }
  });
  // Si l'élément n'est pas dans une boîte, le remettre à sa place d'origine
  if (!inDropItem) {
    event.target.style.display = "flex";
  }
}

// Écouteur d'événement pour le bouton "Vérifier"
checkButton.addEventListener("click", () => {
  let correct = true;
  // Vérifier si les éléments dans les boîtes sont correctement ordonnés
  dropItems.forEach((item) => {
    if (!item.firstChild) {
      correct = false;
    } else if (item.classList.contains("drop-1") && item.firstChild.textContent !== "Élément 2") {
      correct = false;
    } else if (item.classList.contains("drop-2") && item.firstChild.textContent !== "Élément 1") {
      correct = false;
    } else if (item.classList.contains("drop-3") && item.firstChild.textContent !== "Élément 4") {
      correct = false;
    } else if (item.classList.contains("drop-4") && item.firstChild.textContent !== "Élément 3") {
      correct = false;
    } else if (item.classList.contains("drop-5") && item.firstChild.textContent !== "Élément 8") {
      correct = false;
    } else if (item.classList.contains("drop-6") && item.firstChild.textContent !== "Élément 6") {
      correct = false;
    } else if (item.classList.contains("drop-7") && item.firstChild.textContent !== "Élément 5") {
      correct = false;
    } else if (item.classList.contains("drop-8") && item.firstChild.textContent !== "Élément 7") {
      correct = false;
    }
  });

  // Afficher le résultat en fonction du succès ou de l'échec
  if (correct) {
    resultDiv.textContent = "Bravo, vous connaissez les plantes de votre Herbier 1 !";
    resultDiv.style.color = "green";
  } else {
    resultDiv.textContent = "Désolé, au moins une réponse est incorrecte.";
    resultDiv.style.color = "red";
  }
  
});
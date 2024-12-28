import { ajoutListenerAvis } from "./avis.js";
const reponse = await fetch("http://localhost:8081/pieces");
const pieces = await reponse.json();
//const article = pieces[0];
function genererPieces(pieces){
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".fiches");
        // Création d’une balise dédiée à une pièce automobile
        const pieceElement = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
        //Code ajouté
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        
        // On rattache la balise article a la section Fiches
        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
        //Code aJouté
        pieceElement.appendChild(avisBouton);
    
     }
     ajoutListenerAvis();
}



genererPieces(pieces);
//boutons de tri
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const listeOrdonnee = Array.from(pieces);
    listeOrdonnee.sort(function(a,b){
        return a.prix - b.prix ;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(listeOrdonnee);
    console.log(listeOrdonnee);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function() {

    const pieceFiltre = pieces.filter(function(piece){
        return piece.prix <= 35;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(pieceFiltre);
    console.log(pieceFiltre);
});

const boutonDescription = document.querySelector(".btn-description");

boutonDescription.addEventListener("click", function(){
    const pieceDescription = pieces.filter(function(piece){
        return piece.description ;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(pieceDescription);
    console.log(pieceDescription);
});

const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function(){
    const listeOrdonnee = Array.from(pieces);
    listeOrdonnee.sort(function(a,b){
        return b.prix - a.prix ;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(listeOrdonnee);
    console.log(listeOrdonnee);
});
const noms = pieces.map(pieces => pieces.nom);

for(let i= noms.length -1;i >= 0; i--){
    if(pieces[i].prix > 35){
        noms.splice(i,1);
    }

}
console.log(noms);
const abordablesPieces = document.createElement("ul");

for(let i = 0; i < noms.length; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = noms[i];
    abordablesPieces.appendChild(nomElement);
}

const listeAbordable= document.querySelector(".abordable");
listeAbordable.appendChild(abordablesPieces);

const nomsDispo = pieces.map(pieces => pieces.nom);
const prixDispo= pieces.map(pieces => pieces.prix);
for(let i = nomsDispo.length -1; i >= 0; i--){
    if(pieces[i].disponibilite === false){
        nomsDispo.splice(i,1);
        prixDispo.splice(i,1);
    }
}

const dispoPieces = document.createElement("ul");
for(let i = 0; i< nomsDispo.length; i++){
    const nomElement = document.createElement("li");
    nomElement.innerText = `${nomsDispo[i]} -${prixDispo[i]} €`;
    dispoPieces.appendChild(nomElement); 
}
const listeDispo = document.querySelector(".disponible");
listeDispo.appendChild(dispoPieces);

const prixMax = document.querySelector("#prix-max");
prixMax.addEventListener("input", function(){
    const pieceFiltre = pieces.filter(function(piece){
        return piece.prix <= prixMax.value;
    })
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(pieceFiltre);  
});

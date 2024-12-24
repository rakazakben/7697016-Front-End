// Récupération des pièces depuis le fichier JSON

const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

//const article = pieces[0];
for(let i=0; i < pieces.length ; i++){

const pieceElement = document.createElement("article");
const imageElement = document.createElement("img");
imageElement.src = pieces[i].image;
const nomElement = document.createElement("h2");
nomElement.innerText = pieces[i].nom;
const  prixElement = document.createElement("p");
prixElement.innerText = `Prix : ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
const categorieElement = document.createElement("p");
categorieElement.innerText = pieces[i].categorie ?? "(aucune catégorie)";
const descriptionElement = document.createElement("p");
descriptionElement.innerText = pieces[i].description ?? "(pas de description pour le moment)" ;
const stockElement = document.createElement("p");
stockElement.innerText = `stock : ${pieces[i].disponibilite === true ? "en stock" : "rupture de stock"}`;

const sectionFiches = document.querySelector(".fiches");
sectionFiches.appendChild(pieceElement);
pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
pieceElement.appendChild(stockElement);
}
//boutons de tri
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
    const listeOrdonnee = Array.from(pieces);
    listeOrdonnee.sort(function(a,b){
        return a.prix - b.prix ;
    });
    console.log(listeOrdonnee);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function() {

    const pieceFiltre = pieces.filter(function(piece){
        return piece.prix <= 35;
    });
    console.log(pieceFiltre);
});

const boutonDescription = document.querySelector(".btn-description");

boutonDescription.addEventListener("click", function(){
    const pieceDescription = pieces.filter(function(piece){
        return piece.description ;
    });
    console.log(pieceDescription);
});

const boutonDecroissant = document.querySelector(".btn-decroissant");

boutonDecroissant.addEventListener("click", function(){
    const listeOrdonnee = Array.from(pieces);
    listeOrdonnee.sort(function(a,b){
        return b.prix - a.prix ;
    });
    console.log(listeOrdonnee);
});

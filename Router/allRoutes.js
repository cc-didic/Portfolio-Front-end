import Route from "./Route.js";

/**
 *  Liste de toutes les routes de l'application.
 *  Chaque route correspond à une page du site.
*/

// Définir ici les routes
export const allRoutes = [
    new Route("/", "Acceuil", "/pages/home.html"),
    new Route("/signin", "Connexion", "/pages/signin.html"),
];

// Le titre s'affiche comme ceci : Route.titre - websitename
export const websitename = "Portfolio";
import Route from "./Route.js";

/**
 *  Liste de toutes les routes de l'application.
 *  Chaque route correspond à une page du site.
 * 
 * url, title, pathHtml, authorize, pathJS
 * 
 * Pour authorize :
 *          [] -> Tout le monde peut y accéder
 *          ["disconnected"] -> Réserver aux utilisateurs déconnecté
 *          ["client"] -> Réserver aux utilisateurs avec le rôle client
 *          ["admin"] -> Réserver aux utilisateurs avec le rôle admin
 *          ["admin", "client"] -> Réserver aux utilisateurs avec le rôle client ou admin
*/

// Définir ici les routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", [], "/assets/js/home.js"),
    new Route("/home", "Accueil", "/pages/home.html", [], "/assets/js/home.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"], "/assets/js/auth/signin.js"),
    new Route("/create-project", "Ajouter un projet", "/pages/auth/createProject.html", ["ROLE_ADMIN"], "/assets/js/createProject.js"),
];

// Le titre s'affiche comme ceci : Route.titre - websitename
export const websitename = "Portfolio";
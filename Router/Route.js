/**
 *  Classe Route
 * 
 *  Cette classe représente une route de l'application.
 *  Une route correspond à une page du site.
 * 
 *  Elle contient :
 *      - l'URL affichée dans le navigateur
 *      - le titre de la page
 *      - le chemin vers le fichier HTML à afficher
 *      - le chemin vers le fichier JavaScript associé (optionnel)
 * 
 *  Cette classe est utilisée par le routeur pour charger
 *  dynamiquement le contenu dans la page sans rechargement.
 */
export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}
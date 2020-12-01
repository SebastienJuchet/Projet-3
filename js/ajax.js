//function générique pour une requète "GET"
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    let requestAjax = new XMLHttpRequest();
    requestAjax.open("GET", url);
    requestAjax.addEventListener("load", function () {
        if (requestAjax.status >= 200 && requestAjax.status < 400) {
            callback(requestAjax.responseText);// Appelle callback si réponse positive
        } else {
            console.error(requestAjax.status + " " + requestAjax.statusText + " " + url);
        }
    });
    requestAjax.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    requestAjax.send(null);
}


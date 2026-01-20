const tokenCookieName = "accesstoken";
const RoleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");

signoutBtn.addEventListener("click", signout);

function getRole(){
    return getCookie(RoleCookieName);
}

//Sauvegarde le token dans le tokenCookieName pendant 7 jour;
function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

// Récupère le token
function getToken(){
    return getCookie(tokenCookieName);
}

// 
function setCookie(name, value, days){
    let expires = "";

    if(days){
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name){
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');

    for(let i=0; i<ca.length; i++)
    {
        let c =ca[i];

        while(c.charAt(0)==' ') c = c.substring(1, c.length);
        if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Vérifier si on est connecté ou non
function isConnected(){
    if(getToken() == null || getToken == undefined){
        return false;
    }
    else{
        return true;
    }
}

function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(RoleCookieName);

    // Rafréchie la page
    window.location.reload();
}

function eraseCookie(name){
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GTM;';
}

function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element =>{
        switch(element.dataset.show){
            case 'disconnected':
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if(!userConnected || role != "client"){
                    element.classList.add("d-none");
                }
                break;
        }
    })
}
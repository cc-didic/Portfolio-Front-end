const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){
    // Donnée factif pour le moment
    if(mailInput.value == "test@mail.com" && passwordInput.value == "123"){

        // Il faudra récupérer le vrai token
        const token = "jhjhklhhfgdftgujjjmhhjgkuyfykgj";
        setToken(token);

        // Placer ce token en cookie
        setCookie("role", "admin", 7);

        //Retour à la page d'acceuil
        globalThis.location.replace("/");
    }
    else{
        mailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
    }
}
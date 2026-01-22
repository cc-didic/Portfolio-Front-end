const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");

btnSignin.addEventListener("click", checkCredentials);

function checkCredentials(){

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const signin = {
        username: document.getElementById("EmailInput").value,
        password: document.getElementById("PasswordInput").value
    };

	let requestOptions = {
		method : 'POST',
		headers : { "Content-Type": "application/json" },
        body: JSON.stringify(signin),
        redirect: 'follow',
        credentials: "include"
	};

	// Envoi une requete au serveur
    console.log(apiUrl+"login");
	fetch(apiUrl+"login", requestOptions)
	.then(response =>{
		if(!response.ok){
			mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
            throw new Error("Identifiants invalides");
		}
		
        return response.json();
	})
	.then(result => {
		const token = result.api_token;
            setToken(token);

            setCookie(RoleCookieName, result.roles[0], 7);
            globalThis.location.replace("/");
	})
	.catch(error => {
		console.log('error', error);
	});
}
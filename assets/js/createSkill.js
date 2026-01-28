const createSkillBtn = document.getElementById("create-skill-btn");

createSkillBtn.addEventListener("click", createSkill);

function createSkill(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    const data = {
        name: document.getElementById("NameInput").value,
        logo: document.getElementById("LogoInput").value,
    };

	let requestOptions = {
		method : 'POST',
		headers : myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(`${apiUrl}skill`, requestOptions)
	.then(response =>{
		if(!response.ok){
            throw new Error("Données invalides");
		}
        return response.json();
	})
	.then(() => {
		globalThis.location.replace("/");
	})
	.catch(error => {
		console.log('Error Lors de la création de la compétence', error);
	});
}
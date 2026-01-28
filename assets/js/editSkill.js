const params = new URLSearchParams(globalThis.location.search);
const skillId = params.get("id");

// Constante qui va nous servir a écouter les events du bouton
const editSkillBtn = document.getElementById("edit-skill-btn");

// Ecoute des events du bouton
editSkillBtn.addEventListener("click", () => {editSkill(skillId)});

getSkillById(skillId);

function getSkillById(skillId){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
		method : 'GET',
		headers : myHeaders,
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(`${apiUrl}skill/${skillId}`, requestOptions)
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		else{
			console.log("Impossible de récupérer les informations de la compétence")
		}
	})
	.then(result => {	
		document.getElementById("NameInput").value = result.name;
        document.getElementById("LogoInput").value = result.logo;
	})
	.catch(error => {
		console.log("erreur lors de la récupération des données du projet", error);
	});
}

function editSkill(id){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    const data = {
        name: document.getElementById("NameInput").value,
        logo: document.getElementById("LogoInput").value,
    };

	let requestOptions = {
		method : 'PUT',
		headers : myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(`${apiUrl}skill/${id}`, requestOptions)
	.then(response =>{
		if(!response.ok){
            throw new Error("Données invalides");
		}
	})
	.then(() => {
		globalThis.location.replace("/");
	})
	.catch(error => {
		console.log('Error Lors de la modification de la compétence :', error);
	});
}
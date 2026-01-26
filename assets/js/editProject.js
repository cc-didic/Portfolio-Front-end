// On récupère l'id du projet à modifier
const params = new URLSearchParams(globalThis.location.search);
const projectId = params.get("id");

// Constante qui va nous servir a écouter les events du bouton
const editProjectBtn = document.getElementById("edit-project-btn");

// Ecoute des events du bouton
editProjectBtn.addEventListener("click", () => {editProject(projectId)});

getProjectById(projectId);

function getProjectById(projectId){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

	let requestOptions = {
		method : 'GET',
		headers : myHeaders,
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(`${apiUrl}project/${projectId}`, requestOptions)
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		else{
			console.log("Impossible de récupérer les informations du projet")
		}
	})
	.then(result => {	
		document.getElementById("TitleInput").value = result.title;
        document.getElementById("DescriptionInput").value = result.description;
        document.getElementById("ImageInput").value = result.image;
        document.getElementById("GithubInput").value = result.githubUrl;
        document.getElementById("LiveInput").value = result.liveUrl;
	})
	.catch(error => {
		console.log("erreur lors de la récupération des données du projet", error);
	});
}

function editProject(id){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    const data = {
        title: document.getElementById("TitleInput").value,
        description: document.getElementById("DescriptionInput").value,
        image: document.getElementById("ImageInput").value,
        github_url: document.getElementById("GithubInput").value,
        live_url: document.getElementById("LiveInput").value
    };

	let requestOptions = {
		method : 'PUT',
		headers : myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(`${apiUrl}project/${id}`, requestOptions)
	.then(response =>{
		if(!response.ok){
            throw new Error("Données invalides");
		}
	})
	.then(() => {
		globalThis.location.replace("/");
	})
	.catch(error => {
		console.log('Error Lors de la modification du projet :', error);
	});
}
const allProjects = document.getElementById("all-projects");

getAllProjects();

function getAllProjects(){

    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

	let requestOptions = {
		method : 'GET',
		headers : myHeaders,
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(apiUrl+"projects", requestOptions)
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		else{
			console.log("Impossible de récupérer les informations utilisateur")
		}
	})
	.then(result => {	
		showAllProjects(result);
	})
	.catch(error => {
		console.log("erreur lors de la récupération des données utilisateur", error);
	});
}

function showAllProjects(result){

    const template = document.getElementById("project-template");
	let tabId = [];

    if(!template){
        console.error("template project-template introuvable");
        return;
    }

    result.forEach(project => {
        const clone = template.content.cloneNode(true);

		// On récupère les id de tous les projets
		tabId.push(project.id);
		
		// Ajout de l'id editBtn{id} à l'id project-edit
		clone.querySelector(".project-edit").id = `editBtn${project.id}`;
		// Ajout de l'id deleteBtn{id} à l'id project-delete
		clone.querySelector(".project-delete").id = `deleteBtn${project.id}`;
		// Ajout de l'id skillsBtn{id} à l'id project-skills
		clone.querySelector(".project-skills").id = `skillsBtn${project.id}`;
		// Ajout de l'url de l'image
        clone.querySelector(".project-image").src = `/assets/images/project/${project.image}`;
		// Ajout du titre
        clone.querySelector(".project-title").textContent = project.title;
		// Ajout de la description
        clone.querySelector(".project-description").textContent = project.description;
        // Ajout du lien Github
		clone.querySelector(".project-github").href = `Https://${project.githubUrl}`;
		// Ajout du lien live
        clone.querySelector(".project-live").href = `Https://${project.liveUrl}`;

        allProjects.appendChild(clone);
    });
	getListenEvent(tabId);
}

function getListenEvent(tabId){
	const deleteProjectBtn = [];
	const editProjectBtn = [];
	const skillsProjectBtn = [];

	tabId.forEach(id => {
		editProjectBtn[id] = document.getElementById(`editBtn${id}`);
        deleteProjectBtn[id] = document.getElementById(`deleteBtn${id}`);
		skillsProjectBtn[id] = document.getElementById(`skillsBtn${id}`);

		editProjectBtn[id].addEventListener("click", () => {editProject(id)});
		deleteProjectBtn[id].addEventListener("click", () => {deleteProject(id)});
		skillsProjectBtn[id].addEventListener("click", () => {skillsProject(id)});
    });
}

function skillsProject(id){
	globalThis.location.href = `/skills-project?id=${id}`;
}

function editProject(id){
	globalThis.location.href = `/edit-project?id=${id}`;
}

function deleteProject(id){
	let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

	let requestOptions = {
		method : 'DELETE',
		headers : myHeaders,
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(`${apiUrl}project/${id}`, requestOptions)
	.then(response =>{
		if(response.status === 204){
			return null;
		}

		if(!response.ok){
			throw new Error("Erreur lors de la suppression du projet");
		}

		return response.json();
	})
	.then(() =>{
		console.log(`Projet ${id} supprimé`);
		
		const btn = document.getElementById(`deleteBtn${id}`);

        if (btn) {
            btn.closest(".project").remove();
        }
	})
	.catch(error => {
		console.log("Erreur lors de la suppression du projet :", error);
	});
}
const connected = isConnected();
console.log(connected);

getAllProjects();
getAllSkills();

function getAllProjects(){

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

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
	const allProjects = document.getElementById("all-projects");
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

		// On enlève les boutons si on est pas connecté
		if(!connected){
			clone.querySelector(".project-edit")?.remove();
    		clone.querySelector(".project-delete")?.remove();
		}
		
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

		const skillsContainer = clone.querySelector(".project-skills");
		project.skills.forEach(skill => {
        	const img = document.createElement("img");
        	img.src = `/assets/images/skills/${skill.logo}`;
        	img.alt = skill.name;
        	img.width = 36;
			img.className = "img";

        	skillsContainer.appendChild(img);
    	});

    	allProjects.appendChild(clone);
		
    });
	
	// On gère les events des boutons seulement si l'on est connecté
	if(connected){
		getListenEventProject(tabId);
	}
}

function getListenEventProject(tabId){
	const deleteProjectBtn = [];
	const editProjectBtn = [];

	tabId.forEach(id => {
		editProjectBtn[id] = document.getElementById(`editBtn${id}`);
        deleteProjectBtn[id] = document.getElementById(`deleteBtn${id}`);

		editProjectBtn[id].addEventListener("click", () => {editProject(id)});
		deleteProjectBtn[id].addEventListener("click", () => {deleteProject(id)});
    });
}

function editProject(id){
	globalThis.location.href = `/edit-project?id=${id}`;
}

function deleteProject(id){
	let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
	myHeaders.append("Content-Type", "application/json");

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

async function getAllSkills(){
	let myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	let tabId = [];

	let requestOptions = {
		method : 'GET',
		headers : myHeaders,
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	return fetch(`${apiUrl}skills`, requestOptions)
	.then(response =>{
		if(response.ok){
			return response.json();
		}
		else{
			console.log("Impossible de récupérer les compétences")
		}
	})
	.then(result => {
		const allSkills = document.getElementById("skills-img");
    	const template = document.getElementById("skill-template");

    	if(!template){
        	console.error("template project-template introuvable");
        	return;
    	}
		
		result.forEach(skill => {
		 	const clone = template.content.cloneNode(true);

			// On récupère les id de tous les projets
			tabId.push(skill.id);
		
			// Ajout de l'id editBtn{id} à l'id project-edit
			clone.querySelector(".skill-edit").id = `editSkillBtn${skill.id}`;
			// Ajout de l'id deleteBtn{id} à l'id project-delete
			clone.querySelector(".skill-delete").id = `deleteSkillBtn${skill.id}`;

			if(!connected){
				clone.querySelector(".skill-edit")?.remove();
    			clone.querySelector(".skill-delete")?.remove();

				clone.querySelector(".skills").className = "row g-4 col-md-1 skills";
			}
			else{
				clone.querySelector(".skills").className = "row g-4 col-md-3 skills";
			}

			// Ajout de l'url de l'image
        	clone.querySelector(".skill-img").src = `/assets/images/skills/${skill.logo}`;
			// Ajout du titre
        	clone.querySelector(".skill-img").alt = skill.name;

        	allSkills.appendChild(clone);
    	});

		if(connected){
			getListenEventSkill(tabId);
		}
	})
}

function getListenEventSkill(tabId){
	const deleteSkillBtn = [];
	const editSkillBtn = [];

	tabId.forEach(id => {
		editSkillBtn[id] = document.getElementById(`editSkillBtn${id}`);
        deleteSkillBtn[id] = document.getElementById(`deleteSkillBtn${id}`);

		editSkillBtn[id].addEventListener("click", () => {editSkill(id)});
		deleteSkillBtn[id].addEventListener("click", () => {deleteSkill(id)});
    });
}

function editSkill(id){
	globalThis.location.href = `/edit-skill?id=${id}`;
}

function deleteSkill(id){
	let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
	myHeaders.append("Content-Type", "application/json");

	let requestOptions = {
		method : 'DELETE',
		headers : myHeaders,
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(`${apiUrl}skill/${id}`, requestOptions)
	.then(response =>{
		if(response.status === 204){
			return null;
		}

		if(!response.ok){
			throw new Error("Erreur lors de la suppression de la compétence");
		}

		return response.json();
	})
	.then(() =>{
		console.log(`Compétence ${id} supprimée`);
		
		// On récupère le bouton avec l'id
		const deleteSkillbtn = document.getElementById(`deleteSkillBtn${id}`);

		// On vérifie si le bouton existe
        if (deleteSkillbtn) {
			// On supprime le parent qui a la class skills
            deleteSkillbtn.closest(".skills").remove();
        }
	})
	.catch(error => {
		console.log("Erreur lors de la suppression du projet :", error);
	});
}
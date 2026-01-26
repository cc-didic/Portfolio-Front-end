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

		tabId.push(project.id);
		
		clone.querySelector(".project-id").id = `button${project.id}`;
        clone.querySelector(".project-image").src = project.image;
        clone.querySelector(".project-title").textContent = project.title;
        clone.querySelector(".project-description").textContent = project.description;
        clone.querySelector(".project-github").href = project.github;
        clone.querySelector(".project-live").href = project.live;

        allProjects.appendChild(clone);

		
    });
	getListenEvent(tabId);
}

function getListenEvent(tabId){
	const deleteProjectBtn = [];
	tabId.forEach(id => {
        deleteProjectBtn[id] = document.getElementById("button"+id);

		deleteProjectBtn[id].addEventListener("click", () => {deleteProject(id)});
    });
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
		
		const btn = document.getElementById(`button${id}`);

        if (btn) {
            btn.closest(".project").remove();
        }
	})
	.catch(error => {
		console.log("Erreur lors de la suppression du projet :", error);
	});
}
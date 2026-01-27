// On récupère l'id du projet à modifier
const params = new URLSearchParams(globalThis.location.search);
const projectId = params.get("id");

const skillChecked = [];

// Constante qui va nous servir a écouter les events du bouton
const editProjectBtn = document.getElementById("edit-project-btn");

// Ecoute des events du bouton
editProjectBtn.addEventListener("click", () => {editProject(projectId)});

// On attend la réronse se getSkills avant d'éxécuter getProjectById
getSkills().then(() => {
	getProjectById(projectId);
});

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
		console.log(result.skills.length);
		for(let i=0; i<result.skills.length; i++)
		{
		
			if(result.skills[i].id > 0)
			{
				document.getElementById(`checkbox${result.skills[i].id}`).checked = true;
			}
		}
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
        live_url: document.getElementById("LiveInput").value,
		skills: skillChecked
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

// On récupère toutes les compétences pour les afficher dans une chekbox
function getSkills(){
	let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

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
		const skills = document.getElementById("skillsId");
		const ul = document.createElement("ul");
		const allSkillsBtn = [];
		const allSkillsId = [];
		let index = 0;

		ul.className = "list-group d-flex flex-row flex-wrap justify-content-center gap-2";

		result.forEach(skill => {
			const li = document.createElement("li");
			const input = document.createElement("input");
			const label = document.createElement("label");

			li.className = "list-group-item border border-promary rounded-4";
			
			input.className = "form-chek-input me-1";
			input.type = "checkbox";
			input.value = skill.id;
			input.id = `checkbox${skill.id}`;

			label.className = "form-check-label";
			label.for = `checkbox${skill.id}`;
			label.textContent = skill.name;
			
			li.appendChild(input);
			li.appendChild(label);
			ul.appendChild(li);
			skills.appendChild(ul);

			allSkillsBtn.push(document.getElementById(`checkbox${skill.id}`));
			allSkillsId.push(skill.id);

			allSkillsBtn[index].addEventListener("click", () => allSkillCheck(allSkillsId));
			
			index++;
    	});
	})
	.catch(error => {
		console.log("erreur lors de la récupération des compétences", error);
	});
}

// On vérifie si des compétences ont étaient cochés et on récupère leurs valeurs en int
function allSkillCheck(skillId){
	let skillCheck = [];

	skillChecked.length = 0;

	for(let i=0; i<skillId.length; i++)
	{
		skillCheck[i] = document.getElementById(`checkbox${skillId[i]}`).checked;

		if(skillCheck[i])
		{
			skillChecked.push(Number.parseInt(document.getElementById(`checkbox${skillId[i]}`).value));
		}
	}
}
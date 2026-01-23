const allProjects = document.getElementById("all-projects")

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

    if(!allProjects){
        console.error("allProjects all-project introuvable");
        return;
    }

    allProjects.innerHTML = "";

    result.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.classList.add("col-12", "col-md-6", "col-lg-4");

        projectDiv.innerHTML = `<div class="card h-100">
                                    <div class="action-image-buttons d-flex justify-content-between mx-2 my-2" data-show="admin">
                                        <button type="button" class="btn btn-outline-primary"><i class="bi bi-pencil"></i></button>
                                        <button type="button" class="btn btn-outline-primary"><i class="bi bi-trash"></i></button>
                                    </div>

                                    <img src="${project.image}" class="card-img-top" alt="Portfolio">

                                    <div class="card-body d-flex flex-column">
                                        <h5 class="card-title">${project.title}</h5>
                                        <p class="card-text">${project.description}</p>
                                    </div>
              
                                    <div class="d-flex justify-content-between mx-4 mb-4">
                                        <a href="${project.github}" class="btn btn-primary">Github</a>
                                        <a href="${project.live}" class="btn btn-primary">URL</a>
                                    </div>
                                </div>
                            `;
        allProjects.appendChild(projectDiv);
    });
}


                //<div class="d-flex gap-2 flex-wrap justify-content-center py-5">
                    //<img src="/assets/images/skills/php.png" width="36" alt="PHP" class="img">
                    //<img src="/assets/images/skills/scss.png" width="36" alt="SCSS" class="img">
                    //<img src="/assets/images/skills/symfony.png" width="36" alt="SYMFONY" class="img">
                //</div>
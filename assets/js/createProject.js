const createProjectBtn = document.getElementById("create-project-btn");

createProjectBtn.addEventListener("click", createProject);

function createProject(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    const data = {
        title: document.getElementById("TitleInput").value,
        description: document.getElementById("DescriptiondInput").value,
        image: document.getElementById("ImageInput").value,
        github_url: document.getElementById("GithubInput").value,
        live_url: document.getElementById("LiveInput").value
    };

	let requestOptions = {
		method : 'POST',
		headers : myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow',
	};

	// Envoi une requete au serveur
	fetch(apiUrl+"project", requestOptions)
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
		console.log('Error Lors de la création du projet', error);
	});
}
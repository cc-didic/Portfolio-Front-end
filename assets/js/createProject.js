const createProjectBtn = document.getElementById("create-project-btn");

createProjectBtn.addEventListener("click", createProject);

function createProject(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken(), "Content-Type", "application/json");

    const signin = {
        title: document.getElementById("TitleInput").value,
        description: document.getElementById("DescriptiondInput").value,
        image: document.getElementById("ImageInput").value,
        github_url: document.getElementById("GithubInput").value,
        live_url: document.getElementById("LiveInput").value
    };

	let requestOptions = {
		method : 'POST',
		headers : myHeaders,
        body: JSON.stringify(signin),
        redirect: 'follow',
        credentials: "include"
	};

	// Envoi une requete au serveur
    console.log(apiUrl+"project");
	fetch(apiUrl+"project", requestOptions)
	.then(response =>{
		if(!response.ok){
            throw new Error("Données invalides");
		}
        return response.json();
	})
	.then(result => {
		console.log(result);
	})
	.catch(error => {
		console.log('error', error);
	});
}
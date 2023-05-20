let client_id = "9e9cffc5d087ed793bee";
let client_secret = "9e0f1636fbcad99d69553c707ec8f40cb9929c28";
let search_data = document.querySelector("#search-box");
let search_btn = document.querySelector("#submit-search");

search_btn.onclick = function () {
    if(search_data.value == ""){
        search_data.setAttribute("placeholder" , "This can't be Empty")
    }
    else {
        getUserInfo(search_data.value);
    }
}


function getUserInfo (user_name) {
    const URL = `https://api.github.com/users/${user_name}`;
    console.log(URL);
    fetch(URL)
    .then(response => response.json()) // Converting the responce to JSON object
    .then(data => {
        let user_avatar = document.querySelector(".user-avatar");
        let user_name = document.querySelector("#user-name");
        let bio = document.querySelector("#bio");
        let followers = document.querySelector("#followers");
        let following = document.querySelector("#following");
        let numberOfReop = document.querySelector("#num-of-repo")
        

        
        
        user_avatar.setAttribute("src" , `${data.avatar_url}`);
        user_name.textContent = data.login;
        document.title = data.login;
        bio.textContent = data.bio;
        followers.textContent = data.followers;
        following.textContent = data.following; 
        numberOfReop.textContent = data.public_repos;
        butAddressData(data.company , data.location);
        fetch(data.repos_url)
        .then(response => response.json())
        .then(repos => {
            printrepos(repos);
        })
        
    })
    .catch(error => console.error(error));
}

function butAddressData (...data){
    let ulAddress = document.querySelector("#address");
    ulAddress.innerHTML = ""
    if(data[0] != null){
        let li = document.createElement("li");
        li.innerHTML = `<i class="fa-regular fa-building"></i>${data[0]}`;
        ulAddress.appendChild(li);      
    }
    if(data[1] != null){
        let li = document.createElement("li");
        li.innerHTML = `<i class="fa-solid fa-location-dot"></i>${data[1]}`;
        ulAddress.appendChild(li);      
    }
}

function printrepos (repos) {
    let reposDiv = document.querySelector("#repos-container");
    reposDiv.innerHTML = ""
    repos.forEach(function (repo) {
        let repoDiv = document.createElement("div");
        let repodesc = repo.description;
        let repolang = repo.language;
        if(repodesc == null){
            repodesc = "";
        }
        if(repolang == null){
            repolang = ""
        }
        repoDiv.classList = "col-md-5 repository";
        
        repoDiv.innerHTML = `<div class="repo-head">
                                <a href="#">${repo.name}</a>
                                <p>Puplic</p>
                            </div>
                            <p class="repo-desc">${repodesc}</p>
                            <div class="languages">
                                <div class="lang">
                                    <span></span>
                                    <p>${repolang}</p>
                                </div>
                            </div>`
        reposDiv.appendChild(repoDiv);
    })
}

 


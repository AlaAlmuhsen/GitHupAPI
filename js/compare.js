// let client_id = "9e9cffc5d087ed793bee";
// let client_secret = "9e0f1636fbcad99d69553c707ec8f40cb9929c28";
let search_data1 = document.querySelector("#name1");
let search_data2 = document.querySelector("#name2");
let compare_btn = document.querySelector("#compare-btn");
var resRepo1;
var resRepo2;

search_data1.addEventListener("blur" , function () {
    getUsersInfo1(search_data1.value);
})
search_data2.addEventListener("blur" , function () {
    getUsersInfo2(search_data2.value);
})

compare_btn.addEventListener("click" , compare)

function getUsersInfo1 (user_name1) {
    const URL1 = `https://api.github.com/users/${user_name1}`;
    let avatar1 = document.querySelector("#avatar1");
    let userName1 = document.querySelector("#user-name1");
    let numOfRepo1 = document.querySelector("#num-of-repo1");

    console.log(URL1);
    fetch(URL1)
    .then(response => response.json()) // Converting the responce to JSON object
    .then(data => {
        resRepo1 = data.public_repos;
        avatar1.src = `${data.avatar_url}`;
        userName1.innerHTML = data.login
        numOfRepo1.innerHTML = `Puplic repos : ${resRepo1}`;
        
    })
    .catch(error => console.error("error"));
}
function getUsersInfo2 (user_name2) {
    const URL2 = `https://api.github.com/users/${user_name2}`;
    let avatar2 = document.querySelector("#avatar2");
    let userName2 = document.querySelector("#user-name2");
    let numOfRepo2 = document.querySelector("#num-of-repo2");

    console.log(URL2);
    fetch(URL2)
    .then(response => response.json()) // Converting the responce to JSON object
    .then(data => {
        resRepo2 = data.public_repos;
        avatar2.src = `${data.avatar_url}`;
        userName2.innerHTML = data.login
        numOfRepo2.innerHTML = `Puplic repos : ${resRepo2}`;
        
    })
    .catch(error => console.error(error));
}

function compare(){
    let res1 = document.querySelector("#result1");
    let res2 = document.querySelector("#result2");
    if(resRepo1 > resRepo2){
        res1.innerHTML="winner";
        res2.innerHTML="Loser";
        res1.classList.toggle("winner");
        res2.classList.toggle("loser"); 
    }
    else if(resRepo2 > resRepo1){
        res2.innerHTML="winner";
        res1.innerHTML="Loser";
        res2.classList.toggle("winner");
        res1.classList.toggle("loser"); 
    }
    else {
        res1.innerHTML="Draw";
        res2.innerHTML="Draw";
        
        res1.classList.toggle("draw"); 
        res2.classList.toggle("draw");
    }
}
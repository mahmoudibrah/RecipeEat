"use strict";

let containerData = [];
let rowElement = document.querySelector(".rowElement");
let navbarElement = document.querySelector(".navbar");
let arrowTop = document.querySelector(".arrowTop");
let navLinks = document.querySelectorAll(".nav-link");
let categorySrc = ``;
let modalBody = document.querySelector(".modal-body");

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function (eventInfo) {
    categorySrc = eventInfo.target.getAttribute("precipe");
    getData(categorySrc);
  });
}

function getData(recipeCategory) {
  let myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/search?q=${recipeCategory}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      containerData = JSON.parse(myHttp.response).recipes;
      displayItems();
      console.log(containerData);
    }
  });
}

getData("pizza");

window.addEventListener("scroll", function () {
  let value = this.scrollY;
  if (value >= 1360.727294921875) {
    navbarElement.style.background = "lightblue";
  } else {
    navbarElement.style.background = "black";
  }
  if (value >= 1360.727294921875) {
    arrowTop.classList.remove("d-none");
  } else {
    arrowTop.classList.add("d-none");
  }
});


function displayItems() {
  let temp = ``;
  for (let i = 0; i < containerData.length; i++) {
    temp += `<div class="col-md-4">
    <div class="card text-center p-2">
      <img onclick="getDetails(${containerData[i].recipe_id})" id="recipeID" src="${containerData[i].image_url}" data-bs-toggle="modal" data-bs-target="#exampleModal"  alt="" srcset="">
      <h3>${containerData[i].publisher}</h3>
      <h4>${containerData[i].title}</h4>
      <p>${containerData[i].recipe_id}</p>
    </div>
  </div>`;
  }
  rowElement.innerHTML = temp;  
}

async function getDetails(recipeID) {
  document.getElementById("recipe").innerHTML = `
  <div class="spinner-border text-center" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
  `;
  var response = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${recipeID}`
  );
  response = await response.json();
  // console.log(response.recipe.ingredients);
  let temp = "";
  for (let i = 0; i < response.recipe.ingredients.length; i++) {
    temp += `
    <li>
    ${response.recipe.ingredients[i]}
    </li>
    `;
  }

  document.getElementById("recipe").innerHTML = temp;
  console.log(response);
}










// for (let i = 0; i < card.length; i++) {
//   card[i].addEventListener("click" , function(){
//     console.log(card)
//   })

// }

// "use strict"
// let postList = [];
// let myHttp = new XMLHttpRequest();
// let navLinks  = document.querySelectorAll(".nav-link");
// for (let i = 0; i < navLinks.length; i++) {
//   navLinks[i].addEventListener("click" , function(eventInfo){
//     let category = eventInfo.target.getAttribute("recipe");
//     console.log(category)
//     getData(category)
//   })
// }

// function getData(recipeCategory){
//   myHttp.open("GET" , `https://forkify-api.herokuapp.com/api/search?q=${recipeCategory}`);
//   myHttp.send();
//   myHttp.addEventListener("readystatechange" , function(){
//     if(  myHttp.readyState == 4 && myHttp.status == 200  ) {
//             postList = JSON.parse( myHttp.response ).recipes;
//             displayItems()
//           }
//   })
// }

// function displayItems() {
//   let temp = `` ;
//   for (let i = 0; i < postList.length; i++) {
//     temp += `        <div class="col-md-4">
//     <div class="posts">
//     <img src="${postList[i].image_url}" class="w-100" alt="" srcset="">
//       <h2>${postList[i].title}</h2>
//       <p>${postList[i].body}</p>
//       <p>${postList[i].recipe_id}</p>
//       <a href="${postList[i].source_url}" target="_blank" rel="noopener noreferrer">link</a>
//     </div>
//   </div>`
//   }
//   rowElement.innerHTML = temp;
// };

// let userPosts = [];
// let rowElement = document.getElementById("rowElement");
// myHttp.addEventListener("readystatechange" , function(){

//     if(  myHttp.status == 200 ) {
//       console.log("tesy")
//       console.log(this.readyState)
//         userPosts = JSON.parse( myHttp.response);
//         displayItems()
//     }
// });

// function displayItems() {
//   let catoona = `` ;
//   for (let i = 0; i < userPosts.length; i++) {
//     catoona += `        <div class="col-md-4">
//     <div class="posts">
//       <h2>${userPosts[i].title}</h2>
//       <p>${userPosts[i].body}</p>
//     </div>
//   </div>`
//   }
//   rowElement.innerHTML = catoona;
// }

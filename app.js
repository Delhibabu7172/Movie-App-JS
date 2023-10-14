let searchbox = document.getElementById("search-box");
let btn = document.getElementById("btn");
let page = 1;
let showmore = document.getElementById("showmorebtn");
let section = document.querySelector("section");

async function getmoviesdata() {
  try{
    let searchinput = document.getElementById("searchinput").value;

  if (searchinput.trim() === "") {
    showmore.style.display="none"
    alert("The Field Cannot Be Empty")
    return;
  }
  let data = await fetch(`http://www.omdbapi.com/?page=${page}&s=${searchinput}&apikey=77908198`);
  data = await data.json();
  console.log(data);

  data.Search.map(({ Title, Poster, Year}) => {
    section.innerHTML += `
      <div id="main-div">
        <div id="second-div">
          <img src=${Poster}>
          <h3>${Title}</h3>
          <h4>Year : ${Year}</h4>
        </div>
      </div>
    `;
  });

  page++;
  if (data.totalResults <= 10) {
    showmore.style.display = "none";
  } else {
    showmore.style.display = "block";
  }
  }
  catch(err)
  {
    console.log(err);
    alert("Movie Not Found")
  }
}

searchbox.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  section.innerHTML = "";
  getmoviesdata();
});

// searchinput.addEventListener("input", () => {
//     // When the input value changes, trigger the search
//     page = 1;
//     getmoviesdata();
//   });

showmore.addEventListener('click', () => {
  getmoviesdata();
});



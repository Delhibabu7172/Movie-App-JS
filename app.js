let searchbox = document.getElementById("search-box");
let btn = document.getElementById("btn");
let page = 1;
let showmore = document.getElementById("showmorebtn");
let section = document.querySelector("section");
let footerdiv=document.getElementById("footer-path")
let footer=document.querySelector('footer')

async function getmoviesdata() {
  try{
    showmore.style.display="block"
    let searchinput = document.getElementById("searchinput").value;

  if (searchinput.trim() === "") {
    showmore.style.display="none"
    showmore.style.display="none"
    alert("The Field Cannot Be Empty")
    return
  }



  let data = await fetch(`https://www.omdbapi.com/?page=${page}&s=${searchinput}&apikey=77908198`);
  data = await data.json();
  console.log(data);

  if (data.Error === 'Movie not found!')  {
    showmore.style.display = "none";
  section.innerHTML=`<img src="./assets/pagenotfound.gif" width=300px height=400px style="margin-bottom: 90px;"  alt="" /> `
  footer.style.position="fixed"
  footer.style.bottom="0"
  footer.style.width="100%"
    return 
  }

  if (!data.Search) {
    console.log("No search results found.");
    showmore.disabled = false;
    return;
  }

  // if (data.Poster === "N/A") {
  //   section.innerHTML=`<img src=${error2.png}/>`
  // }

  data.Search.forEach(({ Title, Poster, Year}) => {
    let imgSrc = Poster !== "N/A" ? Poster : "./assets/na.gif";
    section.innerHTML += `
      <div id="main-div">
        <div id="second-div">
        <img src=${imgSrc}>
          <h3>${Title}</h3>
          <h4>Year : ${Year}</h4>
        </div>
      </div>
    `;

  });


  
  if (data.totalResults <= 10) {
    showmore.style.display = "none";
    // footer.style.display="block"
  } 
  else  {
    showmore.style.display = "block";
    // footer.style.display ="block"
  }


  showmore.disabled = false
  if (page === 0) {
    footer.style.display = "none";
  } else {
    footer.style.display = "block";
  } 

  page++;

  }
  catch(err)
  {
    
    console.log(err);
    showmore.disabled = false;
    // alert("Movie Not Found")
  }
}

searchbox.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  section.innerHTML = "";
  getmoviesdata();
  // footer.style.display="block"
});
showmore.addEventListener('click', () => {
  getmoviesdata();
});



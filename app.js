async function getmoviesdata(){
try{
    let data= await fetch("http://www.omdbapi.com/?s=basha&apikey=77908198")
    data= await data.json()
    console.log(data);
    let section=document.querySelector("section")
    data.Search.map(({Title,Poster,Year})=>
    {
        section.innerHTML+=`
        <div>
        <h1>${Title}</h1>
        <img src=${Poster}>
        <h3>${Year}</h3>
        </div>
        `
    })
   
    
}
catch(err)
{
    document.body.innerHTML="<h1> not found</h1>"
}
}

getmoviesdata()
const bouton=document.querySelector("#short");
const input=document.querySelector("#input-short");
const para=document.querySelector("#p-st");
const lien=document.querySelector(".lien-coupe");
const menu=document.querySelector("#mn-h");
const appa=document.querySelector(".menu-hambur");
const lien2=document.querySelector("#cp-2");


menu.addEventListener('click',()=>{
    if(appa.style.display=="none"){
        appa.style.display="flex";
    }else{
        appa.style.display="none"
    }
})

const divs=localStorage.getItem("Tableau_divs");
if(divs){
    const d=JSON.parse(divs);
    let div_local=JSON.parse(divs);
    d.forEach((el)=>{
        const c=document.createElement('div');
        c.innerHTML=el;
        c.style.width="1180px"
        // c.className="lien-traite";
        lien.appendChild(c);
        const d=document.createElement('div');
        d.innerHTML=el;
        d.style.width="210px";
        lien2.appendChild(d);
    })
}
else{
    let div_local=[];
}
bouton.addEventListener('click',()=>{ 
        let URL=input.value;
    if(URL){
        let url=`https://ulvis.net/api.php?url=${URL}`
        fetch(url)
        .then(response=>response.text())
        .then(data=>{
            // para.innerHTML='';
            // para.innerHTML+=`<a href="${data}">${data}</a>`;
            if(divs){
                let div_local=JSON.parse(divs);
                let mon_cadre=MonCadre(URL,data);
                div_local.push(mon_cadre.outerHTML);
                const div_Json=JSON.stringify(div_local);
                localStorage.setItem("Tableau_divs",div_Json);
                location.reload();
            }else{
                let div_local=[];
                let mon_cadre=MonCadre(URL,data);
                div_local.push(mon_cadre.outerHTML);
                const div_Json=JSON.stringify(div_local);
                localStorage.setItem("Tableau_divs",div_Json);
                location.reload();
            }
            
        })
        .catch(error=>{console.log(error)})
        bouton.style.backgroundColor="hsl(257, 7%, 63%)";
        bouton.innerHTML="";
        bouton.innerHTML="Shorted!";
    }else{
        para.innerHTML='Veuillez remplir le champ';
        para.style.color="red";
    }

})



function MonCadre(lienIni,lienFin){
    const cadre=document.createElement("div");
    cadre.className="lien-traite";
    const lienini=document.createElement("div");
    lienini.className="lien-ini";
    lienini.innerHTML=`<p style="text-align:center;">${lienIni}</p>`;
    lienini.style.width="100%";
    const lienfin=document.createElement("div");
    lienfin.className="lien-fin";
    function copier(){
        navigator.clipboard.writeText(JSON.stringify(lienFin));
        console.log("ok");

    };
    lienfin.innerHTML=`<p>${lienFin}</p>
    <button class="btn-rond" onclick="navigator.clipboard.writeText(lienFin);">Copy</button>`;
    // const btn=document.createElement("button");
    // btn.className="btn-rond";
    // btn.innerHTML="Copy";

    // lienfin.appendChild(btn);
    cadre.appendChild(lienini);
    cadre.appendChild(lienfin);
    // let hauteur=cadre.offsetHeight;
    // lien.style.height=lien.offsetHeight+hauteur;
    // lien.appendChild(cadre);
    return cadre;
    // Conservation dans le LocalStorage


}


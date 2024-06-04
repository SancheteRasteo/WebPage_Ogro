"use strict";

function reproducir(o) {
    var count=sessionStorage.getItem('c');
    if(count!=15)
    {
        if(count==null)
        {
            count=0;
        }
        count++;
        o.innerHTML=count + " " + o.innerHTML;
        sessionStorage.setItem('c', count);
    }
    else
    {
        count=0
        o.innerHTML="Que rompebolas";
        sessionStorage.setItem('c', count);
    }
}

function fetchear2() {
    alert("siu");
    const webpageUrl = 'https://www3.animeflv.net/anime/jujutsu-kaisen-2nd-season';

    // Fetch the HTML content of the webpage
    fetch(webpageUrl)
    .then(response => {
        // Check if the response is successful
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        // Parse the HTML content of the response
        return response.text();
    })
    .then(html => {
        // Create a new DOMParser instance
        const parser = new DOMParser();
        // Parse the HTML string into a DOM document
        const doc = parser.parseFromString(html, 'text/html');

        // Extract image URLs from <img> tags
        const imageElements = doc.querySelectorAll('img');
        const imageUrls = Array.from(imageElements).map(img => img.src);

        // Log the extracted image URLs
        console.log('Image URLs:', imageUrls);
    })
    .catch(error => {
        alert('There was a problem fetching the webpage:', error);
    });
}

async function fetchear(file) {
    let x = "";
    try {
        x = await fetch(file);
    } catch (error) {
        alert(error);
    }
    let y = await x.text();
    myDisplay(y);
}

function myDisplay(y){
    
    const childi = y.getElementsByTagName("img").firstElementChild;

    alert(childi);                      // Incompleto (Busca la imagen de la pagina de animeflv)

    // for (const i of childi) {
    //     let stringSrc = i.getAttribute("src");
    //     let idLastSlatch = stringSrc.lastIndexOf("/");
    //     stringSrc.split(idLastSlatch);
    //     alert(stringSrc);
    //     if(stringSrc ==)
    // }
}

function matchPalabras() {
    // fetchear("https://www3.animeflv.net/anime/fairy-tail");
// fetchear2();

    let text = document.getElementById("cancioncita").innerHTML;
    let palaMatch = document.getElementById("pala").value;

    let numMatch = text.matchAll(palaMatch);

    document.getElementById("quant_words").innerHTML = Array.from(numMatch).length;
}

function onLoad() {
    // spawnSerie(true);
    actualizarReloj();
    crearGaleria();
    randomSerie('SerieRandom','anime',"https://www3.animeflv.net/uploads/animes/covers/",3959, '.jpg');

    addEventListener("scroll", ()=> {
        let current = "";
        const sections = document.getElementsByClassName("Ogre");
        const navLinks = document.getElementsByTagName("nav")[0].getElementsByTagName("a");
        let secLength = sections.length;
        for (let i = 0; i < secLength; i++) {
            const sectionTop = sections[i].offsetTop;
            const sectionheight = sections[i].clientHeight;
            if(pageYOffset >= (sectionTop - sectionheight/3)) {
                current = navLinks[i];
            }
        }
        changeDropName(current);
    })
}

function crearGaleria() {
    const abr = ["DyJ", "River", "Benfica", "Arg", "Chelsea"];
    const nombresClubes = ["Club Social y Deportivo Defensa y Justicia", "Club Atlético River Plate", 
    "Sport Lisboa e Benfica", "Selección Argentina de Fútbol", "Chelsea Football Club"];
    const descripcion = [
        "Llegaba desde las inferiores del club de sus amores para \
        dar un primer paso como jugador profesional <br><br>Jugaba como Volante Defensivo <br><br>\
        Ganó: <br>1_Copa Sudamericana <br>1_Recopa Sudamericana",

        "Lo traen de vuelta al lugar donde siempre pertenecio, pero esta vez como titular del primer equipo <br><br>\
        Jugaba como Volante por Derecha <br><br>Ganó: <br>1_Liga Profesional Argentina",

        "Se consagro en Europa jugando la Liga de Campeones a maximo nivel <br><br>\
        Jugaba como Volante por Izquierda <br><br>No gano Ningun titulo",

        "Entro por la ventana a la convocatoria del mundial, pero su gran solidez lo llevo a ser titular <br><br>\
        Jugaba como Volante Defensivo <br><br>Ganó: <br>1_Copa Del Mundo",

        "Pego el salto a una de las ligas mas competitivas para demostrar que es uno de los mejores mediocentros \
        de la actualidad <br><br>Juega como Volante por Derecha <br><br>No gano Ningun titulo, aún..."
    ];
    let i=0;
    const imagenes = [];

    abr.forEach((nombre, index) => {
        let enzo = "Enzo ";
        i=index*4;

        imagenes[i] = enzo + nombre;
        imagenes[i] += (nombre === "Arg") ? ".jpeg":".jpg";
        imagenes[i+1] = nombresClubes[index];
        imagenes[i+2] = nombre + ".png";
        imagenes[i+3] = descripcion[index];
    });

    let galeria = document.getElementById("galeria");
    let buttonsGaleria = document.getElementById("buttonsImages");

    const ordenGiro = [1,5,4,3,2];
    let figuraCompleta = ``;
    let imagenesButtons = ``;
    let imgLength = imagenes.length;

    for (let i = 0; i < imgLength; i+=4) {
        const atributo = `rotate(${ordenGiro[i/4]}, this)`;

        let elementoImg = `<img src="${imagenes[i]}" class="galeriaIMG" onclick="${atributo}"></img>`
        let containerInfoImg = `<div class="overlayEnzo">` 
        let infoImg = `<div>${imagenes[i+3]}</div>`
        let figCap = `<figcaption class="galeriafigCap">${imagenes[i+1]}</figcaption>`
        let fig = `<figure id="IMGaleria${(i/4)+1}" class="galeriafigCap figurenzo">`
        let imgButton = `<img src="${imagenes[i+2]}" class="dot" onclick="${atributo}"></img>`

        containerInfoImg += infoImg;
        containerInfoImg += "</div>";
        fig += elementoImg;
        fig += containerInfoImg;      // Forma con Templates (Anda lento)
        fig += figCap;
        fig += "</figure>";
        figuraCompleta += fig;
        imagenesButtons += imgButton;
        

        // let elementoImg = document.createElement("img");	
        // elementoImg.src = imagenes[i];
        // elementoImg.classList.add("galeriaIMG");

        // let containerInfoImg = document.createElement("div");
        // containerInfoImg.classList.add("overlayEnzo");

        // let infoImg = document.createElement("div");
        // infoImg.innerHTML = imagenes[i+3];
        
        // let figCap = document.createElement("figcaption");    //Forma con instancias
        // figCap.classList.add("galeriafigCap");
        // figCap.innerHTML = imagenes[i+1];

        // let fig = document.createElement("figure");

        // let imgButton = document.createElement("img");
        // imgButton.src = imagenes[i+2];
        // imgButton.classList.add("dot");
        

        // fig.id = `IMGaleria${(i/4)+1}`;
        // elementoImg.setAttribute(atributo[0], atributo[1]);
        // imgButton.setAttribute(atributo[0], atributo[1]);

        // fig.classList.add("figurenzo");
        

        // fig.append(elementoImg);
        // containerInfoImg.append(infoImg);
        // fig.append(containerInfoImg);
        // fig.append(figCap);
        // galeria.append(fig);
        // buttonsGaleria.append(imgButton);
    }
    galeria.innerHTML = figuraCompleta;
    buttonsGaleria.innerHTML = imagenesButtons;
}

function spawnSerie(liob) {
    "use strict";

    let animeImage = "https://img.animeflv.bz/cover/";
    let animeLink = "https://www3.animeflv.net/uploads/animes/covers/";
    let hentaiLink = "https://t7.nhentai.net/galleries/"
    let idRandom = 'SerieRandButton';
    let k=0;
    if (liob) {
        let l = document.getElementById("SerieList").children;

        for (const x of l) {
            let lref = x.firstElementChild.href;
            animeImage += lref.slice(lref.lastIndexOf("\u002F") + 1) + ".jpg";
            x.setAttribute("style", "background-image: url(" + animeImage + ");");

            animeImage = "https://img.animeflv.bz/cover/";
        }
        return;
    }

    let l = document.getElementById('linked').value;
    let n = document.getElementById('name').value;
    let lLength = l.length;

    for (let c = 0; c < lLength; c++) {
        if(k >= 3) {
                    animeImage = animeImage + l[c];
                }
                if(l[c] == "/") {
                    k++;
                    if(k == 4) {
                        animeImage = "https://img.animeflv.bz/cover/";
                    }
                }					
    }
    animeImage = animeImage + ".jpg";

    if(n === "Acortado")
    {
        let confirm = confirm("");
        let bud = document.createElement('body');
        bud.classList.add('dark0');
        if (confirm) {
            document.body.remove();
            document.getElementsByTagName("html")[0].append(bud);

            let n=0;
            let cont=false;

            let x = setInterval(function() {
                switch (n) {
                    case 20:
                        document.body.classList.remove();
                        document.body.classList.add('dark1');
                        break;

                    case 22:
                        document.body.prepend(creamosElement(1));
                        break;

                    case 23:
                        cont=true;
                        break;

                    case 123:
                        clearInterval(x);
                        break;
                }
                if(cont)
                {
                    if(n==93)
                    {
                        document.getElementById("vito").lastElementChild.insertAdjacentElement('afterend',creamosElement(3));
                    }
                    else
                    {
                        document.getElementById("vito").lastElementChild.insertAdjacentElement('afterend',creamosElement(2));
                    }
                }
                n++;
            },250);
        }
    }
    else if (n === "nhentai")
    {
        let link = hentaiLink;
        let randButton = document.getElementById(idRandom);
        let i = 2878340;

        randButton.setAttribute("onclick", "randomSerie('SerieRandom', '" + n + "', '" + link +"', " + i +", '/cover.jpg')")
        randButton.classList.add("agregodo")
        randButton.classList.remove("agrego")
        
    }
    else if (n == "anime")
    {
        let link = animeLink;
        let randButton = document.getElementById(idRandom);
        let i = 3959;

        randButton.setAttribute("onclick", "randomSerie('SerieRandom', '" + n + "', '" + link +"', " + i +", '.jpg')")
        randButton.classList.remove("agregodo")
        randButton.classList.add("agrego")
    }
    else if(n === "" && l === "")
    {
        alert("Sos Bobo?");
        return;
    }
    else if (n === "" || l === "") {
        alert("Please enter both Film/Serie name and URL");
        return;
    }
    else
    {
        let lista = document.createElement('li');
        lista.classList.add('ListaIndex');
        lista.setAttribute("oncontextmenu" ,"disapier(this)")
        lista.setAttribute("style", "background-image: url(" + animeImage + ");");

        let linkSerie = document.createElement('a');
        linkSerie.href=l;
        linkSerie.innerHTML=n;
        linkSerie.target="_blank";
        lista.prepend(linkSerie);
        document.getElementById("SerieList").append(lista);
    }

    document.getElementById("name").value = "";
    document.getElementById("linked").value = "";
}

function randomSerie(na,entao,link,num,finish) {
        let randomizado = document.getElementById(na).children[0];

        let animeNumber = Math.floor(Math.random() * (num+1));
        animeNumber.toString();

        randomizado.setAttribute("style", "background-image: url(" + link + animeNumber + finish + ");");
        randomizado.firstElementChild.setAttribute("href", link + animeNumber + finish);
}

function creamosElement(valor) {
    if(valor==1)
    {
        let vitoni=document.createElement("ul");
        vitoni.classList.add("Index");
        vitoni.id="vito";
        vitoni.style.backgroundColor="transparent";
        let litoni=document.createElement("li");
        litoni.classList.add("ListaIndex");
        litoni.style.margin="4px";
        litoni.style.backgroundColor="#333333";
        let linkoni=document.createElement("a");
        linkoni.innerHTML="Bobo";
        linkoni.href="#";
        litoni.append(linkoni);
        vitoni.prepend(litoni);
        return vitoni;
    }
    else if(valor==2)
    {
        let litoni=document.createElement("li");
        litoni.classList.add("ListaIndex");
        litoni.style.margin="4px";
        litoni.style.backgroundColor="#333333";
        let linkoni=document.createElement("a");
        linkoni.innerHTML="Bobo";
        linkoni.href="#";
        litoni.append(linkoni);
        return litoni;
    }
    else if(valor==3)
    {
        let litoni=document.createElement("li");
        litoni.classList.add("ListaIndex");
        litoni.style.margin="4px";
        litoni.style.backgroundColor="#333333";
        let linkoni=document.createElement("a");
        linkoni.innerHTML="Bobo";
        linkoni.href="#";
        linkoni.setAttribute("onclick" ,"dark2()");
        litoni.append(linkoni);
        return litoni;
    }
}

function dark2() {
    document.body.remove();
    document.getElementsByTagName("html")[0].append(document.createElement('body'));
    document.body.classList.add('dark2');

    for (let i = 1; i <= 6; i++) {
        let className = "help" + i;
        let texto = document.createElement("div");
        texto.classList.add(className);
        switch (i) {
            case 1:
                texto.innerHTML= "Me parecen muy lindas las altas";
                break;

            case 2:
                texto.innerHTML= "Kasando indiskretaz";
                break;
                
            case 3:
                texto.innerHTML= "Estamos Encerrados";
                break;

            case 4:
                texto.innerHTML= "Pregunta???????";
                break;
                
            case 5:
                texto.innerHTML= "Necesito I.deas si quiero terminar";
                break;	
        
            case 6:
                texto.innerHTML= "Linealidad";
                break;
        }
        document.body.prepend(texto);
    }
    
    for (let i = 0; i < 2; i++) {
        let envio = document.createElement("input");
        envio.type = "button";
        envio.setAttribute("onclick" ,"Conclusion()");
        let inputado = document.createElement("input");
        inputado.type = "password";
        let titulo = document.createElement("label");
        let container = document.createElement("div");

        if (i==0) 
        {
            inputado.classList.add("casillaInput");
            container.classList.add("casilla");
            titulo.innerHTML = "Mostrame tu caracter ordenadamente";
            envio.value = "Enviar?";
        }
        else
        {
            inputado.classList.add("ocultaInput");
            container.classList.add("oculta");
            container.setAttribute("onclick" ,"changeOpacity(this)");
            container.id = "795764";
            titulo.innerHTML = "Cada Oración es una Bendición";
            envio.value = "ESTAS SEGURO?";
        }
        container.append(envio);
        container.append(inputado);
        container.append(titulo);
        document.body.prepend(container);
    }
}

function disapier(t) {
    event.preventDefault();
    let deleteConfirm = confirm("Querés eliminar " + t.firstElementChild.innerHTML + "?");
    if (deleteConfirm) {
        t.remove(t);
    }
}

function changeOpacity(culto) {
    culto.style.opacity = "1";
    document.body.style.backgroundColor = "darkred";
}

function cambiarFondo(fondo) {
    if(document.body.id == "bodyDay" || document.body.id == "bodyNight")
    {
        document.body.id = (document.getElementById("Color").innerText == "⚪") ? "bodyAlternateDay":"bodyAlternateNight";
        fondo.innerHTML = "🌃";
    }
    else
    {
        document.body.id = (document.getElementById("Color").innerText == "⚪") ? "bodyDay":"bodyNight";
        fondo.innerHTML = "🌁";
    }
}

function changeDropName(NameDrop) {
    let maneElement = document.getElementById("dropdown");
    maneElement.firstElementChild.innerHTML = NameDrop.innerHTML;
    maneElement.lastElementChild.style.display = "none";
}

function changeDisplay(disp) {
    document.getElementById("dropdown").lastElementChild.style.display = (disp==1) ? "block":"none";
}

function darkBright(bw) {
    if(document.body.id == "bodyAlternateNight" || document.body.id == "bodyNight")
    {
        document.body.id = (document.getElementById("Fondo").innerText == "🌃") ? "bodyAlternateDay":"bodyDay";

        let tagName = "section";
        let cosas = null;
        let k = 0;
        while(k!=4) {
            if(k!=3) {
                cosas = document.getElementsByTagName(tagName);
            }
            else {
                cosas = document.getElementsByClassName(tagName);
                k=4;
            }

            let cosLength = cosas.length;
            for (let j = 0; j < cosLength; j++) {
                if(k==0) {
                    cosas[j].style.backgroundColor="lavenderblush"
                }
                else if(k==1) {
                    cosas[j].style.color="black";
                }
                else if(k==2) {
                    if(!cosas[j].classList.contains("dot")) {
                        cosas[j].style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
                    }
                }
                else if(k==4) {
                    cosas[j].classList.remove("rotateGaleryBlack");
                    cosas[j].classList.add("rotateGaleryWhite");
                }
            }

            if(tagName === "section") {
                tagName = "p";
                k=1;
            }
            else if (tagName === "p") {
                tagName = "h2";
            } else if(tagName === "h2") {
                tagName = "h3";
            }
            else if(tagName === "h3") {
                tagName = "address";
            }
            else if(tagName === "address") {
                tagName = "figcaption";
            }
            else if(tagName == "figcaption") {
                tagName = "img";
                k=2;
            }
            else if(tagName === "img") {
                tagName = "video";
            }
            else if(tagName === "video") {
                tagName = "ul";
            }
            else if(tagName === "ul") {
                tagName = "rotateGalery";
                k=3;
            }
        }
        bw.innerHTML = "⚪";
    }
    else
    {	
        document.body.id = (document.getElementById("Fondo").innerText == "🌃") ? "bodyAlternateNight":"bodyNight";
        
        let tagName = "section";
        let cosas = null;
        let k = 0;
        while(k!=4) {
            if(k!=3) {
                cosas = document.getElementsByTagName(tagName);
            }
            else {
                cosas = document.getElementsByClassName(tagName);
                k=4;
            }

            let cosLength = cosas.length;
            for (let j = 0; j < cosLength; j++) {
                if(k==0) {
                    cosas[j].style.backgroundColor="black";
                }
                else if(k==1) {
                    cosas[j].style.color="white";
                }
                else if(k==2) {
                    if(!cosas[j].classList.contains("dot")) {
                    cosas[j].style.boxShadow = "0 4px 8px 0 rgba(255, 255, 255, 0.2), 0 6px 20px 0 rgba(255, 255, 255, 0.19)";
                    }
                }
                else if(k==4) {
                    cosas[j].classList.remove("rotateGaleryWhite");
                    cosas[j].classList.add("rotateGaleryBlack");
                }
            }

            if(tagName === "section") {
                tagName = "p";
                k=1;
            }
            else if (tagName === "p") {
                tagName = "h2";
            } else if(tagName === "h2") {
                tagName = "h3";
            }
            else if(tagName === "h3") {
                tagName = "address";
            }
            else if(tagName === "address") {
                tagName = "figcaption";
            }
            else if(tagName == "figcaption") {
                tagName = "img";
                k=2;
            }
            else if(tagName === "img") {
                tagName = "video";
            }
            else if(tagName === "video") {
                tagName = "ul";
            }
            else if(tagName === "ul") {
                tagName = "rotateGalery";
                k=3;
            }
        }
        bw.innerHTML = "⚫";
    }
}

function animationBlocote(blocote, valid) {
    if (valid) {
        blocote.classList.add("blocot");
        blocote.firstElementChild.classList.add("textBlocot");
    } else {
        alert("HOLA");
        blocote.classList.remove("blocot");
        blocote.firstElementChild.classList.remove("textBlocot");
    }
}

function zoomearVid(vidi, abierto) {
    event.preventDefault();
    let modal = document.getElementById('myModal');
    if (abierto) {
        let modalVid = document.getElementById("vid01");
        modal.style.display = "block";
        modalVid.src = vidi.src;
    } else {
        let span = document.getElementsByClassName("close")[0];
        modal.style.display = "none";
    }
}

function mostrar() {
    let captionText = document.getElementById("caption");
    captionText.innerHTML = "Alto golazo no?";
}

function rotate(nEIR, elementoImgR) {
    if (elementoImgR=="r") {
        if (nEIR==1) {
            nEIR = document.getElementById("IMGaleria2").firstElementChild.getAttribute("onclick").charAt(7);
        } else {
            nEIR = document.getElementById("IMGaleria5").firstElementChild.getAttribute("onclick").charAt(7);
        }
    }
    else if(elementoImgR.parentElement.id == "IMGaleria1"){
        return;
    }
    let figs = document.getElementById("galeria").children;
    let figsLength = figs.length;
    for (let i = 0; i < figsLength; i++) {
        figs[i].id = "IMGaleria" + nEIR;
        nEIR++;
        if(nEIR>5)
        {
            nEIR=1;
        }
    }
}

function actualizarReloj() {
    let ahora = new Date();
    const minutos = ahora.getMinutes();

    const { dia, mes } = convertirAbreviaciones(ahora);
    const fechaHora = `${dia}, ${ahora.getDate()} de ${mes}, ${ahora.getHours()}:${minutos < 10 ? '0' : ''}${minutos}`;

    document.getElementById('reloj').innerText = fechaHora;
}

function convertirAbreviaciones(ahora) {
    const dias = {
        Mon: 'Lun',
        Tue: 'Mar',
        Wed: 'Mié',
        Thu: 'Jue',
        Fri: 'Vie',
        Sat: 'Sáb',
        Sun: 'Dom'
    };

    const meses = {
        Jan: 'Ene',
        Feb: 'Feb',
        Mar: 'Mar',
        Apr: 'Abr',
        May: 'May',
        Jun: 'Jun',
        Jul: 'Jul',
        Aug: 'Ago',
        Sep: 'Sep',
        Oct: 'Oct',
        Nov: 'Nov',
        Dec: 'Dic'
    };

    const dia = dias[ahora.toString().split(' ')[0]];
    const mes = meses[ahora.toString().split(' ')[1]];
    
    return { dia, mes };
}


setInterval(actualizarReloj, 1000);
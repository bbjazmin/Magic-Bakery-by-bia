/* MAGIC BAKERY – JavaScript
   1. Oldalváltás
   2. Saját receptek
   3. Adagkalkulátor
   4. TheMealDB API – keresés és receptbetöltés
*/

/* 1. Oldalváltó */
function oldalValtas(id) {
    document.querySelectorAll(".oldal").forEach(function (oldal) {
        oldal.classList.remove("lathato");
    });

    document.getElementById(id).classList.add("lathato");

    document.querySelectorAll(".nav-gomb").forEach(function (gomb) {
        gomb.classList.toggle("aktiv", gomb.dataset.oldal === id);
    });

    window.scrollTo(0, 0);
}

/* 2. A weboldal saját receptjei */
const receptek = {
    muffin: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f3c4f6f6feeb.jpg",
        cim: "🧁 Vaníliás muffin",
        leiras: "Puha és illatos muffin, körülbelül 12 darab.",
        hozzavalok: ["200 g finomliszt", "100 g cukor", "1 csomag sütőpor", "1 csomag vaníliás cukor", "1 tojás", "100 ml tej", "80 ml olaj", "1 csipet só"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Keverd össze a száraz hozzávalókat.", "Egy másik tálban keverd össze a tojást, a tejet és az olajat.", "Öntsd össze a két keveréket, és óvatosan keverd el.", "Töltsd a masszát muffinpapírokba, majd süsd 20–25 percig."]
    },
    torta: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/326e7e23e0df.jpg",
        cim: "🍓 Epres torta",
        leiras: "Könnyű piskóta friss eperrel és tejszínes krémmel.",
        hozzavalok: ["4 tojás", "120 g cukor", "120 g liszt", "1 teáskanál sütőpor", "300 ml habtejszín", "2 evőkanál porcukor", "250 g eper"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Verd habosra a tojásokat a cukorral.", "Forgasd bele a lisztet és a sütőport.", "Süsd a piskótát 30–35 percig, majd hagyd kihűlni.", "Verd fel a tejszínt, töltsd meg vele a piskótát, és díszítsd eperrel."]
    },
    keksz: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/57fa3e57e33a.jpg",
        cim: "🍪 Csokis keksz",
        leiras: "Ropogós szélű, belül puha, csokidarabkás keksz.",
        hozzavalok: ["200 g liszt", "100 g vaj", "100 g barna cukor", "1 tojás", "100 g étcsokoládé", "1 teáskanál sütőpor", "1 csipet só"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Keverd habosra a vajat a cukorral.", "Add hozzá a tojást.", "Forgasd bele a lisztet, a sütőport, a sót és a csokit.", "Formázz kis golyókat, majd süsd 12–14 percig."]
    },
    cheesecake: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/d4d2e9e09d5f.jpg",
        cim: "🫐 Áfonyás cheesecake",
        leiras: "Krémes sajttorta áfonyával és ropogós keksszalappal.",
        hozzavalok: ["200 g darált keksz", "80 g olvasztott vaj", "400 g krémsajt", "120 g cukor", "2 tojás", "200 g tejföl", "150 g áfonya"],
        lepesek: ["Keverd össze a darált kekszet az olvasztott vajjal.", "Nyomkodd a keveréket egy tortaforma aljára.", "Keverd simára a krémsajtot a cukorral, majd add hozzá a tojásokat és a tejfölt.", "Öntsd a krémet a kekszes alapra, és szórd rá az áfonyát.", "Süsd 160 fokon körülbelül 50 percig, majd hűtsd le."]
    },
    brownie: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/75a599c80a88.png",
        cim: "🍫 Mogyorós brownie",
        leiras: "Sűrű, csokis brownie dióval.",
        hozzavalok: ["200 g étcsokoládé", "150 g vaj", "150 g cukor", "3 tojás", "90 g liszt", "80 g darált dió", "1 csipet só"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Olvaszd fel a csokoládét a vajjal.", "Keverd hozzá a cukrot és a tojásokat.", "Forgasd bele a lisztet, a diót és a sót.", "Süsd 25–30 percig, majd hagyd kihűlni."]
    },
    citrompite: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/194249ab446d.jpg",
        cim: "🍋 Citromos pite",
        leiras: "Friss, savanykás citromkrém omlós tésztában.",
        hozzavalok: ["1 adag pitetészta", "120 ml citromlé", "1 citrom reszelt héja", "150 g cukor", "3 tojás", "200 ml tejszín"],
        lepesek: ["Melegítsd elő a sütőt 175 fokra.", "Helyezd a tésztát a piteformába, és szurkáld meg villával.", "Keverd össze a citromlevet, a héjat, a cukrot, a tojásokat és a tejszínt.", "Öntsd a krémet a tésztára.", "Süsd 35–40 percig, majd hűtsd le."]
    },
    macaron: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/41f566d477cd.jpg",
        cim: "🌸 Málnás macaron",
        leiras: "Francia mandulás édesség málnás töltelékkel.",
        hozzavalok: ["100 g mandulaliszt", "100 g porcukor", "80 g tojásfehérje", "75 g kristálycukor", "100 g málnalekvár"],
        lepesek: ["Szitáld össze a mandulalisztet és a porcukrot.", "Verd kemény habbá a tojásfehérjét a cukorral.", "Óvatosan forgasd össze a két keveréket.", "Nyomj kis korongokat sütőpapírra, és hagyd pihenni.", "Süsd 150 fokon 13–14 percig, majd kihűlés után töltsd meg lekvárral."]
    },
    kokuszgolyo: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/584da1118ec3.jpg",
        cim: "🥥 Kókuszgolyó",
        leiras: "Kakaós, kókuszos, egyszerűen elkészíthető klasszikus.",
        hozzavalok: ["250 g darált keksz", "100 g vaj", "100 g porcukor", "1 evőkanál kakaópor", "50 ml tej", "100 g kókuszreszelék"],
        lepesek: ["Keverd össze a darált kekszet, a porcukrot és a kakaót.", "Add hozzá a vajat és a tejet.", "Gyúrd össze a masszát.", "Formázz golyókat, majd forgasd meg őket kókuszreszelékben.", "Tedd hűtőbe legalább egy órára."]
    },
    csiga: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/82f7f41d2c02.jpg",
        cim: "🥮 Fahéjas csiga",
        leiras: "Puha kelt tészta fahéjas-cukros töltelékkel.",
        hozzavalok: ["500 g liszt", "250 ml langyos tej", "50 g vaj", "50 g cukor", "1 tojássárgája", "1 csomag élesztő", "80 g vaj a töltelékhez", "100 g barna cukor", "2 teáskanál fahéj"],
        lepesek: ["Futtasd fel az élesztőt a langyos tejben.", "Gyúrd össze a tészta hozzávalóit, majd keleszd egy órán át.", "Nyújtsd ki, kend meg vajjal, és szórd meg fahéjas cukorral.", "Tekerd fel, majd vágd szeletekre.", "Keleszd még 30 percig, és süsd 180 fokon 20–25 percig."]
    },

    /* Új receptek */
    almaspite: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/afae7ba524c9.jpg",
        cim: "🍎 Almás pite",
        leiras: "Omlós tészta, fahéjas alma – meleg tea mellé a legjobb, kb. 8 szelet.",
        hozzavalok: ["300 g finomliszt", "150 g hideg vaj", "100 g porcukor", "1 tojássárgája", "3 evőkanál hideg víz", "6 alma", "60 g kristálycukor", "1 teáskanál őrölt fahéj", "1 evőkanál citromlé", "1 csipet só"],
        lepesek: ["A lisztet elmorzsold a hideg vajjal, add hozzá a porcukrot, tojássárgáját és annyi hideg vizet, hogy összeálljon.", "Fóliázd, 30 percre tedd hűtőbe.", "Az almát hámozd, szeleteld, forgasd össze cukorral, fahéjjal, citromlével és sóval.", "Nyújtsd ki a tésztát, bélelj vele egy 24 cm-es formát, szúrkáld meg villával.", "Öntsd rá az almát, a maradék tésztából rácsot vagy morzsát készíts.", "Süsd 200 fokon 15 percig, majd 180 fokon 25–30 percig.", "Tálalás előtt 10 percig pihentesd."]
    },
    tiramisu: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/dc7cf324007a.jpg",
        cim: "☕ Tiramisu",
        leiras: "Itáliai klasszikus: réteges kávé, mascarpone és kakaópor, kb. 8 szelet.",
        hozzavalok: ["250 g mascarpone", "3 nagy tojás", "80 g porcukor", "300 ml erős espresso (kihűtve)", "2 evőkanál amaretto (elhagyható)", "200 g babapiskóta", "kakaópor a szóráshoz", "1 csipet só"],
        lepesek: ["Válaszd szét a tojásokat, a sárgáját verd habosra a porcukorral.", "Keverd simára a mascarponeval.", "A fehérjét a sóval verd kemény habbá, forgasd óvatosan a krémbe.", "Az espressót keverd el az amarettóval egy mély tálban.", "Mártsd a piskótát 1–2 másodpercre a kávéba, fektesd az aljára egy 20×20 cm-es formának.", "Kend rá a krém felét, majd újabb piskótaréteg és a maradék krém.", "Legalább 4 órára tedd hűtőbe, tálalás előtt szórd meg kakaóporral."]
    },
    sargarepa: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a643f0185ac7.jpg",
        cim: "🥕 Sárgarépás süti",
        leiras: "Bársonyos, nedves tészta reszelt sárgarépával, krémes cukormázzal, kb. 10 szelet.",
        hozzavalok: ["200 g finomliszt", "1 teáskanál sütőpor", "1 teáskanál őrölt fahéj", "½ teáskanál őrölt gyömbér", "150 g kristálycukor", "120 ml napraforgóolaj", "2 nagy tojás", "200 g reszelt sárgarépa", "150 g krémsajt", "60 g porcukor", "1 teáskanál vaníliás cukor"],
        lepesek: ["Melegítsd elő a sütőt 175 fokra, bélelj ki egy 20×30 cm-es formát.", "Keverd össze a lisztet, sütőport, fahéjat és gyömbért.", "Verd fel a tojásokat a cukorral és olajjal.", "Forgasd a száraz keveréket a nedvesbe, végül keverd bele a reszelt sárgarépát.", "Süsd 30–35 percig, míg a tűpróba tiszta lesz.", "Teljesen hűtsd ki.", "Keverd simára a krémsajtot a porcukorral és vaníliás cukorral, kend meg a tetejét."]
    },
    meggyespite: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/146fc2779530.jpg",
        cim: "🍒 Meggyes pite",
        leiras: "Könnyed, gyümölcsös nyári kedvenc tejszínhabbal, kb. 8 szelet.",
        hozzavalok: ["250 g finomliszt", "120 g hideg vaj", "50 g porcukor", "1 tojás", "1 evőkanál hideg tej", "500 g kimagozott meggy", "100 g kristálycukor", "2 evőkanál étkezési keményítő", "1 csipet őrölt fahéj", "2 evőkanál zsemlemorzsa"],
        lepesek: ["A lisztet morzsold össze a hideg vajjal és a porcukorral.", "Add hozzá a tojást és tejet, gyorsan gyúrd össze, 30 percre tedd hűtőbe.", "A meggyet forgasd össze a cukorral, keményítővel és fahéjjal.", "A tészta kétharmadát nyújtsd ki, bélelj vele egy 24 cm-es formát, szúrkáld meg.", "Szórd meg zsemlemorzsával, rá a meggy.", "A maradék tésztát reszeld vagy nyújtsd rá rácsnak.", "Süsd 180 fokon 40–45 percig, míg a tészta aranybarna lesz.", "Hűtsd ki a formában, hidegen szeleteld."]
    },
    banankenyer: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/8e605d96438d.jpg",
        cim: "🍌 Banános kenyér",
        leiras: "Puha, nedves, reggeli kávéhoz vagy uzsonnára is tökéletes, kb. 10 szelet.",
        hozzavalok: ["3 érett banán", "100 g olvasztott vaj", "100 g barna cukor", "2 nagy tojás", "1 teáskanál vaníliás cukor", "180 g finomliszt", "1 teáskanál sütőpor", "½ teáskanál szódabikarbóna", "1 csipet só", "50 g darált dió (elhagyható)"],
        lepesek: ["Melegítsd elő a sütőt 170 fokra, bélelj ki egy 22 cm-es hosszúkás formát.", "Keverd össze az áttört banánt az olvasztott vajjal és a cukorral.", "Add hozzá a tojásokat és a vaníliás cukrot.", "Forgasd bele a lisztet, sütőport, szódabikarbónát, sót és a diót.", "Ne keverd túl – épp hogy egyben van.", "Öntsd a formába, süsd 50–60 percig, míg a tű tiszta lesz.", "10 percig a formában hűljön, majd rácsra.", "Másnap a legfinomabb vajjal vagy krémsajttal."]
    },
    fank: {
        kep: "https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/7947174be07b.jpg",
        cim: "🍩 Klasszikus fánk",
        leiras: "Puha, kelt tészta lekváros töltelékkel, farsangi kedvenc, kb. 12 darab.",
        hozzavalok: ["500 g finomliszt", "250 ml langyos tej", "50 g cukor", "25 g friss élesztő", "2 tojássárgája", "50 g olvasztott vaj", "1 csipet só", "1 teáskanál rumaroma", "1 l olaj a sütéshez", "lekvár a töltéshez", "porcukor a szóráshoz"],
        lepesek: ["Csinálj kovászt az élesztőből, langyos tejből és egy csipet cukorból – 10 percig habosodik.", "A lisztet keverd el a cukorral és sóval, add hozzá a tojássárgáját, kovászt, olvasztott vajat és rumaromát.", "Dolgozd sima tésztává, 1 órán át kelni hagyd a duplájára.", "Nyújtsd ki 1 cm vastagra, szúrj ki 8–10 cm-es köröket, hagyj 30 percet pihenni.", "Melegítsd az olajat 160–170 fokra.", "Süsd a fánkokat oldalanként 2–3 percig, papírtörlőre szedd.", "Ha kihűltek, töltsd meg lekvárral.", "Szórd meg porcukorral, frissen a legfinomabb."]
    }

};

/* Saját recept megjelenítése */
function receptMutat(kulcs) {
    const recept = receptek[kulcs];
    if (!recept) return;

    // Kep beallitasa (ha van kep a receptben)
    const recipeImg = document.getElementById("recipe-image");
    if (recept.kep) {
        recipeImg.src = recept.kep;
        recipeImg.alt = recept.cim.replace(/^\S+\s*/, "");
        recipeImg.hidden = false;
    } else {
        recipeImg.hidden = true;
    }

    document.getElementById("recipe-title").textContent = recept.cim;
    document.getElementById("recipe-text").textContent = recept.leiras;

    const hozzavalok = document.getElementById("ingredients");
    const lepesek = document.getElementById("lepesek");
    hozzavalok.innerHTML = "";
    lepesek.innerHTML = "";

    recept.hozzavalok.forEach(function (elem) {
        const li = document.createElement("li");
        li.textContent = elem;
        hozzavalok.appendChild(li);
    });

    recept.lepesek.forEach(function (elem) {
        const li = document.createElement("li");
        li.textContent = elem;
        lepesek.appendChild(li);
    });

    document.getElementById("result").textContent = "";
    oldalValtas("recept");
}

/* 3. Egyszerű adagkalkulátor */
function adagolas() {
    const adag = Number(prompt("Hány adagot szeretnél? Az alaprecept 4 adag."));

    if (!Number.isFinite(adag) || adag <= 0) {
        document.getElementById("result").textContent = "Kérlek, adj meg egy pozitív számot!";
        return;
    }

    const liszt = Math.round(200 * adag / 4);
    const cukor = Math.round(100 * adag / 4);
    const tej = Math.round(100 * adag / 4);

    document.getElementById("result").textContent =
        "A muffin alaprecepthez körülbelül " + liszt + " g liszt, " +
        cukor + " g cukor és " + tej + " ml tej szükséges.";
}

/* 4. TheMealDB API
   A tesztkulcs tanulási és fejlesztési célra használható.
   Keresés: search.php | Desszertek listája: filter.php | Részletes recept: lookup.php */
const API_ALAP = "https://www.themealdb.com/api/json/v1/1/";
const apiCards = document.getElementById("api-cards");
const apiStatus = document.getElementById("api-status");
const apiRecipe = document.getElementById("api-recipe");

function apiUzenet(szoveg) {
    apiStatus.textContent = szoveg;
}

function kartyakMegjelenitese(etelek) {
    apiCards.innerHTML = "";
    apiRecipe.hidden = true;
    apiRecipe.innerHTML = "";

    if (!etelek || etelek.length === 0) {
        apiUzenet("Sajnos nem találtam ilyen desszertet. Próbálj másik keresőszót!");
        return;
    }

    apiUzenet("Találatok: " + etelek.length + " recept.");
    etelek.forEach(function (etel) {
        const kartya = document.createElement("article");
        kartya.className = "card api-card";

        const kep = document.createElement("img");
        kep.src = etel.strMealThumb;
        kep.alt = etel.strMeal;
        kep.loading = "lazy";

        const cim = document.createElement("h3");
        cim.textContent = etel.strMeal;

        const gomb = document.createElement("button");
        gomb.type = "button";
        gomb.textContent = "Recept megnyitása";
        gomb.addEventListener("click", function () {
            receptBetoltes(etel.idMeal);
        });

        kartya.appendChild(kep);
        kartya.appendChild(cim);
        kartya.appendChild(gomb);
        apiCards.appendChild(kartya);
    });
}

async function desszertekBetoltese() {
    apiUzenet("Desszertek betöltése...");
    apiCards.innerHTML = "";

    try {
        const valasz = await fetch(API_ALAP + "filter.php?c=Dessert");
        if (!valasz.ok) throw new Error("A szerver nem válaszolt megfelelően.");
        const adat = await valasz.json();
        kartyakMegjelenitese(adat.meals);
    } catch (hiba) {
        apiUzenet("Nem sikerült betölteni a recepteket. Ellenőrizd az internetkapcsolatot, majd próbáld újra!");
        console.error("TheMealDB API hiba:", hiba);
    }
}

async function receptekKeresese(keresettSzo) {
    const keres = keresettSzo.trim();
    if (keres === "") {
        apiUzenet("Írj be egy keresőszót!");
        return;
    }

    apiUzenet("Keresés folyamatban...");
    apiCards.innerHTML = "";
    apiRecipe.hidden = true;

    try {
        const valasz = await fetch(API_ALAP + "search.php?s=" + encodeURIComponent(keres));
        if (!valasz.ok) throw new Error("A szerver nem válaszolt megfelelően.");
        const adat = await valasz.json();
        kartyakMegjelenitese(adat.meals);
    } catch (hiba) {
        apiUzenet("A keresés most nem sikerült. Próbáld újra később!");
        console.error("TheMealDB keresési hiba:", hiba);
    }
}

async function receptBetoltes(azonosito) {
    apiUzenet("A recept részleteinek betöltése...");
    apiRecipe.hidden = true;

    try {
        const valasz = await fetch(API_ALAP + "lookup.php?i=" + encodeURIComponent(azonosito));
        if (!valasz.ok) throw new Error("A szerver nem válaszolt megfelelően.");
        const adat = await valasz.json();
        const etel = adat.meals && adat.meals[0];

        if (!etel) {
            apiUzenet("Ehhez a recepthez most nem érhető el részletes adat.");
            return;
        }

        apiRecipe.innerHTML = "";

        const cim = document.createElement("h2");
        cim.textContent = etel.strMeal;

        const kep = document.createElement("img");
        kep.src = etel.strMealThumb;
        kep.alt = etel.strMeal;

        const leiras = document.createElement("p");
        leiras.textContent = [etel.strCategory, etel.strArea].filter(Boolean).join(" · ");

        const hozzavaloCim = document.createElement("h3");
        hozzavaloCim.textContent = "Hozzávalók";

        const hozzavalok = document.createElement("ul");
        for (let i = 1; i <= 20; i++) {
            const hozzavalo = etel["strIngredient" + i];
            const mennyiseg = etel["strMeasure" + i];
            if (hozzavalo && hozzavalo.trim() !== "") {
                const li = document.createElement("li");
                li.textContent = ((mennyiseg || "").trim() + " " + hozzavalo).trim();
                hozzavalok.appendChild(li);
            }
        }

        const elkeszitesCim = document.createElement("h3");
        elkeszitesCim.textContent = "Elkészítés";

        const elkeszites = document.createElement("p");
        elkeszites.textContent = etel.strInstructions || "Ehhez a recepthez nincs megadva elkészítési leírás.";

        const vissza = document.createElement("button");
        vissza.type = "button";
        vissza.className = "button back-button";
        vissza.textContent = "Vissza a desszertekhez";
        vissza.addEventListener("click", function () {
            apiRecipe.hidden = true;
            apiCards.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        apiRecipe.appendChild(cim);
        apiRecipe.appendChild(kep);
        apiRecipe.appendChild(leiras);
        apiRecipe.appendChild(hozzavaloCim);
        apiRecipe.appendChild(hozzavalok);
        apiRecipe.appendChild(elkeszitesCim);
        apiRecipe.appendChild(elkeszites);
        apiRecipe.appendChild(vissza);
        apiRecipe.hidden = false;
        apiUzenet("A kiválasztott recept betöltődött.");
        apiRecipe.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (hiba) {
        apiUzenet("A recept betöltése nem sikerült. Próbáld újra később!");
        console.error("TheMealDB recept hiba:", hiba);
    }
}

/* Keresőmező és gombok eseményei */
document.getElementById("search-form").addEventListener("submit", function (esemeny) {
    esemeny.preventDefault();
    receptekKeresese(document.getElementById("recipe-search").value);
});

document.getElementById("show-desserts").addEventListener("click", desszertekBetoltese);

/* Induláskor az első saját recept és az API desszertjei töltődnek be. */
receptMutat("muffin");
oldalValtas("fooldal");
desszertekBetoltese();

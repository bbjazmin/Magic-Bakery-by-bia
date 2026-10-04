/* =========================================================
   1. OLDALVÁLTÓ
   Egyszerre csak az látszik, aminek .lathato osztálya van. */
function oldalValtas(id) {

    /* Minden oldalról leveszük a .lathato osztályt → mind eltűnik */
    document.querySelectorAll(".oldal").forEach(function (o) {
        o.classList.remove("lathato");
    });

    /* A kért oldal megjelenik */
    document.getElementById(id).classList.add("lathato");

    /* Menüben a nyomott gomb lesz rózsaszín */
    document.querySelectorAll(".nav-gomb").forEach(function (g) {
        g.classList.toggle("aktiv", g.dataset.oldal === id);
    });

    window.scrollTo(0, 0);  /* felülre ugrik */
}


/* =========================================================
   2. RECEPTEK – leírás, hozzávalók, lépések */
const receptek = {
    muffin: {
        cim: "🧁 Vaníliás muffin",
        leiras: "Puha és illatos muffin, kb. 12 darab. Kezdőknek is tuti sikerül!",
        hozzavalok: [
            "200 g finomliszt",
            "100 g kristálycukor",
            "1 csomag sütőpor",
            "1 csomag vaníliás cukor",
            "1 csipet só",
            "1 nagy tojás",
            "100 ml tej",
            "80 ml napraforgóolaj"
        ],
        lepesek: [
            "Melegítsd elő a sütőt 180 fokra, tegyél 12 papírkapszlit a muffinformába.",
            "Keverd össze a száraz hozzávalókat: liszt, cukor, sütőpor, vaníliás cukor, só.",
            "Egy másik tálban verd fel a tojást, keverd hozzá a tejet és az olajat.",
            "Öntsd össze a kettőt, és keverd ÉPPE CSAK össze – a túlkeverés rágóssá teszi!",
            "Töltsd a kapszlikat kétharmadig, süsd 20–25 percig. Tűpróba: tiszta tű = kész.",
            "Zárható dobozban 2–3 napig puha marad."
        ]
    },
    torta: {
        cim: "🍓 Epres torta",
        leiras: "Könnyű piskóta friss eperrel és tejszínes krémmel, kb. 8 szelet.",
        hozzavalok: [
            "A piskótához:",
            "4 nagy tojás",
            "120 g kristálycukor",
            "120 g finomliszt",
            "1 csomag sütőpor",
            "A krémhez:",
            "300 ml habtejszín (jól lehűtve)",
            "2 evőkanál porcukor",
            "250 g friss eper"
        ],
        lepesek: [
            "Melegítsd elő a sütőt 180 fokra, bélel ki egy 22–24 cm-es formát.",
            "Verd fel a tojásokat a cukorral 5–6 percig, míg világos és habos.",
            "Szitáld rá a lisztet a sütőporral, forgasd óvatosan bele.",
            "Süsd 30–35 percig. Közben NE nyisd ki a sütőt, mert összeeshet!",
            "Verd fel a tejszínt a porcukorral kemény habbá.",
            "Vágd ketté a piskótát, alsó lapra krém + eper, rá a felső lap.",
            "Kend be a tetejét, díszítsd eperrel, legalább 2 órára hűtőbe."
        ]
    },
    keksz: {
        cim: "🍪 Csokis keksz",
        leiras: "Ropogós szélű, belül puha keksz, kb. 20 darab.",
        hozzavalok: [
            "200 g finomliszt",
            "100 g vaj (szobahőmérsékletű)",
            "100 g barna cukor",
            "1 nagy tojás",
            "100 g étcsokoládé, kockára vágva",
            "1 teáskanál sütőpor",
            "1 csipet só"
        ],
        lepesek: [
            "Melegítsd elő a sütőt 180 fokra, teríts sütőpapírt a tálcára.",
            "Verd fel a vajat a cukorral 3–4 percig, míg krémes.",
            "Add hozzá a tojást, keverd simára.",
            "Forgasd bele a lisztet, sütőport, sót, végül a csokikockákat.",
            "Golyózz, hagyj köztük 5 cm-t, mert szétterülnek.",
            "Süsd 12–14 percig: a széle aranybarna, a közepe még puhább.",
            "A tálcán 10 percig hűljön, utána rácsra."
        ]
    },
    cheesecake: {
        cim: "🫐 Áfonyás cheesecake",
        leiras: "Krémes sajttorta áfonyával, ropogós kekeszalappal, kb. 8 szelet.",
        hozzavalok: [
            "Az alaphoz:",
            "200 g darált keksz",
            "80 g olvasztott vaj",
            "A krémhez:",
            "400 g krémsajt",
            "120 g kristálycukor",
            "2 nagy tojás",
            "200 g tejföl",
            "150 g áfonya a tetejére"
        ],
        lepesek: [
            "Melegítsd elő a sütőt 160 fokra. Keverd el a kekszet a vajjal.",
            "Nyomkodsd a forma aljára (egy pohár aljával a legegyenletesebb).",
            "Elősd 8–10 percig, majd hűtsd ki.",
            "A krémsajtot keverd simára a cukorral, egyenként add hozzá a tojásokat, végül a tejfölt.",
            "Öntsd az alapra, szórd rá az áfonyát.",
            "Süsd 50–60 percig: a széle megáll, a közepe kicsit remegjen.",
            "Kikapcsolt sütőben, résre nyitott ajtóval 1 órán át hűljön – így nem reped meg.",
            "Éjjelre hűtőbe, másnap szeletelhető."
        ]
    },
    brownie: {
        cim: "🍫 Mogyorós brownie",
        leiras: "Sűrű, csokis, diós – 16 kocka a csokirajongóknak.",
        hozzavalok: [
            "200 g étcsokoládé (min. 60%-os)",
            "150 g vaj",
            "150 g kristálycukor",
            "3 nagy tojás",
            "90 g finomliszt",
            "80 g darált dió",
            "1 csipet só"
        ],
        lepesek: [
            "Melegítsd elő a sütőt 180 fokra, bélel ki egy 20×20 cm-es formát.",
            "Olvaszd fel a csokit a vajjal, keverd simára, hagyd langyosodni.",
            "Keverd hozzá a cukrot, majd egyenként a tojásokat.",
            "Forgasd bele a lisztet, a diót és a sót – ne keverd túl!",
            "Süsd 25–30 percig: a tű kicsit RAGADJON – ez a jó brownie.",
            "Teljesen hűlve vágd 16 kockára."
        ]
    },
    citrompite: {
        cim: "🍋 Citromos pite",
        leiras: "Friss, savanykás citromkrém omlós tésztában, kb. 6 szelet.",
        hozzavalok: [
            "1 tekercs hűtött pitéstészta",
            "120 ml frissen facsart citromlé (kb. 3 citrom)",
            "1 citrom reszelt héja",
            "150 g kristálycukor",
            "3 nagy tojás",
            "200 ml tejszín"
        ],
        lepesek: [
            "Melegítsd elő a sütőt 175 fokra, kend ki a formát a tésztával.",
            "Villával szúrkáld meg a tészta alját, hogy ne púposodjon.",
            "Keverd össze: citromlé, héj, cukor, tojás, tejszín.",
            "Szűrd át szitán, öntsd a tésztára.",
            "Süsd 35–40 percig: a közepe remegjen, mint a puding.",
            "Legalább 3 órára hűtőbe, porcukorral tálalva a legjobb."
        ]
    },
    macaron: {
        cim: "🌸 Málnás macaron",
        leiras: "Francia finomság: omlós, rózsaszín, málnás krémmel, kb. 20 darab.",
        hozzavalok: [
            "100 g mandulaliszt",
            "100 g porcukor",
            "80 g tojásfehérje",
            "75 g finom kristálycukor",
            "1 csipet só",
            "100 g málnalekvár a töltéshez"
        ],
        lepesek: [
            "Szitáld kétszer át a mandulalisztet a porcukorral.",
            "Verd keményre a fehérjét a sóval, közben fokozatosan add hozzá a cukrot.",
            "Forgasd össze a kettőt lapátolva – a massza lávásan folyjon le a lapátról.",
            "Nyomj 3–4 cm-es korongokat sütőpapírra.",
            "Üsd meg a tálcát az asztalon, pihentesd 30–60 percig.",
            "Süsd 150 fokon 13–14 percig, kihűlve válaszd le.",
            "Párosítsd, töltsd lekvárral, éjjelre hűtőbe."
        ]
    },
    kokuszgolyo: {
        cim: "🥥 Kókuszgolyó",
        leiras: "Kakaós, kókuszos, elronthatatlan klasszikus, kb. 18 darab.",
        hozzavalok: [
            "250 g darált keksz",
            "100 g vaj",
            "100 g porcukor",
            "1 evőkanál kakaópor",
            "50 ml tej",
            "100 g kókuszreszelék a forgatáshoz"
        ],
        lepesek: [
            "Keverd össze a kekszet, porcukrot, kakaót.",
            "Add hozzá a vajat és a tejet, gyúrd kézzel összefüggő masszává.",
            "Ha túl lágy, 15 percre tedd hűtőbe.",
            "Golyózz, forgasd kókuszreszelékbe.",
            "Legalább 1 órára hűtőbe – egy hétig eláll!"
        ]
    },
    csiga: {
        cim: "🥮 Fahéjas csiga",
        leiras: "Meleg, puha tekercs fahéjas örvénnyel, kb. 12 darab.",
        hozzavalok: [
            "A tésztához:",
            "500 g finomliszt",
            "250 ml langyos tej",
            "50 g vaj",
            "50 g kristálycukor",
            "1 tojássárgája",
            "1 csomag száraz élesztő",
            "A töltelékhez:",
            "80 g puha vaj",
            "100 g barna cukor",
            "2 teáskanál őrölt fahéj"
        ],
        lepesek: [
            "Csinálj kovászt az élesztőből, langyos tejből, csipet cukorból – 10 percig habosodik.",
            "Gyúrd össze a tésztát minden hozzávalóval, 1 órán át kelni hagyni.",
            "Nyújtsd 40×30 cm-es téglalappá, kend meg vajjal, szórd meg fahéjas cukorral.",
            "Tekerd fel, vágj 12 csigát.",
            "Hagyd még 30 percet kelni, süsd 180 fokon 20–25 percig.",
            "Frissen, melegen a legjobb!"
        ]
    }
};


/* Recept betöltése + átváltás a Recept oldalra */
function receptMutat(kulcs) {
    const r = receptek[kulcs];

    document.getElementById("recipe-title").innerHTML = r.cim;
    document.getElementById("recipe-text").innerHTML = r.leiras;

    /* Hozzávalók kiírása: sima ciklussal minden hozzávalóból
       egy <li> sort fűzünk a lista szövegéhez */
    let hozzavaloLista = "";
    for (let i = 0; i < r.hozzavalok.length; i++) {
        hozzavaloLista = hozzavaloLista + "<li>" + r.hozzavalok[i] + "</li>";
    }
    document.getElementById("ingredients").innerHTML = hozzavaloLista;

    /* Lépések kiírása ugyanígy */
    let lepesLista = "";
    for (let i = 0; i < r.lepesek.length; i++) {
        lepesLista = lepesLista + "<li>" + r.lepesek[i] + "</li>";
    }
    document.getElementById("lepesek").innerHTML = lepesLista;

    document.getElementById("result").innerHTML = "";

    oldalValtas("recept");
}


/* =========================================================
   3. ADAGKALKULÁTOR
   A prompt mindig SZÖVEGET ad vissza → Number() kell! */
function adagolas() {
    let adag = prompt("Hány adagot szeretnél? (Az alaprecept 4 adag.)");

    if (adag === null) return;  /* Mégse gomb → kilépés */

    adag = Number(adag);

    if (isNaN(adag) || adag <= 0) {
        document.getElementById("result").innerHTML = "Kérlek, adj meg egy pozitív számot!";
    } else {
        /* Arányszámítás: alap × (kért adag / 4), Math.round = kerekítés */
        let liszt = Math.round(200 * adag / 4);
        let cukor = Math.round(100 * adag / 4);
        let tej = Math.round(100 * adag / 4);

        document.getElementById("result").innerHTML =
            "Ehhez körülbelül " + liszt + " g liszt, " + cukor + " g cukor és " + tej + " ml tej szükséges.";
    }
}
/* ==„Miért volt üres a recept oldal?"
Mert a listák tartalmát JavaScript tölti fel (dinamikusan), HTML-ben üresek voltak,
 és induláskor senki nem hívta meg a betöltő függvényt.
 A javítás: oldalbetöltéskor egyszer meghívjuk a receptBetoltes("muffin")-t.======*/
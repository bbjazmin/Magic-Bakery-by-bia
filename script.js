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
const TARTALEK_KEP = "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg";

const receptek = {
    muffin: {
        cim: "🧁 Vaníliás muffin",
        kep: "https://www.themealdb.com/images/media/meals/xrpttr1483909204.jpg",
        leiras: "Puha és illatos muffin, körülbelül 12 darab.",
        hozzavalok: ["200 g finomliszt", "100 g cukor", "1 csomag sütőpor", "1 csomag vaníliás cukor", "1 tojás", "100 ml tej", "80 ml olaj", "1 csipet só"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Keverd össze a száraz hozzávalókat.", "Egy másik tálban keverd össze a tojást, a tejet és az olajat.", "Öntsd össze a két keveréket, és óvatosan keverd el.", "Töltsd a masszát muffinpapírokba, majd süsd 20–25 percig."]
    },
    torta: {
        cim: "🍓 Epres torta",
        kep: "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
        leiras: "Könnyű piskóta friss eperrel és tejszínes krémmel.",
        hozzavalok: ["4 tojás", "120 g cukor", "120 g liszt", "1 teáskanál sütőpor", "300 ml habtejszín", "2 evőkanál porcukor", "250 g eper"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Verd habosra a tojásokat a cukorral.", "Forgasd bele a lisztet és a sütőport.", "Süsd a piskótát 30–35 percig, majd hagyd kihűlni.", "Verd fel a tejszínt, töltsd meg vele a piskótát, és díszítsd eperrel."]
    },
    keksz: {
        cim: "🍪 Csokis keksz",
        kep: "https://www.themealdb.com/images/media/meals/ussyxw1515364536.jpg",
        leiras: "Ropogós szélű, belül puha, csokidarabkás keksz.",
        hozzavalok: ["200 g liszt", "100 g vaj", "100 g barna cukor", "1 tojás", "100 g étcsokoládé", "1 teáskanál sütőpor", "1 csipet só"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Keverd habosra a vajat a cukorral.", "Add hozzá a tojást.", "Forgasd bele a lisztet, a sütőport, a sót és a csokit.", "Formázz kis golyókat, majd süsd 12–14 percig."]
    },
    cheesecake: {
        cim: "🫐 Áfonyás cheesecake",
        kep: "https://www.themealdb.com/images/media/meals/iciiww1511286810.jpg",
        leiras: "Krémes sajttorta áfonyával és ropogós keksszalappal.",
        hozzavalok: ["200 g darált keksz", "80 g olvasztott vaj", "400 g krémsajt", "120 g cukor", "2 tojás", "200 g tejföl", "150 g áfonya"],
        lepesek: ["Keverd össze a darált kekszet az olvasztott vajjal.", "Nyomkodd a keveréket egy tortaforma aljára.", "Keverd simára a krémsajtot a cukorral, majd add hozzá a tojásokat és a tejfölt.", "Öntsd a krémet a kekszes alapra, és szórd rá az áfonyát.", "Süsd 160 fokon körülbelül 50 percig, majd hűtsd le."]
    },
    brownie: {
        cim: "🍫 Mogyorós brownie",
        kep: "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
        leiras: "Sűrű, csokis brownie dióval.",
        hozzavalok: ["200 g étcsokoládé", "150 g vaj", "150 g cukor", "3 tojás", "90 g liszt", "80 g darált dió", "1 csipet só"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Olvaszd fel a csokoládét a vajjal.", "Keverd hozzá a cukrot és a tojásokat.", "Forgasd bele a lisztet, a diót és a sót.", "Süsd 25–30 percig, majd hagyd kihűlni."]
    },
    citrompite: {
        cim: "🍋 Citromos pite",
        kep: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
        leiras: "Friss, savanykás citromkrém omlós tésztában.",
        hozzavalok: ["1 adag pitetészta", "120 ml citromlé", "1 citrom reszelt héja", "150 g cukor", "3 tojás", "200 ml tejszín"],
        lepesek: ["Melegítsd elő a sütőt 175 fokra.", "Helyezd a tésztát a piteformába, és szurkáld meg villával.", "Keverd össze a citromlevet, a héjat, a cukrot, a tojásokat és a tejszínt.", "Öntsd a krémet a tésztára.", "Süsd 35–40 percig, majd hűtsd le."]
    },
    macaron: {
        cim: "🌸 Málnás macaron",
        kep: "https://www.themealdb.com/images/media/meals/qtuwxu1468233098.jpg",
        leiras: "Francia mandulás édesség málnás töltelékkel.",
        hozzavalok: ["100 g mandulaliszt", "100 g porcukor", "80 g tojásfehérje", "75 g kristálycukor", "100 g málnalekvár"],
        lepesek: ["Szitáld össze a mandulalisztet és a porcukrot.", "Verd kemény habbá a tojásfehérjét a cukorral.", "Óvatosan forgasd össze a két keveréket.", "Nyomj kis korongokat sütőpapírra, és hagyd pihenni.", "Süsd 150 fokon 13–14 percig, majd kihűlés után töltsd meg lekvárral."]
    },
    kokuszgolyo: {
        cim: "🥥 Kókuszgolyó",
        kep: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
        leiras: "Kakaós, kókuszos, egyszerűen elkészíthető klasszikus.",
        hozzavalok: ["250 g darált keksz", "100 g vaj", "100 g porcukor", "1 evőkanál kakaópor", "50 ml tej", "100 g kókuszreszelék"],
        lepesek: ["Keverd össze a darált kekszet, a porcukrot és a kakaót.", "Add hozzá a vajat és a tejet.", "Gyúrd össze a masszát.", "Formázz golyókat, majd forgasd meg őket kókuszreszelékben.", "Tedd hűtőbe legalább egy órára."]
    },
    csiga: {
        cim: "🥮 Fahéjas csiga",
        kep: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        leiras: "Puha kelt tészta fahéjas-cukros töltelékkel.",
        hozzavalok: ["500 g liszt", "250 ml langyos tej", "50 g vaj", "50 g cukor", "1 tojássárgája", "1 csomag élesztő", "80 g vaj a töltelékhez", "100 g barna cukor", "2 teáskanál fahéj"],
        lepesek: ["Futtasd fel az élesztőt a langyos tejben.", "Gyúrd össze a tészta hozzávalóit, majd keleszd egy órán át.", "Nyújtsd ki, kend meg vajjal, és szórd meg fahéjas cukorral.", "Tekerd fel, majd vágd szeletekre.", "Keleszd még 30 percig, és süsd 180 fokon 20–25 percig."]
    },
    palacsinta: {
        cim: "🥞 Amerikai palacsinta",
        kep: "https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg",
        leiras: "Vastag, puha amerikai palacsinta reggelire vagy desszertnek.",
        hozzavalok: ["200 g liszt", "2 evőkanál cukor", "1 csomag sütőpor", "1 csipet só", "2 tojás", "250 ml tej", "40 g olvasztott vaj"],
        lepesek: ["Keverd össze a lisztet, a cukrot, a sütőport és a sót.", "Add hozzá a tojásokat, a tejet és az olvasztott vajat, majd keverd csomómentesre.", "Melegíts fel egy kevés zsiradékot serpenyőben közepes lángon.", "Süss kisebb korongokat mindkét oldalukon aranybarnára."]
    },
    gofri: {
        cim: "🧇 Belga gofri",
        kep: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg",
        leiras: "Kívül ropogós, belül levegős gofri gyümölccsel vagy porcukorral.",
        hozzavalok: ["250 g liszt", "2 teáskanál sütőpor", "60 g cukor", "1 csomag vaníliás cukor", "2 tojás", "300 ml tej", "80 g olvasztott vaj", "1 csipet só"],
        lepesek: ["Melegítsd elő a gofrisütőt.", "Keverd össze a száraz hozzávalókat, majd add hozzá a tojásokat, a tejet és a vajat.", "Keverd sima tésztává.", "Süsd a tésztát a sütőben aranybarnára körülbelül 4–5 percig."]
    },
    tiramisu: {
        cim: "☕ Tiramisu",
        kep: "https://www.themealdb.com/images/media/meals/yuwtvq1511387580.jpg",
        leiras: "Olasz kávés-mascarponés desszert babapiskótával és kakaóval.",
        hozzavalok: ["500 g mascarpone", "3 tojás", "100 g porcukor", "200 g babapiskóta", "2 dl főzött kávé", "2 evőkanál kakaópor"],
        lepesek: ["Keverd habosra a tojássárgáját a porcukorral, majd forgasd bele a mascarponét.", "Mártsd a babapiskótákat röviden a kihűlt kávéba, és rakd ki velük a tál alját.", "Kenj rá egy réteg krémet, majd ismételd meg a rétegezést.", "Szórd meg a tetejét kakaóporral, és tedd hűtőbe legalább 3 órára."]
    },
    almspite: {
        cim: "🍏 Almás pite",
        kep: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
        leiras: "Fahéjas, reszelt almás töltelék omlós tésztában.",
        hozzavalok: ["300 g liszt", "150 g hideg vaj", "80 g porcukor", "1 tojás", "600 g alma", "2 evőkanál cukor", "1 teáskanál fahéj"],
        lepesek: ["Gyúrj omlós tésztát a lisztből, a vajból, a porcukorból és a tojásból, majd pihentesd 30 percig.", "Reszeld le az almát, és párold meg a cukorral és a fahéjjal, majd hűtsd ki.", "Nyújtsd ki a tészta kétharmadát, tedd a formába, és kanalazd rá az almát.", "Fedd be a maradék tésztával, és süsd 180 fokon 35–40 percig."]
    },
    meggylep: {
        cim: "🍒 Meggyes pite",
        kep: "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
        leiras: "Savanykás meggyes töltelékű, gyorsan elkészíthető sütemény.",
        hozzavalok: ["250 g liszt", "120 g vaj", "100 g cukor", "1 csomag sütőpor", "2 tojás", "300 g magozott meggy"],
        lepesek: ["Melegítsd elő a sütőt 180 fokra.", "Keverd össze a vajat a cukorral és a tojásokkal.", "Forgasd bele a sütőporos lisztet, majd simítsd a masszát sütőpapíros tepsibe.", "Szórd a tetejére a meggyet, és süsd 30–35 percig."]
    },
    zserbo: {
        cim: "🌰 Zserbó",
        kep: "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
        leiras: "Hagyományos diós és baracklekváros réteges sütemény csokimázzal.",
        hozzavalok: ["500 g liszt", "200 g vaj", "50 g porcukor", "1 csomag élesztő", "1 dl tej", "200 g darált dió", "150 g cukor", "300 g baracklekvár", "150 g étcsokoládé"],
        lepesek: ["Futtasd fel az élesztőt a langyos tejben, majd gyúrd össze a tésztát a liszttel, a vajjal és a porcukorral.", "Oszd a tésztát három részre, és nyújtsd ki őket.", "Rétegezd a lapokat baracklekvárral és cukros darált dióval.", "Süsd 180 fokon 35–40 percig, majd kihűlés után vond be olvasztott csokoládéval."]
    },
    kakaoscsiga: {
        cim: "🍫 Kakaós csiga",
        kep: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        leiras: "Puha kelt tészta csiga édes kakaós töltelékkel.",
        hozzavalok: ["500 g liszt", "250 ml langyos tej", "60 g vaj", "50 g cukor", "1 csomag élesztő", "4 evőkanál kakaópor", "100 g porcukor", "60 g olvasztott vaj"],
        lepesek: ["Futtasd fel az élesztőt, majd dagaszd meg a tésztát, és keleszd 1 órát.", "Nyújtsd téglalap alakúra, kend meg olvasztott vajjal, és szórd meg a cukros kakaóval.", "Tekerd fel szorosan, és vágd fel csigákra.", "Keleszd még 20 percig, majd süsd 180 fokon 20–25 percig."]
    },
    fank: {
        cim: "🍩 Szalagos fánk",
        kep: "https://www.themealdb.com/images/media/meals/4i5ste1567725894.jpg",
        leiras: "Könnyű, aranybarna fánk lekvárral vagy porcukorral.",
        hozzavalok: ["500 g liszt", "250 ml tej", "60 g vaj", "60 g cukor", "2 tojássárgája", "1 csomag élesztő", "olaj a sütéshez"],
        lepesek: ["Készíts kelt tésztát a hozzávalókból, és keleszd duplájára.", "Nyújtsd körülbelül 1,5 cm vastagra, és szaggass belőle köröket.", "Keleszd még 20 percig, majd süsd bő, forró olajban mindkét oldalán aranybarnára.", "Csepegtesd le papírtörlőn, és szórd meg porcukorral."]
    },
    kremes: {
        cim: "💛 Francia krémes",
        kep: "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
        leiras: "Ropogós leveles tészta vaníliás főzött krémmel és tejszínhabbal.",
        hozzavalok: ["2 csomag leveles tészta", "7 dl tej", "6 tojássárgája", "150 g cukor", "80 g liszt", "1 csomag vaníliás cukor", "300 ml habtejszín"],
        lepesek: ["Süss ki két leveles tésztalapot 200 fokon aranybarnára, majd hűtsd ki.", "Főzz sűrű krémet a tej, a tojássárgája, a cukor, a vaníliás cukor és a liszt összefőzésével.", "Simítsd a kihűlt krémet az egyik tésztalapra, majd rétegezz rá felvert tejszínt.", "Fedd be a másik lappal, és hűtés után szeleteld fel."]
    },
    somloi: {
        cim: "🍮 Somlói galuska",
        kep: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        leiras: "Réteges desszert piskótával, dióval, vaníliakrémrel és csokiöntettel.",
        hozzavalok: ["3 tojásos piskóta", "100 g darált dió", "50 g mazsola", "4 dl tej", "1 csomag vaníliás pudingpor", "2 evőkanál cukor", "100 g étcsokoládé", "200 ml habtejszín"],
        lepesek: ["Készítsd el a piskótát, és hagyd kihűlni.", "Főzd meg a vaníliás krémet a tejjel, a cukorral és a pudingporral.", "Tépkedd darabokra a piskótát, rétegezd dióval, mazsolával és krémmel, majd locsold meg olvasztott csokival.", "Tedd hűtőbe, és tálaláskor díszítsd tejszínhabbal."]
    },
    panacotta: {
        cim: "🍓 Panna cotta",
        kep: "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
        leiras: "Olasz tejszínes desszert gyümölcsöntettel.",
        hozzavalok: ["500 ml habtejszín", "80 g cukor", "1 csomag vaníliás cukor", "3 lap zselatin", "200 g eper vagy málna", "1 evőkanál cukor az öntethez"],
        lepesek: ["Áztasd be a zselatint hideg vízbe néhány percre.", "Melegítsd össze a tejszínt a cukrokkal forráspont közelébe, majd vedd le a tűzről.", "Facsarj ki a zselatinból, és keverd el a meleg tejszínben, majd töltsd poharakba.", "Hűtsd legalább 4 órát, majd tálald a gyümölcsöntettel."]
    },
    madartej: {
        cim: "☁️ Madártej",
        kep: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        leiras: "Klasszikus vaníliás tejkrém könnyű habgaluskákkal.",
        hozzavalok: ["8 dl tej", "4 tojás", "100 g cukor", "1 csomag vaníliás cukor", "1 evőkanál liszt"],
        lepesek: ["Verd kemény habbá a tojásfehérjét a cukor felével, és szaggass belőle galuskákat forró, enyhén gyöngyöző tejben.", "Szedd ki a habgaluskákat egy tálra.", "Keverd össze a tojássárgáját a maradék cukorral, a vaníliás cukorral és a liszttel, majd sűrítsd be a meleg tejjel.", "Öntsd a krémet tálba, és helyezd rá a galuskákat."]
    },
    kardamonos: {
        cim: "🌿 Kardamonos fonott kalács",
        kep: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        leiras: "Illatos, fűszeres kalács reggelire vagy uzsonnára.",
        hozzavalok: ["500 g liszt", "250 ml tej", "70 g vaj", "70 g cukor", "1 teáskanál őrölt kardamom", "1 csomag élesztő", "1 tojás a kenéshez"],
        lepesek: ["Készíts kelt tésztát a lisztből, a tejjel felfuttatott élesztőből, a vajból, a cukorból és a kardamomból.", "Keleszd a tésztát 1 órán át.", "Oszd három részre, fond össze, és tedd sütőpapíros tepsibe.", "Kend meg tojással, és süsd 180 fokon 25–30 percig."]
    },
    turospite: {
        cim: "🧀 Túrós pite",
        kep: "https://www.themealdb.com/images/media/meals/iciiww1511286810.jpg",
        leiras: "Puha, citromhéjas túrótöltelékes pite.",
        hozzavalok: ["300 g liszt", "150 g vaj", "100 g porcukor", "1 csomag sütőpor", "500 g túró", "150 g cukor", "2 tojás", "1 citrom reszelt héja"],
        lepesek: ["Morzsold össze a lisztet, a vajat, a porcukrot és a sütőport.", "Keverd simára a túrót a cukorral, a tojásokkal és a citromhéjjal.", "Rétegezd a tésztát és a túrós tölteléket egy tepsiben úgy, hogy a tetejére tészta kerüljön.", "Süsd 180 fokon 35–40 percig."]
    },
    linzer: {
        cim: "🌺 Linzerkarika",
        kep: "https://www.themealdb.com/images/media/meals/ussyxw1515364536.jpg",
        leiras: "Omlós, lekvárral töltött, porcukorral szórt klasszikus keksz.",
        hozzavalok: ["300 g liszt", "200 g vaj", "100 g porcukor", "1 tojássárgája", "1 csomag vaníliás cukor", "150 g ribizli- vagy eperlekvár"],
        lepesek: ["Gyúrj gyorsan omlós tésztát a hozzávalókból, és pihentesd hűtőben 30 percig.", "Nyújtsd ki vékonyra, és szaggass belőle karikákat, a feléből vágd ki a közepét is.", "Süsd 175 fokon 10–12 percig világosra.", "Ragassz össze két-két darabot lekvárral, és szórd meg porcukorral."]
    },
    rokafark: {
        cim: "🥐 Croissant",
        kep: "https://www.themealdb.com/images/media/meals/1550440197.jpg",
        leiras: "Vajas, leveles péksütemény reggelire.",
        hozzavalok: ["500 g liszt", "250 ml langyos tej", "50 g cukor", "1 csomag élesztő", "1 teáskanál só", "250 g hideg vaj a hajtogatáshoz", "1 tojás a kenéshez"],
        lepesek: ["Készíts tésztát a lisztből, a tejjel felfuttatott élesztőből, a cukorból és a sóból, majd hűtsd le.", "Lapítsd ki a hideg vajat, hajtogasd a tésztába, és pihentesd hűtőben.", "Nyújtsd ki, vágj belőle háromszögeket, és tekerd fel őket kifli formára.", "Keleszd meg, kend meg tojással, és süsd 190 fokon 18–22 percig."]
    },
    piskotatekercs: {
        cim: "🌀 Lekváros piskótatekercs",
        kep: "https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg",
        leiras: "Könnyű piskótalap finom lekvárral feltekerve.",
        hozzavalok: ["4 tojás", "120 g cukor", "120 g liszt", "1 teáskanál sütőpor", "150 g baracklekvár", "porcukor a szóráshoz"],
        lepesek: ["Melegítsd elő a sütőt 190 fokra.", "Verd habosra a tojásokat a cukorral, majd forgasd bele a sütőporos lisztet.", "Simítsd vékony rétegben sütőpapíros tepsibe, és süsd 10–12 percig.", "Fordítsd ki konyharuhára, kend meg lekvárral, tekerd fel, és szórd meg porcukorral."]
    },
    marlenka: {
        cim: "🍯 Mézes krémes",
        kep: "https://www.themealdb.com/images/media/meals/yypvst1511386427.jpg",
        leiras: "Puha, mézes lapok vaníliás-tejfölös vagy pudingos krémmel.",
        hozzavalok: ["450 g liszt", "120 g cukor", "80 g vaj", "3 evőkanál méz", "2 tojás", "1 teáskanál szódabikarbóna", "6 dl tej", "2 csomag vaníliás pudingpor", "150 g vaj a krémbe"],
        lepesek: ["Melegítsd össze a cukrot, a vajat és a mézet, majd add hozzá a tojásokat és a szódabikarbónás lisztet.", "Gyúrd össze, oszd három lapra, és süsd meg őket 180 fokon 8–10 percig.", "Főzz sűrű pudingot a tejjel és a pudingporral, majd hűlés után keverd hozzá a puha vajat.", "Rétegezd a lapokat a krémmel, és hagyd állni egy éjszakát, hogy megpuhuljon."]
    },
    churros: {
        cim: "🥖 Churros",
        kep: "https://www.themealdb.com/images/media/meals/4i5ste1567725894.jpg",
        leiras: "Fahéjas cukorba forgatott, ropogós spanyol édesség.",
        hozzavalok: ["250 ml víz", "60 g vaj", "1 evőkanál cukor", "1 csipet só", "150 g liszt", "2 tojás", "olaj a sütéshez", "3 evőkanál cukor", "1 teáskanál fahéj"],
        lepesek: ["Forrald fel a vizet a vajjal, az evőkanál cukorral és a sóval, majd keverd bele a lisztet.", "Ved le a tűzről, és keverd hozzá egyenként a tojásokat, míg sűrű masszát kapsz.", "Nyomj csíkokat forró olajba, és süsd aranybarnára.", "Forgasd meg a fahéjas cukorban, és azonnal tálald."]
    },
    rizskoch: {
        cim: "🍚 Tejberizs felfújt",
        kep: "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
        leiras: "Krémestől szaftos, sütőben sült vaníliás tejberizs.",
        hozzavalok: ["200 g kerekszemű rizs", "8 dl tej", "80 g cukor", "1 csomag vaníliás cukor", "3 tojás", "40 g vaj"],
        lepesek: ["Főzd puhára a rizst a tejben a vajjal és a vaníliás cukorral, majd hagyd langyosra hűlni.", "Keverd habosra a tojásokat a cukorral, majd forgasd bele a rizsbe.", "Töltsd kivajazott sütőtálba.", "Süsd 180 fokon körülbelül 30–35 percig, míg a teteje szépen megpirul."]
    }
};

let aktualisReceptKulcs = "muffin";

/* Kártyák képeinek beállítása a receptek objektum alapján */
function kartyakKepeinekBeallitasa() {
    document.querySelectorAll("#local-cards .card").forEach(function (kartya) {
        const gomb = kartya.querySelector("button");
        if (!gomb) return;

        const talalat = (gomb.getAttribute("onclick") || "").match(/receptMutat\(['"]([^'"]+)['"]\)/);
        if (!talalat) return;

        const kulcs = talalat[1];
        const recept = receptek[kulcs];
        if (!recept) return;

        const ikonElem = kartya.querySelector(".ikon");
        let kepElem = kartya.querySelector("img.kartya-kep");

        if (!kepElem) {
            kepElem = document.createElement("img");
            kepElem.className = "kartya-kep";
            kepElem.loading = "lazy";
            kepElem.style.width = "100%";
            kepElem.style.height = "150px";
            kepElem.style.objectFit = "cover";
            kepElem.style.borderRadius = "14px";
            kepElem.style.marginBottom = "10px";

            if (ikonElem) {
                ikonElem.replaceWith(kepElem);
            } else {
                kartya.prepend(kepElem);
            }
        }

        kepElem.onerror = function () {
            kepElem.src = TARTALEK_KEP;
        };
        kepElem.src = recept.kep || TARTALEK_KEP;
        kepElem.alt = recept.cim;
    });
}

/* Saját recept megjelenítése */
function receptMutat(kulcs) {
    const recept = receptek[kulcs];
    if (!recept) return;

    aktualisReceptKulcs = kulcs;

    document.getElementById("recipe-title").textContent = recept.cim;
    document.getElementById("recipe-text").textContent = recept.leiras;

    const kepElem = document.getElementById("recipe-image");
    if (kepElem) {
        kepElem.onerror = function () {
            kepElem.src = TARTALEK_KEP;
        };
        kepElem.src = recept.kep || TARTALEK_KEP;
        kepElem.alt = recept.cim;
    }

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

/* 3. Adagkalkulátor */
function adagolas() {
    const recept = receptek[aktualisReceptKulcs];
    if (!recept

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: "Quicksand", sans-serif;
    background: linear-gradient(180deg, #fff5f8 0%, #fffaf2 55%, #f8f2ff 100%);
    color: #3d2832;
    line-height: 1.6;
    min-height: 100vh;
}

header {
    background: rgba(255, 255, 255, 0.92);
    border-bottom: 1px solid #f2d9e3;
    position: sticky;
    top: 0;
    z-index: 20;
    backdrop-filter: blur(8px);
}

.fejlec-belso {
    max-width: 1140px;
    margin: 0 auto;
    padding: 14px 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
}

.logo-doboz {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-ikon {
    font-size: 2rem;
}

.logo {
    font-family: "Fredoka", sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #9e2a5b;
}

.alcim {
    font-size: 0.88rem;
    color: #785665;
}

nav {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.nav-gomb {
    border: 1px solid #ecc6d6;
    background: #fff8fa;
    color: #5c3345;
    padding: 8px 16px;
    border-radius: 999px;
    font-family: "Quicksand", sans-serif;
    font-weight: 700;
    font-size: 0.92rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.nav-gomb:hover,
.nav-gomb.aktiv {
    background: #d9487d;
    border-color: #d9487d;
    color: #ffffff;
}

main {
    max-width: 1140px;
    margin: 0 auto;
    padding: 32px 20px 56px;
}

.oldal {
    display: none;
}

.oldal.lathato {
    display: block;
}

.hero {
    background: #ffffff;
    border: 1px solid #f4dce6;
    border-radius: 24px;
    padding: 40px 28px;
    text-align: center;
    box-shadow: 0 12px 30px rgba(158, 42, 91, 0.06);
}

.badge {
    display: inline-block;
    background: #ffe4ee;
    color: #a6265a;
    font-weight: 700;
    font-size: 0.85rem;
    padding: 6px 14px;
    border-radius: 999px;
    margin-bottom: 14px;
}

.hero h1 {
    font-family: "Fredoka", sans-serif;
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    color: #4a1e32;
    margin-bottom: 12px;
}

.hero p {
    max-width: 660px;
    margin: 0 auto 24px;
    color: #674755;
}

.hero-gombok {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
}

.kiemelt-sav {
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
}

.info-kartya {
    background: #ffffff;
    border: 1px solid #f2dce5;
    border-radius: 18px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.info-kartya strong {
    font-family: "Fredoka", sans-serif;
    font-size: 1.1rem;
    color: #8f2352;
}

.info-kartya span {
    font-size: 0.92rem;
    color: #6b4c5a;
}

.szekcio-fejlec {
    margin-bottom: 22px;
}

.szekcio-fejlec h2 {
    font-family: "Fredoka", sans-serif;
    font-size: 1.9rem;
    color: #4d2034;
    margin-bottom: 6px;
}

.szekcio-fejlec p {
    color: #6d4d5b;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
}

.card {
    background: #ffffff;
    border: 1px solid #f3dce6;
    border-radius: 20px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 12px;
    box-shadow: 0 8px 22px rgba(92, 34, 60, 0.05);
}

.card h3 {
    font-family: "Fredoka", sans-serif;
    font-size: 1.15rem;
    color: #4c1f33;
}

.card p {
    font-size: 0.92rem;
    color: #6d4d5b;
    flex-grow: 1;
}

.card button,
.button {
    border: none;
    background: #d9487d;
    color: #ffffff;
    padding: 10px 16px;
    border-radius: 12px;
    font-family: "Quicksand", sans-serif;
    font-weight: 700;
    font-size: 0.92rem;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
}

.card button:hover,
.button:hover {
    background: #b83364;
    transform: translateY(-1px);
}

.masodlagos-gomb {
    background: #7c4dff;
}

.masodlagos-gomb:hover {
    background: #6335e8;
}

.recept-lap {
    background: #ffffff;
    border: 1px solid #f3dce6;
    border-radius: 24px;
    padding: 28px;
    max-width: 780px;
    margin: 0 auto;
    box-shadow: 0 12px 30px rgba(92, 34, 60, 0.06);
}

.recept-lap h2 {
    font-family: "Fredoka", sans-serif;
    font-size: 1.9rem;
    color: #4d2034;
    margin-bottom: 8px;
}

.recept-leiras {
    color: #6c4c5a;
    margin-bottom: 18px;
}

.recept-kep {
    width: 100%;
    max-height: 360px;
    object-fit: cover;
    border-radius: 18px;
    margin-bottom: 20px;
    display: block;
}

.adag-sav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 14px;
    background: #fff5f8;
    border: 1px solid #f4d6e2;
    padding: 14px 16px;
    border-radius: 14px;
    margin-bottom: 22px;
}

#result {
    font-weight: 700;
    color: #8f2352;
}

.recept-lap h3 {
    font-family: "Fredoka", sans-serif;
    font-size: 1.25rem;
    color: #5a253d;
    margin-top: 18px;
    margin-bottom: 10px;
}

.recept-lap ul,
.recept-lap ol {
    padding-left: 22px;
    margin-bottom: 22px;
}

.recept-lap li {
    margin-bottom: 6px;
}

.back-button {
    background: #6c5863;
}

.back-button:hover {
    background: #52414a;
}

.kereso-urlap {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 16px;
}

#recipe-search {
    flex: 1 1 240px;
    padding: 10px 14px;
    border: 1px solid #e5bfd0;
    border-radius: 12px;
    font-family: "Quicksand", sans-serif;
    font-size: 0.95rem;
    background: #ffffff;
}

.api-allapot {
    min-height: 24px;
    font-weight: 700;
    color: #7c3554;
    margin-bottom: 16px;
}

.api-card img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 14px;
}

.api-recept {
    margin-top: 28px;
}

.api-recept img {
    width: 100%;
    max-height: 340px;
    object-fit: cover;
    border-radius: 18px;
    margin: 14px 0;
    display: block;
}

footer {
    text-align: center;
    padding: 24px 16px;
    color: #7a5a68;
    font-size: 0.9rem;
    border-top: 1px solid #f2dce5;
    background: rgba(255, 255, 255, 0.7);
}

// WR Studieplanner — weekdata
// Vereist window.isToday (gezet door planner-widgets.js)

var wrWeeks = [

// =====================================================================
// WEEK 1: Eerste sweep (15â€“19 mei) â€” namiddagsessies naast CA Week 1
// CA krijgt de ochtenden (piekconcentratie), WR start elke dag om 15:00
// =====================================================================
{
  label: 'Week 1 â€” Eerste sweep (15 meiâ†’)',
  subtitle: 'H1â€“H12 eerste lezing â€” 15:00 start elke dag, CA ochtenden',
  days: [
    {
      label: 'Vr', date: '15 mei', tag: 't-th', tagText: 'H1 + H2 (start vandaag)',
      today: isToday('2026-05-15'),
      sessions: [
        { title: 'ðŸ“… CA ochtend â€” Q1: getallenstelsels', time: '9:00', dur: '', tasks: [], isBreak: true },
        { title: 'H1 â€” Floating-point lezen', time: '15:00', dur: '25 min', tasks: [
          { type: 'lees', text: 'Cursus H1: floating-point, IEEE 754, machineprecisie Îµ_mach, afrondingsfout vs afknottingsfout', min: 15 },
          { type: 'schrijf', text: 'Schrijf van buiten: definitie computationele fout, conditioneringsgetal Îº, wat "well-posed" betekent', min: 10 },
        ]},
        { title: 'â˜•', time: '15:25', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H1 â€” Theorievragen + notebook', time: '15:35', dur: '30 min', tasks: [
          { type: 'schrijf', text: 'Beantwoord alle theorievragen H1 (repo: theorie_vragen/hoofdstuk1.tex) schriftelijk, zonder kijken', min: 20 },
          { type: 'lees', text: 'Bekijk "h1 - cancellation bij het plotten van functies.ipynb" â€” begrijp wat er misgaat', min: 10 },
        ]},
        { title: 'â˜•', time: '16:05', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H2 â€” LU + pivoting lezen', time: '16:15', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H2: LU-factorisatie, partiÃ«le pivoting, Cholesky, iteratief verfijnen', min: 20 },
          { type: 'schrijf', text: 'Noteer LU als pseudocode op papier: LÂ·y=b (forward), UÂ·x=y (backward)', min: 10 },
        ]},
        { title: 'â˜•', time: '16:45', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H2 â€” Theorievragen + NB preview', time: '16:55', dur: '30 min', tasks: [
          { type: 'schrijf', text: 'Beantwoord alle theorievragen H2 (repo) schriftelijk, zonder kijken', min: 20 },
          { type: 'lees', text: 'Bekijk "h2 - directe methoden.ipynb" â€” focus op Hilbert-matrix conditionering', min: 10 },
        ]},
      ]
    },
    {
      label: 'Za', date: '16 mei', tag: 't-th', tagText: 'H3 + H4 + H5 + NB0',
      today: isToday('2026-05-16'),
      sessions: [
        { title: 'ðŸ“… CA ochtend â€” Q2: assembly basis', time: '9:00', dur: '', tasks: [], isBreak: true },
        { title: 'H3 â€” Kleinste-kwadraten lezen', time: '15:00', dur: '25 min', tasks: [
          { type: 'lees', text: 'Cursus H3: normaalvergelijkingen, QR (Householder vs Gram-Schmidt), SVD, pseudoinverse', min: 15 },
          { type: 'schrijf', text: 'Beantwoord alle theorievragen H3 (repo) schriftelijk â€” noteer verschil QR vs normaalvergelijkingen (ÎºÂ² vs Îº)', min: 10 },
        ]},
        { title: 'â˜•', time: '15:25', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H4 â€” Eigenwaarden lezen + vragen', time: '15:35', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H4: machtiteratie, inverse iteratie, Rayleigh-quotiÃ«nt iteratie, QR-iteratie', min: 15 },
          { type: 'schrijf', text: 'Tabel: convergentieorde machtiteratie (1) / inverse (1) / Rayleigh (3) + alle theorievragen H4 schriftelijk', min: 15 },
        ]},
        { title: 'â˜•', time: '16:05', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H5 â€” Niet-lineaire vergelijkingen', time: '16:15', dur: '25 min', tasks: [
          { type: 'lees', text: 'Cursus H5: bisectie, vaste-puntiteratie, Newton-Raphson, secantmethode', min: 15 },
          { type: 'schrijf', text: 'Convergentieorden: bisectie=1, secantâ‰ˆ1.618, Newton=2 + pseudocode Newton op papier zonder kijken', min: 10 },
        ]},
        { title: 'â˜•', time: '16:40', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB0 â€” Sage basis + spiekblad', time: '16:50', dur: '30 min', tasks: [
          { type: 'lees', text: 'Open NB0 "0. Werken met Sage.ipynb" â€” voer alle cellen uit, noteer nieuw syntax', min: 15 },
          { type: 'spiek', text: 'Spiekblad p1: var(), matrix(), solve(), diff(), integrate() â€” met korte voorbeelden', min: 15 },
        ]},
      ]
    },
    {
      label: 'Zo', date: '17 mei', tag: 't-th', tagText: 'H6 + H7 + H8 + NB1',
      today: isToday('2026-05-17'),
      sessions: [
        { title: 'ðŸ“… CA ochtend â€” Q2: CVG + stapel tekenen', time: '9:00', dur: '', tasks: [], isBreak: true },
        { title: 'H6 â€” Optimalisatie lezen + vragen', time: '15:00', dur: '25 min', tasks: [
          { type: 'lees', text: 'Cursus H6: lokaal/globaal minimum, KKT-voorwaarden, steepest descent, Newton voor optimalisatie', min: 15 },
          { type: 'schrijf', text: 'KKT-voorwaarden + verschil gradient vs Newton (convergentieorde + kosten) uit het hoofd', min: 10 },
        ]},
        { title: 'â˜•', time: '15:25', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H7 â€” Interpolatie lezen + vragen', time: '15:35', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H7: Lagrange-interpolatie, Newton verdeelde differenties, Runge-fenomeen, stuksgewijze interp., splines', min: 18 },
          { type: 'schrijf', text: 'Beantwoord alle theorievragen H7 schriftelijk, zonder kijken', min: 12 },
        ]},
        { title: 'â˜•', time: '16:05', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H8 â€” Integratie lezen + vragen', time: '16:15', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H8: trapeziumregel, Simpson, Newton-Cotes, Gauss-kwadratuur, Romberg, adaptieve integratie', min: 18 },
          { type: 'schrijf', text: 'Tabel nauwkeurigheidsorde (rechthoek=1, trap=2, Simpson=4, Gauss-n=2n-1) + alle theorievragen H8', min: 12 },
        ]},
        { title: 'â˜•', time: '16:45', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB1 â€” Symbolisch rekenen + plots', time: '16:55', dur: '30 min', tasks: [
          { type: 'lees', text: 'Open NB1 "1. Symbolisch rekenen en plots.ipynb" â€” voer alle cellen uit', min: 15 },
          { type: 'code', text: 'Oefen: diff(sin(x)*x^2,x), integrate(exp(-x^2),x,-oo,oo), plot(sin(x),(x,0,2*pi))', min: 15 },
        ]},
      ]
    },
    {
      label: 'Ma', date: '18 mei', tag: 't-th', tagText: 'H9 + H12 + NB2',
      today: isToday('2026-05-18'),
      sessions: [
        { title: 'ðŸ“… CA ochtend â€” Q3: Booleaanse algebra + K-map', time: '9:00', dur: '', tasks: [], isBreak: true },
        { title: 'H9 â€” GDV lezen + vragen', time: '15:00', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H9: Euler-methode, Runge-Kutta RK4, trapeziumregel voor ODE, stabiliteit, stijve stelsels', min: 20 },
          { type: 'schrijf', text: 'Beantwoord alle theorievragen H9 schriftelijk, zonder kijken', min: 10 },
        ]},
        { title: 'â˜•', time: '15:30', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H12 â€” DFT + FFT lezen + vragen', time: '15:40', dur: '35 min', tasks: [
          { type: 'lees', text: 'Cursus H12: DFT-matrix, FFT Cooley-Tukey (even/oneven), complexiteit O(n log n)', min: 20 },
          { type: 'schrijf', text: 'Schrijf W_n^{jk} = e^{-2Ï€ijk/n} + Cooley-Tukey recursie uit het hoofd + alle theorievragen H12', min: 15 },
        ]},
        { title: 'â˜•', time: '16:15', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB2 + Aanvullingen', time: '16:25', dur: '35 min', tasks: [
          { type: 'lees', text: 'Open NB2 "2. Datastructuren.ipynb" â€” loop door: lijsten, tuples, dict, sets, matrix-operaties', min: 15 },
          { type: 'spiek', text: 'Spiekblad p2: matrix aanmaken, rij/kolom, inverse, determinant, eigenvalues()', min: 10 },
          { type: 'lees', text: 'Bekijk aanvullingen "reeksontwikkelingen" + "meerdereveranderlijken" â€” beknopte lezing', min: 10 },
        ]},
      ]
    },
    {
      label: 'Di', date: '19 mei', tag: 't-review', tagText: 'SR H1â€“H4 + NB0 zelf',
      today: isToday('2026-05-19'),
      sessions: [
        { title: 'ðŸ“… CA ochtend â€” Q3 NAND + carry lookahead', time: '9:00', dur: '', tasks: [], isBreak: true },
        { title: 'âŸ³ Spaced rep â€” H1 + H2 (dag 4)', time: '15:00', dur: '25 min', tasks: [
          { type: 'herhaal', text: 'Beantwoord 8 H1-vragen volledig uit het hoofd (gesloten boek, timer 12 min) â€” dan nakijken, fouten markeren', min: 13 },
          { type: 'herhaal', text: 'Beantwoord 8 H2-vragen volledig uit het hoofd (timer 12 min) â€” dan nakijken, fouten markeren', min: 12 },
        ]},
        { title: 'â˜•', time: '15:25', dur: '10 min', tasks: [], isBreak: true },
        { title: 'âŸ³ Spaced rep â€” H3 + H4 (dag 3)', time: '15:35', dur: '25 min', tasks: [
          { type: 'herhaal', text: 'Beantwoord 8 H3-vragen uit het hoofd (timer 10 min) â€” dan nakijken', min: 13 },
          { type: 'herhaal', text: 'Beantwoord 8 H4-vragen uit het hoofd (timer 10 min) â€” dan nakijken', min: 12 },
        ]},
        { title: 'â˜•', time: '16:00', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB0 â€” Zelf oefenen zonder kijken', time: '16:10', dur: '30 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: definieer x, maak 3Ã—3 matrix, bereken det + inverse, los AÂ·x=b op â€” geen NB open', min: 20 },
          { type: 'spiek', text: 'Voeg ontbrekende syntax toe aan spiekblad op basis van wat je vergat', min: 10 },
        ]},
      ]
    },
  ]
},

// =====================================================================
// WEEK 2: Deeltijdperiode (21 mei â€“ 7 juni) â€” WR-slots naast CA + MM
// =====================================================================
{
  label: 'Week 2 â€” Deeltijd',
  subtitle: 'WR-slots naast CA + MM â€” NB3â€“NB6 + spiekblad + mock theorie',
  days: [
    {
      label: 'Do', date: '21 mei', tag: 't-sa', tagText: 'NB3 + Spiekblad',
      today: isToday('2026-05-21'),
      sessions: [
        { title: 'NB3 â€” Bisectiemethode implementeren', time: '10:00', dur: '30 min', tasks: [
          { type: 'lees', text: 'Open NB3 "3. Programmeren.ipynb" â€” loop door: for-lussen, while, functies, recursie', min: 10 },
          { type: 'code', text: 'Schrijf ZELF: bisectiemethode voor f(x)=xÂ³âˆ’2, interval [1,2], tol=1e-6, max 50 iter.', min: 20 },
        ]},
        { title: 'â˜•', time: '10:30', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB3 â€” Newton implementeren', time: '10:40', dur: '30 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: Newton-methode voor f(x)=cos(x)âˆ’x, x0=1, stop bij |f(xk)|<1e-10', min: 20 },
          { type: 'spiek', text: 'Spiekblad p3: Newton-skelet in Sage (diff() voor afgeleide, while-lus, convergentiecriterium)', min: 10 },
        ]},
        { title: 'â˜•', time: '11:10', dur: '10 min', tasks: [], isBreak: true },
        { title: 'Spiekblad â€” LU + lineaire algebra', time: '11:20', dur: '30 min', tasks: [
          { type: 'spiek', text: 'Spiekblad p1: LU-factorisatie in Sage â€” matrix.LU(), forward/backward substitution', min: 15 },
          { type: 'spiek', text: 'Spiekblad p1: solve(A*x == b), A.eigenvalues(), A.eigenvectors_right() â€” met voorbeeld', min: 15 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '11:50', dur: '', tasks: [], isBreak: true },
        { title: 'Oud oef-examen â€” lezen + spiekblad', time: '15:00', dur: '30 min', tasks: [
          { type: 'lees', text: 'Open ex1819_1_oef.pdf (niet_opgeloste_examens/) + ex1819_1_oef_opl_door_prof.pdf â€” lees grondig per vraag', min: 20 },
          { type: 'spiek', text: 'Voeg ontbrekende SageMath-functies toe aan spiekblad op basis van de oplossingen', min: 10 },
        ]},
      ]
    },
    {
      label: 'Zo', date: '24 mei', tag: 't-review', tagText: 'Spaced rep H1â€“H4 (dag 7â€“10)',
      today: isToday('2026-05-24'),
      sessions: [
        { title: 'âŸ³ SR â€” H1 + H2 (dag 10)', time: '10:00', dur: '25 min', tasks: [
          { type: 'herhaal', text: 'Beantwoord 10 H1-vragen volledig uit het hoofd (timer 12 min) â€” dan nakijken', min: 13 },
          { type: 'herhaal', text: 'Beantwoord 10 H2-vragen volledig uit het hoofd (timer 12 min) â€” dan nakijken', min: 12 },
        ]},
        { title: 'â˜•', time: '10:25', dur: '10 min', tasks: [], isBreak: true },
        { title: 'âŸ³ SR â€” H3 + H4 (dag 9)', time: '10:35', dur: '25 min', tasks: [
          { type: 'herhaal', text: 'Beantwoord 8 H3-vragen uit het hoofd (timer 10 min) â€” dan nakijken', min: 12 },
          { type: 'herhaal', text: 'Beantwoord 8 H4-vragen uit het hoofd (timer 10 min) â€” dan nakijken', min: 13 },
        ]},
        { title: 'â˜•', time: '11:00', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB3 â€” Machtiteratie implementeren', time: '11:10', dur: '35 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: machtiteratie voor 3Ã—3 matrix, zonder te kijken naar NB', min: 20 },
          { type: 'nakijk', text: 'Vergelijk met matrix.eigenvalues() in Sage + noteer afwijking', min: 10 },
          { type: 'spiek', text: 'Spiekblad: machtiteratie-skelet (initialiseer, normeer, iterate, stop bij convergentie)', min: 5 },
        ]},
      ]
    },
    {
      label: 'Zo', date: '31 mei', tag: 't-review', tagText: 'Spaced rep H5â€“H12 (dag 14â€“15)',
      today: isToday('2026-05-31'),
      sessions: [
        { title: 'âŸ³ SR â€” H5 + H6 (dag 15)', time: '10:00', dur: '25 min', tasks: [
          { type: 'herhaal', text: 'Beantwoord alle H5-vragen uit het hoofd (timer 12 min) â€” nakijken', min: 13 },
          { type: 'herhaal', text: 'Beantwoord alle H6-vragen uit het hoofd (timer 10 min) â€” nakijken', min: 12 },
        ]},
        { title: 'â˜•', time: '10:25', dur: '10 min', tasks: [], isBreak: true },
        { title: 'âŸ³ SR â€” H7 + H8 + H9 + H12 (dag 14)', time: '10:35', dur: '30 min', tasks: [
          { type: 'herhaal', text: 'H7 + H8: beantwoord 6 vragen per H uit het hoofd (timer 20 min) â€” nakijken', min: 20 },
          { type: 'herhaal', text: 'H9 + H12: beantwoord 5 vragen per H uit het hoofd (timer 12 min) â€” nakijken', min: 10 },
        ]},
        { title: 'â˜•', time: '11:05', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB4 â€” Vergelijkingen oplossen in Sage', time: '11:15', dur: '35 min', tasks: [
          { type: 'lees', text: 'Open NB4 "4. Oplossen van vergelijkingen.ipynb" â€” voer cellen uit', min: 10 },
          { type: 'code', text: 'Schrijf ZELF: secantmethode voor f(x)=xÂ³âˆ’2xâˆ’5, x0=2, x1=3', min: 15 },
          { type: 'code', text: 'Gebruik find_root() en vergelijk resultaat met je eigen implementatie', min: 10 },
        ]},
      ]
    },
    {
      label: 'Ma', date: '1 jun', tag: 't-sa', tagText: 'NB5 avond',
      today: isToday('2026-06-01'),
      sessions: [
        { title: 'NB5 â€” Lineaire algebra + modulo', time: '19:30', dur: '30 min', tasks: [
          { type: 'lees', text: 'Open NB5 "5. Modulorekenen en lineaire algebra.ipynb" â€” voer cellen uit', min: 10 },
          { type: 'code', text: 'Oefen: modulo-aritmetiek, solve(A*x == b), eigenvalues(), eigenvectors() op concrete matrix', min: 20 },
        ]},
        { title: 'â˜•', time: '20:00', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB5 â€” Machtiteratie compact', time: '20:10', dur: '30 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: machtiteratie in Sage, compact (â‰¤10 regels), test op [[2,1],[1,3]]', min: 20 },
          { type: 'spiek', text: 'Spiekblad p4: machtiteratie compact-template (kopieer beste versie)', min: 10 },
        ]},
      ]
    },
    {
      label: 'Di', date: '2 jun', tag: 't-th', tagText: 'H12 verdieping avond',
      today: isToday('2026-06-02'),
      sessions: [
        { title: 'H12 â€” DFT grondig herlezen', time: '19:30', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H12 opnieuw grondig: DFT-matrix, FFT divide-and-conquer, complexiteit O(n log n)', min: 20 },
          { type: 'schrijf', text: 'Schrijf W_n^{jk} = e^{-2Ï€ijk/n} + Cooley-Tukey recursie uit het hoofd', min: 10 },
        ]},
        { title: 'â˜•', time: '20:00', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H12 â€” Alle theorievragen + aanvulling', time: '20:10', dur: '30 min', tasks: [
          { type: 'schrijf', text: 'Beantwoord ALLE theorievragen H12 (repo) schriftelijk opnieuw, zonder kijken', min: 20 },
          { type: 'lees', text: 'Bekijk "aanvullingen_wr_reeksontwikkelingen.ipynb" â€” focus op Taylor vs Fourier', min: 10 },
        ]},
      ]
    },
    {
      label: 'Wo', date: '3 jun', tag: 't-sa', tagText: 'NB6 avond',
      today: isToday('2026-06-03'),
      sessions: [
        { title: 'NB6 â€” Veeltermen + machtreeksen', time: '19:30', dur: '30 min', tasks: [
          { type: 'lees', text: 'Open NB6 "6. Veeltermen en machtreeksen.ipynb" â€” voer alle cellen uit', min: 15 },
          { type: 'code', text: 'Oefen: veelterm aanmaken, evalueren, taylor(), polynomial() in Sage', min: 15 },
        ]},
        { title: 'â˜•', time: '20:00', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB6 â€” Lagrange-interpolant zelf schrijven', time: '20:10', dur: '30 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: Lagrange-interpolant voor punten (0,1),(1,2),(2,5) zonder te kijken', min: 20 },
          { type: 'spiek', text: 'Spiekblad p5: interpolate(), taylor(), polynomial() â€” met minimale voorbeelden', min: 10 },
        ]},
      ]
    },
    {
      label: 'Vr', date: '5 jun', tag: 't-ex', tagText: 'Mock theorie avond',
      today: isToday('2026-06-05'),
      sessions: [
        { title: 'ðŸ Theorie-mock ex2021_1_th â€” GETIMED', time: '19:30', dur: '90 min', tasks: [
          { type: 'mock', text: 'Timer 90 min. Open ex2021_1_th.pdf (theorie_examens/). Geen boek, geen notes. Schrijf alles op papier.', min: 90 },
        ]},
        { title: 'Nakijken ex2021_1_th', time: '21:15', dur: '25 min', tasks: [
          { type: 'nakijk', text: 'Kijk na met beschikbare oplossingen â€” noteer per vraag: correct / deels / fout', min: 15 },
          { type: 'schrijf', text: 'Schrijf welke begrippen/bewijzen je niet kende â€” dit zijn je prioriteiten voor week 3', min: 10 },
        ]},
      ]
    },
    {
      label: 'Zo', date: '7 jun', tag: 't-review', tagText: 'Licht + dag voor CA',
      today: isToday('2026-06-07'),
      sessions: [
        { title: 'âŸ³ SR â€” zwakke H bijwerken (dag voor CA)', time: '9:00', dur: '30 min', tasks: [
          { type: 'herhaal', text: 'Lees de H die je fout had bij de mock van vrijdag: begrippen rustig opnieuw, cursus open', min: 20 },
          { type: 'schrijf', text: 'Noteer resterende onduidelijkheden voor de intensieve week (ma 8 juni)', min: 10 },
        ]},
        { title: 'ðŸ›‘ Stop WR hier â€” dag voor CA-examen', time: '9:30', dur: '', tasks: [], isBreak: true },
      ]
    },
  ]
},

// =====================================================================
// WEEK 3: Volledig intensief (8â€“11 juni) â€” na CA-examen
// =====================================================================
{
  label: 'Week 3 â€” Volledig intensief',
  subtitle: 'Na CA-examen: 4 dagen 100% WR â€” theorie per H + alle NB zelf herschrijven',
  days: [
    {
      label: 'Ma', date: '8 jun', tag: 't-th', tagText: 'CA + WR H1+H2',
      today: isToday('2026-06-08'),
      sessions: [
        { title: 'ðŸŽ“ CA EXAMEN 08:30â€“12:30', time: '8:30', dur: '4 uur', tasks: [
          { type: 'mock', text: 'Computerarchitectuur examen â€” veel succes! Kom daarna uitgerust terug voor WR.', min: 0 },
        ]},
        { title: 'H1 â€” Intensief herhalen', time: '14:00', dur: '30 min', tasks: [
          { type: 'schrijf', text: 'Schrijf uit het hoofd: alle H1-begrippen (machineprecisie, conditionering, foutanalyse)', min: 15 },
          { type: 'schrijf', text: 'Beantwoord ALLE H1-theorievragen (repo) schriftelijk â€” noteer elke fout', min: 15 },
        ]},
        { title: 'â˜•', time: '14:30', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H2 â€” Intensief herhalen', time: '14:40', dur: '35 min', tasks: [
          { type: 'lees', text: 'Cursus H2 opnieuw volledig: LU, pivoting, Cholesky, conditionering', min: 15 },
          { type: 'schrijf', text: 'Beantwoord ALLE H2-theorievragen (repo) schriftelijk â€” noteer elke fout', min: 20 },
        ]},
        { title: 'â˜•', time: '15:15', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H2 â€” Notebook + verificatie', time: '15:25', dur: '25 min', tasks: [
          { type: 'lees', text: 'Bekijk theorie-notebook h2 opnieuw â€” begrijp Hilbert-matrix voorbeeld volledig', min: 15 },
          { type: 'nakijk', text: 'Vergelijk je H1+H2 antwoorden met repo-vragen â€” welke H heeft de meeste fouten?', min: 10 },
        ]},
      ]
    },
    {
      label: 'Di', date: '9 jun', tag: 't-th', tagText: 'H3 + H4 + NB0â€“NB2',
      today: isToday('2026-06-09'),
      sessions: [
        { title: 'H3 â€” Intensief herhalen', time: '9:00', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H3 grondig: normaalvergelijkingen, QR Householder, Gram-Schmidt, SVD, pseudoinverse', min: 20 },
          { type: 'schrijf', text: 'Beantwoord ALLE H3-theorievragen schriftelijk', min: 10 },
        ]},
        { title: 'â˜•', time: '9:30', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H4 â€” Intensief herhalen', time: '9:40', dur: '35 min', tasks: [
          { type: 'lees', text: 'Cursus H4 grondig: alle iteratiemethoden, convergentie, gelijkvormige transformaties', min: 20 },
          { type: 'schrijf', text: 'Beantwoord ALLE H4-theorievragen schriftelijk', min: 15 },
        ]},
        { title: 'â˜•', time: '10:15', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H4 â€” Rayleigh notebook', time: '10:25', dur: '25 min', tasks: [
          { type: 'lees', text: 'Theorie-notebook h4 (rayleigh-quotiÃ«nt iteratie): begrijp elke stap in de code', min: 25 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '10:50', dur: '', tasks: [], isBreak: true },
        { title: 'NB0+NB1 â€” Zelf herschrijven', time: '14:00', dur: '35 min', tasks: [
          { type: 'code', text: 'Schrijf NB0 ZELF (geen kijken): var, matrix, solve, diff, integrate, plot â€” test elke lijn', min: 20 },
          { type: 'code', text: 'Schrijf NB1 ZELF: diff(f,x), integrate(f,x,-oo,oo), solve(), plot() â€” test', min: 15 },
        ]},
        { title: 'â˜•', time: '14:35', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB2 â€” Zelf herschrijven + vergelijken', time: '14:45', dur: '30 min', tasks: [
          { type: 'code', text: 'Schrijf NB2 ZELF: datastructuren, matrix-operaties, inverse, determinant, stelsel oplossen', min: 20 },
          { type: 'nakijk', text: 'Vergelijk je NB0â€“NB2 met originelen â€” noteer wat je vergat, voeg toe aan spiekblad', min: 10 },
        ]},
      ]
    },
    {
      label: 'Wo', date: '10 jun', tag: 't-th', tagText: 'H5 + H6 + H7 + NB3+NB4',
      today: isToday('2026-06-10'),
      sessions: [
        { title: 'H5 â€” Intensief herhalen', time: '9:00', dur: '25 min', tasks: [
          { type: 'schrijf', text: 'Beantwoord ALLE H5-theorievragen schriftelijk, zonder kijken, timer 20 min', min: 20 },
          { type: 'nakijk', text: 'Nakijken + fouten markeren', min: 5 },
        ]},
        { title: 'â˜•', time: '9:25', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H6 â€” Intensief herhalen', time: '9:35', dur: '25 min', tasks: [
          { type: 'lees', text: 'Cursus H6: KKT-voorwaarden + gradiÃ«ntmethode + Newton voor optimalisatie', min: 15 },
          { type: 'schrijf', text: 'Schrijf KKT-voorwaarden + verschil gradiÃ«nt vs Newton (convergentieorde + kosten) uit het hoofd', min: 10 },
        ]},
        { title: 'â˜•', time: '10:00', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H7 â€” Intensief herhalen', time: '10:10', dur: '35 min', tasks: [
          { type: 'lees', text: 'Cursus H7 grondig: Lagrange, Newton verd. diff., Runge-fenomeen, splines, Hermite-interpolatie', min: 20 },
          { type: 'schrijf', text: 'Beantwoord ALLE H7-theorievragen schriftelijk + maak 1 interpolatie-vraag uit ex1920_1_th', min: 15 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '10:45', dur: '', tasks: [], isBreak: true },
        { title: 'NB3 â€” Bisectie + Newton herschrijven', time: '14:00', dur: '35 min', tasks: [
          { type: 'code', text: 'Schrijf NB3 ZELF: bisectiemethode voor f(x)=xÂ³âˆ’2, tol=1e-8, max 100 iter.', min: 18 },
          { type: 'code', text: 'Schrijf NB3 ZELF: Newton voor f(x)=cos(x)âˆ’x, start x0=1, stop |f(xk)|<1e-10', min: 17 },
        ]},
        { title: 'â˜•', time: '14:35', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB3 â€” RK4 + NB4', time: '14:45', dur: '35 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: Runge-Kutta 4 voor y\'=y, y(0)=1 op [0,1] â€” vergelijk met exp(1)', min: 20 },
          { type: 'code', text: 'Schrijf NB4 ZELF: los stelsel op, vind nulpunt, optimaliseer functie in Sage', min: 15 },
        ]},
        { title: 'â˜•', time: '15:20', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB3+NB4 â€” Vergelijken + spiekblad', time: '15:30', dur: '20 min', tasks: [
          { type: 'nakijk', text: 'Vergelijk je code met originele NB3+NB4 â€” noteer wat je vergat', min: 10 },
          { type: 'spiek', text: 'Spiekblad: skeleton-code voor bisectie, Newton, RK4 â€” klaar voor gebruik op examen', min: 10 },
        ]},
      ]
    },
    {
      label: 'Do', date: '11 jun', tag: 't-th', tagText: 'H8 + H9 + H12 + NB5+NB6',
      today: isToday('2026-06-11'),
      sessions: [
        { title: 'H8 â€” Intensief herhalen', time: '9:00', dur: '30 min', tasks: [
          { type: 'lees', text: 'Cursus H8 grondig: alle Newton-Cotes formules, Gauss-kwadratuur, Romberg, adaptieve integratie', min: 20 },
          { type: 'schrijf', text: 'Beantwoord ALLE H8-theorievragen schriftelijk, zonder kijken', min: 10 },
        ]},
        { title: 'â˜•', time: '9:30', dur: '10 min', tasks: [], isBreak: true },
        { title: 'H9 + H12 â€” Intensief herhalen', time: '9:40', dur: '35 min', tasks: [
          { type: 'lees', text: 'Cursus H9: Euler, RK4, trapezium, stabiliteit, stijve stelsels â€” grondig', min: 15 },
          { type: 'schrijf', text: 'Beantwoord ALLE H9 + ALLE H12 theorievragen schriftelijk, zonder kijken', min: 20 },
        ]},
        { title: 'â˜•', time: '10:15', dur: '10 min', tasks: [], isBreak: true },
        { title: 'Aanvullingen + zwakke H bijwerken', time: '10:25', dur: '30 min', tasks: [
          { type: 'lees', text: 'Lees aanvullingen reeksontwikkelingen + meerdereveranderlijken volledig door', min: 15 },
          { type: 'schrijf', text: 'Werk het H bij waar je gisteren de meeste fouten had â€” enkel de foute begrippen, actief opschrijven', min: 15 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '10:55', dur: '', tasks: [], isBreak: true },
        { title: 'NB5 â€” Machtiteratie + eigenwaarden', time: '14:00', dur: '35 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: machtiteratie voor 3Ã—3 matrix â€” normeren, itereren, stopcriterium', min: 20 },
          { type: 'code', text: 'Schrijf ZELF: eigenvalues(), eigenvectors_right() â€” vergelijk met machtiteratie-resultaat', min: 15 },
        ]},
        { title: 'â˜•', time: '14:35', dur: '10 min', tasks: [], isBreak: true },
        { title: 'NB6 â€” Lagrange + interpolatie', time: '14:45', dur: '35 min', tasks: [
          { type: 'code', text: 'Schrijf ZELF: Lagrange-interpolant voor (0,1),(1,2),(2,5) zonder kijken', min: 20 },
          { type: 'code', text: 'Schrijf ZELF: Newton verdeelde differenties voor 4 punten, evalueer op tussenpunt', min: 15 },
        ]},
        { title: 'â˜•', time: '15:20', dur: '10 min', tasks: [], isBreak: true },
        { title: 'Spiekblad finaliseren (versie 1)', time: '15:30', dur: '30 min', tasks: [
          { type: 'nakijk', text: 'Vergelijk NB5+NB6 met originelen â€” noteer vergeten syntax', min: 10 },
          { type: 'spiek', text: 'Spiekblad COMPLEET maken: elke methode heeft een skeleton-voorbeeld', min: 15 },
          { type: 'spiek', text: 'Sla spiekblad op als PDF / druk af voor gebruik op examen', min: 5 },
        ]},
      ]
    },
  ]
},

// =====================================================================
// WEEK 4: Mock-examens & Examendag (12â€“17 juni)
// =====================================================================
{
  label: 'Week 4 â€” Mock + Examen',
  subtitle: '4 volledige mock-examens (th + SageMath) â†’ dag voor examen â†’ examen',
  days: [
    {
      label: 'Vr', date: '12 jun', tag: 't-mock', tagText: 'Mock #1',
      today: isToday('2026-06-12'),
      sessions: [
        { title: 'ðŸ Theorie-mock ex2425_1_th â€” GETIMED', time: '9:00', dur: '90 min', tasks: [
          { type: 'mock', text: 'Timer 90 min. Open ex2425_1_th.pdf (Examens/). Geen hulpmiddelen. Alles op papier.', min: 90 },
        ]},
        { title: 'â˜• Herstel', time: '10:30', dur: '30 min', tasks: [], isBreak: true },
        { title: 'Nakijken theorie mock #1', time: '11:00', dur: '30 min', tasks: [
          { type: 'nakijk', text: 'Kijk na met beschikbare oplossingen â€” noteer per vraag: correct / deels / fout', min: 20 },
          { type: 'schrijf', text: 'Schrijf "zwakke H"-lijst: welke begrippen ontbreken? Dat zijn je middagpriorititeiten.', min: 10 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '11:30', dur: '', tasks: [], isBreak: true },
        { title: 'ðŸ SageMath-mock ex2324_1_oef â€” GETIMED', time: '13:00', dur: '120 min', tasks: [
          { type: 'mock', text: 'Timer 120 min. Open ex2324_1_oef.pdf + boilerplate ex2324_1_oef_nb.ipynb. Cursus + spiekblad open.', min: 120 },
        ]},
        { title: 'Nakijken SageMath mock #1', time: '15:15', dur: '30 min', tasks: [
          { type: 'nakijk', text: 'Vergelijk met ex2324_1_oef_opl.pdf â€” per vraag: correct / deels / fout', min: 20 },
          { type: 'spiek', text: 'Spiekblad aanvullen: welke Sage-syntax had je nodig maar stond er niet in?', min: 10 },
        ]},
      ]
    },
    {
      label: 'Za', date: '13 jun', tag: 't-mock', tagText: 'Mock #2',
      today: isToday('2026-06-13'),
      sessions: [
        { title: 'ðŸ Theorie-mock ex2425_2_th â€” GETIMED', time: '9:00', dur: '90 min', tasks: [
          { type: 'mock', text: 'Timer 90 min. Open ex2425_2_th.pdf. Geen hulpmiddelen. Alles op papier.', min: 90 },
        ]},
        { title: 'Nakijken + gerichte herhaling zwakste H', time: '10:30', dur: '35 min', tasks: [
          { type: 'nakijk', text: 'Kijk theorie na â€” noteer fouten per H', min: 15 },
          { type: 'herhaal', text: 'Werk het zwakste H van mock #1 Ã©n #2 bij â€” 20 min actief opschrijven, cursus open', min: 20 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '11:05', dur: '', tasks: [], isBreak: true },
        { title: 'ðŸ SageMath-mock ex2223_1_oef â€” GETIMED', time: '13:00', dur: '120 min', tasks: [
          { type: 'mock', text: 'Timer 120 min. Open ex2223_1_oef.pdf + boilerplate ex2223_1_oef_nb.ipynb. Cursus + spiekblad open.', min: 120 },
        ]},
        { title: 'Nakijken SageMath mock #2', time: '15:15', dur: '30 min', tasks: [
          { type: 'nakijk', text: 'Vergelijk met ex2223_1_oef_oplossing.ipynb (opgeloste_examens/) â€” per vraag: correct / deels / fout', min: 20 },
          { type: 'spiek', text: 'Update zwakke-puntenlijst + spiekblad aanpassen waar nodig', min: 10 },
        ]},
      ]
    },
    {
      label: 'Zo', date: '14 jun', tag: 't-mock', tagText: 'Mock #3',
      today: isToday('2026-06-14'),
      sessions: [
        { title: 'ðŸ Theorie-mock ex2122_1_th â€” GETIMED', time: '9:00', dur: '90 min', tasks: [
          { type: 'mock', text: 'Timer 90 min. Open ex2122_1_th.pdf. Geen hulpmiddelen. Alles op papier.', min: 90 },
        ]},
        { title: 'Nakijken + top-2 zwakke H bijwerken', time: '10:30', dur: '35 min', tasks: [
          { type: 'nakijk', text: 'Kijk theorie na met ex2122_1_th_opl.pdf â€” noteer fouten', min: 15 },
          { type: 'herhaal', text: 'Werk de 2 zwakste H\'s van alle mocks bij â€” elk 10 min actief', min: 20 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '11:05', dur: '', tasks: [], isBreak: true },
        { title: 'ðŸ SageMath-mock ex2122_1_oef â€” GETIMED', time: '13:00', dur: '120 min', tasks: [
          { type: 'mock', text: 'Timer 120 min. Open ex2122_1_oef.pdf + boilerplate ex2122_1_oef_nb.ipynb. Cursus + spiekblad open.', min: 120 },
        ]},
        { title: 'Nakijken + spiekblad definitief', time: '15:15', dur: '30 min', tasks: [
          { type: 'nakijk', text: 'Kijk SageMath na â€” per vraag: correct / deels / fout', min: 15 },
          { type: 'spiek', text: 'Spiekblad DEFINITIEF FINALISEREN â€” dit is wat je meeneemt naar het examen', min: 15 },
        ]},
      ]
    },
    {
      label: 'Ma', date: '15 jun', tag: 't-mock', tagText: 'Mock #4',
      today: isToday('2026-06-15'),
      sessions: [
        { title: 'ðŸ Theorie-mock ex2021_1_th â€” GETIMED', time: '9:00', dur: '90 min', tasks: [
          { type: 'mock', text: 'Timer 90 min. Open ex2021_1_th.pdf. Geen hulpmiddelen. Alles op papier.', min: 90 },
        ]},
        { title: 'Nakijken + eindanalyse theorie', time: '10:30', dur: '30 min', tasks: [
          { type: 'nakijk', text: 'Kijk na met ex2021_1_th_opl.pdf â€” vergelijk score mock #1 vs #4, voortgang zichtbaar?', min: 20 },
          { type: 'schrijf', text: 'Noteer: welke 3 H\'s zijn nog onzeker? Die krijgen vanavond max 15 min elk.', min: 10 },
        ]},
        { title: 'ðŸŒž Middagpauze', time: '11:00', dur: '', tasks: [], isBreak: true },
        { title: 'ðŸ SageMath-mock ex2021_1_oef â€” GETIMED', time: '13:00', dur: '120 min', tasks: [
          { type: 'mock', text: 'Timer 120 min. Open ex2021_1_oef.pdf + boilerplate ex2021_1_oef_nb.ipynb. Cursus + spiekblad open.', min: 120 },
        ]},
        { title: 'Nakijken + laatste restpunten', time: '15:15', dur: '35 min', tasks: [
          { type: 'nakijk', text: 'Kijk SageMath na + bereken ruwe score â€” ben je klaar?', min: 15 },
          { type: 'herhaal', text: 'Werk de 3 onzekere H\'s bij â€” elk max 15 min, enkel de foute begrippen', min: 15 },
          { type: 'schrijf', text: 'Controleer: heb je cursus + notities + spiekblad klaar voor morgen?', min: 5 },
        ]},
      ]
    },
    {
      label: 'Di', date: '16 jun', tag: 't-review', tagText: 'Dag voor examen',
      today: isToday('2026-06-16'),
      sessions: [
        { title: 'Lichte herhaling â€” geen nieuw materiaal', time: '9:00', dur: '30 min', tasks: [
          { type: 'herhaal', text: 'Loop door theorievragen H1â€“H12 rustig door (lezen, niet schrijven) â€” bevestiging, niet studie', min: 20 },
          { type: 'herhaal', text: 'Blader spiekblad door â€” ken je de structuur? Weet je waar alles staat?', min: 10 },
        ]},
        { title: 'â˜•', time: '9:30', dur: '10 min', tasks: [], isBreak: true },
        { title: 'Praktische voorbereiding', time: '9:40', dur: '20 min', tasks: [
          { type: 'schrijf', text: 'Schrijf de 5 dingen op die je het vaakst vergat â€” laatste reminder op papier', min: 10 },
          { type: 'nakijk', text: 'Leg klaar: cursus, notities, spiekblad. Controleer: hoe open je SageMath/Jupyter op het PC-examen?', min: 10 },
        ]},
        { title: 'ðŸ›Œ Stop hier â€” rust, eten, slapen. Geheugen consolideert \'s nachts.', time: '10:00', dur: '', tasks: [], isBreak: true },
      ]
    },
    {
      label: 'Wo', date: '17 jun', tag: 't-exam', tagText: 'EXAMEN',
      today: isToday('2026-06-17'),
      sessions: [
        { title: 'ðŸŽ¯ EXAMEN WETENSCHAPPELIJK REKENEN â€” 08:30â€“13:30', time: '8:30', dur: '5 uur', tasks: [
          { type: 'schrijf', text: 'Lees eerst ALLE vragen door van beide delen (3 min) â€” plan je tijd voor elk deel', min: 3 },
          { type: 'schrijf', text: 'Theorie-deel: begin bij wat je zeker weet â€” bouw vertrouwen op, dan de rest', min: 0 },
          { type: 'schrijf', text: 'Theorie-deel: ~90 min beschikbaar â€” 8â€“10 min per vraag gemiddeld', min: 90 },
          { type: 'code', text: 'SageMath-deel: codeer ZONDER spiekblad te raadplegen â€” enkel noodanker', min: 0 },
          { type: 'nakijk', text: 'Laatste 10 min: controleer theorie-antwoorden + test SageMath-code op eenvoudig geval', min: 10 },
        ]},
      ]
    },
  ]
}

]; // end weeks

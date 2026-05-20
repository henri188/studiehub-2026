// WR Oefentool — vragenbank
// Gebaseerd op theorie-examenvragen uit de WetRek exam-repo (UGent DERP)

var wrCategories = [
  { value: 'H2', label: 'H2: Lineaire Stelsels' },
  { value: 'H3', label: 'H3: Kleinste Kwadraten (KKP)' },
  { value: 'H4', label: 'H4: Eigenwaarden & Eigenvectoren' },
  { value: 'H5', label: 'H5: Niet-lineaire Vergelijkingen' },
  { value: 'H7', label: 'H7: Interpolatie' },
  { value: 'H8', label: 'H8: Integratie & Differentiatie' },
  { value: 'H9', label: 'H9: ODE\'s — Beginwaardeproblemen' },
  { value: 'H12', label: 'H12: Fourier-transformaties' },
];

var wrQuestions = [

  // ─── H2: LINEAIRE STELSELS ─────────────────────────────────────────────────

  {
    cat: 'H2', year: 'algemeen',
    q: 'Wanneer is een vierkante matrix A niet-singulier? Geef minstens vier equivalente uitspraken.',
    hint: 'Denk aan: inverse, determinant, rang, nulruimte.',
    answer: 'A is niet-singulier als en slechts als:\n1. A⁻¹ bestaat\n2. det(A) ≠ 0\n3. rang(A) = n (volledige rang)\n4. Az ≠ 0 voor elke vector z ≠ 0 (de nulruimte is triviaal)\n\nAls A niet-singulier is, heeft Ax = b een unieke oplossing x = A⁻¹b.\nAls A singulier is: ofwel oneindig veel oplossingen (b in kolomruimte), ofwel geen.'
  },
  {
    cat: 'H2', year: 'algemeen',
    q: 'Geef de drie eigenschappen die elke norm moet voldoen.',
    hint: 'Positiviteit, homogeniteit, driehoeksongelijkheid.',
    answer: 'Voor elke norm ‖·‖ geldt:\n1. ‖x‖ > 0 als x ≠ 0  (en ‖0‖ = 0)\n2. ‖αx‖ = |α|·‖x‖  voor elk scalair α  (absolute homogeniteit)\n3. ‖x + y‖ ≤ ‖x‖ + ‖y‖  (driehoeksongelijkheid)\n\nSpecifieke normen:\n  ‖x‖₁ = Σ|xᵢ|\n  ‖x‖₂ = √(Σxᵢ²)\n  ‖x‖_∞ = max|xᵢ|\n\nGeïnduceerde matrixnorm: ‖A‖ = max_{x≠0} ‖Ax‖/‖x‖'
  },
  {
    cat: 'H2', year: 'algemeen',
    q: 'Wat is het conditiegetal cond(A) van een matrix? Wat zegt het over de gevoeligheid van het stelsel Ax = b?\n\nGeef ook de gebonden fout op de oplossing als b verstoord wordt met Δb.',
    hint: 'cond = ‖A‖·‖A⁻¹‖. De relatieve fout op x is begrensd door cond(A) × relatieve fout op b.',
    answer: 'Definitie:\n  cond(A) = ‖A‖·‖A⁻¹‖  (geldt voor elke consistente norm)\n  cond(A) ≥ 1 altijd\n  cond(γA) = cond(A)  (schaalinvariant)\n  cond(A) = ∞ als A singulier\n\nBegrenzing fout bij verstoring Δb:\n  ‖Δx‖/‖x‖ ≤ cond(A)·‖Δb‖/‖b‖\n\nInterpretatie: als cond(A) = 10⁶, dan kan een relatieve inputfout van 10⁻¹⁰\neen relatieve fout van 10⁻⁴ op x geven → 6 decimalen verloren.\n\nVoor diagonaalmatrices: cond = |grootste element| / |kleinste element|.'
  },
  {
    cat: 'H2', year: 'algemeen',
    q: 'Een benaderde oplossing x̂ van Ax = b heeft een klein residu r = b − Ax̂.\nBetekent dit dat x̂ een goede benadering is van de exacte oplossing x?\n\nGeef een tegenvoorbeeld of bewijs je antwoord.',
    hint: 'Klein residu ≠ kleine fout. Wat heeft het met het conditiegetal te maken?',
    answer: 'NEE — een klein residu garandeert GEEN kleine fout als A slecht geconditioneerd is.\n\nDe relatie is:\n  ‖x̂ − x‖/‖x‖ ≤ cond(A)·‖r‖/(‖A‖·‖x‖)\n\nAls cond(A) groot is, kan ‖r‖ klein zijn maar ‖x̂ − x‖ toch groot.\n\nTegenvoorbeeld: neem de Hilbert-matrix H_n (cond ≈ 10^{4n}). Een kleine\nperturbatie van b geeft een volledig andere oplossing, maar het residu\nb − Hx̂ kan toch klein zijn.\n\nContraintuitief maar cruciaal: ALTIJD ook het conditiegetal controleren!'
  },
  {
    cat: 'H2', year: 'algemeen',
    q: 'Beschrijf de LU-factorisatie: wat is L, wat is U, hoe gebruik je ze om Ax = b op te lossen?\nWat is de complexiteit?',
    hint: 'Twee driehoeksstelsels oplossen. Eenmalige factorisatie, meerdere rechterleden.',
    answer: 'LU-factorisatie: A = LU\n  L = benedentriangulaire matrix met enen op de diagonaal\n  U = boventriangulaire matrix\n\nOplossen van Ax = b:\n  Stap 1: Los Ly = b op via voorwaartse substitutie  O(n²)\n  Stap 2: Los Ux = y op via achterwaartse substitutie  O(n²)\n\nKosten:\n  Factorisatie A = LU:  O(n³/3)\n  Substitutie per rechterlid b:  O(n²)\n  → ideaal als je meerdere stelsels Axᵢ = bᵢ moet oplossen (LU éénmaal)\n\nMet partiële pivotering: PA = LU\n  → rijen omwisselen zodat |pivot| maximaal is in elke kolom\n  → ALTIJD gebruiken voor numerieke stabiliteit'
  },
  {
    cat: 'H2', year: 'algemeen',
    q: 'Wat is partiële pivotering bij Gaussische eliminatie? Waarom is het nodig?\nVerschil met complete pivotering?',
    hint: 'Pivot = deler. Wat als de deler (bijna) nul is?',
    answer: 'Partiële pivotering: bij de k-de elimineerstap kies je als pivot het element\nmet de grootste absolute waarde in kolom k, op of onder de diagonaal.\nDit vereist een rijruil → PA = LU (P = permutatiesmatrix).\n\nWaarom nodig:\n  Zonder pivotering kan je door een heel klein getal delen → grote\n  afrondingsfouten. Zelfs als A niet-singulier is, kan Gaussische\n  eliminatie zonder pivotering instabiel zijn.\n\nComplete pivotering: kies het grootste element uit de volledige overblijvende\nsubmatrix → PAQ = LU. Beter qua stabiliteit maar zelden de moeite waard\n(duurder + partiële pivotering volstaat bijna altijd in praktijk).\n\nResultaat na partiële pivotering:\n  ‖r‖/(‖A‖·‖x̂‖) ≤ ρ·n²·ε_mach  (met ρ = growth factor ≈ 1 in praktijk)'
  },
  {
    cat: 'H2', year: 'algemeen',
    q: 'Vergelijk de Jacobi-methode en de Gauss-Seidel-methode voor het iteratief oplossen van Ax = b.\nWanneer convergeert elk? Wat is het verschil in implementatie?',
    hint: 'Overschrijven of niet? Spectrale straal van de iteratiematrix.',
    answer: 'Beide splitsen A = D + L + U (D diagonaal, L/U strikt onder-/boventriangulair).\n\nJacobi:  x^{k+1} = D⁻¹(b − (L+U)x^k)\n  → bereken ALLE nieuwe x^{k+1} uit de OUDE x^k (geen overschrijven!)\n  → parallelliseerbaar\n  → iteratiematrix G_J = −D⁻¹(L+U)\n\nGauss-Seidel:  x^{k+1} = (D+L)⁻¹(b − Ux^k)\n  → gebruik meteen nieuwe waarden zodra beschikbaar (overschrijven OK)\n  → sequentieel\n  → iteratiematrix G_GS = −(D+L)⁻¹U\n\nConvergentie voor beide: ρ(G) < 1 (spectrale straal < 1)\nGauss-Seidel convergeert in het algemeen sneller.\nBeide convergeren gegarandeerd als A strikt diagonaaldominant is.'
  },

  // ─── H3: KKP ──────────────────────────────────────────────────────────────

  {
    cat: 'H3', year: 'algemeen',
    q: 'Wat is een lineair kleinste-kwadratenprobleem (KKP)? Wanneer ontstaat het?\nFormuleer het wiskundig.',
    hint: 'Meer vergelijkingen dan onbekenden: m > n. Geen exacte oplossing.',
    answer: 'Een KKP ontstaat bij een overgedetermineerd stelsel Ax ≈ b met A ∈ ℝ^{m×n}, m > n.\nEr bestaat geen exacte oplossing, dus we minimaliseren het residu:\n\n  min_x ‖b − Ax‖²₂\n\nDe minimaliserende x̂ heet de kleinste-kwadratenoplossing.\nHet residu r = b − Ax̂ staat loodrecht op de kolomruimte van A:\n  Aᵀr = 0  →  Aᵀ(b − Ax̂) = 0  →  Aᵀ·A·x̂ = Aᵀ·b\n\nToepassing: data-fitting, regressie, overdetermined stelsels in meetkunde.'
  },
  {
    cat: 'H3', year: 'algemeen',
    q: 'Leid de normaalvergelijking af voor het KKP.\nWat is de pseudo-inverse A⁺?',
    hint: 'Differentieer ‖b − Ax‖² naar x en stel gelijk aan nul.',
    answer: 'Afleiding:\n  f(x) = ‖b − Ax‖²₂ = (b − Ax)ᵀ(b − Ax)\n       = bᵀb − 2xᵀAᵀb + xᵀAᵀAx\n\n  ∇_x f(x) = −2Aᵀb + 2AᵀAx = 0\n  →  AᵀAx = Aᵀb  (normaalvergelijking)\n\nAls AᵀA niet-singulier (rang(A)=n):\n  x̂ = (AᵀA)⁻¹·Aᵀ·b = A⁺·b\n\nPseudo-inverse:\n  A⁺ = (AᵀA)⁻¹Aᵀ  (enkel als rang(A) = n)\n\nProbleem met normaalvergelijkingen: conditiegetal verdubbelt!\n  cond(AᵀA) = [cond(A)]²\n→ gebruik liever QR-factorisatie.'
  },
  {
    cat: 'H3', year: 'algemeen',
    q: 'Hoe los je een KKP op via QR-factorisatie?\nWat zijn de stappen? Waarom is dit beter dan de normaalvergelijking?',
    hint: 'A = Q₁R. Wat wordt de minimalisatieconditie na vermenigvuldiging met Qᵀ?',
    answer: 'QR-aanpak (aanbevolen):\n  1. Bereken volledige QR-factorisatie: A = Q·[R; O]\n     met Q orthogonaal m×m, R boventriangulair n×n\n  2. Omdat Q orthogonaal is: ‖b−Ax‖₂ = ‖Qᵀ(b−Ax)‖₂\n     Stel c = Qᵀb = [c₁; c₂] met c₁ ∈ ℝⁿ\n  3. ‖b−Ax‖² = ‖c₁ − Rx‖² + ‖c₂‖² → minimaliseer door Rx = c₁\n  4. Los Rx = c₁ op (achterwaartse substitutie)\n  5. Minimale residu = ‖c₂‖₂\n\nVoordelen t.o.v. normaalvergelijkingen:\n  • Conditiegetal gedraagt zich als cond(A), NIET [cond(A)]²\n  • Numeriek stabieler (Householder behoudt orthogonaliteit precies)\n  • Foutanalyse: relatieve fout ~ cond(A) + ‖r‖·[cond(A)]²'
  },
  {
    cat: 'H3', year: 'algemeen',
    q: 'Wat is een Householder-transformatie?\nHoe bereken je de vector v gegeven een vector a zodat Ha de x-as raakt?',
    hint: 'H = I − 2vvᵀ/(vᵀv). Kies α met het juiste teken om cancellation te vermijden.',
    answer: 'Householder-transformatie:\n  H = I − 2vvᵀ/(vᵀv)\n  H is symmetrisch (Hᵀ=H) en orthogonaal (H⁻¹=H, H²=I)\n\nConstructie: gegeven vector a, zoek H zodat Ha = αe₁ (meervoud van e₁):\n  α = −sign(a₁)·‖a‖₂   (teken tegengesteld aan a₁ → vermijdt cancellation)\n  v = a − αe₁\n  H = I − 2vvᵀ/(vᵀv)\n\nH nooit expliciet berekenen! Gebruik altijd:\n  Hu = u − 2(vᵀu)/(vᵀv)·v  (O(n) per vector i.p.v. O(n²))\n\nHouseholder QR: pas n opeenvolgende Householder-transformaties toe\nop de kolommen van A → Hₙ···H₁A = [R; O]'
  },

  // ─── H4: EIGENWAARDEN ─────────────────────────────────────────────────────

  {
    cat: 'H4', year: 'algemeen',
    q: 'Wat zegt de stelling van Gershgorin over de eigenwaarden van een matrix A?',
    hint: 'Schijven met middelpunt a_{kk} en straal = som buitendiagonaalelementen in die rij.',
    answer: 'Stelling van Gershgorin:\nAlle eigenwaarden van A liggen in de unie van n Gershgorin-schijven:\n\n  Dₖ = { z ∈ ℂ : |z − aₖₖ| ≤ Rₖ }  met  Rₖ = Σ_{j≠k} |aₖⱼ|\n\nElke eigenwaarde ligt in minstens één schijf.\nDeze stelling geeft een snelle bovengrens op de eigenwaarden zonder berekening.\n\nVoordelen:\n  • Eenvoudig: enkel de rijsommen nodig\n  • Geeft ook informatie over de reëelheid van eigenwaarden (bijv. als alle\n    schijven op de reële as liggen)\n\nUitbreiding: k samengevoegde schijven bevatten precies k eigenwaarden.'
  },
  {
    cat: 'H4', year: 'algemeen',
    q: 'Beschrijf de machtiteratie voor het berekenen van eigenwaarden.\nWaarnaar convergeert de methode, en hoe snel?\nWanneer faalt ze?',
    hint: 'Dominante eigenwaarde. Convergentie ∝ |λ₂/λ₁|.',
    answer: 'Machtiteratie:\n  1. Kies willekeurige startvector x₀\n  2. y_{k+1} = A·xₖ\n  3. x_{k+1} = y_{k+1}/‖y_{k+1}‖  (normeer)\n  4. Eigenwaardeschatting: λ ≈ Rayleigh-quotiënt ρ(xₖ)\n  5. Herhaal tot convergentie\n\nConvergentie:\n  Xₖ → eigenvector van de dominante eigenwaarde λ₁ (grootste |λᵢ|)\n  Snelheid: fout ∝ |λ₂/λ₁|^k\n  → snel als |λ₂| ≪ |λ₁|; traag als |λ₂| ≈ |λ₁|\n\nWaarom het werkt: bij herhaling worden alle componenten evenredig\nmet e^{k·ln|λᵢ|} geschaald → de dominante eigenruimte wint.\n\nFaalt als:\n  • Startvector geen component in dominante eigenvector (theoretisch;\nin praktijk geeft afrondingsfout altijd een kleine component)\n  • |λ₁| = |λ₂| (twee dominante eigenwaarden gelijke modulus)\n  • Eigenwaarde λ₁ = 0'
  },
  {
    cat: 'H4', year: 'algemeen',
    q: 'Wat is het nut van een shift σ bij machtiteratie of inverse iteratie?\nHoe beïnvloedt de shift de convergentie?',
    hint: 'Pas de matrix aan: (A − σI). Welke eigenwaarde wordt dan dominant?',
    answer: 'Shift σ bij machtiteratie op (A − σI):\n  Eigenwaarden van (A − σI) zijn λᵢ − σ\n  Machtiteratie convergeert nu naar de eigenwaarde waarvoor |λᵢ−σ| maximaal is\n  → nuttig om een specifieke eigenwaarde te targeten\n\nInverse iteratie met shift σ:\n  Los (A − σI)·yₖ₊₁ = xₖ op (LU éénmaal)\n  Eigenwaarden van (A − σI)⁻¹ zijn 1/(λᵢ−σ)\n  → de eigenwaarde DICHTST bij σ is nu dominant\n  → convergentiesnelheid: |λⱼ−σ|/|λₖ−σ| waarbij λₖ de doeleigenwaarde is\n  → als σ ≈ λₖ: zeer snelle convergentie\n\nRayleigh-quotiënt-iteratie: kies σₖ = Rayleigh-quotiënt(xₖ) → kubisch convergent.'
  },
  {
    cat: 'H4', year: 'algemeen',
    q: 'Bespreek de conditionering van eigenwaarden.\nWanneer zijn eigenwaarden goed/slecht geconditioneerd?\nWat is de rol van de eigenvectormatrix X?',
    hint: 'Gelijkvormige matrices. cond(X), niet cond(A). Symmetrische matrices: bijzonder geval.',
    answer: 'Conditionering van eigenwaarden:\nAls Â = A + E (perturbatie E), dan voor eigenwaarde λₖ:\n  |Δλₖ| ≤ cond₂(X)·‖E‖₂\n\nmet X de eigenvectormatrix (A = XDX⁻¹).\n\nVoor een enkelvoudige eigenwaarde (nauwkeuriger):\n  |Δλₖ| ≤ (1/|yₖᴴxₖ|)·‖E‖₂ = (1/cos θ)·‖E‖₂\n  met θ de hoek tussen links- en rechtse eigenvector\n\nBelangrij ke inzichten:\n  • Conditionering hangt af van cond(X), NIET van cond(A)!\n  • Een goed-geconditioneerde matrix A kan slecht-geconditioneerde\n    eigenwaarden hebben als de eigenvectoren bijna lineair afhankelijk zijn\n  • Symmetrische/hermitische matrices: X orthogonaal → cond(X)=1\n    → eigenwaarden altijd goed geconditioneerd (|Δλ| ≤ ‖E‖₂)\n  • Meervoudige eigenwaarden: altijd slecht geconditioneerd'
  },

  // ─── H5: NIET-LINEAIRE VERGELIJKINGEN ─────────────────────────────────────

  {
    cat: 'H5', year: 'algemeen',
    q: 'Beschrijf de Newton-Raphson methode voor het oplossen van f(x) = 0 in 1D.\nWat is de convergentieorde bij een enkelvoudige wortel? Bij een m-voudige wortel?',
    hint: 'Raaklijnmethode. Kwadratisch voor enkelvoudig, lineair voor meervoudig.',
    answer: 'Newton-Raphson (1D):\n  x_{k+1} = xₖ − f(xₖ)/f\'(xₖ)\n\nGeometrisch: trek raaklijn aan f in xₖ → nulpunt van raaklijn = x_{k+1}\n\nConvergentie bij enkelvoudige wortel (m=1):\n  Kwadratisch: ‖e_{k+1}‖ ≈ C·‖eₖ‖²\n  → # correcte decimalen verdubbelt per stap\n  → lokaal: vereist goed startpunt\n\nConvergentie bij m-voudige wortel (m>1):\n  Lineair: eₖ₊₁ ≈ (1 − 1/m)·eₖ\n  → traag als m groot is\n\nRemedie voor meervoudige wortels:\n  Definieer h(x) = f(x)/f\'(x) → h heeft enkel enkelvoudige wortels\n  → Newton op h convergeert kwadratisch\n\nNewton in nD:\n  Los J(xₖ)·sₖ = f(xₖ) op → x_{k+1} = xₖ − sₖ\n  Convergeert kwadratisch als J(x*) niet-singulier'
  },
  {
    cat: 'H5', year: 'algemeen',
    q: 'Bespreek de halveringsmethode. Hoe snel convergeert ze?\nHoeveel iteraties zijn nodig voor een tolerantie tol?',
    hint: 'Tekenwissel. Lineaire convergentie. k > log₂((b−a)/tol).',
    answer: 'Halveringsmethode:\n  Vereiste: f(a)·f(b) < 0 (tekenwissel → Tussenwaardestelling: wortel in [a,b])\n  Elke stap: m = (a+b)/2; als f(a)·f(m) < 0 → b = m, anders a = m\n\nConvergentie:\n  Na k stappen: lengte interval = (b−a)/2^k\n  Lineaire convergentie met C = 0.5\n  Elke stap wint precies 1 bit precisie\n\nAantal iteraties voor tolerantie tol:\n  (b−a)/2^k ≤ tol  →  k ≥ log₂((b−a)/tol)\n\nVoordelen: robuust, gegarandeerde convergentie (als f continu), simpel\nNadelen: traag, niet veralgeenbaar naar nD\n\nVerband met conditiegetal:\n  Het wortelzoekprobleem heeft cond = 1/|f\'(x*)|\n  Bij halveringsmethode speelt dit geen rol (geometrisch, teken-gebaseerd)'
  },
  {
    cat: 'H5', year: 'algemeen',
    q: 'Wanneer convergeert vaste-punt-iteratie x_{k+1} = g(xₖ)?\nBespreek de convergentievoorwaarden en -snelheid.',
    hint: '|g\'(x*)| < 1 lokaal. Kwadratisch als g\'(x*) = 0.',
    answer: 'Vaste-punt-iteratie: x_{k+1} = g(xₖ)\n\nConvergentievoorwaarden (1D):\n  Lokale convergentie: |g\'(x*)| < 1\n  C = |g\'(x*)| is de lineaire convergentieconstante\n\nConvergentiesnelheid:\n  Lineair met C = |g\'(x*)| als g\'(x*) ≠ 0\n  Kwadratisch als g\'(x*) = 0\n\nGlobale convergentie: als g : [a,b] → [a,b] en |g\'(x)| ≤ L < 1 overal\n→ Banach-contract: eenduidig vast punt, convergentie gegarandeerd\n\nVerband met Newton:\n  Newton is g(x) = x − f(x)/f\'(x)\n  g\'(x*) = 0 bij enkelvoudige wortel → kwadratisch!\n\nnD-veralgemening:\n  Lokale convergentie als spectrale straal ρ(J_g(x*)) < 1\n  Kwadratisch als J_g(x*) = O'
  },
  {
    cat: 'H5', year: 'algemeen',
    q: 'Vergelijk Newton-Raphson, de secantmethode en de halveringsmethode:\nconvergentieorde, kosten per iteratie, voor- en nadelen.',
    hint: 'r=2, r≈1.618, r=1. Afgeleide nodig of niet?',
    answer: 'Vergelijking methoden:\n\n| Methode       | Orde r  | Kost/stap  | Voordelen          | Nadelen              |\n|---------------|---------|------------|--------------------|----------------------|\n| Halvering     | 1 (C=½) | 1 eval f   | Robuust, gegarandeerd | Traag, niet nD     |\n| Vaste-punt    | 1       | 1 eval g   | Eenvoudig          | Lokaal, traag        |\n| Newton (1D)   | 2       | 1 eval f+f\'| Snel               | Lokaal, f\' nodig     |\n| Secant        | ≈1.618  | 1 eval f   | Geen f\' nodig      | Lokaal, 2 startpunt  |\n| Newton (nD)   | 2       | n² eval    | Snel (nD)          | Lokaal, J nodig      |\n\nSecantmethode: x_{k+1} = xₖ − f(xₖ)·(xₖ−x_{k-1})/(f(xₖ)−f(x_{k-1}))\n  → benadert f\' met eindige differentie\n  → superlineaire convergentie r ≈ (1+√5)/2 ≈ 1.618\n  → twee startpunten nodig'
  },

  // ─── H7: INTERPOLATIE ─────────────────────────────────────────────────────

  {
    cat: 'H7', year: 'algemeen',
    q: 'Wat is het Runge-verschijnsel?\nHoe vermijd je het?',
    hint: 'Hoge-graads veelterm + equidistante punten = oscillaties aan de randen.',
    answer: 'Runge-verschijnsel:\nBij interpolatie met een hoge-graads veelterm door equidistante punten\nontstaan grote oscillaties, vooral nabij de randen van het interval.\n\nVoorbeeld: f(x) = 1/(1+25x²) op [−1,1] met equidistante punten:\n→ voor n > ~10 begint de interpolerende veelterm wild te oscilleren.\n\nOorzaak: het product ω(t) = ∏(t−tᵢ) is voor equidistante punten\nsterk geconcentreerd aan de randen → grote foutfactor.\n\nOplossingen:\n  1. Chebyshev-punten: tᵢ = cos((2i−1)π/(2n)) → minimaliseren max|ω(t)|\n     → equidistante verdeling in hoek, meer punten naar de randen\n  2. Stuksgewijze interpolatie: gebruik lage-graads veeltermen per interval\n     → kubische splines vermijden Runge volledig\n  3. Begrensde graad: gebruik nooit te hoge-graads globale veeltermen'
  },
  {
    cat: 'H7', year: 'algemeen',
    q: 'Geef de interpolatiefoutformule voor een veelterm van graad n−1 door n punten.\nBespreek de factoren: wat is M? wat is h?',
    hint: 'f(t) − p_{n-1}(t) = f^{(n)}(ξ)/n! · ∏(t−tᵢ). Bovengrens: M·h^n/(4n).',
    answer: 'Interpolatiefoutformule:\n  f(t) − p_{n-1}(t) = f^{(n)}(ξ)/n! · ∏ᵢ(t−tᵢ)   (ξ = onbekend punt in interval)\n\nBovengrens:\n  max_{t} |f(t) − p_{n-1}(t)| ≤ M·h^n/(4n)\n\n  M = max|f^{(n)}(t)| op het interval (smoothness-maat)\n  h = maximale knoopafstand (voor equidistante knopen: h = (b−a)/(n−1))\n  n = aantal knooppunten (graad = n−1)\n\nInterpretatie:\n  • Gladde functies (kleine M): kleine fout ook voor lage n\n  • Kleine knoopafstand h: fout daalt als hⁿ → meer punten helpt\n  • n! in de noemer wordt groot → maar hⁿ daalt ook snel\n  • Met Chebyshev-punten: min_t max|∏(t−tᵢ)| = (b−a)^n/(2^{2n-1})\n    → min-max optimaal voor de interpolatiefout'
  },
  {
    cat: 'H7', year: 'algemeen',
    q: 'Wat is het verschil tussen kubische Hermite-interpolatie en kubische spline-interpolatie?\nWelke is glaider? Welke geeft meer controle?',
    hint: 'Hermite: je geeft de afgeleiden op. Spline: automatisch glad (C²), 2 vrije parameters.',
    answer: 'Kubische Hermite-interpolatie:\n  Stuksgewijze graad-3 veelterm per interval [tᵢ, t_{i+1}]\n  C¹: continue eerste afgeleide in de knopen\n  Invoer: functiewaarden én eerste afgeleiden in elke knoop\n  4 parameters per interval → volledig bepaald door f(tᵢ), f\'(tᵢ), f(t_{i+1}), f\'(t_{i+1})\n  Voordeel: meer controle (monotoniciteit, convexiteit te bewaren)\n  Nadeel: je moet de afgeleiden kennen of benaderen\n\nKubische spline:\n  Stuksgewijze graad-3 veelterm\n  C²: twee keer continu afleidbaar in alle knopen\n  N−1 intervallen → 4(N−1) parameters\n  Bepaald door: N interpolatieconstraints + C² in N−2 interne knopen + 2 randcondities\n  Randcondities bv.: natuurlijke spline f\'\'(a)=f\'\'(b)=0\n  Voordeel: automatisch glaider (C² i.p.v. C¹), geen afgeleiden nodig\n  Nadeel: minder lokale controle; aanpassing van één knoop beïnvloedt het hele spline'
  },

  // ─── H8: INTEGRATIE ───────────────────────────────────────────────────────

  {
    cat: 'H8', year: 'algemeen',
    q: 'Leid de Simpsonregel af via de methode der onbepaalde coëfficiënten.\nWat is de graad van nauwkeurigheid? Wat is de fout?',
    hint: 'Drie knopen: a, (a+b)/2, b. Stel exact voor 1, t, t². Graad is 3, niet 2!',
    answer: 'Methode der onbepaalde coëfficiënten voor S(f) = w₁f(a) + w₂f(m) + w₃f(b), m=(a+b)/2:\n\nStel dat de formule exact is voor 1, t, t²:\n  Exact voor 1:   w₁ + w₂ + w₃ = b−a\n  Exact voor t:   w₁a + w₂m + w₃b = (b²−a²)/2\n  Exact voor t²:  w₁a² + w₂m² + w₃b² = (b³−a³)/3\n\nOplossing:\n  w₁ = (b−a)/6,  w₂ = 4(b−a)/6,  w₃ = (b−a)/6\n\nSimpsonregel: S(f) = (b−a)/6·(f(a) + 4f((a+b)/2) + f(b))\n\nGraad van nauwkeurigheid = 3 (niet 2!):\n  Exact voor t³: door symmetrie heft de fout zich op\n  Niet exact voor t⁴ (algemeen)\n\nFoutformule:\n  S(f) − I(f) = −(b−a)⁵/2880·f⁴(ξ)  voor ξ ∈ (a,b)\n\nRelatie: S = (2M + T)/3 (gewogen gemiddelde middelpunt en trapezium)'
  },
  {
    cat: 'H8', year: 'algemeen',
    q: 'Waarom is Gaussische kwadratuur nauwkeuriger dan Newton-Cotes bij hetzelfde aantal evaluaties?\nWat is de graad van nauwkeurigheid van een n-punts Gauss-regel?',
    hint: 'Gauss kiest zowel knopen als gewichten optimaal. Graad = 2n−1.',
    answer: 'Newton-Cotes: equidistante knopen → keuze = alleen gewichten\n  → n-punts regel heeft graad n−1 (of n voor sommige n)\n\nGaussische kwadratuur: knopen én gewichten worden optimaal gekozen\n  → n-punts regel heeft graad 2n−1\n  → verdubbeling van de graad bij hetzelfde aantal evaluaties!\n\nKnopen: nulpunten van de Legendre-veelterm P_n op [−1,1]\nGewichten: altijd positief → numeriek stabiel\n\nInterval omzetten ALTIJD:\n  ∫_a^b g(t)dt = (b−a)/2·∫_{-1}^{1} g((a+b)/2 + (b−a)/2·x)dx\n\nNadeel: niet progressief\n  → evaluaties van Q_n kunnen niet hergebruikt worden voor Q_{n+1}\n  → gebruik Kronrod-extensies of Gauss-Lobatto als hergebruik gewenst\n\nConvergentie: exponentieel snel voor gladde functies'
  },
  {
    cat: 'H8', year: 'algemeen',
    q: 'Waarom is integratie goed geconditioneerd en numerieke differentiatie slecht geconditioneerd?',
    hint: 'Integratie middelt fouten uit; differentiatie vergroot kleine verstoringen.',
    answer: 'Integratie — goed geconditioneerd:\n  Absoluut conditiegetal: |I(f+δ) − I(f)| ≤ (b−a)·‖δ‖_∞\n  → relatieve invoerstoring ε_mach geeft fout ≤ (b−a)·ε_mach\n  → integratie middelt/dempt kleine verstoringen uit\n  → altijd goed geconditioneerd (absoluut conditiegetal ≤ b−a)\n\nDifferentiatie — slecht geconditioneerd:\n  Kleine perturbatie δ in f → grote verstoring in f\'\n  Centrale differentie: f\'(x) ≈ (f(x+h)−f(x−h))/(2h)\n  → afrondingsfout: ~2ε_mach/h (groot voor kleine h!)\n  → afknottingsfout: ~h²|f\'\'\'(x)|/6 (groot voor grote h)\n  → optimale h: minimaliseer som → h_opt ≈ (3ε_mach/|f\'\'\'|)^{1/3}\n  → conflicterende eisen: h klein = precies maar afronding; h groot = stabiel maar afknot\n\nConclusie: integratie is inherent stabiel; differentiatie is inherent onstabiel.'
  },
  {
    cat: 'H8', year: 'algemeen',
    q: 'Wat is Richardson-extrapolatie? Hoe werkt Romberg-integratie?\nGeef de Richardson-formule.',
    hint: 'Elimineer de leidende foutterm door twee schattingen te combineren.',
    answer: 'Richardson-extrapolatie:\nAls F(h) = F(0) + C·h^p + O(h^r) met r > p, dan:\n\n  F(0) ≈ (F(h) − q^p·F(h/q)) / (1 − q^p)\n\nDoor F(h) en F(h/q) te combineren wordt de O(h^p)-foutterm geëlimineerd.\nResultaat heeft hogere orde: O(h^r).\n\nRomberg-integratie:\n  Bereken samengestelde trapeziumregel T(h), T(h/2), T(h/4), ...\n  T(h) = I + C₂h² + C₄h⁴ + ... (alleen even machten!)\n  Pas Richardson toe op opeenvolgende paren: T_{k,j} = (4^j·T_{k,j-1} − T_{k-1,j-1})/(4^j−1)\n  Bouw Romberg-tabel op → snel convergent\n\nVoordeel: hoge orde nauwkeurigheid met eenvoudige trapeziumregel als basis\n  → n halveringen → O(h^{2n})-fout\n  → equivalent aan Gauss-Legendre qua convergentie voor gladde functies'
  },

  // ─── H9: ODE's ────────────────────────────────────────────────────────────

  {
    cat: 'H9', year: 'algemeen',
    q: 'Beschrijf de Euler-methode voor ODE\'s.\nWat is de orde? Wanneer is de methode stabiel?\nWaarom is Euler niet geschikt voor stijve DV\'s?',
    hint: 'y_{k+1} = y_k + h·f(t_k,y_k). Stabiel: |1+hλ| ≤ 1.',
    answer: 'Euler-methode (expliciet):\n  y_{k+1} = yₖ + h·f(tₖ, yₖ)\n\nOrde:\n  Lokale fout: O(h²)  (Taylor-ontwikkeling afbreken na 1e term)\n  Globale fout: O(h)  (één orde lager dan lokaal)\n\nStabiliteit (testprobleem y\' = λy, Re(λ) < 0):\n  y_{k+1} = (1 + hλ)·yₖ\n  Stabiel als |1 + hλ| ≤ 1\n  → voor reële λ < 0: h ≤ 2/|λ|\n  → stabiliteitgebied in het complexe hλ-vlak: schijf rond −1\n\nStijve DV — probleem:\n  Stijf = eigenwaarden sterk uiteenlopend, bijv. λ₁ ≈ −1, λ₂ ≈ −10⁶\n  Euler-stabiliteit vereist h ≤ 2/10⁶ → 10⁶ stappen voor t=1\n  Ook al is je interesse alleen in de trage component (λ₁)\n  → onpraktisch duur; gebruik impliciete methoden'
  },
  {
    cat: 'H9', year: 'algemeen',
    q: 'Vergelijk de expliciete Euler-methode met de achterwaartse (impliciete) Euler-methode.\nWelke is onvoorwaardelijk stabiel? Wat kost elke methode per stap?',
    hint: 'Impliciet = stelsel oplossen per stap. Maar geen stapgroottebeperking voor stabiliteit.',
    answer: 'Expliciete Euler:\n  y_{k+1} = yₖ + h·f(tₖ, yₖ)  (direct berekenen)\n  Kost per stap: 1 evaluatie van f\n  Stabiel: |1+hλ| ≤ 1 → h ≤ 2/|λ| (voorwaardelijk)\n  Orde 1\n\nAchterwaartse Euler (impliciet):\n  y_{k+1} = yₖ + h·f(t_{k+1}, y_{k+1})  (y_{k+1} staat ook rechts!)\n  Kost per stap: oplossen van (mogelijk niet-lineair) stelsel\n  Voor lineaire ODE y\'=Ay: (I−hA)·y_{k+1} = yₖ → LU-factorisatie\n  Stabiel: |1/(1−hλ)| ≤ 1 voor Re(λ)<0 en elke h>0 → ONVOORWAARDELIJK stabiel\n  Orde 1\n\nKeuze:\n  Niet-stijf: expliciete Euler (simpeler, goedkoper per stap)\n  Stijf: achterwaartse Euler of andere A-stabiele methode\n    (duurder per stap maar h veel groter → totaal minder stappen)'
  },
  {
    cat: 'H9', year: 'algemeen',
    q: 'Geef het Butcher-tableau van:\n(a) de expliciete Euler-methode\n(b) de achterwaartse Euler-methode\n(c) de klassieke RK4-methode',
    hint: 'Butcher-tableau: matrix [c | a; _ | b]. Rijen = tussenstappen, gewichten b.',
    answer: '(a) Expliciete Euler:\n  0 | 0\n  ------\n    | 1\n\n(b) Achterwaartse Euler:\n  1 | 1\n  ------\n    | 1\n\n(c) Klassiek RK4:\n  0   | 0   0   0   0\n  1/2 | 1/2 0   0   0\n  1/2 | 0   1/2 0   0\n  1   | 0   0   1   0\n  ---+------------------\n      | 1/6 1/3 1/3 1/6\n\nInterpretatie:\n  cᵢ = tijdspositie van tussenstap i\n  aᵢⱼ = gewichten voor eerder berekende k\'s\n  bᵢ = gewichten in de gewogen som voor y_{k+1}\n\nRK4 berekening:\n  k₁ = f(tₖ, yₖ)\n  k₂ = f(tₖ+h/2, yₖ+h/2·k₁)\n  k₃ = f(tₖ+h/2, yₖ+h/2·k₂)\n  k₄ = f(tₖ+h, yₖ+h·k₃)\n  y_{k+1} = yₖ + h/6·(k₁+2k₂+2k₃+k₄)'
  },

  // ─── H12: FOURIER ─────────────────────────────────────────────────────────

  {
    cat: 'H12', year: 'algemeen',
    q: 'Geef de formule voor de DFT en de inverse DFT.\nWat is de DC-component? Wat is de primitieve n-de eenheidswortel?',
    hint: 'ω_n = e^{−2πi/n}. Schaalfactor 1/n in de inverse!',
    answer: 'Primitieve n-de eenheidswortel:\n  ω_n = e^{−2πi/n}  (of soms e^{+2πi/n} afhankelijk van conventie)\n  Eigenschap: ω_n^n = 1\n\nDFT (Discrete Fourier Transformatie):\n  Xₖ = Σ_{j=0}^{n-1} xⱼ·ω_n^{jk}  voor k = 0, ..., n−1\n  Matrixvorm: X = F_n·x  met (F_n)_{jk} = ω_n^{jk}\n\nInverse DFT:\n  xⱼ = (1/n)·Σ_{k=0}^{n-1} Xₖ·ω_n^{−jk}  voor j = 0, ..., n−1\n  SCHAALFACTOR 1/n NIET VERGETEN!\n\nDC-component:\n  X₀ = Σ_{j=0}^{n-1} xⱼ  (som van alle waarden = n × gemiddelde)\n  Vertegenwoordigt de constante (nul-frequentie) component van het signaal'
  },
  {
    cat: 'H12', year: 'algemeen',
    q: 'Hoe werkt de FFT (Fast Fourier Transform)?\nWat is de complexiteit van DFT als matrixvermenigvuldiging vs. FFT?\nBeschrijf de Cooley-Tukey splitsing.',
    hint: 'Splits even/ongeraakte indices. Twee DFT\'s van n/2. Recursielf. O(n log n).',
    answer: 'Directe DFT (matrixvermenigvuldiging):\n  X = F_n·x vereist n² complexe vermenigvuldigingen → O(n²)\n\nFFT — Cooley-Tukey algoritme (n = macht van 2):\n  Splits x in even en ongeraakte indices:\n    x_even = [x₀, x₂, x₄, ...],  x_odd = [x₁, x₃, x₅, ...]\n\n  DFT-splitsing:\n    E = FFT(x_even)  [n/2 punts]\n    O = FFT(x_odd)   [n/2 punts]\n\n  Combineer (twiddle-factoren ω_n^k):\n    Xₖ       = Eₖ + ω_n^k·Oₖ         voor k = 0,...,n/2−1\n    X_{k+n/2} = Eₖ − ω_n^k·Oₖ         voor k = 0,...,n/2−1\n\n  Herhaal recursief → diepte log₂(n)\n  Totale kost: O(n·log₂n)\n\nVergelijking:\n  n = 1.000.000: DFT vereist 10¹² bewerkingen; FFT slechts ~20·10⁶\n  → factor n/log₂n ≈ 50.000 sneller!'
  },
  {
    cat: 'H12', year: 'algemeen',
    q: 'Wat is convolutie? Hoe maakt de FFT convolutie efficiënt?\nWat is het voordeel van wavelets ten opzichte van DFT?',
    hint: 'Convolutie in tijd = vermenigvuldiging in freq. Wavelets zijn tijds-frequentie gelokaliseerd.',
    answer: 'Convolutie:\n  (f*g)[n] = Σₖ f[k]·g[n−k]  (som van verschoven producten)\n  Directe berekening: O(n²)\n\nConvolutiestelling:\n  Convolutie in het tijddomein = vermenigvuldiging in het frequentiedomein:\n    FFT(f*g) = FFT(f) · FFT(g)  (puntsgewijze vermenigvuldiging)\n\nEfficiente convolutie via FFT:\n  1. Bereken X = FFT(f)  en  Y = FFT(g)\n  2. Bereken puntsgewijze Z = X·Y\n  3. Bereken f*g = IFFT(Z)\n  Totale kost: O(n·log n) i.p.v. O(n²)\n\nWavelets vs. DFT:\n  DFT: globale frequentie-informatie; vertelt WELKE frequenties aanwezig zijn\n       maar NIET WANNEER → niet geschikt voor niet-stationaire signalen\n\n  Wavelets: tijds-frequentie gelokaliseerde basisfuncties\n       → vertelt WANNEER en WELKE frequentie tegelijk\n       → ideaal voor: muziek, ECG, seismiek, beeldcompressie (JPEG 2000)\n\n  Haar-wavelet: eenvoudigste; stapsgewijze +1/−1 op deelintervallen'
  }

];

var wrReferenceCards = [
  {
    title: 'H2: Normen & Conditiegetal',
    body: '<b>p-norm:</b> ‖x‖_p = (Σ|xᵢ|^p)^{1/p}<br><b>1-norm:</b> Σ|xᵢ| &nbsp;·&nbsp; <b>∞-norm:</b> max|xᵢ|<br><b>Matrixnorm:</b> ‖A‖ = max_{x≠0} ‖Ax‖/‖x‖<br><b>Conditiegetal:</b> cond(A) = ‖A‖·‖A⁻¹‖ ≥ 1<br><b>Rel. fout:</b> ‖Δx‖/‖x‖ ≤ cond(A)·‖Δb‖/‖b‖<br><b>LU kost:</b> O(n³/3) factorisatie + O(n²) substitutie'
  },
  {
    title: 'H3: KKP & QR',
    body: '<b>KKP:</b> min_x ‖b − Ax‖²<br><b>Normaalvgl:</b> AᵀAx = Aᵀb<br><b>cond normaalvgl:</b> [cond(A)]² (gevaar!)<br><b>Householder v:</b> α = −sign(a₁)·‖a‖₂; v = a − αe₁<br><b>Hu:</b> u − 2(vᵀu)/(vᵀv)·v  (nooit H expliciet!)<br><b>QR-oplossing:</b> Rx = Q₁ᵀb'
  },
  {
    title: 'H4: Eigenwaarden',
    body: '<b>Gershgorin:</b> λ ∈ Dₖ = {z : |z−aₖₖ| ≤ Σ_{j≠k}|aₖⱼ|}<br><b>Machtiteratie:</b> xₖ = Axₖ₋₁/‖Axₖ₋₁‖; conv. ∝ |λ₂/λ₁|<br><b>Inv. iter. shift σ:</b> (A−σI)yₖ = xₖ₋₁<br><b>Rayleigh-quotiënt:</b> ρ(x) = xᵀAx/xᵀx<br><b>Conditionering:</b> |Δλ| ≤ cond(X)·‖E‖₂<br><b>Symm. matrices:</b> cond(X)=1 → altijd goed cond.'
  },
  {
    title: 'H5: Niet-lineaire Vergelijkingen',
    body: '<b>Newton (1D):</b> x_{k+1} = xₖ − f(xₖ)/f\'(xₖ)<br><b>Orde enk. wortel:</b> kwadratisch (r=2)<br><b>Orde m-voudig:</b> lineair (C=1−1/m)<br><b>Halvering:</b> na k stappen: (b−a)/2^k, C=0.5<br><b>Secant:</b> r ≈ 1.618; geen f\' nodig<br><b>Vaste-punt conv:</b> |g\'(x*)| < 1'
  },
  {
    title: 'H7: Interpolatie',
    body: '<b>Lagrange:</b> lⱼ(t) = ∏_{k≠j}(t−tₖ)/(tⱼ−tₖ)<br><b>Foutformule:</b> f^{(n)}(ξ)/n! · ∏(t−tᵢ)<br><b>Bovengrens:</b> M·h^n/(4n) met M=max|f^{(n)}|<br><b>Chebyshev-punten:</b> tᵢ=cos((2i−1)π/(2n))<br><b>Runge:</b> vermijd hoge graad+equidistante punten<br><b>Spline rand:</b> f\'\'(a)=f\'\'(b)=0 (natuurlijk)'
  },
  {
    title: 'H8: Kwadratuur',
    body: '<b>Trapezium:</b> (b−a)/2·(f(a)+f(b)); fout ∝ h³<br><b>Middelpunt:</b> (b−a)·f(m); fout ∝ h³/2 (beter!)<br><b>Simpson:</b> (b−a)/6·(f(a)+4f(m)+f(b)); graad=3<br><b>Gauss n-punts:</b> graad 2n−1; interval → [−1,1]!<br><b>Richardson:</b> (F(h)−q^p·F(h/q))/(1−q^p)<br><b>Diff. centraal:</b> (f(x+h)−f(x−h))/(2h); O(h²)'
  },
  {
    title: 'H9: ODE\'s',
    body: '<b>Euler:</b> y_{k+1} = yₖ + h·f(tₖ,yₖ); orde 1<br><b>Euler stabiel:</b> |1+hλ| ≤ 1 → h ≤ 2/|λ|<br><b>Achterw. Euler:</b> impliciet; onvw. stabiel<br><b>RK4:</b> orde 4; 4 evaluaties/stap<br><b>Stijf:</b> grote |Re(λ)| → gebruik impliciet<br><b>Globale fout:</b> O(h^p) als lokale fout O(h^{p+1})'
  },
  {
    title: 'H12: Fourier & FFT',
    body: '<b>DFT:</b> Xₖ = Σxⱼ·e^{−2πijk/n}<br><b>IDFT:</b> xⱼ = (1/n)·ΣXₖ·e^{+2πijk/n} — factor 1/n!<br><b>DC:</b> X₀ = Σxⱼ<br><b>FFT kost:</b> O(n·log n) vs. O(n²) DFT<br><b>Convolutie:</b> FFT(f*g) = FFT(f)·FFT(g)<br><b>Wavelet vs DFT:</b> tijds-frequentie gelokaliseerd'
  }
];

var wrExamTable = {
  title: 'Examenstructuur (theorie-examens uit de repo)',
  columns: ['13/14', '15/16', '17/18', '18/19', '19/20', '21/22'],
  rows: [
    {
      label: 'H2 — Lineaire stelsels',
      cells: ['Normen, LU', 'Conditiegetal', 'Pivotering, residu', 'Cholesky', 'Jacobi/GS', 'LU, cond']
    },
    {
      label: 'H3 — KKP',
      cells: ['QR, Householder', 'Normaalvgl', 'Householder', 'KKP fout', 'QR-afleiding', 'cond KKP']
    },
    {
      label: 'H4 — Eigenwaarden',
      cells: ['Machtiteratie', 'Gershgorin', 'Rayleigh', 'Inv. iteratie', 'Conditionering', 'Schur-vorm']
    },
    {
      label: 'H5 — Niet-lineair',
      cells: ['Newton conv.', 'Halvering', 'Vaste-punt', 'Newton nD', 'Secant', 'm-voudige wortel']
    },
    {
      label: 'H7 — Interpolatie',
      cells: ['Interpolatiefout', 'Chebyshev', 'Runge', 'Lagrange', 'Newton interp.', 'Spline']
    },
    {
      label: 'H8 — Integratie',
      cells: ['Simpson afleiding', 'Gauss kwad.', 'Richardson', 'Romberg', 'Diff. cond.', 'Newton-Cotes']
    },
    {
      label: 'H9 — ODE\'s',
      cells: ['Euler stabiel', 'Stijfheid', 'RK4', 'Impl. Euler', 'Butcher', 'Adams-LMM']
    },
    {
      label: 'H12 — Fourier',
      cells: ['DFT/IDFT', 'FFT principe', 'Complexiteit', 'Nyquist', 'Convolutie', 'Wavelets']
    }
  ]
};

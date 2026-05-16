// CA Studieplanner — weekdata
// Vereist window.isToday (gezet door planner-widgets.js)

var caWeeks = [
  // ===== WEEK 1: Fundamenten =====
  {
    label: "Week 1 â€” Fundamenten",
    subtitle: "Q1 + Q2 + Q3 leren, eerste aanraking",
    days: [
      {
        label: "Do", date: "15 mei", tag: "t-q1", tagText: "Q1",
        today: isToday('2026-05-15'),
        sessions: [
          { title: "Q1: Getallenstelsels â€” Theorie", time: "9â€“10u", dur: "45 min", tasks: [
            { text: "Lees STUDIEHULP: sectie Q1 volledig door", min: 10 },
            { text: "Zet de formule voor 2-complement op een blaadje (flip + 1, snel trucje)", min: 5 },
            { text: "Zet de Gray code omzettingsregels op een blaadje", min: 5 },
            { text: "Zet de IEEE 754 tabel (formaten + bias) op een blaadje", min: 10 },
            { text: "Doe Q1 van examen 2022 volledig met de hand", min: 15 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q1: Vlottende komma â€” Oefeningen", time: "10:15â€“11u", dur: "45 min", tasks: [
            { text: "Doe Q1 van examen 2021 (gray code + FP1|3|4 + BCD)", min: 15 },
            { text: "Doe Q1 van examen 2023 (octaal + bfloat16 hex + packed 10-comp)", min: 15 },
            { text: "Controleer je antwoorden via de oefentool of oplossingen", min: 10 },
            { text: "Schrijf op wat je fout had en waarom", min: 5 },
          ]},
        ]
      },
      {
        label: "Vr", date: "16 mei", tag: "t-q2", tagText: "Q2",
        today: isToday('2026-05-16'),
        sessions: [
          { title: "Q2: Assembly â€” Basis & registers", time: "9â€“9:45u", dur: "40 min", tasks: [
            { text: "Lees STUDIEHULP: sectie Q2 (registers, instructies, oproepconventie)", min: 15 },
            { text: "Schrijf de 6 argumentregisters en returnregister uit het hoofd op", min: 5 },
            { text: "Lees de assemblercode van examen 2025 (bc) zonder de C-code â€” begrijp wat elke instructie doet", min: 20 },
          ]},
          { title: "â˜• Pauze", time: "9:45â€“10u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q2: Functiewaarde traceren", time: "10â€“11u", dur: "60 min", tasks: [
            { text: "Traceer bc(3,1) volledig met pen en papier (schrijf alle oproepen op)", min: 15 },
            { text: "Traceer product(3,5) van examen 2023", min: 15 },
            { text: "Traceer isPalindroom('rotator') van examen 2021 (hint: 'rotator' is een palindroom)", min: 20 },
            { text: "Controleer je antwoorden", min: 10 },
          ]},
        ]
      },
      {
        label: "Za", date: "17 mei", tag: "t-q2", tagText: "Q2 CVG",
        today: isToday('2026-05-17'),
        sessions: [
          { title: "Q2: Controleverloopgraaf tekenen", time: "10â€“11u", dur: "55 min", tasks: [
            { text: "Lees STUDIEHULP: stappenplan voor CVG (basisblokken identificeren)", min: 5 },
            { text: "Teken de CVG van de bc-assemblercode (examen 2025) op papier", min: 20 },
            { text: "Teken de CVG van product-assemblercode (examen 2023)", min: 20 },
            { text: "Vergelijk met de oplossingen / check logica", min: 10 },
          ]},
          { title: "â˜• Pauze", time: "11â€“11:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q2: Stapel tekenen", time: "11:15â€“12u", dur: "40 min", tasks: [
            { text: "Lees over de stapelstructuur bij functieoproepen (STUDIEHULP)", min: 5 },
            { text: "Teken de stapel voor bc(3,1) op het moment van maximale diepte", min: 20 },
            { text: "Teken de stapel voor product(3,5) op maximale diepte", min: 15 },
          ]},
          { title: "â˜• Middagpauze", time: "12â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Q1 herhaling âŸ³", time: "15â€“15:30u", dur: "30 min", tasks: [
            { text: "Doe Q1 van examen 2024 (FP4 alle waarden + 2-comp + gray) ZONDER te spiekeren", min: 20 },
            { text: "Controleer en bespreek fouten", min: 10 },
          ]},
        ]
      },
      {
        label: "Zo", date: "18 mei", tag: "t-q3", tagText: "Q3",
        today: isToday('2026-05-18'),
        sessions: [
          { title: "Q3: Booleaanse algebra â€” Theorie", time: "9â€“9:45u", dur: "40 min", tasks: [
            { text: "Lees STUDIEHULP: sectie Q3 (waarheidstabel, Karnaugh, SOP)", min: 15 },
            { text: "Teken de Karnaugh-kaart layout voor 4 variabelen op papier (uit het hoofd)", min: 5 },
            { text: "Snap de Gray-code volgorde van de K-map kolommen/rijen (00, 01, 11, 10)", min: 5 },
            { text: "Doe de waarheidstabel voor AâŠ•BâŠ•C (examen 2024) volledig", min: 15 },
          ]},
          { title: "â˜• Pauze", time: "9:45â€“10u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q3: Karnaugh oefening", time: "10â€“11u", dur: "55 min", tasks: [
            { text: "Teken de Karnaugh-kaart voor AâŠ•BâŠ•C en bepaal de SOP", min: 15 },
            { text: "Lees de multiplexer-vraag van examen 2021 en stel de waarheidstabel op", min: 15 },
            { text: "Schrijf E als som van mintermen en vereenvoudig via K-map", min: 15 },
            { text: "Teken de schakeling met and/or/not poorten", min: 10 },
          ]},
        ]
      },
      {
        label: "Ma", date: "19 mei", tag: "t-q3", tagText: "Q3 NAND",
        today: isToday('2026-05-19'),
        sessions: [
          { title: "Q3: NAND + CMOS implementaties", time: "9â€“9:45u", dur: "40 min", tasks: [
            { text: "Lees STUDIEHULP: NAND-only implementatie (de Morgan techniek)", min: 10 },
            { text: "Zet de multiplexer SOP van gisteren om naar NAND-only", min: 15 },
            { text: "Lees over CMOS in de STUDIEHULP (pull-up/pull-down netwerk)", min: 15 },
          ]},
          { title: "â˜• Pauze", time: "9:45â€“10u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q3: Carry lookahead poortvertragingen", time: "10â€“11u", dur: "55 min", tasks: [
            { text: "Lees de carry lookahead sectie in de STUDIEHULP (p_i, g_i, c_{i+1})", min: 10 },
            { text: "Bereken handmatig de poortvertragingen voor p0, g0, c1, c2, s0, s1", min: 20 },
            { text: "Doe de carry-save opteller vraag van examen 2023 (3 getallen â†’ 2)", min: 25 },
          ]},
          { title: "â˜• Middagpauze", time: "11â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Q2 herhaling âŸ³", time: "15â€“15:30u", dur: "30 min", tasks: [
            { text: "Traceer fun(27) van examen 2024 (switch met sprongtabel) â€” enkel de oproepen", min: 20 },
            { text: "Noteer wat verwarrend was", min: 10 },
          ]},
        ]
      },
      {
        label: "Di", date: "20 mei", tag: "t-review", tagText: "Review",
        today: isToday('2026-05-20'),
        sessions: [
          { title: "Week 1 â€” Herhaling & zwakke punten", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Maak een lijstje van alle dingen die nog niet vlot gaan (Q1, Q2, Q3)", min: 10 },
            { text: "Oefen het zwakste punt 30 minuten (bv. CVG tekenen of K-map)", min: 30 },
            { text: "Doe Q1+Q3 van examen 2025 (25 min â€” tijdsbewust!)", min: 15 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q1 herhaling âŸ³ (spaced)", time: "10:15â€“11u", dur: "40 min", tasks: [
            { text: "Doe Q1 van examen 2019 en 2018 met de hand", min: 25 },
            { text: "Focus: IEEE 754 â†’ decimaal richtingen goed zitten?", min: 15 },
          ]},
        ]
      },
    ]
  },

  // ===== WEEK 2: Q4 + Q5 + Q6 =====
  {
    label: "Week 2 â€” Q4, Q5 & Q6",
    subtitle: "Pijplijn, caches, actuele trends + spaced repetition week 1",
    days: [
      {
        label: "Wo", date: "20 mei", tag: "t-q4", tagText: "Q4",
        today: isToday('2026-05-20'),
        sessions: [
          { title: "Q4: Delayslots â€” Theorie & begrip", time: "9â€“9:45u", dur: "40 min", tasks: [
            { text: "Lees STUDIEHULP: delayslots sectie (definitie, waarom ze bestaan)", min: 10 },
            { text: "Lees de delayslot-vraag van examen 2023 (product assemblercode)", min: 10 },
            { text: "Probeer zelf de herordening te maken VOOR je de oplossing bekijkt", min: 20 },
          ]},
          { title: "â˜• Pauze", time: "9:45â€“10u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q4: VLIW Scheduling", time: "10â€“11u", dur: "55 min", tasks: [
            { text: "Lees STUDIEHULP: VLIW regels (DT/ALU/CT kolommen)", min: 10 },
            { text: "Doe de VLIW-tabel van examen 2021 (checkPrimeNumber functie)", min: 25 },
            { text: "Doe de VLIW-tabel van examen 2022 (F/M functies)", min: 20 },
          ]},
        ]
      },
      {
        label: "Do", date: "22 mei", tag: "t-q4", tagText: "Q4 Voorspellers",
        today: isToday('2026-05-22'),
        sessions: [
          { title: "Q4: Sprongvoorspellers â€” 1-bit & 2-bit", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Lees STUDIEHULP: 1-bit en 2-bit voorspeller (staten, transities)", min: 10 },
            { text: "Doe de sprongvoorspellervraag van examen 2024 volledig (1-bit + 2-bit tabel invullen)", min: 30 },
            { text: "Bereken nauwkeurigheid: hoeveel correct voorspeld / totaal?", min: 15 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q4: Globale voorspeller (gshare)", time: "10:15â€“11u", dur: "40 min", tasks: [
            { text: "Lees over globale voorspeller in STUDIEHULP (geschiedenisregister + XOR)", min: 10 },
            { text: "Doe de globale voorspellertabel van examen 2024 (geschiedenis bijhouden + index berekenen)", min: 30 },
          ]},
          { title: "â˜• Middagpauze", time: "11â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Q1+Q3 herhaling âŸ³ (spaced dag 7)", time: "15â€“15:30u", dur: "30 min", tasks: [
            { text: "Doe 2 willekeurige Q1 vragen uit de oefentool zonder hints", min: 15 },
            { text: "Doe een Karnaugh-vraag (Q3) uit de oefentool", min: 15 },
          ]},
        ]
      },
      {
        label: "Vr", date: "23 mei", tag: "t-q5", tagText: "Q5",
        today: isToday('2026-05-23'),
        sessions: [
          { title: "Q5: Caches â€” Theorie & adresanalyse", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Lees STUDIEHULP: sectie Q5 volledig (adresanalyse, soorten missers, AMAT)", min: 15 },
            { text: "Oefen adresanalyse: gegeven 2WSA 32KiB blokgrootte 64B â†’ hoeveel T/I/O bits bij 32-bit adres?", min: 10 },
            { text: "Oefen adresanalyse: gegeven 4WSA 256KiB blokgrootte 32B â†’ T/I/O bits bij 32-bit adres?", min: 10 },
            { text: "Doe de adresbitsvraag van examen 2022 (13-bit adres, 2WSA, 8 bytes/blok)", min: 10 },
            { text: "Doe de adresbitsvraag van examen 2024 (16-bit adres, 4WSA, 4 bytes/blok)", min: 10 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q5: Treffer/misser bepalen", time: "10:15â€“11:15u", dur: "55 min", tasks: [
            { text: "Doe de treffer/misser tabel van examen 2022 (4 adressen: 0AEE, 1D74, 155A, 1C87)", min: 25 },
            { text: "Doe de treffer/misser tabel van examen 2024 (mov eax [0AEC], mov bx [1D42], ...)", min: 20 },
            { text: "Bereken de hitrate voor het bereik 1080â€“109F", min: 10 },
          ]},
        ]
      },
      {
        label: "Za", date: "24 mei", tag: "t-q5", tagText: "Q5 Missers",
        today: isToday('2026-05-24'),
        sessions: [
          { title: "Q5: Soorten missers & AMAT", time: "10â€“11u", dur: "55 min", tasks: [
            { text: "Doe de lus-cachevraag van examen 2021 (DM + 2WSA + 4WSA + volledig associatief)", min: 35 },
            { text: "Identificeer voor elk: koude / capaciteits / conflictmissers", min: 10 },
            { text: "Tel hits, misses en write-backs", min: 10 },
          ]},
          { title: "â˜• Pauze", time: "11â€“11:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q5: AMAT + 2-niveau cache", time: "11:15â€“12u", dur: "40 min", tasks: [
            { text: "Doe de AMAT-oefening uit de oefentool", min: 10 },
            { text: "Doe Q5 van examen 2023: L1+L2 missers + AMAT voor lus A en B", min: 30 },
          ]},
          { title: "â˜• Middagpauze", time: "12â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Q4 herhaling âŸ³", time: "15â€“15:30u", dur: "30 min", tasks: [
            { text: "Doe de delayslots van examen 2021 opnieuw (zonder te kijken naar vorige poging)", min: 30 },
          ]},
        ]
      },
      {
        label: "Zo", date: "25 mei", tag: "t-q6", tagText: "Q6",
        today: isToday('2026-05-25'),
        sessions: [
          { title: "Q6: Actuele trends bestuderen", time: "9â€“9:45u", dur: "40 min", tasks: [
            { text: "Lees de Q6-tabel in STUDIEHULP (alle begrippen 2021-2025)", min: 10 },
            { text: "Maak voor elk begrip een korte eigen definitie (1-2 zinnen) op papier", min: 20 },
            { text: "Doe alle Q6-vragen in de oefentool", min: 10 },
          ]},
          { title: "â˜• Pauze", time: "9:45â€“10u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q2 herhaling âŸ³ (spaced dag 7-9)", time: "10â€“11u", dur: "55 min", tasks: [
            { text: "Teken de CVG van fun(27) van examen 2024 (switch met sprongtabel) volledig", min: 25 },
            { text: "Teken de stapel voor fun(27) op maximale diepte", min: 20 },
            { text: "Controleer: zijn alle labels geÃ¯dentificeerd als blokgrenzen?", min: 10 },
          ]},
        ]
      },
      {
        label: "Ma", date: "26 mei", tag: "t-exam", tagText: "Examen",
        today: isToday('2026-05-26'),
        sessions: [
          { title: "ðŸ Eerste volledig examen (GETIMED): 2021", time: "9â€“12u", dur: "3 uur", tasks: [
            { text: "Zet een timer op 3 uur. Open examenca2021.pdf. Werk ALLES op papier.", min: 180 },
            { text: "Na de timer: noteer per vraag hoe lang je bezig was", min: 5 },
          ]},
          { title: "â˜• Lange pauze", time: "12â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Examen 2021 nakijken", time: "15â€“16u", dur: "55 min", tasks: [
            { text: "Kijk Q1 na â€” noteer foutieve omzettingen", min: 10 },
            { text: "Kijk Q2 na â€” was de functiewaarde correct? CVG? Stapel?", min: 15 },
            { text: "Kijk Q3+Q4+Q5 na â€” noteer per vraag je zwakste punt", min: 20 },
            { text: "Maak een lijst van 'te herhalen' topics", min: 10 },
          ]},
        ]
      },
    ]
  },

  // ===== WEEK 3: Volledige examens =====
  {
    label: "Week 3 â€” Examenpraktijk",
    subtitle: "Volledige examens getimed + gerichte herhaling",
    days: [
      {
        label: "Di", date: "27 mei", tag: "t-review", tagText: "Review",
        today: isToday('2026-05-27'),
        sessions: [
          { title: "Zwakke punten van examen 2021 aanpakken", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Kies het zwakste punt van gisteren â€” oefen dat gedurende 45 min", min: 45 },
            { text: "Doe een gelijksoortige oefening daarna om te bevestigen", min: 10 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q5 herhaling âŸ³ + cacheparameters afleiden", time: "10:15â€“11u", dur: "40 min", tasks: [
            { text: "Doe Q5 van examen 2025: leid blokgrootte, associativiteit, #sets af uit de adresstroom", min: 30 },
            { text: "Controleer: klopt elke stap van je redenering?", min: 10 },
          ]},
        ]
      },
      {
        label: "Wo", date: "28 mei", tag: "t-exam", tagText: "Examen",
        today: isToday('2026-05-28'),
        sessions: [
          { title: "ðŸ Volledig examen (GETIMED): 2022", time: "9â€“12u", dur: "3 uur", tasks: [
            { text: "Timer 3u. Open examenca2022.pdf. Alles op papier, geen hulpmiddelen.", min: 180 },
          ]},
          { title: "â˜• Lange pauze", time: "12â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Examen 2022 nakijken", time: "15â€“16u", dur: "55 min", tasks: [
            { text: "Nakijken en noteren per vraag: correct / gedeeltelijk / verkeerd", min: 30 },
            { text: "Focus: was de Karnaugh XOR-van-producten duidelijk? Was VLIW correct?", min: 15 },
            { text: "Update je 'zwakke punten' lijst", min: 10 },
          ]},
        ]
      },
      {
        label: "Do", date: "29 mei", tag: "t-review", tagText: "Review",
        today: isToday('2026-05-29'),
        sessions: [
          { title: "Gerichte herhaling Q3: Karnaugh + XOR-methode", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Doe de 2x2 vermenigvuldiger Karnaugh van examen 2022 opnieuw", min: 20 },
            { text: "Probeer XOR-van-producten toe te passen voor c3 en c2", min: 20 },
            { text: "Teken de meest eenvoudige schakeling", min: 15 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Spaced repetition alle topics âŸ³", time: "10:15â€“11u", dur: "40 min", tasks: [
            { text: "Q1: doe 2 willekeurige conversies zonder te kijken", min: 10 },
            { text: "Q2: traceer een functie naar keuze (F(3) of product(3,5))", min: 15 },
            { text: "Q6: leg mondeling 5 begrippen uit (PUE, green AI, hyperscaler, AMAT, Dennard)", min: 15 },
          ]},
        ]
      },
      {
        label: "Vr", date: "30 mei", tag: "t-exam", tagText: "Examen",
        today: isToday('2026-05-30'),
        sessions: [
          { title: "ðŸ Volledig examen (GETIMED): 2023", time: "9â€“12u", dur: "3 uur", tasks: [
            { text: "Timer 3u. Open examenca2023.pdf. Alles op papier.", min: 180 },
          ]},
          { title: "â˜• Lange pauze", time: "12â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Examen 2023 nakijken", time: "15â€“16u", dur: "55 min", tasks: [
            { text: "Nakijken met focus op carry-save opteller (Q3) en L1/L2 AMAT (Q5)", min: 35 },
            { text: "Noteer: welke vraag kostte het meeste tijd?", min: 10 },
            { text: "Pas je tijdsstrategie aan voor de volgende examens", min: 10 },
          ]},
        ]
      },
      {
        label: "Za", date: "31 mei", tag: "t-review", tagText: "Rust + herhaling",
        today: isToday('2026-05-31'),
        sessions: [
          { title: "Lichte herhaling â€” geen nieuwe stof", time: "10â€“10:30u", dur: "30 min", tasks: [
            { text: "Oefentool: doe 5 willekeurige vragen (gemengd)", min: 20 },
            { text: "Schrijf 3 dingen op die je nog niet zeker bent", min: 10 },
          ]},
          { title: "â˜• Rust", time: "rest", dur: "", tasks: [], isBreak: true },
        ]
      },
      {
        label: "Zo", date: "1 juni", tag: "t-q4", tagText: "Q4 Microcode",
        today: isToday('2026-06-01'),
        sessions: [
          { title: "Q4: Microcodering (nieuw in 2025)", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Lees over microcodering in de cursusslides (ca4 of ca5)", min: 15 },
            { text: "Bekijk de microcodeblad-structuur van examen 2025", min: 10 },
            { text: "Implementeer 'call <offset>' in microcode (doel: PC + offset, push return addr)", min: 20 },
            { text: "Implementeer 'ret' in microcode (doel: pop return addr naar PC)", min: 10 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Q5 herhaling âŸ³ (spaced dag 14)", time: "10:15â€“11u", dur: "40 min", tasks: [
            { text: "Doe de complete cache-analyse van examen 2021 opnieuw (4 caches)", min: 30 },
            { text: "Vergelijk met eerste poging: wat is verbeterd?", min: 10 },
          ]},
        ]
      },
    ]
  },

  // ===== WEEK 4: Finaliseren =====
  {
    label: "Week 4 â€” Consolidatie",
    subtitle: "Examens 2024-2025, timing finaliseren, rust",
    days: [
      {
        label: "Ma", date: "2 juni", tag: "t-exam", tagText: "Examen",
        today: isToday('2026-06-02'),
        sessions: [
          { title: "ðŸ Volledig examen (GETIMED): 2024", time: "9â€“12u", dur: "3 uur", tasks: [
            { text: "Timer 3u. Open examenca2024.pdf. Alles op papier.", min: 180 },
          ]},
          { title: "â˜• Lange pauze", time: "12â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Examen 2024 nakijken", time: "15â€“16u", dur: "55 min", tasks: [
            { text: "Nakijken met focus op globale sprongvoorspeller (Q4) en CMOS (Q3)", min: 35 },
            { text: "Bereken je 'score': hoeveel punten zou je hebben gehaald (op 20)?", min: 10 },
            { text: "Noteer resterende zwakke punten", min: 10 },
          ]},
        ]
      },
      {
        label: "Di", date: "3 juni", tag: "t-review", tagText: "Review",
        today: isToday('2026-06-03'),
        sessions: [
          { title: "Gerichte herhaling â€” resterende zwakke punten", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Kies je 2 zwakste punten en oefen die elk 25 minuten", min: 50 },
            { text: "Snel zelftest: doe een mini-variant van elke vraag", min: 5 },
          ]},
          { title: "â˜• Pauze", time: "10â€“10:15u", dur: "15 min", tasks: [], isBreak: true },
          { title: "Tijdsmanagement oefenen", time: "10:15â€“11u", dur: "40 min", tasks: [
            { text: "Doe Q1+Q2 van examen 2019 op tijd: maximaal 30 minuten voor beide samen", min: 30 },
            { text: "Was dat haalbaar? Wat vertraagde je?", min: 10 },
          ]},
        ]
      },
      {
        label: "Wo", date: "4 juni", tag: "t-exam", tagText: "Examen",
        today: isToday('2026-06-04'),
        sessions: [
          { title: "ðŸ Volledig examen (GETIMED): 2025", time: "9â€“12u", dur: "3 uur", tasks: [
            { text: "Timer 3u. Open examenca2025.pdf. Dit is het meest recente examen â€” gebruik het als finale test.", min: 180 },
          ]},
          { title: "â˜• Lange pauze", time: "12â€“15u", dur: "", tasks: [], isBreak: true },
          { title: "Examen 2025 nakijken + eindscore", time: "15â€“16u", dur: "55 min", tasks: [
            { text: "Nakijken volledig", min: 30 },
            { text: "Bereken score op 20 â€” streef je target?", min: 5 },
            { text: "Maak een definitieve lijst: wat neem je mee als spieker? (mag bij open boek)", min: 20 },
          ]},
        ]
      },
      {
        label: "Do", date: "5 juni", tag: "t-review", tagText: "Organiseren",
        today: isToday('2026-06-05'),
        sessions: [
          { title: "Open boek materiaal organiseren", time: "9â€“10u", dur: "55 min", tasks: [
            { text: "Druk STUDIEHULP_CA.md af of open hem makkelijk op tablet/laptop", min: 5 },
            { text: "Maak een persoonlijk 'spiekblad' met formules die je steeds vergeet", min: 30 },
            { text: "Sorteer je materiaal: slides, examens, notities â€” weet wat waar staat", min: 20 },
          ]},
          { title: "â˜• Pauze + lichte herhaling", time: "10â€“10:45u", dur: "45 min", tasks: [
            { text: "Oefentool: doe 10 vragen (gemengd) â€” ga niet verder dan dit vandaag", min: 30 },
            { text: "Stop na 45 minuten â€” rust is nu ook studeren", min: 0 },
          ]},
        ]
      },
      {
        label: "Vr", date: "6 juni", tag: "t-review", tagText: "Lichte herhaling",
        today: isToday('2026-06-06'),
        sessions: [
          { title: "Alleen lichte herhaling â€” geen nieuw materiaal", time: "9â€“9:30u", dur: "30 min", tasks: [
            { text: "Lees je persoonlijk spiekblad door", min: 10 },
            { text: "Doe 3 Q1-omzettingen in je hoofd", min: 10 },
            { text: "Reviseer de IEEE 754 formule Ã©Ã©n keer", min: 10 },
          ]},
          { title: "ðŸ›Œ Rust â€” goede nacht is cruciaal voor geheugenconsolidatie", time: "rest", dur: "", tasks: [], isBreak: true },
        ]
      },
      {
        label: "Zo", date: "7 juni", tag: "t-review", tagText: "Lichte prep",
        today: isToday('2026-06-07'),
        sessions: [
          { title: "Minimale opfrissing â€” max 30 min", time: "9â€“9:30u", dur: "30 min", tasks: [
            { text: "Blader door je spiekblad â€” lees enkel, maak niets", min: 15 },
            { text: "Denk na over tijdsstrategie morgen: ~28 min per vraag, begin bij Q1 of Q6", min: 10 },
            { text: "Zorg dat je materiaal klaarstaat voor het examen", min: 5 },
          ]},
          { title: "ðŸ›Œ Rust â€” geheugen consolideert 's nachts", time: "rest", dur: "", tasks: [], isBreak: true },
        ]
      },
      {
        label: "Ma", date: "8 juni", tag: "t-exam", tagText: "EXAMEN",
        today: isToday('2026-06-08'),
        sessions: [
          { title: "ðŸŽ¯ EXAMEN COMPUTERARCHITECTUUR â€” 08:30â€“12:30", time: "08:30", dur: "4 uur", tasks: [
            { text: "Lees eerst alle vragen door (3 min)", min: 3 },
            { text: "Begin met de makkelijkste (Q1 of Q6)", min: 5 },
            { text: "~28 minuten per vraag â€” houd de tijd bij", min: 0 },
            { text: "Controleer je werk in de laatste 10 minuten", min: 10 },
            { text: "Veel succes! ðŸ€", min: 0 },
          ]},
        ]
      },
    ]
  }
];

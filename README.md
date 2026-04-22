# Kode Hemvärnsgård

Statisk GitHub Pages-sida för Kode Hemvärnsgård.

## Filer

- `innehall.js` innehåller texter, priser, kontaktuppgifter och bildval. Det är filen som normalt ska ändras.
- `index.html` innehåller sidans grundstruktur.
- `styles.css` innehåller layout, färger och responsiv design.
- `sidans-funktioner.js` fyller sidan med innehållet från `innehall.js` och styr mobilmenyn.
- `assets/` innehåller bilder och ikon.

## Ändra information

För enklare ändringar:

1. Öppna `innehall.js` på GitHub.
2. Klicka på pennan för att redigera.
3. Ändra texten mellan citationstecknen.
4. Spara ändringen med `Commit changes`.

Exempel:

```js
telefon_text: "070-555 13 27",
```

kan ändras till:

```js
telefon_text: "070-123 45 67",
```

Ändra inte `index.html`, `styles.css` eller `sidans-funktioner.js` om du bara vill ändra information på sidan.

## Byta bilder

Bilderna ligger i `assets/`.

Det enklaste sättet är att ladda upp en ny bild med samma filnamn som den gamla. Då behöver inget ändras i koden.

Exempel:

- `assets/hemvarnsgarden-exterior.jpg` är bilden i toppen.
- `assets/salen-dukad-2.jpg`, `assets/salen-dukad-3.jpg` och `assets/salen-dukad-1.jpg` används i bildgalleriet.
- `assets/motesrum.jpg` används för mötesrummet.
- `assets/parkering.jpg` används för parkering.

Om du vill byta till ett helt nytt filnamn ändrar du motsvarande `bild:`-rad i `innehall.js`.

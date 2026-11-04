# Alex Team Racing

Kooperatives 2D-Autospiel im Browser: zwei Teamfahrzeuge, Hindernisse, Gegner und ein gemeinsames Streckenziel.

## Herunterladen und starten

[Alles als ZIP herunterladen](https://github.com/Chriss-Top/Autorennspiel/archive/refs/heads/main.zip)

1. ZIP herunterladen und entpacken.
2. `Alex-Team-Racing.html` per Doppelklick in einem aktuellen Desktop-Browser öffnen.
3. Autos, Welt und Steuerung (Spieler oder Computer) wählen und „Rennen starten“ klicken.

Kein Build, keine Installation und kein Server erforderlich. Die Schriftarten werden optional aus Google Fonts geladen; ohne Internet verwendet das Spiel Ersatzschriften.

## Steuerung

| Aktion | Spieler 1 (rechts) | Spieler 2 (links) |
| --- | --- | --- |
| Fahren | Pfeiltasten | WASD |
| Waffe | Enter | Leertaste |
| Alex verwandeln | M | Q |
| Alex: Riesenfeuerblitz | Punkt (.) | E |
| Alex: Riesen-Steinbombe | Komma (,) | R |
| Pause | P / Escape | P / Escape |

Beide Plätze können unabhängig von einem Menschen oder Computer gesteuert werden. Lokales Spiel an einer Tastatur, kein Online-Multiplayer. Tastatur erforderlich.

## Autos und Welten

- Alex Team Auto: Formenblaster, Riesenfeuerblitz und Riesen-Steinbombe. Sichtbare Verwandlungen in Drache, Flugzeug, UFO, Panzer, Roboter oder Geist ersetzen das Auto komplett. Einige weitere Namen erscheinen als passende Emoji-Objekte, unbekannte Namen als magisches Geschenkobjekt mit dem gewählten Namen. Flugformen überwinden Felsen, Panzer/Roboter erhalten Panzerung, Geister sind unverwundbar, weitere Fantasieformen erhalten einen Schild. Aktiv für 5 Sekunden, danach 10 Sekunden Abklingzeit.
- Tesla Roadster: hohes Tempo und Elektroblitz.
- Iron Buffalo: starke Panzerung und Doppelkanone.
- Neon Phantom: schneller Plasmalaser.
- Rally Fox: Streuschuss.

Vier auswählbare Welten: Sunset Canyon, Neon City, Frost Valley und Jungle Run. Die Welten bieten unterschiedliche Landschaften; die Hindernis- und Gegnermechanik ist gemeinsam.

Erreicht die 3.000 Meter, solange mindestens ein Teamfahrzeug überlebt. Grüne Reparaturen heilen beide Autos und können ausgeschiedene Teammitglieder wiederbeleben. Gelbe Energie und besiegte Gegner geben Punkte.

## Alex’ Superwaffen

- Riesenfeuerblitz: beseitigt alle aktuellen Gegner und gegnerischen Geschosse sofort, mit bildschirmfüllenden Feuerblitzen. Nachladezeit: 8 Sekunden.
- Riesen-Steinbombe: großer fliegender Felsbrocken, der getroffene Felsen und weitere Felsen im Radius von 135 Spielpixeln sofort zerstört. Nachladezeit: 2,5 Sekunden.
- Aus jedem zerstörten Felsen entsteht mit 35 % Wahrscheinlichkeit ein neuer Gegner, auch bei normalen Waffen.
- Computerfahrer verwenden die Superwaffen automatisch.

## Quelldateien

- `Alex-Team-Racing.html`: komplette Version in einer Datei.
- `dist/index.html`, `dist/style.css`, `dist/game.js`: bearbeitbare Quelldateien. Zum Bearbeiten diese Dateien verwenden; die einzelne HTML-Datei kann mit `node scripts/build-single.cjs` neu erzeugt werden.
- `tests/check.cjs`: Simulation für Steuerung, Waffen, Verwandlung, Reparaturen, Pause, Zieleinlauf und vier Welten.

Prüfung aus dem Repository-Hauptverzeichnis mit Node.js:

```sh
node --check dist/game.js
node tests/check.cjs
```

Die Simulation ist bestanden. Eine visuelle Browserprüfung wurde in der Erstellungsumgebung nicht durchgeführt.

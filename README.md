# Alex Team Racing

Kooperatives 2D-Autospiel für zwei Spieler oder mit Computerfahrern.

## Download und Start

[Spiel als ZIP herunterladen](https://github.com/Chriss-Top/Autorennspiel/archive/refs/heads/main.zip)

ZIP entpacken und **Alex-Team-Racing.html** in einem aktuellen Desktop-Browser öffnen. Kein Build oder Server nötig. Eine Tastatur wird benötigt. Google Fonts ist optional; ohne Internet greifen Ersatzschriften.

## Steuerung

| Aktion | Spieler 1 (rechts) | Spieler 2 (links) |
| --- | --- | --- |
| Fahren | Pfeiltasten | WASD |
| Formwaffe abfeuern | Enter | Leertaste |
| Alex: nächste Form | M | Q |
| Alex: Riesenfeuerblitz | Punkt (.) | E |
| Alex: Riesen-Steinbombe | Komma (,) | R |
| Gesammelte Rakete abfeuern | / | F |
| Gesammeltes Öl ablegen | rechte Umschalttaste | G |
| Pause | P / Escape | P / Escape |

Die Pfeilknöpfe **◀ / ▶** in Alex’ Fahrzeugkarte schalten vor und während des Rennens durch alle Formen. Die gewählte Form bleibt aktiv, bis eine andere gewählt wird. Jeder Spieler hat eine eigene Auswahl und eigene Vorräte. Andere Fahrzeuge können ebenfalls Raketen, Öl und Turbo sammeln. Beide Plätze lassen sich unabhängig auf Computersteuerung stellen.

## Alex’ dauerhafte Formen

| Form | Besondere Schüsse |
| --- | --- |
| Auto | Formenblaster |
| Drache | Breiter Feuerfächer aus fünf Flammen |
| Flugzeug | Zwei explosive Suchraketen |
| Raumschiff | Zwei große zielsuchende Plasmakugeln |
| Panzer | Schwere Granate mit Explosion im Umkreis |
| Roboter | Schnelle Zickzack-Energielaser |
| Geist | Seelenwelle, die mehrere Ziele durchdringt |

Alle Formen haben eigene sichtbare Gestalten und Geschosse. Flugformen überwinden Felsen. Panzer und Roboter nehmen weniger Schaden; der Geist ist unverwundbar.

Zusätzlich behält Alex seine Superwaffen: Der **Riesenfeuerblitz** beseitigt alle aktuellen Gegner und gegnerischen Geschosse sofort (8 Sekunden Nachladezeit). Die **Riesen-Steinbombe** zerstört getroffene und nahe Felsen sofort (2,5 Sekunden Nachladezeit). Aus zerstörten Felsen entstehen mit 35 % Wahrscheinlichkeit neue Gegner.

Weitere Fahrzeuge: Tesla Roadster, Iron Buffalo, Neon Phantom und Rally Fox mit unterschiedlichen Geschwindigkeiten, Panzerungen und Waffen.

## Längere Levels und neue Gegner

Alle vier Levels sind jetzt 6.000 Meter lang, doppelt so lang wie zuvor.

Jede Welt hat drei exklusive Gegnertypen. Diese Auswahl gilt auch für Gegner, die aus zerstörten Felsen entstehen.

| Welt | Gegner | Angriffe |
| --- | --- | --- |
| Sunset Canyon | Sand-Buggy, Riesenskorpion, Sandkoloss | Doppelte Sandschüsse, gezielter Giftstachel, schwere Felswürfe |
| Neon City | Cyber-Patrouille, Neondrohne, Cyber-UFO | Doppellaser, gezielte Elektrogeschosse, fünfteiliger Plasmafächer |
| Frost Valley | Eiskäfer, Schnee-Yeti, Frostgeist | Verfolgen und Rammen, Schneeballfächer, gezielte Eissplitter |
| Jungle Run | Giftspinne, Schnapppflanze, Riesenhornisse | Verfolgen und Gift, Samensalven, gezielte Stachelgeschosse |

Alle zwölf Gegner haben eigene Namen und passende Gestalten. Unterschiedliche Panzerung, Bewegung, Schussmuster und Geschosse sorgen für Abwechslung. Eis- und Schneegeschosse verlangsamen 2,5 Sekunden, Gift wirkt 3 Sekunden nach. Der permanente Super-Turbo wird durch Eis nicht gebremst. Alle Gegner sind zerstörbar und werden von Alex’ Riesenfeuerblitz beseitigt.

## Kurven und Sammelgegenstände

Vier Welten mit unterschiedlichen Kurvenverläufen: Sunset Canyon, Neon City, Frost Valley und Jungle Run. In Kurven gegenlenken: Abseits der Fahrbahn nimmt das Fahrzeug Schaden.

- **🚀 Rakete:** landet im Vorrat und kann später als explosive Suchrakete abgeschossen werden.
- **🛢 Ölfass:** landet im Vorrat. Beim Einsatz wird hinter dem Auto ein Ölfleck gelegt. Gegner und das andere Teamauto geraten darauf ins Schleudern; der Verursacher ist gegen seinen eigenen Ölfleck geschützt.
- **⚡ Blitzkarte:** aktiviert sofort 6 Sekunden Turbo mit sichtbar blauem Flammenschweif. Sammle die nächste Karte, bevor der laufende Turbo ausläuft. Nach **drei Karten in dieser Kette** bleibt der **Super-Turbo bis zum Ziel** aktiv: 3,4-faches Streckentempo und besonders schnelle Lenkung. Er lässt sich nicht abbremsen oder abschalten. Andere Sammelgegenstände unterbrechen die Kette nicht; ein abgelaufener normaler Turbo setzt sie zurück. Jeder Spieler zählt seine eigene Kette. Ein neues Rennen setzt alles zurück.
- **Grünes Kreuz:** repariert beide Autos und belebt ausgeschiedene Teammitglieder wieder.
- **Energiekristall:** gibt Punkte.

Überlebt gemeinsam die 6.000 Meter. Ein Teamfahrzeug muss das Ziel erreichen. Lokales Spiel an einer Tastatur; kein Online-Multiplayer.

## Quellcode und Prüfungen

- `Alex-Team-Racing.html`: vollständige Version in einer Datei.
- `dist/index.html`, `dist/style.css`, `dist/game.js`: bearbeitbare Quelldateien.
- `scripts/build-single.cjs`: erzeugt die Einzeldatei erneut.
- `tests/check.cjs`: Simulation für Steuerung, sieben Formwaffen, dauerhafte Formauswahl, Superwaffen, Raketen-Vorrat, Öl-Kollisionen, Turbo, Kurven, Reparatur, Pause und Zieleinlauf.

Aus dem Repository-Hauptverzeichnis mit Node.js:

```sh
node --check dist/game.js
node tests/check.cjs
node scripts/build-single.cjs
```

Zusätzlich geprüft: 6.000-Meter-Ziele, alle zwölf weltgebundenen Gegnerarten, Dreifach-Turbo, Ablauf und Neustart der Turbo-Kette sowie dauerhaftes Tempo ohne Bremsmöglichkeit.

Zusätzlich geprüft: Gegnerpools je Welt, alle zwölf Darstellungen und Angriffe, passende Fels-Gegner und Eis-/Gifteffekte.

Simulationstests bestanden. Eine visuelle Browserprüfung wurde in der Erstellungsumgebung nicht durchgeführt.

# Nova-EPG (Pay-TV-Programm)

Baut jede Nacht eine EPG-Datei (XMLTV) für Pay-TV-Sender aus Deutschland, Österreich,
der Schweiz, der Türkei, Frankreich und den Niederlanden. Grundlage ist das freie
Projekt [iptv-org/epg](https://github.com/iptv-org/epg).

Die Nova-IPTV-App lädt das Ergebnis von:

    https://raw.githubusercontent.com/Bruteforce-55/nova-epg/epg/guide.xml.gz

## Einrichtung

Diese Dateien gehören in ein **öffentliches** Repo `Bruteforce-55/nova-epg`.
Öffentlich muss es sein, damit der Fernseher die Datei ohne Anmeldung laden kann.
Es enthält nur Programmdaten, keine Zugangsdaten.

- `sources.txt`: Welche Senderlisten abgerufen werden. Zeile mit `#` = aus.
- `build-channels.js`: Fügt die Listen zu einer zusammen.
- `.github/workflows/build-epg.yml`: Läuft jede Nacht um 01:30 UTC und legt
  `guide.xml.gz` im Branch `epg` ab. Unter „Actions“ → „Nova-EPG bauen“ →
  „Run workflow“ lässt es sich auch sofort starten.

Weitere Quellen findest du im Ordner `sites/` von iptv-org/epg.

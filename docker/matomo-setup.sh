#!/usr/bin/env bash
# =============================================================================
# matomo-setup.sh — DSGVO-konforme Matomo-Konfiguration
# =============================================================================
#
# Setzt alle datenschutzrelevanten Einstellungen auf einer Matomo-Instanz.
# Idempotent: kann beliebig oft ausgeführt werden.
#
# Lokal (Docker):
#   bash docker/matomo-setup.sh
#
# Production (Docker, anderen Container-Namen):
#   MATOMO_CONTAINER=matomo-prod bash docker/matomo-setup.sh
#
# Production (kein Docker, direkter PHP-Zugriff):
#   MATOMO_EXEC="php /var/www/html/console" bash docker/matomo-setup.sh
#
# =============================================================================

set -euo pipefail

# --- Konfiguration -----------------------------------------------------------

MATOMO_CONTAINER="${MATOMO_CONTAINER:-matomo}"

# Wenn MATOMO_EXEC gesetzt ist, wird kein docker exec verwendet
if [ -z "${MATOMO_EXEC:-}" ]; then
  MATOMO_EXEC="docker exec ${MATOMO_CONTAINER} php /var/www/html/console"
fi

# Auf Production mit HTTPS: 1 setzen
# Lokal (HTTP): 0 lassen
ASSUME_SECURE_PROTOCOL="${ASSUME_SECURE_PROTOCOL:-0}"

# Production trusted_hosts anpassen, z.B. "immowo-ventures.de"
TRUSTED_HOST="${TRUSTED_HOST:-localhost:8080}"

# --- Hilfsfunktion -----------------------------------------------------------

set_config() {
  echo "  -> $*"
  $MATOMO_EXEC config:set "$@"
}

# --- Setup -------------------------------------------------------------------

echo ""
echo "Matomo DSGVO-Setup wird ausgefuehrt..."
echo "Container / Executor: ${MATOMO_EXEC}"
echo ""

echo "[1/4] Datenschutz & IP-Anonymisierung"
set_config \
  "General.anonymize_ip_enabled=1" \
  "General.ip_address_mask_length=2" \
  "General.respect_do_not_track=1" \
  "Tracker.do_not_track=1"

echo ""
echo "[2/4] Datensparsamkeit — automatische Log-Loeschung (DSGVO Art. 5 Abs. 1e)"
set_config \
  "General.delete_logs_enable=1" \
  "General.delete_logs_older_than=180" \
  "General.delete_reports_enable=0"
# Rohdaten nach 180 Tagen (6 Monate) loeschen.
# Aggregierte Reports (anonymisiert) bleiben erhalten.

echo ""
echo "[3/4] Performance & Sicherheit"
set_config \
  "General.enable_browser_archiving_triggering=0"
# Archivierung durch Cron statt Browser — verhindert, dass
# beliebige Anfragen die Archivierung ausloesen koennen.

echo ""
echo "[4/4] Protokoll & Umgebung"
set_config \
  "General.assume_secure_protocol=${ASSUME_SECURE_PROTOCOL}"
# Lokal: 0 (HTTP). Production hinter HTTPS/Reverse-Proxy: 1.

echo ""
echo "Fertig! Matomo ist jetzt DSGVO-konform konfiguriert."
echo ""
echo "Pruefe die Einstellungen unter:"
echo "  http://${TRUSTED_HOST}/index.php?module=PrivacyManager&action=privacySettings"
echo ""
echo "Noch manuell erledigen (einmalig im Matomo-UI):"
echo "  - Datenschutz > Anonymisierung: 'Scheduler' aktivieren (automatische Loeschung)"
echo "  - Datenschutz > DSGVO-Werkzeuge: pruefen"
echo "  - Einstellungen > Website: URL fuer Production anpassen"
echo "  - Einstellungen > System > Archivierung: Cron-Job einrichten"
echo ""

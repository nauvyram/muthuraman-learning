#!/bin/bash

URL="https://indiapostgdsonline.gov.in/"
DELAY=10 # Seconds to wait between attempts

echo "Monitoring $URL..."
echo "Press [CTRL+C] to stop."

until curl -sL --fail "$URL" -o /dev/null; do
    echo "Site not ready yet... retrying in ${DELAY}s"
    sleep $DELAY
done

echo "------------------------------------------------"
echo "SUCCESS: The site is now active!"
echo "------------------------------------------------"

# Optional: Trigger a system beep or alert
echo -e "\a"
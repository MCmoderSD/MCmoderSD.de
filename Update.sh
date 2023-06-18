#!/bin/bash

if [ "$1" = "-auto" ]; then
  if [ -z "$2" ]; then
    echo "Please provide a sleep duration as the second argument."
    exit 1
  fi

  while true; do
    sudo git pull https://www.github.com/MCmoderSD/MCmoderSD.de.git
    sudo rm -r /etc/apache2/sites-available/MCmoderSD.de.conf
    ln -sf /var/www/MCmoderSD.de/MCmoderSD.de.conf /etc/apache2/sites-available/MCmoderSD.de.conf
    sudo systemctl reload apache2
    sleep "$2"
  done
else
  sudo git pull https://www.github.com/MCmoderSD/MCmoderSD.de.git
  sudo rm -r /etc/apache2/sites-available/MCmoderSD.de.conf
  ln -sf /var/www/MCmoderSD.de/MCmoderSD.de.conf /etc/apache2/sites-available/MCmoderSD.de.conf
  sudo systemctl reload apache2
fi
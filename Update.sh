#!/bin/bash

if [ "$1" = "-auto" ]; then
  while true; do
    sudo git pull https://www.github.com/mcmodersd/mcmodersd.live.git
    sudo rm -r /etc/apache2/sites-enabled/mcmodersd.live.conf
    ln -sf /var/www/mcmodersd.live/mcmodersd.live.conf /etc/apache2/sites-enabled/mcmodersd.live.conf
    sudo systemctl reload apache2
    sleep 30
  done
else
  sudo git pull https://www.github.com/mcmodersd/mcmodersd.live.git
  sudo rm -r /etc/apache2/sites-enabled/mcmodersd.live.conf
  ln -sf /var/www/mcmodersd.live/mcmodersd.live.conf /etc/apache2/sites-enabled/mcmodersd.live.conf
  sudo systemctl reload apache2
fi
#!/bin/bash

if [ "$1" = "-auto" ]; then
  while true; do
    sudo git -C /var/www/mcmodersd.live/ pull
    sudo rm -r /etc/apache2/sites-enabled/mcmodersd.live.conf
    ln -sf /var/www/mcmodersd.live/mcmodersd.live.conf /etc/apache2/sites-enabled/mcmodersd.live.conf
    sudo systemctl reload apache2
    sleep 30
  done
else
  sudo git -C /var/www/mcmodersd.live/ pull
  sudo rm -r /etc/apache2/sites-enabled/mcmodersd.live.conf
  ln -sf /var/www/mcmodersd.live/mcmodersd.live.conf /etc/apache2/sites-enabled/mcmodersd.live.conf
  sudo systemctl reload apache2
fi
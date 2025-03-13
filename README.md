# [MCmoderSD.de](https://www.MCmoderSD.de/)
My own website visit now [MCmoderSD.de](http://mcmodersd.de/)

## [Docker Image](https://hub.docker.com/repository/docker/mcmodersd/mcmodersd.de/)
The website is an all-in-one [docker image](https://hub.docker.com/repository/docker/mcmodersd/mcmodersd.de/). <br>

You can run it with the following command:
```bash
docker run -d -p 80:80 -p 443:443 mcmodersd/mcmodersd.de:latest
```

You have to expose the ports 80 and 443 to the host system. <br>

Supported architectures:
- amd64 
- arm64/v8
- arm/v7
- arm/v6
- 386
- ppc64le
- riscv64
- s390x
#!/bin/bash
echo -e "{\"ID\":\"docker$(hostname)\",\"Name\":\"DockerWorker\", \"Address\":\"$(ifconfig enp0s8 | grep "inet addr" | cut -d ':' -f 2 | cut -d ' ' -f 1)\", \"Port\":2375,\"Check\":{\"Interval\":\"10s\",\"TTL\":\"15s\"}}" > /etc/docker.json

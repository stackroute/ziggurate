#!/bin/bash
/usr/local/bin/consul agent -data-dir=/tmp/consul -node=`hostname` -client=0.0.0.0 -advertise=`ifconfig enp0s8 | grep "inet addr" | cut -d ':' -f 2 | cut -d ' ' -f 1` -config-dir=/etc/consul.d


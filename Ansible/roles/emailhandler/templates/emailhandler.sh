#!/bin/bash

echo

wget http://stedolan.github.io/jq/download/linux64/jq

chmod +x ./jq

wget http://{{ consul_server_ip }}:{{ consul_server_port }}/v1/agent/members

cat members >> nodes.txt

jq '.[].Name' nodes.txt >> nodes1.txt

jq '.[].Status' nodes.txt >> nodes2.txt

sed -i 's/1/Alive/g' nodes2.txt

sed -i 's/4/Failed/g' nodes2.txt

sed -i 's/3/Left/g' nodes2.txt

paste nodes1.txt nodes2.txt >> nodes3.txt

cat nodes3.txt
node /home/vagrant/app.js &
mail -s "Nodes Health" {{ email_recipients }}  < nodes3.txt

echo "hello-there: ${SERF_EVENT}. Data follows..."

file="nodes1.txt"

if [ -f $file ] ; then
    rm $file
fi

file="nodes2.txt"

if [ -f $file ] ; then
    rm $file
fi

file="nodes3.txt"

if [ -f $file ] ; then
    rm $file
fi

file="nodes.txt"

if [ -f $file ] ; then
    rm $file
fi

file="jq"

if [ -f $file ] ; then
    rm $file
fi

file="members"

if [ -f $file ] ; then
    rm $file
fi

while read line; do
    printf "Ziggurate\n"
done

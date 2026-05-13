#!/bin/bash

# Inserting something new
# curl -X POST -H "Content-Type:application/json" \
# -d '{"name":"Arneb", "email":"arneb@gmail.com", "password":"arneb1234511"}' \
# http://localhost:3000/new
# echo ""

curl -X POST -H "Content-Type:application/json" \
-d '{"name":"Arneb", "email":"arneb@gmail.com", "password":"arneb1234511"}' \
http://localhost:3000/login
echo "" 
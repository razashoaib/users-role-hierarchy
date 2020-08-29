#!/bin/bash

# Author : Syed Abidi
# Script follows here:
echo " <<<<<<<<<<<<<<<<<<<< Installing all the dependencies >>>>>>>>>>>>>>>>>>>>"
npm install
echo " <<<<<<<<<<<<<<<<<<<< Executing next command >>>>>>>>>>>>>>>>>>>>"
echo " <<<<<<<<<<<<<<<<<<<< Running all the API tests now >>>>>>>>>>>>>>>>>>>>"
npm run test
echo " <<<<<<<<<<<<<<<<<<<< Executing next command >>>>>>>>>>>>>>>>>>>>"
echo "<<<<<<<<<<<<<<<<<<<< Starting server at localhost:9000 >>>>>>>>>>>>>>>>>>>>"
npm run start
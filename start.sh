#!/bin/sh
which node
if [ $? != "0" ];then
    echo "请安装node.js"
else
  
    if [ -e package-lock.json ];then
        npm start;
    else  
        npm install;
        npm start;
    fi
fi

#!/bin/bash

echo "these are erromeous requests"
curl -X GET localhost:8080/abc/login
curl -X GET localhost:8080/1/logine
curl -X GET localhost:8080/10/topBidList


echo "creating 16 accounts"
# create 16 accounts, bid, then output results
USER1=$(curl -X GET localhost:8080/1/login);
USER2=$(curl -X GET localhost:8080/2/login);
USER3=$(curl -X GET localhost:8080/3/login);
USER4=$(curl -X GET localhost:8080/4/login);
USER5=$(curl -X GET localhost:8080/5/login);
USER6=$(curl -X GET localhost:8080/6/login);
USER7=$(curl -X GET localhost:8080/7/login);
USER8=$(curl -X GET localhost:8080/8/login);
USER9=$(curl -X GET localhost:8080/9/login);
USER10=$(curl -X GET localhost:8080/10/login);
USER11=$(curl -X GET localhost:8080/11/login);
USER12=$(curl -X GET localhost:8080/12/login);
USER13=$(curl -X GET localhost:8080/13/login);
USER14=$(curl -X GET localhost:8080/14/login);
USER15=$(curl -X GET localhost:8080/15/login);
USER16=$(curl -X GET localhost:8080/16/login);

echo "making one bid per account (x 16)"
curl -X POST localhost:8080/15/1602.4?sessionKey=$USER1;
curl -X POST localhost:8080/15/1?sessionKey=$USER2;
curl -X POST localhost:8080/15/12602.4?sessionKey=$USER3;
curl -X POST localhost:8080/15/62.4?sessionKey=$USER4;
curl -X POST localhost:8080/15/144.4?sessionKey=$USER5;
curl -X POST localhost:8080/15/1222602.4?sessionKey=$USER6;
curl -X POST localhost:8080/15/3402.4?sessionKey=$USER7;
curl -X POST localhost:8080/15/3333333?sessionKey=$USER8;
curl -X POST localhost:8080/15/15?sessionKey=$USER9;
curl -X POST localhost:8080/15/0000000005?sessionKey=$USER10;
curl -X POST localhost:8080/15/1?sessionKey=$USER11;
curl -X POST localhost:8080/15/2331?sessionKey=$USER12;
curl -X POST localhost:8080/15/12312312311.4?sessionKey=$USER13;
curl -X POST localhost:8080/15/9745?sessionKey=$USER14;
curl -X POST localhost:8080/15/155634.7?sessionKey=$USER15;
curl -X POST localhost:8080/15/0.001?sessionKey=$USER16;

echo "listing all bigs (should show a total of 15, not 16!)"
curl -X GET localhost:8080/15/topBidList;
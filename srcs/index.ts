//@ts-ignore
import importExpress = require('express');
import {user, bid, item} from "./types"
import {generateSessionKey, getUserFromSessionKey, userTimeout, sanitizeSessionKey, sanitizeItemId, sanitizeUserId, sanitizeBidValue} from "./utils";
const express = importExpress();

//  data
const userMap = new Map<number, user>;
const itemMap = new Map<number, item>;

//  routes
//  login -- GET /<userID>/login
express.get(["/:userId/login{/}"], (request: any, response: any) => {
    let requestUserId: number = sanitizeUserId(request.params.userId);
    if (isNaN(requestUserId))
    {
        response.status(400).json({error: "invalid user id"});
        return ;
    }

    if (!userMap.get(requestUserId) || userTimeout(userMap.get(requestUserId)!.sessionKeyCreation))
    {
        userMap.set(requestUserId, {
            userId: request.params.userId,
            sessionKey: generateSessionKey(),
            sessionKeyCreation: Date.now(),
        })
    }
    let userSessionKey = userMap.get(requestUserId)!.sessionKey

    if (typeof userSessionKey === "string" && userSessionKey != "")
        //  in case we'd rather send key as json, swap two lines below
        //  response.send({sessionKey: userSessionKey});
        response.send(userSessionKey);
    else
        response.status(500).json({error: "server error"});
});

//  post user bid to item -- POST /<itemID>/bid?sessionKey=<sessionKey>
express.post("/:itemId/:bid", (request: any, response: any) => {
    //  sanitize and validate
    let sessionKey = sanitizeSessionKey(request.query.sessionKey);
    let currentUser: user | boolean = getUserFromSessionKey(userMap, sessionKey);

    let requestItemId: number = sanitizeItemId(request.params.itemId);
    if (isNaN(requestItemId))
        response.status(401).json({error: "invalid item id"});

    let bidValue: number = sanitizeBidValue(request.params.bid);
    if (isNaN(bidValue))
        response.status(401).json({error: "invalid bid value"});

    if (!sessionKey || currentUser === false)
    {
        response.status(401).json({error: "invalid session key"});
        return ;
    }
    if (typeof currentUser != "boolean" && !userTimeout(currentUser.sessionKeyCreation))
    {
        let newBid: bid = {
            userId: currentUser.userId,
            itemid: requestItemId,
            value: bidValue,
        }

        if (!itemMap.get(requestItemId))
        {
            itemMap.set(requestItemId, {
                itemId: requestItemId,
                bids: new Map<number, bid>
            })
        }
        itemMap.get(requestItemId)?.bids.set(currentUser.userId, newBid);

        response.send();
        return;
    }
    response.status(401).json({error: "session timeout"});
});

//  get top bids -- GET /itemID/topBidList
//  ps: oh no, sorting algorithm
express.get("/:itemId/topBidList{/}", (request: any, response: any) => {
    let requestItemId: number = sanitizeItemId(request.params.itemId);

    if (typeof itemMap.get(requestItemId) != "undefined")
    {
        //  case empty map
        if (itemMap.get(requestItemId)!.bids.size == 0)
        {
            response.json("");
            return ;
        }
        
        // create array : value -> userId, then .sort
        let sortArray = new Array<{userId: number, value: number}>
        itemMap.get(requestItemId)!.bids.forEach((item) => {
            sortArray.push({userId: item.userId, value: item.value});
        });
        sortArray.sort((a, b) => b.value - a.value);
        if (sortArray.length > 15)
            sortArray.length = 15;
        response.json(sortArray);
        return ;
    }
    response.status(404).json({error: "ressource doesnt exist"});
});

// fallback / default
express.use((request: any, response: any) => {
    response.status(400).json({error: "bad request"})
});

express.listen(8080, () => {
    console.log("listening on port 8080")
});
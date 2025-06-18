import {user} from "./types";

// generate a 10 character long 'unique' string
//  add logic to make it unique!!
export function generateSessionKey() :string {
    return String(Math.random()).slice(2).substring(0, 10);
}

export function returnElapsedMinutes(timestamp: number): number {
    return (((Date.now() - timestamp) / 1000) / 60);
}

//  returns true if user has timed out
export function userTimeout(timestamp: number): boolean {
    if (returnElapsedMinutes(timestamp) > 10)
        return true;
    return false;
}

export function getUserFromSessionKey(userMap: Map<number, user>, _sessionKey: string): user | boolean {
    let foundUser: user | boolean = false;
    userMap.forEach((item) => {
        if (item.sessionKey === _sessionKey)
            foundUser = item;
    })
    return foundUser || false;
}

// sanitize
export function sanitizeSessionKey(incomingSessionKey: string) : string {
    return (incomingSessionKey);
}

export function sanitizeItemId(incomingItemid: string): number {
    return Number(incomingItemid);
}

export function sanitizeUserId(incomingItemid: string): number {
    return Number(incomingItemid);
}

export function sanitizeBidValue(incomingItemid: string): number {
    return Number(incomingItemid);
}
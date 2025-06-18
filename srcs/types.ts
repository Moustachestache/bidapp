export type user = {
    userId: number;
    sessionKey: string;
    sessionKeyCreation: number;
}

export type bid = {
    userId: number;
    itemid: number;
    value: number;
}

//  bids use user id as keys. one user bid per item.
export type item = {
    itemId: number;
    bids: Map<number, bid>;
}
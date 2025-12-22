export const buildRequest = () => {

}

async _postRequestPromiseAPI(uri, payload) {
    const headers = {};
    const method = 'POST';

    signPostRequest(this.accessKey, this.secretKey, method, uri, headers, payload);

    return await got(`${this.url}${uri}`, {
        method: method,
        headers: headers,
        json: payload,
        decompress: this.compression,
        responseType: 'json',
        resolveBodyOnly: true
    }).catch((error) => {
        this._modifyErrorResponse(error);
        throw (error);
    });
}

export interface ComlinkApi {
    getGuild: (id: string) => any,
    getPlayer: (id: string) => any,

}

export const comlinkApiClient : ComlinkApi = {
    getGuild: (id: string) => {

    },
    getPlayer: async (id: string) => {
        const requestObject = {
            "payload": {}
        };
        if (allyCode) {
            requestObject.payload.allyCode = allyCode;
        } else {
            requestObject.payload.playerId = playerId;
        }
        return await this._postRequestPromiseAPI(`/player`, requestObject).catch((error) => {
            throw (error);
        });
    }
}
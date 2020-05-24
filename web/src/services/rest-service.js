import apiKey from "../../../config/config";

export const RestMethod = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export class RestService {
  constructor(apiPath) {
    this._url = apiPath;
    this._apiKey = apiKey;
  }

  async callApi(path, method = RestMethod.get, data, jsonResponse = true) {
    let response;

    try {
      const fetchOptions = {
        method,
        cache: "no-cache",
        credentials: "omit",
        redirect: "follow",
        referrerPolicy: "no-referrer",
        headers: {},
      };

      if (data) {
        fetchOptions.headers["Content-Type"] = "application/json";
        fetchOptions.body = JSON.stringify(data);
      }
      // console.log({ path, method, response });
      response = await fetch(`${this._url}/${path}`, fetchOptions);

      if (!response.ok) {
        throw new Error(response.status);
      }

      return jsonResponse && response.status !== 204 ? response.json() : true;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

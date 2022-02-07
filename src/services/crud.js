import {CrudRequest} from "@crud/core";
import  { notify } from "react-notify-toast";
export class CrudFactory extends CrudRequest {
    baseUrl = "https://lmsoskillupdated.herokuapp.com";
    getUrl = (...segments) => segments.reduce((url, segment) => url + segment, this.baseUrl);

    async retrieve(url, data= {}, requestOptions = {}) {
        return this.send({
            method: "GET",
            url: " " + url,
            data,
            ...requestOptions
        });
    }

    async create(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: "/api/" + url,
            data,
            ...requestOptions
        });


    }

    async update(url, data = {}, requestOptions= {}) {
        return this.send({
            method: "POST",
            url: "update/" + url,
            data,
            ...requestOptions
        });
    }

    async delete(url, data, requestOptions = {}) {
    return this.send({
    method: "POST",
    url: "/" + url,
    data,
    ...requestOptions
});
}

async send(requestOptions = {}) {
    const {url, data, method = true} = requestOptions;

    const options = {
    ...requestOptions.ajaxOptions,
    method
};

    let fullUrl;

    options.headers = {
    ...options.headers,
    Accept: "application/json"
};

    if (!(data instanceof FormData)) {
    options.headers["Content-Type"] = "application/json";
}

    fullUrl = this.getUrl(url);
    fullUrl += `?token=${localStorage.getItem("login_token")}`;

    if (options.method === "GET") {
    const queryString = new URLSearchParams(JSON.parse(JSON.stringify(data)));
    fullUrl += `&${queryString}`;
} else if (data instanceof FormData) {
    options.body = data;
} else {
    options.body = JSON.stringify(data);
}
    let res = {
    data: [],
    message: "",
    type: "error",
    errors: []
};
    try {
    const response = await fetch(fullUrl, options);
    res = await response.json();
    const {status, detail} = res;
    if (options.method !== "GET" && notify) {
    if(status==true){
    await notify.show(detail, 'success', 1000);
}
    if(status== false){
        await notify.show(detail,'error' , 1000);
    }
    if(status==='warning'){
        await notify.show(detail,'warning', 1000);
    }
}

} catch (e) {
        await notify.show( e.detail,'error', 1000);
        throw e;
}

    const {status} = res;

    if (status === false)
    throw res;

    return res;
}
}

export const crud = new CrudFactory();

import {CrudRequest} from "@crud/core";
import {ajaxRequest} from "@crud/jquery";
import {chooseFile} from "@crud/web";
export const crud = new CrudRequest();
crud.config(ajaxRequest);
crud.config(chooseFile);
crud.config(config => {
    config.baseUrl =  "/";
    return config;
});


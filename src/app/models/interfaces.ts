import { ImgPath, MessageTypes, StatusTaskTypes } from "./constants";

export interface ITaskType {
    id:             number;
    text:           string;
    description:    string;
    status:         StatusTaskTypes;
}

export interface INewTaskType {     
    text:        string;
    description: string;
}

export interface IToastType {  
    index:      number;
    message:    string;
    type:       MessageTypes;
}

export interface IMainMenuType {  
    index:      number;
    name:       string;
    isSelect:   boolean;
    mainIimg:   ImgPath;
    selectImg:  ImgPath;
    rout:       string;
}
import { MessageType } from "./constants";

export interface ITaskType {
    id:     number;
    text:   string;
    description: string;
}

export interface INewTaskType {     
    text:   string;
    description: string;
}

export interface IToastType {  
    index: number;
    message: string;
    type: MessageType;
}
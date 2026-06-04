import { IMainMenuType } from "./interfaces";

export enum ImgPath {
    approval = "src/assets/images/approval.svg",
    delete =  "src/assets/images/delete.svg",
    save =  "src/assets/images/save.svg",
    plus_math = "src/assets/images/plus_math.svg",
    overview_pages_4 = "src/assets/images/overview_pages_4.svg",
    overview_pages_select = "src/assets/images/overview_pages_select.svg",
    alarm = "src/assets/images/alarm.svg",
    apple_user = "src/assets/images/apple_user.svg",
    apple_user_select = "src/assets/images/apple_user_select.svg",
    control_panel = "src/assets/images/control_panel.svg",
    control_panel_select = "src/assets/images/control_panel_select.svg",
    settings = "src/assets/images/settings.svg",
    settings_select = "src/assets/images/settings_select.svg",
    info = "src/assets/images/info.svg",
    error = "src/assets/images/error.svg",
    warning = "src/assets/images/warning.svg",
    close = "src/assets/images/close.svg",
    column = "src/assets/images/column.svg",
    column_select = "src/assets/images/column_select.svg",
    horizontal_settings_mixer = "src/assets/images/horizontal_settings_mixer.svg",
}

export enum ButtonTypes {
    volume = "button-volume",
    flat = "button-flat"
}

export enum MessageTypes {
    warning = 'Предупреждение',
    error = 'Ошибка',
    info = 'Сообщение'
}

export enum StatusTaskTypes {
    inProgress = 'InProgress',
    completed = 'Completed'
}

export const mainMenuConfig:IMainMenuType[] = [
      {index:0, isSelect:false, name:"overview_pages_4", mainImg: ImgPath.overview_pages_4, selectImg: ImgPath.overview_pages_select, rout:"backlog"},
      {index:1, isSelect:false, name:"column", mainImg: ImgPath.column, selectImg: ImgPath.column_select, rout:"board"},
      {index:2, isSelect:false, name:"apple_user", mainImg: ImgPath.apple_user, selectImg: ImgPath.apple_user_select, rout:""},
      {index:3, isSelect:false, name:"control_panel", mainImg: ImgPath.control_panel, selectImg: ImgPath.control_panel_select, rout:""},
      {index:4, isSelect:false, name:"settings", mainImg: ImgPath.settings, selectImg: ImgPath.settings_select, rout:""},
    ];

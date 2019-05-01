import { Icon } from './icon.model';

export interface Alert {
    id: number;
    icon: string;
    message: string;
    autoHide: boolean;
    type: AlertType;
}

export class SuccessAlert implements Alert {
    id: number;
    icon: Icon;
    message: string;
    autoHide: boolean;
    type: AlertType;

    constructor(message: string, autoHide: boolean = true) {
        this.message = message;
        this.autoHide = autoHide;
        this.icon = Icon.CHECK;
        this.type = AlertType.SUCCESS;
    }
}

export class ErrorAlert implements Alert {
    id: number;
    icon: Icon;
    message: string;
    autoHide: boolean;
    type: AlertType;

    constructor(message: string, autoHide: boolean = true) {
        this.message = message;
        this.autoHide = autoHide;
        this.icon = Icon.WARNING;
        this.type = AlertType.ERROR;
    }
}

export enum AlertType {
    ERROR,
    SUCCESS,
}

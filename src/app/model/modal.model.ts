import { Icon } from './icon.model';

export interface Modal {
    id: number;
    type: ModalType;
    icon: Icon;
    content: string;
}

export class ConfirmationModal implements Modal {
    id: number;
    type: ModalType;
    icon: Icon;

    constructor(
        public content: string,
        public acceptButtonCallback: Function,
        public acceptButtonText: string,
    ) {
        this.id = 0;
        this.type = ModalType.CONFIRMATION;
        this.icon = Icon.WARNING;
    }
}

export class ErrorModal implements Modal {
    id: number;
    type: ModalType;
    icon: Icon;

    constructor(
        public content: string,
    ) {
        this.id = 0;
        this.type = ModalType.ERROR;
        this.icon = Icon.WARNING;
    }
}

export enum ModalType {
    ERROR,
    CONFIRMATION,
}
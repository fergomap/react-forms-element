import Option from './option';

export default class OptionImp implements Option {
    label: any;
    value: any;

    constructor(label: any = '', value: any = '') {
        this.label = label;
        this.value = value;
    }
}

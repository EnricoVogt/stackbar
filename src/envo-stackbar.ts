interface IValue { // todo: better name ...
    value: number;
    color: string;
    title: string;
}

export class EnvoStackbar extends HTMLElement {

    private _values: IValue[] = [];
    private envoStackElement: any;
    static get observedAttributes() { return ["values"]; }

    public set values(values: IValue[]) {
        this.setAttribute("values", JSON.stringify(values));
        this._values = values;
        this.update();
    }

    public get values() {
        return this._values;
    }

    constructor() {
        super();
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            :host {display:block;}
            :host div.envo-stackbar {display:flex}
            :host div.envo-stackbar * {text-align:center}
            :host div.envo-stackbar div:first-child {
                border-radius:5px 0 0 5px;
            }
            :host div.envo-stackbar div:last-child {
                border-radius:0 5px 5px 0;
            }
        </style>
        <div class="envo-stackbar"></div>
        `;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.envoStackElement = this.shadowRoot.querySelector('.envo-stackbar');
    }

    protected connectedCallback() {
        this.update();
    }

    protected disconnectedCallback() {
        //
    }

    protected attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (name === "values" && oldValue !== newValue) {
            try {
                this.values = JSON.parse(newValue);
            } catch (exception) {
                console.error(exception);
            }
        }
    }

    private sum(elements: IValue[]): number {
        return elements.reduce<number>((last, curr) => {
            return last + curr.value;
        }, 0);
    }

    private getBarPercentValue(value: number, sum: number) {
        return ((value / sum) * 100);
    }

    private setStyles(element: HTMLElement, styles: any) {
        for (const key in styles) {
            if (styles.hasOwnProperty(key)) {
                element.style.setProperty(key, styles[key]);
            }
        }
    }

    private update() {
        console.log(this.values, 'update');
        this.envoStackElement.childNodes.forEach((value:any) => {
            this.removeChild(value);
        })

        const sum = this.sum(this.values);
        this.values.forEach(value => {
            const div = document.createElement("div");
            div.textContent = value.title
            const styles = {
                background: value.color || 'grey',
                width: this.getBarPercentValue(value.value, sum) + "%",
            };
            this.setStyles(div, styles);
            this.envoStackElement.appendChild(div)
        })
    }
}

customElements.define("envo-stackbar", EnvoStackbar);

interface IValue { // todo: better name ...
    value: number;
    styles?: any;
    title: string;
}

export class EnvoStackbar extends HTMLElement {

    private _values: IValue[] = [];
    private _showLegend: boolean;

    private envoStackElement: any;

    static get observedAttributes() { return ["values", "show-legend"]; }

    public set values(values: IValue[]) {
        this.setAttribute("values", JSON.stringify(values));
        this._values = values;
    }

    public get values() {
        return this._values;
    }

    public set showLegend(showLegend: boolean) {
        this.setAttribute("show-legend", `${showLegend}`);
        this._showLegend = showLegend;

    }

    public get showLegend() {
        return this._showLegend;
    }

    constructor() {
        super();
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            :host {display:block;}
            :host div.envo-stackbar {display:flex}
            :host div.envo-stackbar * {text-align:center;}
            :host div.envo-stackbar *:first-child {
                border-radius:5px 0 0 5px;
            }
            :host div.envo-stackbar *:last-child {
                border-radius:0 5px 5px 0;
            }
            :host .legend-container {display:flex;justify-content: center;padding-top:.5rem}
        </style>
        <div class="envo-stackbar"></div>
        `;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.envoStackElement = this.shadowRoot.querySelector(".envo-stackbar");
    }

    protected attributeChangedCallback(name: string, oldValue: string, newValue: string) {

        if (oldValue === newValue) {
            return;
        }

        if (name === "show-legend") {
            this.showLegend = (newValue === "true") ? true : false;
        }

        if (name === "values") {
            try {
                this.values = JSON.parse(newValue);
            } catch (exception) {
                console.error(exception);
            }
        }

        this.update();
    }

    private sum(elements: IValue[]): number {
        return elements.reduce<number>((last, curr) => {
            return last + curr.value;
        }, 0);
    }

    private getBarPercentValue(value: number, sum: number) {
        return ((value / sum) * 100);
    }

    private setStyles(element: HTMLElement, styles: any): void {
        Object.assign(element.style, styles);
    }

    private removeNodes() {

        const legendContainer = this.shadowRoot.querySelector(".legend-container");
        if (legendContainer) {
            this.shadowRoot.removeChild(legendContainer);
        }

        while (this.envoStackElement.firstChild) {
            this.envoStackElement.removeChild(this.envoStackElement.firstChild);
        }
    }

    private addLegend(values: IValue[]) {
        const legendContainer = document.createElement("div");
        legendContainer.classList.add("legend-container");

        values.forEach((value, index: number) => {
            const div = document.createElement("div");
            const legendIcon = document.createElement("span");
            const legendTitle = document.createElement("span");
            legendIcon.textContent = "■ ";
            legendIcon.style.color = value.styles.backgroundColor;
            legendTitle.textContent = value.title;
            div.appendChild(legendIcon);
            div.appendChild(legendTitle);
            div.setAttribute("index", index.toString());
            legendContainer.appendChild(div);
        });

        this.shadowRoot.appendChild(legendContainer);
    }

    private update() {
        this.removeNodes();

        if (this.showLegend) {
            this.addLegend(this.values);
        }

        const sum = this.sum(this.values);
        this.values.forEach((value, index: number) => {
            const div = document.createElement("div");
            div.setAttribute("index", index.toString());

            const percentValue = this.getBarPercentValue(value.value, sum);

            const styles = {
                ...{ width: percentValue + "%" },
                ...value.styles,
            };

            div.textContent = `${percentValue.toFixed(1)}%`;

            this.setStyles(div, styles);
            this.envoStackElement.appendChild(div);
        });
    }
}

customElements.define("envo-stackbar", EnvoStackbar);

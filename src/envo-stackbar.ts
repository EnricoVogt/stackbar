export class EnvoStackbar extends HTMLElement {

    constructor() {
        super();
        const template = document.createElement("template");
        template.innerHTML = `
        <style>
            :host {display:block;}
            :host div.envo-stackbar {display:flex}
            :host div.envo-stackbar * {text-align:center}
            ::slotted(*:first-child) {
                border-radius:5px 0 0 5px;
            }
            ::slotted(*:last-child) {
                border-radius:0 5px 5px 0;
            }
        </style>
        <div class="envo-stackbar">
            <slot></slot>
        </div>
        `;
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector("slot").addEventListener("slotchange", () => {
            this.update();
        });
    }

    protected connectedCallback() {
        this.update();
    }

    protected disconnectedCallback() {
        //
    }

    private getValue(element: Element): number {
        return Number(element.getAttribute("value"));
    }

    private sum(elements: Element[]): number {
        return elements.reduce<number>((last, curr) => {
            return last + this.getValue(curr);
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
        const elements = Array.from<HTMLElement>(this.querySelectorAll("*"));
        const sum = this.sum(elements);

        elements.map((element) => {
            const styles = {
                background: element.getAttribute("color") || "grey",
                width: this.getBarPercentValue(this.getValue(element), sum) + "%",
            };

            this.setStyles(element, styles);
        });
    }
}

customElements.define("envo-stackbar", EnvoStackbar);

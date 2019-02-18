[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@envo/stackbar)
# ENVO-Stackbar

A simple webcomponent to show a 100% stacked bar chart.

## DEMO
https://enricovogt.github.io/stackbar/index.html

## Installation

```
npm i @envo/stackbar
```

## DEMO

<!--
```
<custom-element-demo>
  <template>
    <script src="https://unpkg.com/@envo/stackbar/dist/envo-stackbar.js"></script>
    <script>
      const envoStackbarElement = document.querySelector('#envo-stackbar');
    
      envoStackbarElement.showLegend = true;
      envoStackbarElement.values = [
        {
          value:12,
          title:"1",
          styles: { 
            backgroundColor: 'red' 
          }
        },
        {
          value:12,
          title:"2",
          styles: {
            backgroundColor: 'indianred'
          }
        },
        {
          value:4,
          title:"3",
          styles: {
            backgroundColor: 'orange'
          }
        },
        {
          value:5,
          title:"4",
          styles: {
            backgroundColor: 'lightgreen'
          }
        },
        {
          value:24,
          title:"5",
          styles: {
            backgroundColor: 'green'
          }
        },
      ];
    </script>
    <envo-stackbar id="envo-stackbar"></envo-stackbar>
  </template>
</custom-element-demo>
```
-->

## Usage

```html
<script>
  const envoStackbarElement = document.querySelector('#envo-stackbar');

  envoStackbarElement.showLegend = true;
  envoStackbarElement.values = [
    {
      value:12,
      title:"1",
      styles: { 
        backgroundColor: 'red' 
      }
    },
    {
      value:12,
      title:"2",
      styles: {
        backgroundColor: 'indianred'
      }
    },
    {
      value:4,
      title:"3",
      styles: {
        backgroundColor: 'orange'
      }
    },
    {
      value:5,
      title:"4",
      styles: {
        backgroundColor: 'lightgreen'
      }
    },
    {
      value:24,
      title:"5",
      styles: {
        backgroundColor: 'green'
      }
    },
  ];
</script>
<envo-stackbar id="envo-stackbar"></envo-stackbar>
```


## License

MIT

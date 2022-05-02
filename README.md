# Getting Started

This package is not intended to be used outside the context of the project n°14 - HRNet of the Openclassrooms React Web Developer training (04/2022)

It will not be maintained, and may even be deleted.

Include a label and an input with home made datepicker

# How to use

In your terminal, install package as dependancie :

### `npm i oc_p14_hrnet_datepicker`

Then import and use directly in your react application as component

example:

```
<DatePicker
    forId="date-of-birth"
    content="Date of Birth"
    ref={addInputs}
/>
```

> - **forId** : name connectiong input id to label for attribute
> - **content** : label text to display
> - **ref** : a reference to pass to package if you want to use useRef hooks

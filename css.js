function css() {
    return `
body {
    font-family: sans-serif;
    color: white;
    background-color: black;
}

table {
    margin-bottom: 1em
}

caption {
    font-weight: bold
}

.actual {
    font-weight: bold
}

div.west {
    text-align: left;
}

div.central {
    text-align: center;
}

div.east {
    text-align: right;
}

div.delay0 { color: #0f0; } 
div.delay1 { color: #fff; } 
div.delay2 { color: #ff0; } 
div.delay4 { color: #f80; }
div.delay8 { color: #f00; }
`
}

module.exports = css

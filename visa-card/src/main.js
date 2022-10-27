import './css/index.css'
// the querySelector is for select the html elements
const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

// add array of card colors
function setCardType(type) {
    const colores = {
        "visa": ["#436D99", "#2D57F2"],
        "mastercard": ["#DF6F29", "#C69347"],
        "default": ["#black", "#gray"],
    }
    ccBgColor01.setAttribute("fill", colores[type][0])
    ccBgColor02.setAttribute("fill", colores[type][1])
    ccLogo.setAttribute("src", `cc-${type}.svg`)


}
globalThis.setCardType = setCardType
    //setCardType("visa");
import './css/index.css'
import IMask from 'imask';

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

// securty code 
const cvcSecurityCode = document.querySelector('#security-code')
const securtyCodPattern = {
    mask: "0000",
}
const securtyCodeMasked = IMask(cvcSecurityCode, securtyCodPattern)




const expirationDate = document.querySelector('#expiration-date')
const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {

        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
        },

        MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        }
    }
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

const cardNumber = document.querySelector("#card-number")

const cardNumberPattern = {

    mask: [{
            mask: "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardType: "visa",
        },
        {
            mask: "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\de{0,12}/,
            cardType: "mastercard",
        },
        {
            mask: "0000 0000 0000 0000",
            cardType: "default",
        },
    ],
    dispatch: function(appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");
        const foundMask = dynamicMasked.compiledMasks.find(function(item) {
            return number.match(item.regex)
        })
        return foundMask
    },
}


const cardNumberMask = IMask(cardNumber, cardNumberPattern)


const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {

    alert("Card add succesful ✅ ")
})
document.querySelector("form").addEventListener("submit", (even) => {
    even.preventDefault()

})
const cardHolder = document.querySelector("#card-holder")

cardHolder.addEventListener("input", () => {
    const ccHolder = document.querySelector(".cc-holder .value")
    ccHolder.innerText = cardHolder.value == 0 ? "DANIEL JOAQUIM PAULLINO" : cardHolder.value

})

securtyCodeMasked.on("accept", () => {
    updateSecrutyCode(securtyCodeMasked.value);
})

const updateSecrutyCode = (code) => {
    const ccSecurity = document.querySelector(".cc-security .value")
    ccSecurity.innerText = code.lengh == 0 ? "123" : code
}


cardNumberMask.on("accept", () => {
    const cardType = cardNumberMask.masked.currentMask.cardType
    setCardType(cardType)
    updateCardNumber(cardNumberMask.value)
})

const updateCardNumber = (number) => {

    const ccNumber = document.querySelector(".cc-number")
    ccNumber.innerText = number == 0 ? "1234 5678 9012 3456" : number;
}

expirationDateMasked.on("accept", () => {
    upadateExpirationDate(expirationDateMasked.value)
})
const upadateExpirationDate = (expiration) => {
    const ccExpiration = document.querySelector(".cc-expiration .value")
    ccExpiration.innerText = expiration.lengh == 0 ? "02/32" : expiration
}
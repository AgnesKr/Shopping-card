String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

//"abcdef" -> "abbdef"

let shoppingCard = new ShoppingCard()


document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("delete")) {
        shoppingCard.removeProduct(e.target.getAttribute("index"))
        e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode)
    }

    if (e.target && e.target.classList.contains("button")) {
        shoppingCard.addProduct(JSON.parse(e.target.getAttribute("product")))
    }
})

document.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("input-quantity")) {
        shoppingCard.modifyQuantity(e.target.getAttribute("index"), e.target.value)
    }
})

//tablica na produkty
let products = []

//GET -> pobieranie danych,POST -> wysyłania danych,PUT -> modyfikacja danych na serwerze,DELETE -> usuwanie danych na serwerze
//200 - OK, 4** -> błedy klienta, 5** -> błedy serwera
axios({
    url: "http://localhost:3000/products"
}).then((res) => {
    console.log(res.data)
    for (let i = 0; i < res.data.length; i++) {
        let product = res.data[i]
        products.push(
            new CardProduct(product.id, product.image, product.name, product.quantity, product.price, product.colour, product.size)
        )
    }
    document.querySelector(".container_photos").innerHTML += `<hr style="width: 100%; margin-bottom: 0">`
    setTimeout(() => {
        onResize()
    },100)
}).catch((err) => {
    console.log(err)
})

document.querySelector(".confirm").addEventListener("click", function (e) {
    shoppingCard.processOrder()
})

let radios = document.querySelectorAll("[name=delivery]")
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
        shoppingCard.createSummary()
    })
}


function onResize(e) {
    if (window.innerWidth < 800) {
        let wraps = document.querySelectorAll(".wrap"),
        images = document.querySelectorAll(".image")
        wraps.forEach((value) => {
            value.classList.add("set")
        })
        images.forEach((value) => {
            value.style.width = "50%"
        })
        
    } else {
        let theadElements = document.querySelectorAll(".head .column"),
            wraps = document.querySelectorAll(".wrap"),
            tbodyWidth = document.querySelector(".tbody").getBoundingClientRect().width
        wraps.forEach((value) => {
            value.classList.remove("set")
        })
        for (let i = 0; i < theadElements.length; i++) {
            theadElements[i].style.width = tbodyWidth / 7 + "px"
        }
        let tbodyElements = document.querySelectorAll(".tbody .column")
        console.log(tbodyWidth)
        for (let i = 0; i < tbodyElements.length; i++) {
            tbodyElements[i].style.width = tbodyWidth / 7 + "px"
        }
    }
    let productsH3 = document.querySelectorAll(".product h3"),
    productsIMG = document.querySelectorAll(".product img"),
    productsH5 = document.querySelectorAll(".product h5"),
    maxHeight = 0,
    productsButtons = document.querySelectorAll(".product button")
    console.log(productsH3,productsIMG,productsH5)
    productsH3.forEach((value) => {
        if(value.getBoundingClientRect().height > maxHeight) {
            maxHeight = value.getBoundingClientRect().height
        }
        
    })

    let maxHeightImg = 0
    productsIMG.forEach((value) => {
        value.style.top = maxHeight + 50 + "px"
        if(window.innerWidth > 600) {
            value.style.width = value.parentElement.children[0].getBoundingClientRect().width + 'px'
        } else {
            value.style.width = "75%"
        }
       
        if(value.getBoundingClientRect().height > maxHeightImg) {
            maxHeightImg = value.getBoundingClientRect().height
        }
    })

    productsH5.forEach((value) => {
        value.style.top = maxHeight + 50 + maxHeightImg + 20 + "px"
        console.log(value.parentElement.children[1].getBoundingClientRect().left)
        value.style.width = value.parentElement.children[1].getBoundingClientRect().width + "px"
    })

    productsButtons.forEach((value) => {
        let child =value.parentElement.children[1].getBoundingClientRect(),
        imgCenter = child.left + child.width / 2,
        parent = value.parentElement.getBoundingClientRect()
        console.log(child)
        value.style.left = imgCenter - value.getBoundingClientRect().width / 2 - parent.left  + "px"
    })

    console.log(maxHeight,maxHeightImg)

}

function onScroll(e) {
    console.log(window.pageYOffset)
    console.log(document.body.clientHeight)
    
}

window.addEventListener("resize", onResize)

window.addEventListener("scroll", onScroll)

let str = "abcdef"
str = str.replaceAt(2, "b")
console.log(str)

onResize()

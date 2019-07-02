String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

let shoppingCard = new ShoppingCard()

axios({
    url: "http://localhost:3000/products"
}).then((res) => {
    for (let i = 0; i < res.data.length; i++) {
        let {
            id,
            image,
            name,
            quantity,
            price,
            colour,
            size
        } = res.data[i]
        new CardProduct(id, image, name, quantity, price, colour, size)
    }
    document.querySelector(".container_photos").innerHTML += `<hr style="width: 100%; margin-bottom: 0">`
    setTimeout(() => {
        onResize()
    }, 100)
}).catch((err) => {
    console.log(err)
})

document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("delete")) {
        shoppingCard.removeProduct(e.target.getAttribute("index"))
        e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode)
    }

    if (e.target && e.target.classList.contains("addProduct")) {
        shoppingCard.addProduct(JSON.parse(e.target.getAttribute("product")))
    }
})

document.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("input-quantity")) {
        shoppingCard.modifyQuantity(e.target.getAttribute("index"), e.target.value)
    }
})

window.addEventListener("resize", onResize)
window.addEventListener("scroll", onScroll)

function onResize(e) {
    let windowDiv = document.querySelector(".window"),
        wraps = document.querySelectorAll(".wrap")
    if (windowDiv.style.visibility == "visible") {
        windowDiv.style.left = window.innerWidth / 2 - windowDiv.offsetWidth / 2 + "px"
    }
    if (window.innerWidth < 800) {
        let images = document.querySelectorAll(".image")
        for (let i = 0; i < wraps.length; i++) {
            wraps[i].classList.add("set")
        }
        for (let i = 0; i < images.length; i++) {
            images[i].style.width = "50%"
        }

    } else {
        let theadElements = document.querySelectorAll(".head .column"),
            tbodyWidth = document.querySelector(".tbody").getBoundingClientRect().width

        for (let i = 0; i < wraps.length; i++) {
            wraps[i].classList.remove("set")
        }
        for (let i = 0; i < theadElements.length; i++) {
            theadElements[i].style.width = tbodyWidth / 7 + "px"
        }
        let tbodyElements = document.querySelectorAll(".tbody .column")
        for (let i = 0; i < tbodyElements.length; i++) {
            tbodyElements[i].style.width = tbodyWidth / 7 + "px"
        }
    }
    let productsH3 = document.querySelectorAll(".product h3"),
        productsIMG = document.querySelectorAll(".product img"),
        productsH5 = document.querySelectorAll(".product h5"),
        maxHeight = 0,
        productsButtons = document.querySelectorAll(".product button")
    for (let i = 0; i < productsH3.length; i++) {
        if (productsH3[i].getBoundingClientRect().height > maxHeight) {
            maxHeight = productsH3[i].getBoundingClientRect().height
        }

    }

    let maxHeightImg = 0
    for (let i = 0; i < productsIMG.length; i++) {
        productsIMG[i].style.top = maxHeight + 50 + "px"
        if (window.innerWidth > 600) {
            productsIMG[i].style.width = productsIMG[i].parentElement.children[0].getBoundingClientRect().width + 'px'
        } else {
            productsIMG[i].style.width = "75%"
        }

        if (productsIMG[i].getBoundingClientRect().height > maxHeightImg) {
            maxHeightImg = productsIMG[i].getBoundingClientRect().height
        }

    }

    for (let i = 0; i < productsH5.length; i++) {
        productsH5[i].style.top = maxHeight + 50 + maxHeightImg + 20 + "px"
        productsH5[i].style.width = productsH5[i].parentElement.children[1].getBoundingClientRect().width + "px"

    }

    for (let i = 0; i < productsButtons.length; i++) {
        let child = productsButtons[i].parentElement.children[1].getBoundingClientRect(),
            imgCenter = child.left + child.width / 2,
            parent = productsButtons[i].parentElement.getBoundingClientRect()
        productsButtons[i].style.left = imgCenter - productsButtons[i].getBoundingClientRect().width / 2 - parent.left + "px"
    }
}

function onScroll(e) {
    if (document.querySelector(".window").style.visibility == "visible") {
        let windowDiv = document.querySelector(".window")
        windowDiv.style.top = window.innerHeight / 2 - windowDiv.offsetHeight / 2 - 50 + window.pageYOffset + "px"
    }
}

document.querySelector(".confirm").addEventListener("click", function (e) {
    shoppingCard.processOrder()
})

let radios = document.querySelectorAll("[name=delivery]")
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function () {
        shoppingCard.createSummary()
    })
}





onResize()
let shoppingCard = new ShoppingCard()


document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("delete")) {
        shoppingCard.removeProduct(e.target.getAttribute("index"))
        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
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
}).catch((err) => {
    console.log(err)
})

document.querySelector(".confirm").addEventListener("click", function (e) {
    shoppingCard.processOrder()
    // axios({
    //     url: "http://localhost:3000/orders",
    //     method: "POST",
    //     data: {

    //     }
    // })
})

let radios = document.querySelectorAll("[name=delivery]")
for (let i = 0; i < radios.length; i++) {
    radios[i].addEventListener("change", function() {
        shoppingCard.createSummary()
    })
   
}
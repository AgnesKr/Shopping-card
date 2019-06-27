function ShoppingCard() {
    this.products = []
    this.summary = new Summary()

    this.addProduct = function (product) {
        this.products.push({
            ...product,
            numberOfUnits: 1
        }) //id,name,image... + numberOfUnits
        document.querySelector(".tbody").innerHTML +=
        `
        <div class="range">
            <div class="column image">
                <img src="${product.image}"/>
            </div>
            <div class="range wrap">
                <div class="column">
                    ${product.name}
                </div>
                <div class="column">
                    <input class="input-quantity" index="${product.id}" type="number" value="1" min="1" max="${product.quantity}"/>
                </div >
                <div class="column">
                    ${product.price}
                </div>
                <div class="column">
                    ${product.colour}
                </div>
                <div class="column">
                    ${product.size}
                </div>
                <div class="column">
                    <i class="fas fa-trash delete" index="${product.id}"></i>
                </div>
            </div>
        </div>
        `
        onResize()
        document.querySelector(".countItems").innerHTML = this.products.length
        this.createSummary()
    }

    this.removeProduct = function (id) {
        console.log(this.products)
        this.products = this.products.filter((value, index) => {
            console.log(value.id, id)
            return value.id != id
        })
        setTimeout(() => {
            console.log(this.products)
        }, 1000)

        document.querySelector(".countItems").innerHTML = this.products.length
        this.createSummary()
    }

    this.modifyQuantity = function (id, numberOfUnits) {
        console.log(id, numberOfUnits)
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id == id) {
                this.products[i].numberOfUnits = parseInt(numberOfUnits)
            }
        }
        console.log(this.products)
        this.createSummary()
    }

    this.createSummary = () => {
        let summary = 0
        for (let i = 0; i < this.products.length; i++) {
            summary += this.products[i].numberOfUnits * this.products[i].price
        }
        let radios = document.querySelectorAll("[name=delivery]")

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                let price = JSON.parse(radios[i].getAttribute("value")).price
                summary += price
                document.querySelector(".summary h5").innerHTML = `Delivery - ${price} PLN`
            }
        }
        document.querySelector(".summary h2").innerHTML = `Total: ${summary} PLN`
        return summary
    }

    this.processOrder = () => {
        let price = this.createSummary()
        let date = new Date()
        let delivery = new Date()
        let transactionDate = `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1): date.getMonth() + 1 }-${date.getDate() < 10 ? "0" + date.getDate(): date.getDate()}`
        let radios = document.querySelectorAll("[name=delivery]")
        for (let i = 0; i < radios.length; i++) {
            console.log(radios[i])
            if (radios[i].checked) {
                delivery.setDate(date.getDate() + JSON.parse(radios[i].getAttribute("value")).days)
            }
        }
        //["niedziela","poniedziałek","wtorek",..]
        //date -> data wcześniejsza
        //delivery -> data dostarczenia
        //date < delivery -> true
        let diff = 0
        for (let i = date; i <= delivery; i.setDate(i.getDate() + 1)) {
            if (i.getDay() == 0 || i.getDay() == 6) {
                diff += 1
            }
        }
        delivery.setDate(delivery.getDate() + diff)
        let deliveryDate = `${delivery.getFullYear()}-${delivery.getMonth() + 1 < 10 ? "0" + (delivery.getMonth() + 1): delivery.getMonth() + 1 }-${delivery.getDate() < 10 ? "0" + delivery.getDate(): delivery.getDate()}`

        this.summary.openWindow(deliveryDate, transactionDate, this.products, price)
    }
}
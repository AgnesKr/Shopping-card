function Summary() {

    this.isOpen = false
    this.phoneNumber = ""
    this.zipCode = "__-___"

    this.openWindow = (deliveryDate,transactionDate, products,price) => {
        if(!this.isOpen) {
            let windowDiv = document.querySelector(".window")
            windowDiv.style.visibility = "visible"
            windowDiv.style.left = window.innerWidth / 2 - windowDiv.offsetWidth / 2 +  "px"
            windowDiv.style.top = window.innerHeight / 2 - windowDiv.offsetHeight / 2 - 50 + window.pageYOffset +  "px"
            document.querySelector(".dark").style.visibility = "visible"
            document.querySelector(".dark").style.height = document.body.scrollHeight + "px"
            document.querySelector(".window h5").innerHTML = "Delivery date " + deliveryDate
            document.querySelector(".window-close").addEventListener("click",() => {
                this.isOpen = false
                this.phoneNumber = ""
                close()
            })
            document.querySelector(".dark").addEventListener("click", () => {
                this.isOpen = false
                this.phoneNumber = ""
                close()
            })

            document.querySelector(".window-content-zipcode").addEventListener("keydown",(e) => {
                const allowKeys = [48,49,50,51,52,53,54,55,56,57,8,96,97,98,99,100,101,102,103,104,105]
                if(allowKeys.includes(e.keyCode) == false) {
                    return
                }

                if(e.key != "Backspace") {
                    for(let i = 0; i < this.zipCode.length; i++) {
                        if(this.zipCode[i] == "_") {
                            this.zipCode = this.zipCode.replaceAt(i,e.key)
                            break
                        }
                    }
                } else if(e.key == "Backspace"){
                    let input = document.querySelector(".window-content-zipcode")
                    if(input.selectionStart == input.selectionEnd) {
                        for(let i = 0; i < this.zipCode.length; i++) {
                            if(i == input.selectionStart - 1 && i != 2) {
                                this.zipCode = this.zipCode.replaceAt(i, "_")
                            }
                        }
                    }else {
                        for(let i = 0 ; i < this.zipCode.length; i++) {
                            for(let k = input.selectionStart; k < input.selectionEnd; k++) {
                                if(i != 2 && i == k) {
                                    this.zipCode = this.zipCode.replaceAt(i, "_")
                                }
                            }
                        }
                    }
                }
                document.querySelector(".window-content-zipcode").value = this.zipCode
                let input  = document.querySelector(".window-content-zipcode")
                
                for(let i = 0; i < input.value.length; i++) {
                    if(i == 0 || input.value[i] != "_" && input.value[i] != "-") {
                        input.selectionStart = i + 1
                        input.selectionEnd = i + 1
                    }
                }
                e.preventDefault()
            })

            document.querySelector(".window-content-phone").addEventListener("keydown",(e) => {
                const allowKeys = [48,49,50,51,52,53,54,55,56,57,8,96,97,98,99,100,101,102,103,104,105]
                if(allowKeys.includes(e.keyCode) == false) {
                    e.preventDefault()
                }

                if(e.key != "Backspace") {
                    this.phoneNumber += e.key
                } else if(e.key == "Backspace"){
                    let input = document.querySelector(".window-content-phone")
                    this.phoneNumber = this.phoneNumber.substr(0,this.phoneNumber.length - 1)
                }

                if(this.phoneNumber.length > 9) {
                    e.preventDefault()
                    this.phoneNumber = this.phoneNumber.substr(0,this.phoneNumber.length - 1)
                    document.querySelector("#window-error-phone").innerHTML = "The maximum number of characters is 9"
                } else {
                    document.querySelector("#window-error-phone").innerHTML = ""
                }
            })

            document.querySelector(".submit").addEventListener("click", () => {
                let inputs = document.querySelectorAll(".window input")
                let inputValues = {}
                let errorsP = document.querySelectorAll(".window .error")
                let isError = false
                for(let i = 0 ; i < inputs.length; i++) {
                    if(inputs[i].value.length == 0 || inputs[i].value == "__-___") {
                        for(let k = 0 ; k < errorsP.length; k++) {
                            if(errorsP[k].getAttribute("name") ==  inputs[i].getAttribute("name")) {
                                errorsP[k].innerHTML = "The field is required"
                                isError = true
                            }
                        }
                    }
                   inputValues = {
                       ...inputValues,
                       [inputs[i].getAttribute("name")]: inputs[i].value
                   }
                }
                if(!isError) {
                    axios({
                        url: "http://localhost:3000/orders",
                        method: "POST",
                        data: {
                            transactionDate,
                            deliveryDate,
                            products,
                            price,
                            ...inputValues
                        }
                    })
                }
            })

            this.isOpen = true
        }
    }

}

function close() {
    let inputs = document.querySelectorAll(".window input")
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = ""
    }
    document.querySelector(".dark").style.visibility = "hidden"
    document.querySelector(".dark").style.height = 0 + "px"
    document.querySelector(".window").style.visibility = "hidden"
}
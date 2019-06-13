function Summary() {

    this.isOpen = false

    this.openWindow = (deliveryDate) => {
        console.log("Otwieranie okna")
        if(!this.isOpen) {
            let windowDiv = document.querySelector(".window")
            windowDiv.style.visibility = "visible"
            windowDiv.style.left = window.innerWidth / 2 - windowDiv.offsetWidth / 2 +  "px"
            windowDiv.style.top = window.innerHeight / 2 - windowDiv.offsetHeight / 2 - 50 + "px"
            document.querySelector(".dark").style.visibility = "visible"
            document.querySelector(".window h5").innerHTML = "Data dostawy " + deliveryDate
            document.querySelector(".window-close").addEventListener("click",() => {
                this.isOpen = false
                document.querySelector(".dark").style.visibility = "hidden"
                windowDiv.style.visibility = "hidden"
            })
            document.querySelector(".dark").addEventListener("click", () => {
                this.isOpen = false
                document.querySelector(".dark").style.visibility = "hidden"
                windowDiv.style.visibility = "hidden"
            })
            this.isOpen = true
        }
    }

}


function registerUser(e) {
    e.preventDefault()
    let elements = e.target.elements
    let formData = {}


    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name !== "register" && elements[i].name !== "agreement") {
            formData[elements[i].name] = elements[i].value
        }
    }

    fetch('http://127.0.0.1:3333/reg', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTimeout(() => {
                window.location = '../login/'
            }, 20000)
        })
}


window.onload = () => {
    if (![null, 'null', undefined, 'undefined'].includes(localStorage.getItem("user"))) {
        window.location = '../login/'
    }
}
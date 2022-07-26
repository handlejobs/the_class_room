

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
            if (data === 'OK')
                window.location = '../login/'
            else
                document.getElementById('notify').innerHTML = `<span style="color:red">${data.message}</span>`
        })
        .catch(err => console.error(err))
}


window.onload = () => {
    if (![null, 'null', undefined, 'undefined'].includes(localStorage.getItem("user"))) {
        window.location = '../login/'
    }

    document.querySelectorAll('.must-be-number').forEach(element => {
        element.addEventListener('input', (e) => {
            if (isNaN(e.target.value[e.target.value.length - 1]))
                e.target.value = e.target.value.slice(0, -1);
        })
    })
}
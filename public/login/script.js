


function loginUser(e) {
    e.preventDefault()
    let elements = e.target.elements
    let formData = {}
    let rememberId

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].name !== "login") {
            formData[elements[i].name] = elements[i].value
        }

        if (elements[i].name === 'remember') rememberId = i
    }


    let user = null

    fetch('http://127.0.0.1:3333/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            user = data.user
            // save user in session
            sessionStorage.setItem('user', JSON.stringify(user));
            if (elements[rememberId].checked) setCookie('remember', true, 7)
            localStorage.setItem('alive', true)
            window.location = '../user/'
        }).catch(error => {
            if (error.status === 300) {
                document.getElementById('notify').innerHTML = "<span style='color:red;font-weight:bold'>wrong password</span>"
                return
            }
            if (error.status === 404) {
                document.getElementById('notify').innerHTML = "<span style='color:red;font-weight:bold'>user not found</span>"
                return
            }
        });
}



window.onload = () => {

    document.querySelectorAll('.arch-links').forEach(element => {
        element.addEventListener('click', (e) => {
            let dataLink = e.target.dataset.link
            let dataDescription = e.target.dataset.description

            console.log(dataLink, dataDescription)
        })
    })
}
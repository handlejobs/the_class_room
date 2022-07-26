

async function logoutUser() {
    localStorage.setItem('alive', false)
    localStorage.removeItem('remember')
    let user = sessionStorage.user
    user = JSON.parse(user)

    fetch('http://127.0.0.1:3333/logout', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({ email: user.email })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.message == 'OK') {
                sessionStorage.removeItem('user')
                window.location = '../'
            } else
                alert(data.message)
        })
        .catch(err => console.error(err))

}

function loadPage(page) {
    const content_box = document.getElementById('content');
    content_box.innerHTML = `<img src="../img/progress.gif" alt="loading..." height="150" width="150" />`
    switch (page) {
        case 'task':
            content_box.innerHTML = PAGE_CONTENTS[page]
            break;
        case 'community':
            content_box.innerHTML = PAGE_CONTENTS[page]
            break;
        case 'groups':
            content_box.innerHTML = PAGE_CONTENTS[page]
            break;
        case 'settings':
            content_box.innerHTML = PAGE_CONTENTS[page]
            break;
        default:
            content_box.innerHTML = PAGE_CONTENTS[page]
    }
}




window.onload = () => {
    let user = sessionStorage.user
    if ([null, 'null', undefined, 'undefined'].includes(user)) {
        window.location = '../login/'
    } else {
        user = JSON.parse(user)
        let dash = document.getElementById('dash')
        let welcome_note

        if (user.last_login) {
            let last_login = new Date(user.last_login)
            last_login = last_login.toUTCString()
            welcome_note = `<p>Hi ${user.fname}, Welcome back.</p><p class="update">Your last login was ${last_login}</p>`
        } else
            welcome_note = `<p>Hi ${user.fname}, Welcome to your user account.</p><p class="update">Get started or contact support for assistance.</p>`

        dash.innerHTML = welcome_note
    }

    const user_controls = document.querySelector('.user-controls').children

    for (i = 0; i < user_controls.length; i++) {
        let control = user_controls[i]
        control.addEventListener('click', () => {
            for (r = 0; r < user_controls.length; r++) {
                let _control = user_controls[r]
                _control.classList = ''
            }
            control.classList = 'active'
            let desc = control.querySelector('button').dataset.description
            document.getElementById('location').textContent = desc
            // load page content
            loadPage(desc.toLowerCase())
        })
    }

    loadPage('profile')
}
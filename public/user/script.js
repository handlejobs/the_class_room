

function logoutUser() {
    localStorage.setItem('alive', false)
    localStorage.removeItem('remember')


    window.location = '../'
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

        dash.innerHTML = `<p>Hi ${user.username}, Welcome to your user account.</p><p>Your connected email address is ${user.email}</p>`
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
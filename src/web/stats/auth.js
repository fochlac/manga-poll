let password
const listeners = []

const passcodeDialog = document.getElementById('passcode-dialog')
const passcodeInput = document.getElementById('passcode-input')
const passcodeButton = document.getElementById('passcode-button')
function renderPassDialog () {
    passcodeInput.value = ''
    passcodeDialog.style.display = 'flex'
}

passcodeButton.addEventListener('click', () => {
    if (passcodeInput.value !== '') {
        password = passcodeInput.value
        listeners.forEach((prom) => prom.resolve(password))
        listeners.length = 0
        passcodeDialog.style.display = 'none'
    }
})

document.querySelector('#passcode-dialog .closebutton').addEventListener('click', (e) => {
    passcodeDialog.style.display = 'none'
    listeners.forEach((prom) => prom.reject())
    listeners.length = 0
})

export async function getPassword () {
    if (password) {
        return password
    }

    return new Promise((resolve, reject) => {
        listeners.push({resolve, reject})
        renderPassDialog()
    })
}

export function resetPassword () {
    password = undefined
}

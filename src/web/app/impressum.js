
export function addImpressumListeners () {
    const bar = document.getElementById('impressum-bar')
    const impressum = document.getElementById('impressum-wrap')

    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.has('impressum')) {
        impressum.style.display = 'block'
    }

    bar.addEventListener('click', () => {
        impressum.style.display = 'block'
    })

    impressum.addEventListener('click', () => {
        impressum.style.display = 'none'
    })
}

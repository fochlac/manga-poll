
export function addImpressumListeners () {
    const bar = document.getElementById('impressum-bar')
    const impressum = document.getElementById('impressum-wrap')

    bar.addEventListener('click', () => {
        impressum.style.display = 'block'
    })

    impressum.addEventListener('click', () => {
        impressum.style.display = 'none'
    })
}

export async function renderHostList (_db, api) {
    const { Hosts } = api
    const result = await Hosts.read()
    const hostContainer = document.querySelector('#hosts')
    if (result.valid) {
        const hosts = result.payload

        hostContainer.innerHTML = `
            <h6>Supported Pages</h6>
            <div class="link-list">${hosts.stable.sort((a, b) => a.localeCompare(b)).map((host) => `<a href="${host.url}">${host.name}</a>`).join('<span>, </span>')}</div>
        `

        if (hosts.unstable.length) {
            hostContainer.innerHTML += `
                <p>These Pages had some problems recently &ndash; they might or might not work:</p>
                <div class="link-list">${hosts.unstable.map((host) => `<a href="${host.url}">${host.name}</a>`).join('<span>, </span>')}</div>
            `
        }
    }
}

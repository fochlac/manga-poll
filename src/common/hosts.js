export async function renderHostList (_db, api) {
    const { Hosts } = api
    const result = await Hosts.read()
    const hostContainer = document.querySelector('#hosts')
    if (result.valid) {
        const hosts = result.payload

        hostContainer.innerHTML = `
            <h6>Supported Pages</h6>
            <p>Pages that have worked without Problems for the last 7 days:</p>
            <div class="link-list">${hosts.stable.map((host) => `<a href="${host.url}">${host.name}</a>`).join('<span>, </span>')}</div>
        `

        if (hosts.unstable.length) {
            hostContainer.innerHTML += `
                <p>Pages had some problems recently $ndash; they might work or not:</p>
                <div class="link-list">${hosts.unstable.map((host) => `<a href="${host.url}">${host.name}</a>`).join('<span>, </span>')}</div>
            `
        }
    }
}

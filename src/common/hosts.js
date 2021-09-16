export async function renderHostList (_db, api) {
    const { Hosts } = api
    const result = await Hosts.read()
    const hostContainer = document.querySelector('#hosts')
    if (result.valid) {
        const hosts = result.payload

        const hostList = hosts.stable
            .sort((a, b) => String(a?.name).localeCompare(b?.name))
            .map((host) => `<a href="${host.url}">${host.name}</a>`).join('<span>, </span>')
        hostContainer.innerHTML = `
            <h6>Supported Pages</h6>
            <div class="link-list">${hostList}</div>
        `

        if (hosts.unstable.length) {
            const hostList = hosts.unstable
                .sort((a, b) => String(a?.name).localeCompare(b?.name))
                .map((host) => `<a href="${host.url}">${host.name}</a>`).join('<span>, </span>')
            hostContainer.innerHTML += `
                <p>These Pages had some problems recently &ndash; they might or might not work:</p>
                <div class="link-list">${hostList}</div>
            `
        }
    }
}

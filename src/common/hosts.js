export async function renderHostList (_db, api) {
    const { Hosts } = api
    const result = await Hosts.read()
    const hostContainer = document.querySelector('#hosts')
    if (result.valid) {
        const hosts = result.payload

        const hostList = hosts.stable
            .sort((a, b) => String(a?.name).localeCompare(b?.name))
            .map((host) => `<a href="${host.url}" target="_blank" rel="noopener">${host.name}</a>`).join('<span>, </span>')
        hostContainer.innerHTML = `
            <h6>Supported Pages</h6>
            <div class="link-list">${hostList}</div>
        `

        if (hosts.unstable.length) {
            const hostList = hosts.unstable
                .sort((a, b) => String(a?.name).localeCompare(b?.name))
                .map((host) => `<a href="${host.url}" target="_blank" rel="noopener">${host.name}</a>`).join('<span>, </span>')
            hostContainer.innerHTML += `
                <p>These Pages had some problems recently &ndash; they might or might not work:</p>
                <div class="link-list">${hostList}</div>
            `
        }
        hostContainer.innerHTML += `
            <p>
                <span>Many other pages can work as well, if they use the </span>
                <a href="https://themeforest.net/item/madara-wordpress-theme-for-manga/20849828" target="_blank" rel="noopener">Madara-</a>
                <span> or </span>
                <a href="https://themesia.com/mangastream-wordpress-theme/" target="_blank" rel="noopener">MangaStream-Theme</a>
                <span> or are built using the </span>
                <a href="https://genkan.io/groups" target="_blank" rel="noopener">Genkan Reader</a><span>.</span>
            </p>
        `
    }
}

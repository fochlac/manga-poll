import { randomID } from './utils'

const controller = chrome || browser

export function renderBookmark (result) {
    const div = document.createElement('div')
    const id = randomID()
    const id2 = randomID()
    const id3 = randomID()
    const id4 = randomID()
    const id5 = randomID()
    const id6 = randomID()
    div.innerHTML = `
    <style>
        .${id} {
            position: sticky;
            top: 0;
            width: 100%;
            z-index: 1000000000;
            font-family: system-ui;
            color: #000c21;
        }
        .${id} .${id5} {
            display: flex;
            flex-wrap: wrap;
            justify-content: end;
        }
        .${id} .${id2} {
            margin: 0;
            font-size: 16px;
            line-height: 22px;
            background: #ffff8d;
            padding: 4px max(8px, calc(15vw - 60px));
            display: flex;
            justify-content: space-between;
            font-family: system-ui;
        }
        .${id} .${id4} {
            margin-left: auto;
            font-weight: 600;
            color: cornflowerblue;
            cursor: pointer;
            margin-left: 8px;
        }
        .${id} .${id4}:hover {
            color: royalblue;
        }
        .${id} .${id3} {
            font-weight: 500;
            font-style: italic;
        }
        .${id6} .${id2}::before {
            position: absolute;
            content: "";
            width: 14px;
            height: 14px;
            background: #c5c4c4;
            border-radius: 50%;
            top: calc(50% - 7px);
            left: calc(50% + 7px);
            animation: loading2 2s infinite linear;
          }
          
          @keyframes loading {
                0% {
                    left: calc(50% - 14px);
                }
                30% {
                    left: calc(50% + 7px);
                }
                60% {
                    left: calc(50% + 7px);
                }
                90% {
                    left: calc(50% - 14px);
                }
                100% {
                    left: calc(50% - 14px);
                }
            }
            
            @keyframes loading2 {
                0% {
                    left: calc(50% + 7px);
                }
                30% {
                    left: calc(50% + 7px);
                }
                60% {
                    left: calc(50% - 14px);
                }
                90% {
                    left: calc(50% + 7px);
                }
                100% {
                    left: calc(50% + 7px);
                }
            }
  
          .${id6} .${id2}::after {
            position: absolute;
            content: "";
            width: 14px;
            height: 14px;
            background: #4e4e4e;
            border-radius: 50%;
            top: calc(50% - 7px);
            left: calc(50% - 14px);
            animation: loading 2s infinite linear;
          }
          
          .${id6} .${id2} > * {
            visibility: hidden;
          }
        </style>
      <p class="${id2}">
        <span id="bookmark-title">You can bookmark "<span class="${id3}">${result.title}</span>" with Manga-Scout.</span>
        <span class="${id5}">
            <span class="${id4} submit">Bookmark</span>
            <span class="${id4} hide">Hide</span>
        </span>
        </p>
        `

    div.className = id

    div.addEventListener('click', (e) => {
        const closestSubmit = e.target.closest('.submit')
        const closestHide = e.target.closest('.hide')
        if (closestSubmit) {
            div.classList.add(id6)

            controller.runtime.sendMessage({
                action: 'SAVE_BOOKMARK',
                source: {
                    url: result.url,
                    type: result.type,
                    mangaId: result.id,
                    title: result.title
                }
            }, (result) => {
                if (result?.action === 'SAVE_BOOKMARK_SUCCESS') {
                    div.style.display = 'none'
                }
                else if (result?.action === 'SAVE_BOOKMARK_ERROR') {
                    div.classList.remove(id6)
                    closestSubmit.innerText = 'Retry'
                    div.querySelector('#bookmark-title').innerText =
                        'Unable to create bookmark, please retry later and if it keeps failing,' +
                        ' send an email with the time + url to "info@fochlac.com".'
                }
            })
        }
        else if (closestHide) {
            div.style.display = 'none'
            localStorage.setItem(result.url, 'hidden')
        }
    })
    document.body.prepend(div)
}

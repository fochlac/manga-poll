import { randomId } from '../../common/utils'

const controller = chrome || browser

export function renderBookmark (result) {
    const div = document.createElement('div')
    const id = `c_${randomId(5)}`
    const id2 = `c_${randomId(5)}`
    const id3 = `c_${randomId(5)}`
    const id4 = `c_${randomId(5)}`
    const id5 = `c_${randomId(5)}`
    const id6 = `c_${randomId(5)}`
    const id7 = `c_${randomId(5)}`
    div.innerHTML = `
    <style>
        .${id} {
            position: fixed;
            z-index: 10000;
            left: 100%;
            top: 50px;
            display: flex;
            flex-direction: column;
            width: 301px;
            align-items: flex-start;
            background: #16151d;
            border: solid 1px #e5e5e5;
            color: #e5e5e5;
            font-size: 16px;
            line-height: 18px;
            border-bottom-left-radius: 5px;
            transition: left ease-in-out 0.2s;
        }
        .${id}.${id6},
        .${id}:hover {
            left: calc(100% - 300px) !important;
        }
        .${id} .${id7} img {    
            width: 30px;
            height: 30px;
        }
        .${id} .${id7} {
            width: 46px;
            height: 46px;
            position: absolute;
            right: 100%;
            top: -1px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            background: #16151d;
            border: solid 1px #e5e5e5;
            border-right: none;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            visibility: visible !important;
        }
        .${id} .${id2} {
            white-space: nowrap;
            height: 42px;
            font-size: 25px;
            line-height: 42px;
            width: 100%;
            padding-left: 16px;
        }
        .${id} .${id3} {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 8px 8px 8px 16px;
        }
        .${id} .${id5} {
            margin-bottom: 8px;
            max-height: 72px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .${id} .${id4} {
            font-weight: 600;
            color: cornflowerblue;
            cursor: pointer;
        }
        .${id} .${id4}:hover {
            color: royalblue;
        }
        .${id6}.${id}::before {
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
  
          .${id6}.${id}::after {
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
          
          .${id6}.${id} > * {
            visibility: hidden;
          }
        </style>
        <div class="${id7}">
            <img src="https://manga.fochlac.com/android-chrome-144x144.png" />
        </div>
        <div class="${id2}">
            Manga-Scout
        </div>
        <div class="${id3}">
            <div class="${id5}">Legend of Asura - The Venom Dragon</div>
            <div class="${id4}">Track Updates</div>
        </div>
    `

    div.className = id
    div.querySelector(`.${id5}`).innerHTML = result.title

    div.addEventListener('click', (e) => {
        const closestSubmit = e.target.closest(`.${id4}`)
        if (closestSubmit) {
            div.classList.add(id6)

            controller.runtime.sendMessage(
                {
                    action: 'SAVE_BOOKMARK',
                    source: {
                        url: result.url,
                        type: result.type,
                        mangaId: result.id,
                        title: result.title
                    }
                },
                (result) => {
                    if (result?.action === 'SAVE_BOOKMARK_SUCCESS') {
                        div.style.display = 'none'
                    }
                    else if (result?.action === 'SAVE_BOOKMARK_ERROR') {
                        div.classList.remove(id6)
                        closestSubmit.innerText = 'Retry'
                        div.getElementById(id7).innerText =
                            'Unable to create bookmark, please retry later and if it keeps failing,' +
                            ' send an email with the time + url to "info@fochlac.com".'
                    }
                }
            )
        }
    })
    document.body.prepend(div)
}

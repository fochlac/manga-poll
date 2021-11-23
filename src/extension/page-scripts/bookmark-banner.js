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
            height: 66px;
            font-size: 0;
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
            border-top-left-radius: 0;
            transition: all ease-in-out 0.4s;
            font-family: sans-serif;
        }
        .${id}.${id6},
        .${id}:hover {
            left: calc(100% - 300px) !important;
            height: 150px;
            font-size: 16px;
        }
        .${id}.${id6} .${id7} img,
        .${id}:hover .${id7} img {    
            left: 11px;
        }
        .${id} .${id7} img {    
            width: 30px;
            height: 30px;
            transition: all .4s ease-in-out;
            position: absolute;
            left: 7px;
            min-width: 30px;
            top: 7px;
        }
        .${id}.${id6} .${id2},
        .${id}:hover .${id2} {
            position: absolute;
            height: 30px;
            font-size: 25px;
            line-height: 30px;
            width: 263px;
            padding-left: 16px;
            padding-right: 91px;
            left: 29px;
            top: 8px;
        }
        .${id}.${id6} .${id7},
        .${id}:hover .${id7} {
            width: 5px;
            height: 150px;
        }
        .${id} .${id7} {
            padding-bottom: 20px;
            height: 66px;
            transition: all .4s ease-in-out;
            width: 46px;
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
            position: absolute;
            font-size: 10px;
            letter-spacing: 0.3px;
            padding: unset;
            width: 42px;
            height: auto;
            line-height: 8px;
            left: -43px;
            top: 42px;
            text-align: center;
            transition: all .4s ease-in-out;
            visibility: visible !important;
        }
        .${id} .${id3} {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 6px 8px 8px 6px;
            margin-top: 42px;
            max-height: 100%;
            overflow: hidden;
            border-top: solid 1px #737377;
            width: calc(100% - 4px);
        }
        .${id} .${id5} {
            margin-bottom: 8px;
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

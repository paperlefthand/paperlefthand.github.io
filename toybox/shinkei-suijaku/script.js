'use strict'

const allogatorUrl = "images/alligator.png";
const playerCount = 2;
const players = [];
const headline = document.getElementById('headline');
const score = document.getElementById('score');

// 先攻or後攻
let currentPlayerIndex = Math.floor(Math.random() * playerCount);

const updateScoreText = () => {
    let text = '';
    for (const player of players) {
        text += `${player.name}さん:${player.count}枚 `
    }
    score.textContent = text.trim();
}

const onStart = () => {
    players.push(
        { name: document.getElementById('playerName0').value, count: 0 },
        { name: document.getElementById('playerName1').value, count: 0 },
    )
    document.getElementById('inputLine').style.display = 'none'
    document.getElementById('playArea').style.visibility = 'visible'

    headline.textContent = `${players[currentPlayerIndex].name}さんの番です`;
    updateScoreText();
}

const onClickCard = i => {

    const clickedCard = cards[i]; // クリックした画像

    return event => {

        // すでにめくられたカードは反応なし
        if (clickedCard.isOpen) {
            return;
        }

        clickedCard.isOpen = true;
        clickedCard.src = clickedCard.frontImgSrc; // 絵柄を表示

        // めくったカード
        const temporarilyOpenCards = Array.prototype.filter.call(cards, card => {
            return card.isOpen && card.owner === undefined;
        });

        if (temporarilyOpenCards.length !== 2) {
            // 1枚目ならもう一枚めくる
            return;
        } else {
            // 2枚のカードが一致すれば続行. そうでなければ交代
            if (temporarilyOpenCards[0].frontImgSrc === temporarilyOpenCards[1].frontImgSrc) {
                // 加算とマークつけ
                temporarilyOpenCards[0].owner = players[currentPlayerIndex].name;
                temporarilyOpenCards[1].owner = players[currentPlayerIndex].name;
                players[currentPlayerIndex].count += 2;
                updateScoreText();

                // まだ取られていないカード
                const notTakenCards = Array.prototype.filter.call(cards, card => {
                    return card.owner === undefined;
                });

                if (notTakenCards.length === 0) {
                    // ゲーム終了
                    if (players[0].count > players[1].count) {
                        headline.textContent = `${players[0].name}さんの勝ちです!`;
                    } else if (players[0].count < players[1].count) {
                        headline.textContent = `${players[1].name}さんの勝ちです!`;
                    } else {
                        headline.textContent = "引き分けです!";
                    }
                }

            } else {
                // めくったカードを元に戻す
                for (const card of temporarilyOpenCards) {
                    card.src = allogatorUrl; 
                    card.isOpen = false;
                }
                // 交代
                currentPlayerIndex = (1 + currentPlayerIndex) % playerCount;
                headline.textContent = `${players[currentPlayerIndex].name}さんの番です`;
            }
        }
    }
}

document.getElementById('start').addEventListener('click', onStart);

// DOM上のカードを初期化
const cardNames = [
    "spade-1", "clover-1", "heart-1", "diamond-1",
    "spade-1", "clover-1", "heart-1", "diamond-1",
    "joker", "joker",
].sort(() => Math.random() - 0.5);
const cards = document.getElementsByClassName('card');
for (let i = 0; i < cardNames.length; i++) {
    cards[i].addEventListener('click', onClickCard(i));
    cards[i].owner = undefined;
    cards[i].isOpen = false;
    cards[i].frontImgSrc = `images/${cardNames[i]}.png`;
}

// 画像の取得元
// https://chicodeza.com/freeitems/torannpu-illust.html
// https://www.flaticon.com/free-icon/alligator_297077
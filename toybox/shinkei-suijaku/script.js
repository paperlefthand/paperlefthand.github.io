'use strict'

const allogatorUrl = "images/alligator.png";
const playerCount = 2;
const players = [];
const playerColors = ['red', 'blue'];
const headline = document.getElementById('headline');
const score = document.getElementById('score');

// 先攻or後攻
let currentPlayerIndex = Math.floor(Math.random() * playerCount);
// クリックのlock
let clickLocked = false;

// スコア表示の最新化
const updateScoreText = () => {
    score.textContent = players.map(p => `${p.name}さん:${p.score}枚`).join(' ');
}

// ヘッドライン表示の切り替え
const updateHeadline = text => {
    headline.textContent = text;
}

// ゲーム開始
const onStart = () => {
    const nameInputs = document.getElementsByClassName('nameInput');
    players.push(
        { name: nameInputs[0].value, color: playerColors[0], score: 0 },
        { name: nameInputs[1].value, color: playerColors[1], score: 0 },
    );
    document.getElementById('inputLine').style.display = 'none';
    document.getElementById('playArea').style.visibility = 'visible';

    updateHeadline(`${players[currentPlayerIndex].name}さんの番です`);
    headline.style.backgroundColor = players[currentPlayerIndex].color;
    updateScoreText();
}

// カードをクリックされた時に実行される処理
const onClickCard = i => {

    const clickedCard = cards[i]; // クリックされたカード

    return event => {

        // すでにめくられたカードは反応なし, ロック判定
        if (clickedCard.isOpen || clickLocked) {
            return;
        }

        // クリックをロックする
        clickLocked = true;

        // ひっくり返して絵柄を表示
        clickedCard.isOpen = true;
        clickedCard.src = clickedCard.frontImgSrc;

        // めくったカードの配列(1枚or2枚)
        // HTMLCollectionでfilterを利用するにはprototypeを使う
        const temporarilyOpenCards = Array.prototype.filter.call(
            cards, card => card.isOpen && card.owner === undefined
        );

        // めくったカードの枚数で場合分け
        // めくったカードが2枚でない(1枚)ならもう1枚めくる 
        if (temporarilyOpenCards.length === 2) {
            const card0 = temporarilyOpenCards[0];
            const card1 = temporarilyOpenCards[1];
            // めくった2枚のカードが一致すれば続行. そうでなければプレイヤー交代
            if (card0.frontImgSrc === card1.frontImgSrc) {

                // スコア加算とマークつけ
                card0.owner = players[currentPlayerIndex].name;
                card1.owner = players[currentPlayerIndex].name;
                card0.style.border = `medium solid ${players[currentPlayerIndex].color}`;
                card1.style.border = `medium solid ${players[currentPlayerIndex].color}`;
                players[currentPlayerIndex].score += 2;
                updateScoreText();

                // まだ取られていないカードの枚数
                let notTakenCardsCount = 0;
                for (const card of cards) {
                    notTakenCardsCount += card.owner === undefined ? 1 : 0;
                }

                // 残り0枚ならゲーム終了
                if (notTakenCardsCount === 0) {
                    if (players[0].score > players[1].score) {
                        updateHeadline(`${players[0].name}さんの勝ちです!`);
                        headline.style.backgroundColor = players[0].color;
                    } else if (players[0].score < players[1].score) {
                        updateHeadline(`${players[1].name}さんの勝ちです!`);
                        headline.style.backgroundColor = players[1].color;
                    } else {
                        updateHeadline("引き分けです!");
                        headline.style.backgroundColor = 'yellow';
                    }
                }

                // ロックを解放
                clickLocked = false;

            } else {
                (async () => {
                    // 100ms間カードを表示
                    const sleep = (second) => new Promise(resolve => setTimeout(resolve, second * 1000));
                    await sleep(0.1);

                    // めくったカードを元に戻す
                    for (const card of temporarilyOpenCards) {
                        card.src = allogatorUrl;
                        card.isOpen = false;
                    }
                    // プレイヤー交代
                    currentPlayerIndex = (1 + currentPlayerIndex) % playerCount;
                    updateHeadline(`${players[currentPlayerIndex].name}さんの番です`);
                    headline.style.backgroundColor = players[currentPlayerIndex].color;

                    // ロックを解放
                    clickLocked = false;
                })();
            }
        } else {
            // ロックを解放
            clickLocked = false;

        }
    }
}

// startボタン押下でゲーム開始
document.getElementById('start').addEventListener('click', onStart);

// カードに付ける名前(絵柄)を決めてシャッフルする
// 正負のいずれかが等確率で返る関数で比較することで実現
const cardNames = [
    "spade-1", "clover-1", "heart-1", "diamond-1",
    "spade-1", "clover-1", "heart-1", "diamond-1",
    "joker", "joker",
].sort((a, b) => Math.random() - 0.5);

// cardクラスのDOM要素(10こ)に対しプロパティを設定
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
// https://icons8.com/icons/set/alligator

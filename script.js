// =========================
// 保存データの読み込み
// =========================

let points =
    Number(localStorage.getItem("points")) || 0;

let streak =
    Number(localStorage.getItem("streak")) || 0;

let pointHistory =
    JSON.parse(
        localStorage.getItem("pointHistory")
    ) || [];

let reports =
    JSON.parse(
        localStorage.getItem("reports")
    ) || [];

let cheers =
    JSON.parse(
        localStorage.getItem("cheers")
    ) || [];

let cheerCount =
    Number(
        localStorage.getItem("cheerCount")
    ) || 0;

let lastCheerDate =
    localStorage.getItem("lastCheerDate");

let lastReportDate =
    localStorage.getItem("lastReportDate");

let ownedStickers =
    JSON.parse(
        localStorage.getItem("ownedStickers")
    ) || [];


// =========================
// 今日の日付
// =========================

const today =
    new Date().toLocaleDateString("ja-JP");


// =========================
// ボタン
// =========================

const reportButton =
    document.getElementById("reportButton");


// =========================
// 新しい日になったら
// 応援回数をリセット
// =========================

if (lastCheerDate !== today) {

    cheerCount = 0;

    localStorage.setItem(
        "cheerCount",
        cheerCount
    );

    localStorage.setItem(
        "lastCheerDate",
        today
    );

    lastCheerDate = today;
}


// =========================
// 最初の画面表示
// =========================

showPoints();
showStreak();
showPointHistory();
showReportHistory();
showCheerCount();
showCheerHistory();
showOwnedStickers();


// =========================
// 今日すでに報告したか確認
// =========================

if (lastReportDate === today) {

    reportButton.disabled = true;

    reportButton.textContent =
        "本日は報告済み";

} else {

    reportButton.disabled = false;

    reportButton.textContent =
        "運動を報告する";
}


// =========================
// 運動報告
// =========================

function showReport() {

    const date =
        document.getElementById("date").value;

    const exercise =
        document.getElementById("exercise").value;

    const time =
        document.getElementById("time").value;

    const mood =
        document.getElementById("mood").value;

    const comment =
        document.getElementById("comment").value;


    if (
        date === "" ||
        exercise === "" ||
        time === "" ||
        mood === ""
    ) {

        alert(
            "必要な項目を入力してください"
        );

        return;
    }


    const reportData = {

        date: date,

        exercise: exercise,

        time: time,

        mood: mood,

        comment: comment

    };


    // 履歴の一番上に追加
    reports.unshift(reportData);


    // 保存
    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );


    showReportHistory();


    // 連続記録更新
    updateStreak();


    // 運動報告ポイント
    addPoints(
        10,
        "✅ 運動報告"
    );


    // 3日ボーナス
    if (streak === 3) {

        addPoints(
            5,
            "🎉 3日連続ボーナス"
        );

        alert(
            "3日連続達成！5ポイント獲得！"
        );
    }


    // 7日ボーナス
    if (streak === 7) {

        addPoints(
            20,
            "🏆 7日連続ボーナス"
        );

        alert(
            "7日連続達成！20ポイント獲得！"
        );
    }


    localStorage.setItem(
        "streak",
        streak
    );


    localStorage.setItem(
        "lastReportDate",
        today
    );


    lastReportDate = today;


    showStreak();


    reportButton.disabled = true;

    reportButton.textContent =
        "本日は報告済み";


    alert(
        "現在 " +
        streak +
        "日連続です！"
    );
}


// =========================
// 連続記録
// =========================

function updateStreak() {

    const yesterday =
        new Date();


    yesterday.setDate(
        yesterday.getDate() - 1
    );


    const yesterdayString =
        yesterday.toLocaleDateString(
            "ja-JP"
        );


    if (
        lastReportDate ===
        yesterdayString
    ) {

        streak =
            streak + 1;

    } else {

        streak = 1;

    }
}


// =========================
// ポイント追加
// =========================

function addPoints(
    amount,
    reason
) {

    points =
        points + amount;


    const historyItem =
        reason +
        " +" +
        amount +
        "ポイント";


    pointHistory.unshift(
        historyItem
    );


    localStorage.setItem(
        "points",
        points
    );


    localStorage.setItem(
        "pointHistory",
        JSON.stringify(
            pointHistory
        )
    );


    showPoints();

    showPointHistory();
}


// =========================
// ポイント表示
// =========================

function showPoints() {

    document.getElementById(
        "points"
    ).textContent =
        points +
        "ポイント";
}


// =========================
// 連続記録表示
// =========================

function showStreak() {

    document.getElementById(
        "streakDisplay"
    ).textContent =
        "🔥 " +
        streak +
        "日連続";
}


// =========================
// ポイント履歴表示
// =========================

function showPointHistory() {

    const historyElement =
        document.getElementById(
            "pointHistory"
        );


    if (
        pointHistory.length === 0
    ) {

        historyElement.innerHTML =
            "<li>まだポイント履歴はありません</li>";

        return;
    }


    historyElement.innerHTML = "";


    pointHistory.forEach(
        function (item) {

            const listItem =
                document.createElement(
                    "li"
                );


            listItem.textContent =
                item;


            historyElement.appendChild(
                listItem
            );
        }
    );
}


// =========================
// 運動履歴表示
// =========================

function showReportHistory() {

    const historyElement =
        document.getElementById(
            "reportHistory"
        );


    if (reports.length === 0) {

        historyElement.innerHTML =
            "<li>まだ運動履歴はありません</li>";

        return;
    }


    historyElement.innerHTML = "";


    reports.forEach(
        function (report) {

            const listItem =
                document.createElement(
                    "li"
                );


            listItem.innerHTML =

                "<strong>" +
                report.date +
                "</strong><br>" +

                "🏃 " +
                report.exercise +
                "<br>" +

                "⏱ " +
                report.time +
                "分<br>" +

                "😊 気分：" +
                report.mood +
                "/5<br>" +

                "💬 " +
                report.comment;


            historyElement.appendChild(
                listItem
            );
        }
    );
}


// =========================
// 応援
// =========================

function cheer() {

    const goodPoint =
        document.getElementById(
            "goodPoint"
        ).value;


    const cheerMessage =
        document.getElementById(
            "cheerMessage"
        ).value;


    if (
        goodPoint === "" ||
        cheerMessage === ""
    ) {

        alert(
            "応援メッセージを入力してください！"
        );

        return;
    }


    // 1日2回制限
    if (cheerCount >= 2) {

        alert(
            "本日の応援ポイントは2回までです！"
        );

        return;
    }


    // 応援内容を保存
    const cheerData = {

        date: today,

        goodPoint: goodPoint,

        cheerMessage:
            cheerMessage

    };


    cheers.unshift(
        cheerData
    );


    localStorage.setItem(
        "cheers",
        JSON.stringify(cheers)
    );


    showCheerHistory();


    // +2ポイント
    addPoints(
        2,
        "👏 応援した"
    );


    cheerCount =
        cheerCount + 1;


    localStorage.setItem(
        "cheerCount",
        cheerCount
    );


    localStorage.setItem(
        "lastCheerDate",
        today
    );


    showCheerCount();


    alert(
        "応援ありがとうございます！\n" +
        "+2ポイント獲得しました！\n" +
        "本日の応援 " +
        cheerCount +
        "/2回"
    );


    // 入力欄を空に戻す
    document.getElementById(
        "goodPoint"
    ).value = "";


    document.getElementById(
        "cheerMessage"
    ).value = "";
}


// =========================
// 応援回数表示
// =========================

function showCheerCount() {

    document.getElementById(
        "cheerCountDisplay"
    ).textContent =

        "本日の応援 " +
        cheerCount +
        "/2回";
}


// =========================
// 応援履歴表示
// =========================

function showCheerHistory() {

    const historyElement =
        document.getElementById(
            "cheerHistory"
        );


    if (cheers.length === 0) {

        historyElement.innerHTML =
            "<li>まだ応援履歴はありません</li>";

        return;
    }


    historyElement.innerHTML = "";


    cheers.forEach(
        function (cheer) {

            const listItem =
                document.createElement(
                    "li"
                );


            listItem.innerHTML =

                "<strong>" +
                cheer.date +
                "</strong><br>" +

                "👏 良かったところ：<br>" +
                cheer.goodPoint +
                "<br>" +

                "💬 これからのひとこと：<br>" +
                cheer.cheerMessage;


            historyElement.appendChild(
                listItem
            );
        }
    );
}

// =========================
// ステッカー購入
// =========================

function buySticker(
    stickerName,
    price
) {

    if (ownedStickers.includes(stickerName)) {

        alert(
            "このステッカーはすでに持っています！"
        );

        return;
    }


    if (points < price) {

        alert(
            "ポイントが足りません！"
        );

        return;
    }


    points =
        points - price;


    ownedStickers.push(
        stickerName
    );


    localStorage.setItem(
        "points",
        points
    );


    localStorage.setItem(
        "ownedStickers",
        JSON.stringify(
            ownedStickers
        )
    );


    pointHistory.unshift(
        "🎁 ステッカー購入 -" +
        price +
        "ポイント"
    );


    localStorage.setItem(
        "pointHistory",
        JSON.stringify(
            pointHistory
        )
    );


    showPoints();

    showPointHistory();

    showOwnedStickers();


    alert(
        stickerName +
        " を購入しました！"
    );
}


// =========================
// 所持ステッカー表示
// =========================

function showOwnedStickers() {

    const stickerElement =
        document.getElementById(
            "ownedStickers"
        );


    if (
        ownedStickers.length === 0
    ) {

        stickerElement.innerHTML =
            "<li>まだステッカーを持っていません</li>";

        return;
    }


    stickerElement.innerHTML = "";


    ownedStickers.forEach(
        function (sticker) {

            const listItem =
                document.createElement(
                    "li"
                );


            listItem.textContent =
                sticker;


            stickerElement.appendChild(
                listItem
            );
        }
    );
}

// =========================
// 所持ステッカー表示
// =========================

function showOwnedStickers() {

    const stickerElement =
        document.getElementById(
            "ownedStickers"
        );

    if (
        ownedStickers.length === 0
    ) {

        stickerElement.innerHTML =
            "<li>まだステッカーを持っていません</li>";

        return;
    }

    stickerElement.innerHTML = "";

    ownedStickers.forEach(
        function (sticker) {

            const listItem =
                document.createElement(
                    "li"
                );

            listItem.textContent =
                sticker;

            stickerElement.appendChild(
                listItem
            );
        }
    );
}


// =========================
// AI運動プラン試作
// =========================

function suggestPlan(level) {

    const result =
        document.getElementById("aiPlanResult");

    if (level === "small") {

        result.innerHTML =
            "<h3>🟢 今日の軽めプラン</h3>" +
            "<p>🚶 ウォーキング 15分</p>" +
            "<p>🧘 ストレッチ 10分</p>" +
            "<p>💪 スクワット 10回 × 2セット</p>" +
            "<p><strong>目安時間：約30分</strong></p>" +
            "<p><strong>推定消費カロリー：約80〜120kcal</strong></p>";
    }

    if (level === "medium") {

        result.innerHTML =
            "<h3>🟡 今日のしっかりプラン</h3>" +
            "<p>🚶 速歩 20分</p>" +
            "<p>💪 スクワット 15回 × 3セット</p>" +
            "<p>💪 腕立て伏せ 10回 × 2セット</p>" +
            "<p>🧘 ストレッチ 10分</p>" +
            "<p><strong>目安時間：約45分</strong></p>" +
            "<p><strong>推定消費カロリー：約150〜220kcal</strong></p>";
    }

    if (level === "large") {

        result.innerHTML =
            "<h3>🔴 今日のがっつりプラン</h3>" +
            "<p>🏃 ジョギング 30分</p>" +
            "<p>💪 スクワット 20回 × 3セット</p>" +
            "<p>💪 腕立て伏せ 15回 × 3セット</p>" +
            "<p>💪 プランク 30秒 × 3セット</p>" +
            "<p>🧘 ストレッチ 10分</p>" +
            "<p><strong>目安時間：約60分</strong></p>" +
            "<p><strong>推定消費カロリー：約250〜350kcal</strong></p>";
    }
}
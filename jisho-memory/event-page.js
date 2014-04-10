var newRecentKanji = "";

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.type == "new-recent-kanji") {
			newRecentKanji = newRecentKanji.replace(request.kanji, "");
			newRecentKanji = request.kanji + newRecentKanji;
			if(newRecentKanji.length == 1) {
				chrome.storage.local.get(
					{recentKanji: "", recentKanjiLimit: 600}, function(data) {
						for(var i = 0; i < newRecentKanji.length; i++) {
							data.recentKanji = data.recentKanji.replace(newRecentKanji[i], "");
						}
						data.recentKanji = (newRecentKanji + data.recentKanji).substring(0, data.recentKanjiLimit);
						newRecentKanji = "";
						chrome.storage.local.set(data);
					}
				);
			}
		}
	}
);
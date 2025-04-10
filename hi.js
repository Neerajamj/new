javascript:(function(){
  var e = window.ace && window.ace.edit && window.ace.edit("editor");
  if (!e) {
    console.error("Ace Editor not found");
    return;
  }

  function t(t) {//
    e.setValue(t, -1);
  }

  function r(r) {
    t("SENDING REQUEST...\n");
    const apiKey = "YOUR_API_KEY_HERE"; // 🔒 Replace this with your actual API key
    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: "Generate C++ code for the following problem:\n" + r + "\n\nPlease only return the code in C++ format without any explanation."
          }]
        }]
      })
    })
    .then(e => e.json())
    .then(n => {
      if (n.candidates && Array.isArray(n.candidates)) {
        var o = n.candidates.flatMap(c => c.content.parts?.map(p => p.text) || []).join("\n");
        t(o.trim() || "ERROR: Empty response");
      } else {
        t("ERROR: Unexpected response format\n" + JSON.stringify(n, null, 2));
      }
    })
    .catch(r => t("ERROR: " + r));
  }

  var n = document.querySelector("[contenteditable]");
  n ? r(n.innerText.trim()) : t("ERROR: No input found");
})();

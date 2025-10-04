(function() {
    let questions = document.querySelectorAll('div, section, article');
    questions.forEach((q, i) => {
        let opts = q.querySelectorAll('input[type="radio"]:not(:checked), [class*="option"] input');
        if (opts.length) {
            opts[0].click();
            console.log('Answered Q' + i + ': ' + (opts[0].nextSibling?.textContent || opts[0].value || 'Option'));
        }
    });
    alert('Finished answering!');
})();

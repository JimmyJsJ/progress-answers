(function() {
    let questions = document.querySelectorAll('div, section, article');
    questions.forEach((q, i) => {
        let opts = q.querySelectorAll('input[type="radio"]:not(:checked), [class*="option"] input');
        if (opts.length) {
            let bestOpt = opts[0]; // Default to first
            let maxLength = 0;
            opts.forEach(opt => {
                let text = opt.nextSibling?.textContent || opt.value || '';
                if (text.length > maxLength || text.toLowerCase().includes('correct')) {
                    maxLength = text.length;
                    bestOpt = opt;
                }
            });
            bestOpt.click();
            console.log('Answered Q' + i + ': ' + (bestOpt.nextSibling?.textContent || bestOpt.value));
        }
    });
    alert('Done answering!');
})();

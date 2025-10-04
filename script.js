(function() {
    console.log('Starting answer script...');
    let questions = document.querySelectorAll('div, section, article');
    questions.forEach((q, i) => {
        console.log('Checking Q' + i + ': ', q);
        let opts = q.querySelectorAll('input[type="radio"]:not(:checked), [class*="option"] input, label input');
        console.log('Found options: ', opts);
        if (opts.length) {
            let bestOpt = opts[0]; // Default to first
            let bestScore = 0;
            opts.forEach(opt => {
                let text = (opt.nextSibling?.textContent || opt.value || opt.parentNode.textContent || '').toLowerCase();
                console.log('Option text: ', text);
                let score = 0;
                if (text.length > 20) score += 10;
                if (text.includes('correct') || text.includes('true') || text.includes('yes')) score += 50;
                if (text.includes('false') || text.includes('no')) score -= 20;
                if (score > bestScore) {
                    bestScore = score;
                    bestOpt = opt;
                }
                console.log('Score for ', text, ': ', score);
            });
            try {
                bestOpt.click();
                console.log('Clicked Q' + i + ': ' + (bestOpt.nextSibling?.textContent || bestOpt.value) + ' (Score: ' + bestScore + ')');
                alert('Answered Q' + i + ': ' + (bestOpt.nextSibling?.textContent || bestOpt.value));
            } catch (e) {
                console.log('Click failed for Q' + i + ': ', e);
                alert('Click failed for Q' + i);
            }
        } else {
            console.log('No options for Q' + i);
        }
    });
    alert('Done attempting answers!');
})();

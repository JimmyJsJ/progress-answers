(function() {
    console.log('Starting auto-answer...');
    let questions = document.querySelectorAll('.question-text, .question, [class*="question"], h3');
    if (!questions.length) {
        alert('No questions found!');
        return;
    }
    let apiUrl = 'https://api-inference.huggingface.co/models/gpt2';
    questions.forEach((q, i) => {
        let opts = q.closest('div, section')?.querySelectorAll('input[type="radio"]:not(:checked), label input, [class*="option"] input');
        if (opts.length) {
            let questionText = q.textContent.trim();
            let optionTexts = Array.from(opts).map(o => o.nextSibling?.textContent || o.value || o.parentNode.textContent).filter(t => t);
            console.log(`Q${i}: ${questionText}\nOptions: ${optionTexts.join(', ')}`);
            fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ inputs: `Question: ${questionText}\nOptions: ${optionTexts.join('\n')}\nBest answer (A, B, C, D or 1, 2, 3, 4):` })
            }).then(r => r.json()).then(d => {
                let answer = d[0].generated_text.trim().toUpperCase();
                let index = answer.match(/[1-4]/) ? parseInt(answer) - 1 : answer.charCodeAt(0) - 65;
                if (index >= 0 && index < opts.length) {
                    opts[index].click();
                    console.log(`Answered Q${i} with ${optionTexts[index]} (AI: ${answer})`);
                    alert(`Answered Q${i}: ${optionTexts[index]}`);
                } else {
                    opts[0].click(); // Fallback
                    console.log(`Fallback Q${i} with ${optionTexts[0]}`);
                    alert(`Fallback Q${i}: ${optionTexts[0]}`);
                }
            }).catch(e => {
                opts[0].click();
                console.log(`API error Q${i}, fallback to ${optionTexts[0]}: ${e}`);
                alert(`Error Q${i}, clicked ${optionTexts[0]}`);
            });
            time.sleep(1); // Rough delay
        }
    });
    setTimeout(() => {
        document.querySelector('.next-button, button.next, [class*="next"]')?.click();
        document.getElementById('submit-quiz')?.click();
        alert('Done!');
    }, 5000); // Wait 5s, then next/submit
})();

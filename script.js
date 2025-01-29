const copyButtons = document.querySelectorAll('.copy-btn');  
const copySound = document.getElementById('copy-sound');  

copyButtons.forEach(button => {  
    button.addEventListener('click', (e) => {  
        e.stopPropagation();  
        const box = e.target.closest('.box');  
        const backgroundColor = box.style.backgroundColor;  

        const hexColor = rgbToHex(backgroundColor);  

        navigator.clipboard.writeText(hexColor).then(() => {  
            copySound.currentTime = 0;  
            copySound.play();  

            button.textContent = 'Copied';  
            button.disabled = true;  

            setTimeout(() => {  
                button.textContent = 'Copy';  
                button.disabled = false;  
            }, 2000); // Дозволити повторне натискання через 1 секунду  
        }).catch(err => {  
            console.error('Не вдалося скопіювати: ', err);  
        });  
    });  
});  

function rgbToHex(rgb) {  
    const rgbValues = rgb.match(/\d+/g);  
    const hex = rgbValues.map(value => {  
        const hexPart = parseInt(value).toString(16);  
        return hexPart.length === 1 ? '0' + hexPart : hexPart;  
    });  
    return `#${hex.join('')}`;  
}
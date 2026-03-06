document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btn-no');
    const btnYes = document.getElementById('btn-yes');
    const mainText = document.getElementById('main-text');
    const buttonGroup = document.querySelector('.button-group');
    const successScreen = document.getElementById('success-screen');
    const centerImg = document.getElementById('center-img');

    // To make it easy for the user, use placeholders but keep names simple
    // Make sure they have us1.jpg and us2.jpg in their folder.
    const usImages = ['us1.jpg', 'us2.jpg'];
    const sadMinion = 'https://media.giphy.com/media/BKg5Rj4IHj27K/giphy.gif';
    const happyMinion = 'https://media.giphy.com/media/hjvBoWTABwwNi/giphy.gif';

    // POPULATE BACKGROUND GRID
    const bgGrid = document.getElementById('bg-grid');
    const totalTiles = 40; // High number to fill the screen
    for (let i = 0; i < totalTiles; i++) {
        const img = document.createElement('img');
        img.src = usImages[i % 2];
        img.className = 'bg-img-tile';
        // Add random speed and delay to the animation
        img.style.animationDuration = `${10 + Math.random() * 10}s`;
        img.style.animationDelay = `${Math.random() * 5}s`;

        // Safety for local images
        img.onerror = () => {
            img.src = `https://images.unsplash.com/photo-1518199266791-5375a83190b2?w=300&q=80`;
        };

        bgGrid.appendChild(img);
    }

    // Set initial sad Minion
    centerImg.src = sadMinion;

    // Safety check: Replace placeholders with unsplash links for initial demo 
    // The user can rename their files to us1.jpg and us2.jpg to see them take effect.
    document.querySelectorAll('.bg-img').forEach((img, idx) => {
        img.onerror = () => {
            img.src = `https://images.unsplash.com/photo-1518199266791-5375a83190b2?w=500&q=80`;
        };
    });
    centerImg.onerror = () => {
        centerImg.src = `https://images.unsplash.com/photo-1522673607200-16488352475b?w=500&q=80`;
    };

    let yesScale = 1;
    let clickCount = 0;
    let hasClickedNo = false; // Flag to track if 'No' was ever clicked
    const noTexts = [
        "No", "Are you sure?", "Really?", "Think again!",
        "Last chance!", "Pretty please?", "You're mean! 😢", "Pleaseeeee"
    ];

    function handleNoClick() {
        clickCount++;
        hasClickedNo = true;

        // 1. Make the "Yes" button bigger
        yesScale += 0.45;
        btnYes.style.transform = `scale(${yesScale})`;

        // 2. Change the "No" button text
        btnNo.innerText = noTexts[clickCount % noTexts.length];

        // 3. Move the "No" button away slightly
        const moveX = (Math.random() - 0.5) * 80;
        const moveY = (Math.random() - 0.5) * 80;
        btnNo.style.transform = `translate(${moveX}px, ${moveY}px) scale(${Math.max(0.4, 1 - clickCount * 0.1)})`;

        // Swap center image between your 2 pictures on every "No" click
        centerImg.src = usImages[clickCount % 2];

        // Safety for local images: if us1/us2 aren't found, keep the minion or a placeholder
        centerImg.onerror = () => {
            centerImg.src = `https://images.unsplash.com/photo-1522673607200-16488352475b?w=500&q=80`;
        };
    }

    btnNo.addEventListener('click', handleNoClick);

    btnYes.addEventListener('click', () => {
        // Force them to click "No" at least once to see the effect
        if (!hasClickedNo) {
            handleNoClick();
            // Subtle change to the title to hint what to do
            mainText.innerHTML = "I'm sorry ammoun ❤️<br><span style='font-size: 1rem; opacity: 0.7;'>(Try clicking No first... trust me)</span>";
            return;
        }

        mainText.classList.add('hidden');
        buttonGroup.classList.add('hidden');
        successScreen.classList.remove('hidden');

        // Show happy Minion and scale up
        centerImg.src = happyMinion;
        centerImg.style.transform = "scale(1.3)";
        centerImg.style.transition = "0.5s transform";

        // --- FLOWER BOUQUET EFFECT ---
        createFlowers();
    });

    function createFlowers() {
        const flowerEmojis = ['🌸', '🌹', '🌷', '🌻', '🌺', '🌼', '💐'];
        const container = document.body;

        for (let i = 0; i < 50; i++) {
            const flower = document.createElement('div');
            flower.className = 'flower-particle';
            flower.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];

            // Random start position
            const startX = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 3;
            const size = 20 + Math.random() * 30;

            flower.style.cssText = `
                position: absolute;
                left: ${startX}vw;
                bottom: -50px;
                font-size: ${size}px;
                user-select: none;
                pointer-events: none;
                z-index: 1000;
                animation: floatUp ${duration}s linear ${delay}s infinite;
                opacity: 0.8;
            `;

            container.appendChild(flower);
        }
    }
});

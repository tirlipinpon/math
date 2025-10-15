// Gestionnaire de l'interface utilisateur
class UIManager {
    constructor() {
        this.domElements = {};
        this.cacheDOMElements();
    }
    
    // Afficher la version dans l'UI
    displayVersion(version) {
        const versionBadge = document.getElementById('versionBadge');
        if (versionBadge) {
            versionBadge.textContent = `v${version}`;
            versionBadge.title = `Version du jeu : ${version}`;
        }
    }
    
    // Mettre en cache les éléments DOM
    cacheDOMElements() {
        this.domElements = {
            questionDisplay: document.getElementById('questionDisplay'),
            answerContainer: document.getElementById('answerContainer'),
            feedback: document.getElementById('feedback'),
            usernameInput: document.getElementById('usernameInput'),
            usernameSelect: document.getElementById('usernameSelect'),
            loginBtn: document.getElementById('loginBtn'),
            logoutBtn: document.getElementById('logoutBtn'),
            userInfo: document.getElementById('userInfo'),
            currentUser: document.getElementById('currentUser'),
            validateBtn: document.getElementById('validateBtn')
        };
    }
    
    // Afficher la question
    displayQuestion(questionText) {
        if (this.domElements.questionDisplay) {
            this.domElements.questionDisplay.textContent = questionText;
        }
    }
    
    // Créer l'interface de réponse selon le type de question
    createAnswerInterface(questionType, options = []) {
        if (!this.domElements.answerContainer) return;
        
        // Vider le conteneur
        this.domElements.answerContainer.innerHTML = '';
        
        if (questionType === 'qcm' || questionType === 'vrai-faux') {
            // Créer des boutons pour chaque option
            options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'answer-option';
                button.textContent = option;
                button.setAttribute('data-answer', option);
                this.domElements.answerContainer.appendChild(button);
            });
        } else if (questionType === 'libre') {
            // Créer un champ de saisie
            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'answerInput';
            input.className = 'answer-input';
            input.placeholder = 'Tape ta réponse...';
            input.autocomplete = 'off';
            this.domElements.answerContainer.appendChild(input);
            
            // Créer le bouton de validation
            const validateBtn = document.createElement('button');
            validateBtn.id = 'validateBtn';
            validateBtn.className = 'btn validate-btn';
            validateBtn.textContent = '✓ Valider';
            this.domElements.answerContainer.appendChild(validateBtn);
            
            // Focus sur l'input
            setTimeout(() => input.focus(), 100);
        }
    }
    
    // Marquer une réponse comme correcte ou incorrecte visuellement
    markAnswer(element, isCorrect) {
        if (isCorrect) {
            element.classList.add('correct');
            element.classList.remove('incorrect');
        } else {
            element.classList.add('incorrect');
            element.classList.remove('correct');
        }
    }
    
    // Désactiver toutes les options de réponse
    disableAnswerOptions() {
        const options = document.querySelectorAll('.answer-option');
        options.forEach(opt => {
            opt.disabled = true;
        });
        
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.disabled = true;
        }
        
        const validateBtn = document.getElementById('validateBtn');
        if (validateBtn) {
            validateBtn.disabled = true;
        }
    }
    
    // Activer toutes les options de réponse
    enableAnswerOptions() {
        const options = document.querySelectorAll('.answer-option');
        options.forEach(opt => {
            opt.disabled = false;
            opt.classList.remove('correct', 'incorrect');
        });
        
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.disabled = false;
            answerInput.value = '';
        }
        
        const validateBtn = document.getElementById('validateBtn');
        if (validateBtn) {
            validateBtn.disabled = false;
        }
    }
    
    // Afficher un message de feedback
    showFeedback(message, type) {
        this.domElements.feedback.textContent = message;
        this.domElements.feedback.className = `feedback ${type}`;
    }
    
    // Créer l'animation de célébration
    createCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        document.body.appendChild(celebration);
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 5)];
            celebration.appendChild(confetti);
        }
        
        setTimeout(() => {
            if (celebration.parentNode) {
                document.body.removeChild(celebration);
            }
        }, 3000);
    }
    
    // Créer l'animation de célébration pour une catégorie complétée
    createCategoryCompletionCelebration(categoryIcon, categoryName, encouragementMessage) {
        // Conteneur principal
        const celebration = document.createElement('div');
        celebration.className = 'category-celebration';
        celebration.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10000;
            text-align: center;
            animation: bounceIn 0.6s ease;
        `;
        
        // Médaille dorée
        const medal = document.createElement('div');
        medal.style.cssText = `
            font-size: 120px;
            animation: rotateMedal 1s ease infinite;
            margin-bottom: 20px;
            filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
        `;
        medal.textContent = '🥇';
        
        // Icône de la catégorie
        const icon = document.createElement('div');
        icon.style.cssText = `
            font-size: 60px;
            margin-bottom: 10px;
        `;
        icon.textContent = categoryIcon;
        
        // Message d'encouragement
        const message = document.createElement('div');
        message.style.cssText = `
            background: white;
            padding: 20px 30px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            font-size: 18px;
            font-weight: bold;
            color: #667eea;
            max-width: 400px;
        `;
        message.textContent = encouragementMessage;
        
        // Assembler
        celebration.appendChild(medal);
        celebration.appendChild(icon);
        celebration.appendChild(message);
        document.body.appendChild(celebration);
        
        // Confettis
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.backgroundColor = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'][Math.floor(Math.random() * 5)];
            celebration.appendChild(confetti);
        }
        
        // Retirer après 4 secondes
        setTimeout(() => {
            if (celebration.parentNode) {
                document.body.removeChild(celebration);
            }
        }, 4000);
    }
    
    // Afficher/masquer les sections selon l'état de connexion
    updateVisibilityForLogin(isLoggedIn) {
        if (isLoggedIn) {
            this.domElements.usernameSelect.classList.add('hidden');
            this.domElements.usernameInput.style.display = 'none';
            this.domElements.loginBtn.style.display = 'none';
            this.domElements.userInfo.classList.remove('hidden');
        } else {
            this.domElements.usernameInput.style.display = 'inline-block';
            this.domElements.loginBtn.style.display = 'inline-block';
            this.domElements.userInfo.classList.add('hidden');
        }
    }
    
    // Mettre à jour le nom d'utilisateur
    setCurrentUser(username) {
        this.domElements.currentUser.textContent = username;
    }
    
    // Nettoyer l'interface pour une nouvelle question
    resetForNewQuestion() {
        this.enableAnswerOptions();
        
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.value = '';
        }
    }
}

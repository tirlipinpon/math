// Gestionnaire des réponses de l'utilisateur
class InputHandler {
    constructor(game) {
        this.game = game;
        this.wrongAnswersCount = 0;
        this.setupEventListeners();
    }
    
    // Configurer les événements
    setupEventListeners() {
        // Les événements seront ajoutés dynamiquement pour chaque question
        // car les éléments changent selon le type de question
    }
    
    // Attacher les événements aux options de réponse (QCM, Vrai/Faux)
    attachOptionListeners() {
        const options = document.querySelectorAll('.answer-option');
        
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const selectedAnswer = e.target.getAttribute('data-answer');
                this.handleAnswer(selectedAnswer, e.target);
            });
        });
    }
    
    // Attacher les événements à l'input de réponse libre
    attachInputListeners() {
        const answerInput = document.getElementById('answerInput');
        const validateBtn = document.getElementById('validateBtn');
        
        if (answerInput && validateBtn) {
            // Validation par bouton
            validateBtn.addEventListener('click', () => {
                const answer = answerInput.value.trim();
                if (answer) {
                    this.handleAnswer(answer, answerInput);
                } else {
                    this.game.ui.showFeedback('⚠️ Veuillez entrer une réponse !', 'warning');
                }
            });
            
            // Validation par touche Entrée
            answerInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const answer = answerInput.value.trim();
                    if (answer) {
                        this.handleAnswer(answer, answerInput);
                    } else {
                        this.game.ui.showFeedback('⚠️ Veuillez entrer une réponse !', 'warning');
                    }
                }
            });
        }
    }
    
    // Gérer la réponse de l'utilisateur
    handleAnswer(userAnswer, element) {
        // Vérifier si la réponse est correcte
        const isCorrect = this.game.questionManager.checkAnswer(this.game.currentQuestionId, userAnswer);
        
        // Désactiver les options pour empêcher de répondre plusieurs fois
        this.game.ui.disableAnswerOptions();
        
        if (isCorrect) {
            // Réponse correcte
            this.game.ui.markAnswer(element, true);
            this.game.soundManager.play('wordFound');
            this.game.ui.showFeedback('🎉 BRAVO ! Bonne réponse ! 🎉', 'success');
            this.game.ui.createCelebration();
            
            // Sauvegarder la progression UNIQUEMENT si aucune erreur n'a été faite
            if (this.game.userManager.isLoggedIn() && this.wrongAnswersCount === 0) {
                this.game.userManager.addQuestionAnswered(this.game.currentQuestionId);
                console.log('✅ Question enregistrée comme répondue (réponse correcte du premier coup)');
            } else if (this.game.userManager.isLoggedIn() && this.wrongAnswersCount > 0) {
                console.log(`⚠️ Question NON enregistrée (${this.wrongAnswersCount} erreur(s) avant la bonne réponse)`);
                this.game.ui.showFeedback('🎉 BRAVO ! Mais la question reviendra car tu as fait des erreurs ! 💪', 'success');
            }
            
            // Passer à la question suivante après 2.5 secondes
            setTimeout(() => {
                this.game.nextQuestion();
            }, 2500);
        } else {
            // Réponse incorrecte
            this.wrongAnswersCount++;
            this.game.ui.markAnswer(element, false);
            this.game.soundManager.play('letterWrong');
            
            // Message selon le nombre d'erreurs
            if (this.wrongAnswersCount === 1 && element.id === 'answerInput') {
                this.game.ui.showFeedback('❌ Oups ! Réessaie ! Besoin d\'aide ? 💪', 'error');
            } else if (this.wrongAnswersCount >= 2 && element.id === 'answerInput') {
                this.game.ui.showFeedback('❌ Encore raté ! Tu peux passer à la question suivante si tu veux.', 'error');
            } else {
                this.game.ui.showFeedback('❌ Oups ! Réessaie ! 💪', 'error');
            }
            
            // Réactiver les options après 1.5 secondes
                setTimeout(() => {
                this.game.ui.enableAnswerOptions();
                element.classList.remove('incorrect');
                
                // Refocus sur l'input si c'est une question libre
                if (element.id === 'answerInput') {
                    element.value = '';
                    element.focus();
                    
                    // Afficher le bouton "Aide" après 1 erreur (UNIQUEMENT pour questions libres)
                    if (this.wrongAnswersCount === 1) {
                        this.showHelpButton();
                    }
                }
                
                // Afficher le bouton "Passer" après 2 erreurs (pour tous les types)
                if (this.wrongAnswersCount >= 2) {
                    this.showSkipButton();
                }
            }, 1500);
        }
    }
    
    // Afficher le bouton d'aide
    showHelpButton() {
        // Vérifier si le bouton n'existe pas déjà
        if (document.getElementById('helpHintBtn')) return;
        
        const answerContainer = document.getElementById('answerContainer');
        if (!answerContainer) return;
        
        const helpBtn = document.createElement('button');
        helpBtn.id = 'helpHintBtn';
        helpBtn.className = 'btn help-hint-btn';
        helpBtn.textContent = '💡 Besoin d\'aide ?';
        
        helpBtn.addEventListener('click', () => {
            this.showHint();
            helpBtn.remove(); // Retirer le bouton après utilisation
        });
        
        answerContainer.appendChild(helpBtn);
    }
    
    // Afficher l'indice de la question
    showHint() {
        const questionData = this.game.questionManager.getQuestionData(this.game.currentQuestionId);
        
        if (questionData && questionData.hint) {
            // Afficher l'indice dans un élément dédié
            let hintDisplay = document.getElementById('hintDisplay');
            
            if (!hintDisplay) {
                hintDisplay = document.createElement('div');
                hintDisplay.id = 'hintDisplay';
                hintDisplay.className = 'hint-display';
                
                const answerContainer = document.getElementById('answerContainer');
                if (answerContainer) {
                    answerContainer.insertBefore(hintDisplay, answerContainer.firstChild);
                }
            }
            
            hintDisplay.textContent = questionData.hint;
            hintDisplay.style.animation = 'fadeInBounce 0.5s ease';
            
            this.game.soundManager.play('hint');
            this.game.ui.showFeedback('Indice affiché ! Utilise-le pour trouver la réponse 🎯', 'info');
            
            // Remettre le focus sur le champ de réponse
            const answerInput = document.getElementById('answerInput');
            if (answerInput) {
                setTimeout(() => answerInput.focus(), 100);
            }
        }
    }
    
    // Afficher le bouton pour passer à la question suivante
    showSkipButton() {
        // Vérifier si le bouton n'existe pas déjà
        if (document.getElementById('skipBtn')) return;
        
        const answerContainer = document.getElementById('answerContainer');
        if (!answerContainer) return;
        
        const skipBtn = document.createElement('button');
        skipBtn.id = 'skipBtn';
        skipBtn.className = 'btn skip-btn';
        skipBtn.textContent = '⏭️ Passer à la question suivante';
        
        skipBtn.addEventListener('click', () => {
            this.game.ui.showFeedback('Question passée. Nouvelle question ! 🔄', 'info');
            this.game.nextQuestion();
        });
        
        answerContainer.appendChild(skipBtn);
    }
    
    // Réinitialiser
    reset() {
        // Réinitialiser le compteur d'erreurs
        this.wrongAnswersCount = 0;
        
        // Supprimer le bouton "Aide" s'il existe
        const helpBtn = document.getElementById('helpHintBtn');
        if (helpBtn) {
            helpBtn.remove();
        }
        
        // Supprimer le bouton "Passer" s'il existe
        const skipBtn = document.getElementById('skipBtn');
        if (skipBtn) {
            skipBtn.remove();
        }
        
        // Supprimer l'affichage de l'indice s'il existe
        const hintDisplay = document.getElementById('hintDisplay');
        if (hintDisplay) {
            hintDisplay.remove();
        }
        
        // Nettoyer les événements si nécessaire
        const options = document.querySelectorAll('.answer-option');
        options.forEach(option => {
            const clone = option.cloneNode(true);
            option.parentNode.replaceChild(clone, option);
        });
    }
}


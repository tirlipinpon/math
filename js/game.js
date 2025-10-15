// Jeu principal - Orchestrateur
// Version: 3.1.0
const GAME_VERSION = '3.1.0';

class MathGame {
    constructor() {
        // Afficher la version
        console.log(`%c🎮 Jeu de Mathématiques - Version ${GAME_VERSION}`, 'color: #667eea; font-size: 16px; font-weight: bold;');
        console.log(`%c📅 ${new Date().toLocaleString('fr-FR')}`, 'color: #10b981; font-size: 12px;');
        console.log('');
        
        // Afficher la quantité de questions
        const totalCount = Object.keys(GAME_DATA).length;
        
        console.log(`%c📊 Statistiques des questions :`, 'color: #f59e0b; font-weight: bold;');
        console.log(`   📈 TOTAL : ${totalCount} questions disponibles`);
        console.log('');
        
        // Initialiser les gestionnaires
        this.ui = new UIManager();
        this.soundManager = new SoundManager();
        this.questionManager = new QuestionManager(GAME_DATA);
        this.userManager = new UserManager();
        this.inputHandler = new InputHandler(this);
        
        // État du jeu
        this.currentQuestionId = null;
        this.currentCategory = 'toutes';
        
        // Afficher la version dans l'UI
        this.ui.displayVersion(GAME_VERSION);
        
        // Initialiser le jeu
        this.loadUserPreferences();
        this.initializeGame();
        this.setupEventListeners();
        this.updateVisibility();
        this.updateCategorySelect();
        this.populateUserSelect();
    }

    initializeGame() {
        // Ne lancer une question que si l'utilisateur n'est pas connecté
        if (!this.userManager.isLoggedIn()) {
            this.loadQuestion();
        }
    }

    loadQuestion() {
        const result = this.questionManager.selectRandomQuestion(this.userManager, this.currentCategory);
        
        // Si toutes les questions sont complétées
        if (result.allQuestionsCompleted) {
            console.log(`🎉 Toutes les questions du jeu complétées !`);
            this.handleGameCompleted();
            return;
        }
        
        // Si la catégorie est complétée (mais pas le jeu entier)
        if (result.categoryCompleted) {
            console.log(`🎉 Catégorie ${this.currentCategory} complétée !`);
            const categoryName = getCategoryName(this.currentCategory);
            this.ui.showFeedback(`🎉 Toutes les questions ${categoryName} répondues !`, 'success');
            this.soundManager.play('wordFound');
            
            // Retour automatique à "Toutes"
            setTimeout(() => {
                this.currentCategory = 'toutes';
                this.updateCategorySelect();
                this.loadQuestion();
            }, 2000);
            return;
        }
        
        this.currentQuestionId = result.questionId;
        const questionData = this.questionManager.getQuestionData(this.currentQuestionId);
        
        console.log(`%c🎯 QUESTION ACTUELLE: "${this.currentQuestionId}"`, 'color: #f59e0b; font-size: 14px; font-weight: bold; background: #fef3c7; padding: 4px 8px; border-radius: 4px;');
        console.log(`📝 Type: ${questionData.type} | 🗂️ Catégorie: ${this.currentCategory}`);
        console.log('');
        
        // Afficher la question
        this.ui.displayQuestion(questionData.question);
        
        // Créer l'interface de réponse
        this.ui.createAnswerInterface(questionData.type, questionData.options || []);
        
        // Attacher les événements
        if (questionData.type === 'qcm' || questionData.type === 'vrai-faux') {
            this.inputHandler.attachOptionListeners();
        } else if (questionData.type === 'libre') {
            this.inputHandler.attachInputListeners();
        }
        
        this.ui.showFeedback('💭 Réponds à la question !', 'info');
    }

    setupEventListeners() {
        // Connexion/Déconnexion
        this.ui.domElements.loginBtn.addEventListener('click', () => this.handleLogin());
        this.ui.domElements.logoutBtn.addEventListener('click', () => this.handleLogout());
        this.ui.domElements.usernameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleLogin();
        });
        
        // Sélecteur d'utilisateurs
        this.ui.domElements.usernameSelect.addEventListener('change', (e) => this.handleUserSelect(e));
        
        // Bouton son
        const soundBtn = document.getElementById('soundBtn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => this.toggleSound());
            this.updateSoundButton();
        }
        
        // Sélecteur de catégorie
        const categorySelect = document.getElementById('categorySelect');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => this.setCategory(e.target.value));
        }
    }
    
    // Changer la catégorie
    setCategory(category) {
        this.currentCategory = category;
        console.log(`🗂️ Catégorie changée: ${category}`);
        
        const categoryName = getCategoryName(category);
        this.ui.showFeedback(`Catégorie: ${categoryName}`, 'info');
        
        // Sauvegarder la préférence
        this.saveUserPreferences();
        
        this.loadQuestion();
    }
    
    // Mettre à jour la liste déroulante des catégories
    updateCategorySelect() {
        const select = document.getElementById('categorySelect');
        if (!select || typeof getAvailableCategories !== 'function') return;
        
        // Obtenir les catégories disponibles (avec questions restantes seulement)
        const availableCategories = getAvailableCategories(GAME_DATA, this.userManager);
        
        // Si la catégorie actuelle n'est plus disponible, revenir à "toutes"
        if (!availableCategories.includes(this.currentCategory)) {
            this.currentCategory = 'toutes';
        }
        
        // Vider et repeupler
        select.innerHTML = '';
        
        availableCategories.forEach(categoryKey => {
            const option = document.createElement('option');
            option.value = categoryKey;
            
            if (categoryKey === 'toutes') {
                // Pour "toutes", pas de compteur
                option.textContent = getCategoryName(categoryKey);
            } else {
                // Pour les autres catégories, afficher le nombre de questions restantes
                const counts = getFoundAndTotalCount(categoryKey, GAME_DATA, this.userManager);
                option.textContent = `${getCategoryName(categoryKey)} (${counts.remaining})`;
            }
            
            if (categoryKey === this.currentCategory) {
                option.selected = true;
            }
            
            select.appendChild(option);
        });
        
        console.log(`🗂️ Catégories disponibles: ${availableCategories.length} (questions restantes affichées)`);
    }
    
    // Activer/Désactiver les sons
    toggleSound() {
        const isMuted = this.soundManager.toggleMute();
        this.updateSoundButton();
        this.soundManager.play('click');
    }
    
    // Mettre à jour l'apparence du bouton son
    updateSoundButton() {
        const soundBtn = document.getElementById('soundBtn');
        if (soundBtn) {
            if (this.soundManager.isMuted) {
                soundBtn.textContent = '🔇';
                soundBtn.classList.add('muted');
                soundBtn.title = 'Activer les sons';
            } else {
                soundBtn.textContent = '🔊';
                soundBtn.classList.remove('muted');
                soundBtn.title = 'Désactiver les sons';
            }
        }
    }

    // Passer à la question suivante
    nextQuestion() {
        this.updateCategorySelect();
        this.loadQuestion();
    }

    // Gérer le changement de sélection d'utilisateur
    handleUserSelect(event) {
        const selectedUsername = event.target.value;
        
        if (selectedUsername) {
            this.ui.domElements.usernameInput.value = selectedUsername;
            
            // Connexion automatique
            this.handleLogin();
        } else {
            this.ui.domElements.usernameInput.value = '';
        }
    }
    
    // Peupler le select avec les utilisateurs existants
    populateUserSelect() {
        const allUsers = this.userManager.getAllUsers();
        const currentUser = this.userManager.getCurrentUser();
        
        // Filtrer l'utilisateur actuellement connecté
        const availableUsers = allUsers.filter(user => user !== currentUser);
        
        // Vider le select
        this.ui.domElements.usernameSelect.innerHTML = '<option value="">-- Utilisateurs existants --</option>';
        
        // Si connecté, cacher le select et l'input
        if (this.userManager.isLoggedIn()) {
            this.ui.domElements.usernameSelect.classList.add('hidden');
            return;
        }
        
        // Si aucun utilisateur n'existe, cacher le select et vider l'input
        if (availableUsers.length === 0) {
            this.ui.domElements.usernameSelect.classList.add('hidden');
            this.ui.domElements.usernameInput.placeholder = 'Crée ton profil...';
            this.ui.domElements.usernameInput.value = '';
            return;
        }
        
        // Sinon, afficher le select avec tous les utilisateurs disponibles
        this.ui.domElements.usernameSelect.classList.remove('hidden');
        this.ui.domElements.usernameInput.placeholder = 'Ou crée un nouveau profil...';
        
        availableUsers.forEach(user => {
            const option = document.createElement('option');
            option.value = user;
            option.textContent = user;
            this.ui.domElements.usernameSelect.appendChild(option);
        });
    }
    
    // Gestion de la connexion
    handleLogin() {
        const username = this.ui.domElements.usernameInput.value.trim();
        
        if (!username) {
            this.ui.showFeedback('Veuillez entrer un nom !', 'error');
            return;
        }
        
        if (this.userManager.login(username)) {
            this.loadUserData();
            this.ui.showFeedback(`Bienvenue ${username} ! Tes données ont été chargées.`, 'success');
            this.ui.setCurrentUser(username);
            
            // Réinitialiser le style du bouton
            this.ui.domElements.loginBtn.classList.remove('btn-ready');
            this.ui.domElements.loginBtn.style.background = '';
            
            this.updateVisibility();
            this.populateUserSelect();
        } else {
            this.ui.showFeedback('Erreur lors de la connexion.', 'error');
        }
    }

    handleLogout() {
        this.userManager.logout();
        this.updateVisibility();
        this.updateCategorySelect();
        this.populateUserSelect();
        this.ui.showFeedback('Déconnexion réussie. Tes données sont sauvegardées.', 'info');
    }

    loadUserData() {
        if (this.userManager.isLoggedIn()) {
            const questionsAnswered = this.userManager.getQuestionsAnswered();
            console.log(`📊 Questions répondues: ${questionsAnswered.length}`);
            
            this.updateCategorySelect();
            
            // Vérifier si toutes les questions sont répondues
            const allQuestions = this.questionManager.getAllQuestions();
            if (questionsAnswered.length >= allQuestions.length) {
                console.log(`🏆 Toutes les questions sont complétées !`);
                this.handleGameCompleted();
            } else {
                // Charger une question
                this.loadQuestion();
            }
        }
    }

    // Gérer la complétion du jeu
    handleGameCompleted() {
        this.ui.showFeedback(`🏆 FÉLICITATIONS ! Tu as répondu à TOUTES les questions ! 🏆 Tu es un CHAMPION en mathématiques ! 👑`, 'success');
        this.ui.createCelebration();
        this.soundManager.play('wordFound');
    }

    updateVisibility() {
        this.ui.updateVisibilityForLogin(this.userManager.isLoggedIn());
    }

    loadUserPreferences() {
        const preferences = this.userManager.getUserPreferences();
        this.currentCategory = preferences.selectedCategory || 'toutes';
        console.log(`📂 Préférences chargées: catégorie = ${this.currentCategory}`);
    }

    saveUserPreferences() {
        const preferences = {
            selectedCategory: this.currentCategory
        };
        
        console.log(`💾 Sauvegarde des préférences: catégorie = ${this.currentCategory}`);
        this.userManager.saveUserPreferences(preferences);
    }
}

// Démarrer le jeu
let gameInstance;
document.addEventListener('DOMContentLoaded', () => {
    gameInstance = new MathGame();
    
    // Fonction globale pour réinitialiser les données (accessible dans la console)
    window.resetUserData = () => {
        if (gameInstance && gameInstance.userManager && gameInstance.userManager.isLoggedIn()) {
            const username = gameInstance.userManager.getCurrentUser();
            if (confirm(`⚠️ Êtes-vous sûr de vouloir réinitialiser TOUTES les données de ${username} ?`)) {
                gameInstance.userManager.resetAllUserData();
                location.reload();
            }
        } else {
            console.log('⚠️ Aucun utilisateur connecté');
        }
    };
    
    console.log('💡 Astuce: Tape resetUserData() dans la console pour réinitialiser tes données');
});

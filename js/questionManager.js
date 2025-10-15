// Gestionnaire de la logique des questions
class QuestionManager {
    constructor(gameData) {
        this.questions = gameData;
    }
    
    // Normaliser le texte pour comparaison (enlever accents, espaces, casse)
    normalizeText(text) {
        return text
            .toString()
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim();
    }
    
    // Sélectionner une question aléatoire (avec support filtrage par catégorie)
    selectRandomQuestion(userManager, categoryFilter = 'toutes') {
        // TOUTES les questions du jeu
        const allQuestions = Object.keys(this.questions);
        
        // Questions de la catégorie filtrée
        let filteredQuestions = allQuestions;
        if (categoryFilter && categoryFilter !== 'toutes' && typeof getQuestionsByCategory === 'function') {
            filteredQuestions = getQuestionsByCategory(categoryFilter, this.questions);
            console.log(`🗂️ Filtre catégorie "${categoryFilter}": ${filteredQuestions.length} questions disponibles`);
        }
        
        let availableQuestions = filteredQuestions;
        
        // Filtrer les questions déjà répondues seulement si l'utilisateur est connecté
        if (userManager.isLoggedIn()) {
            availableQuestions = userManager.getAvailableQuestions(filteredQuestions);
            
            console.log(`🔍 Sélection question: ${availableQuestions.length}/${filteredQuestions.length} disponibles`);
            
            // Si aucune question disponible dans la catégorie filtrée
            if (availableQuestions.length === 0) {
                // Vérifier si TOUTES les questions du jeu sont complétées
                const allAvailableQuestions = userManager.getAvailableQuestions(allQuestions);
                const isGameComplete = allAvailableQuestions.length === 0;
                
                if (isGameComplete) {
                    console.log(`🏆 Toutes les questions du jeu répondues !`);
                    return {
                        questionId: null,
                        allQuestionsCompleted: true,
                        categoryCompleted: false
                    };
                } else {
                    console.log(`🎉 Catégorie "${categoryFilter}" complétée !`);
                    return {
                        questionId: null,
                        allQuestionsCompleted: false,
                        categoryCompleted: true
                    };
                }
            }
        }
        
        return {
            questionId: availableQuestions[Math.floor(Math.random() * availableQuestions.length)],
            allQuestionsCompleted: false,
            categoryCompleted: false
        };
    }
    
    // Obtenir les données d'une question
    getQuestionData(questionId) {
        return this.questions[questionId] || null;
    }
    
    // Vérifier si une réponse est correcte
    checkAnswer(questionId, userAnswer) {
        const questionData = this.getQuestionData(questionId);
        if (!questionData) return false;
        
        const normalizedUserAnswer = this.normalizeText(userAnswer);
        const normalizedCorrectAnswer = this.normalizeText(questionData.answer);
        
        return normalizedUserAnswer === normalizedCorrectAnswer;
    }
    
    // Obtenir toutes les questions
    getAllQuestions() {
        return Object.keys(this.questions);
    }
    
    // Obtenir le type de question
    getQuestionType(questionId) {
        const questionData = this.getQuestionData(questionId);
        return questionData ? questionData.type : null;
    }
    
    // Obtenir les options d'une question (pour QCM et Vrai/Faux)
    getQuestionOptions(questionId) {
        const questionData = this.getQuestionData(questionId);
        return questionData && questionData.options ? questionData.options : [];
    }
}


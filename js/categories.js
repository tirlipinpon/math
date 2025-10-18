// Définition centralisée des catégories mathématiques
// Format: ID numérique pour chaque catégorie (utilisé dans le fichier data.js)
// Les questions ont un attribut "cat" qui référence l'ID de la catégorie

const CATEGORIES = [
    { id: 0, key: "toutes", name: "📦 Toutes", icon: "📦" },
    { id: 1, key: "operations", name: "➕ Opérations de base", icon: "➕" },
    { id: 2, key: "problemes", name: "🧩 Résolution de problèmes", icon: "🧩" },
    { id: 3, key: "nombres", name: "🔢 Manipulation des nombres", icon: "🔢" },
    { id: 4, key: "logique", name: "🧠 Activités logiques", icon: "🧠" }
];

// Correspondance ID → Catégorie
const CATEGORIES_BY_ID = {};
const CATEGORIES_BY_KEY = {};

CATEGORIES.forEach(cat => {
    CATEGORIES_BY_ID[cat.id] = cat;
    CATEGORIES_BY_KEY[cat.key] = cat;
});

// Obtenir une catégorie par ID
function getCategoryById(id) {
    return CATEGORIES_BY_ID[id] || CATEGORIES_BY_ID[0]; // 0 = Toutes par défaut
}

// Obtenir une catégorie par clé
function getCategoryByKey(key) {
    return CATEGORIES_BY_KEY[key] || CATEGORIES_BY_KEY['toutes'];
}

// Fonction pour obtenir les questions d'une catégorie
function getQuestionsByCategory(categoryKey, gameData) {
    const allQuestions = Object.keys(gameData);
    
    if (categoryKey === 'toutes' || categoryKey === 0) {
        return allQuestions; // Toutes les questions du jeu
    }
    
    // Trouver l'ID de la catégorie
    const category = getCategoryByKey(categoryKey);
    if (!category) return allQuestions;
    
    const categoryId = category.id;
    
    // Filtrer les questions par ID de catégorie
    return allQuestions.filter(questionId => {
        const questionData = gameData[questionId];
        
        // Format: { question: "...", cat: 1, type: "...", ... }
        if (typeof questionData === 'object' && questionData.cat !== undefined) {
            return questionData.cat === categoryId;
        }
        
        return false;
    });
}

// Fonction pour obtenir les catégories disponibles
function getAvailableCategories(gameData, userManager = null) {
    const allQuestions = Object.keys(gameData);
    const availableCategories = [];
    
    // Toujours ajouter "toutes" en premier
    const allAvailableQuestions = userManager && userManager.isLoggedIn() 
        ? userManager.getAvailableQuestions(allQuestions)
        : allQuestions;
    
    if (allAvailableQuestions.length > 0) {
        availableCategories.push('toutes');
    }
    
    // Compter combien de questions RESTANTES dans chaque catégorie
    const categoryCounts = {};
    
    allAvailableQuestions.forEach(questionId => {
        const questionData = gameData[questionId];
        
        // Format: { question: "...", cat: 1, type: "...", ... }
        if (typeof questionData === 'object' && questionData.cat !== undefined) {
            const categoryId = questionData.cat;
            categoryCounts[categoryId] = (categoryCounts[categoryId] || 0) + 1;
        }
    });
    
    // Ajouter les catégories qui ont au moins 1 question RESTANTE
    CATEGORIES.forEach(cat => {
        if (cat.id !== 0 && categoryCounts[cat.id] > 0) {
            availableCategories.push(cat.key);
        }
    });
    
    return availableCategories;
}

// Fonction pour compter les questions restantes dans une catégorie
function getQuestionCountInCategory(categoryKey, gameData, userManager = null) {
    const questionsInCategory = getQuestionsByCategory(categoryKey, gameData);
    
    // Si pas d'utilisateur connecté, retourner toutes les questions
    if (!userManager || !userManager.isLoggedIn()) {
        return questionsInCategory.length;
    }
    
    // Filtrer les questions déjà répondues
    const availableQuestions = userManager.getAvailableQuestions(questionsInCategory);
    return availableQuestions.length;
}

// Fonction pour compter les questions répondues et le total dans une catégorie
function getFoundAndTotalCount(categoryKey, gameData, userManager = null) {
    const questionsInCategory = getQuestionsByCategory(categoryKey, gameData);
    let totalCount = questionsInCategory.length;
    let foundInCategory = 0;
    
    // Si pas d'utilisateur connecté, 0 répondu
    if (!userManager || !userManager.isLoggedIn()) {
        return { found: 0, total: totalCount, remaining: totalCount };
    }
    
    // 🔥 Traitement spécial pour la catégorie "operations" (statiques + dynamiques)
    if (categoryKey === 'operations') {
        // Compter les questions statiques réussies (celles qui ne commencent pas par "op_dynamic_")
        const questionsAnswered = userManager.getQuestionsAnswered();
        const staticQuestionsInCategory = questionsInCategory.filter(qId => !qId.startsWith('op_dynamic_'));
        const foundStatic = staticQuestionsInCategory.filter(questionId => questionsAnswered.includes(questionId)).length;
        
        // Compter les calculs dynamiques réussis
        const foundDynamic = userManager.getDynamicSuccessCount();
        
        // Total = questions statiques trouvées + calculs dynamiques réussis
        foundInCategory = foundStatic + foundDynamic;
        
        console.log(`📊 Catégorie operations: ${foundStatic} statiques + ${foundDynamic} dynamiques = ${foundInCategory}/${totalCount}`);
    } else {
        // Compter les questions répondues normalement
        const questionsAnswered = userManager.getQuestionsAnswered();
        foundInCategory = questionsInCategory.filter(questionId => questionsAnswered.includes(questionId)).length;
    }
    
    return {
        found: foundInCategory,
        total: totalCount,
        remaining: totalCount - foundInCategory
    };
}

// Obtenir le nom d'une catégorie
function getCategoryName(categoryKey) {
    const cat = getCategoryByKey(categoryKey);
    return cat ? cat.name : "📦 Toutes";
}

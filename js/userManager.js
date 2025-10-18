// Gestionnaire d'utilisateurs et de sauvegarde
class UserManager {
    constructor() {
        this.currentUser = null;
        this.questionsAnswered = [];
        this.dynamicCalculationsSuccess = []; // Signatures des calculs dynamiques réussis
        
        // Préfixe unique pour éviter les conflits avec d'autres applications
        this.COOKIE_PREFIX = 'math_game_';
    }

    // Connexion d'un utilisateur
    login(username) {
        if (!username || username.trim() === '') {
            return false;
        }

        this.currentUser = username.trim();
        this.loadUserData();
        
        // Si c'est un nouvel utilisateur (pas de cookie), créer un cookie vide
        if (this.questionsAnswered.length === 0) {
            this.saveUserData();
        }
        
        return true;
    }

    // Déconnexion
    logout() {
        this.currentUser = null;
        this.questionsAnswered = [];
        this.dynamicCalculationsSuccess = [];
    }

    // Charger les données utilisateur depuis les cookies
    loadUserData() {
        if (!this.currentUser) return;

        console.log('📂 Chargement des données pour:', this.currentUser);

        // Charger les questions répondues
        const questionsAnsweredCookie = this.getCookie(`${this.COOKIE_PREFIX}questionsAnswered_${this.currentUser}`);
        if (questionsAnsweredCookie) {
            try {
                const loaded = JSON.parse(questionsAnsweredCookie);
                console.log('📥 Questions chargées depuis cookie:', loaded);
                
                // Nettoyer les doublons
                this.questionsAnswered = [...new Set(loaded)];
                
                console.log('🧹 Questions après nettoyage des doublons:', this.questionsAnswered);
                
                // Sauvegarder les données nettoyées
                this.saveUserData();
            } catch (e) {
                console.error('❌ Erreur lors du chargement des questions:', e);
            }
        } else {
            console.log('ℹ️ Aucune question sauvegardée pour cet utilisateur');
        }
        
        // Charger les calculs dynamiques réussis
        const dynamicCalcsCookie = this.getCookie(`${this.COOKIE_PREFIX}dynamicCalcs_${this.currentUser}`);
        if (dynamicCalcsCookie) {
            try {
                const loaded = JSON.parse(dynamicCalcsCookie);
                this.dynamicCalculationsSuccess = [...new Set(loaded)];
                console.log(`✨ Calculs dynamiques réussis: ${this.dynamicCalculationsSuccess.length}/20`);
            } catch (e) {
                console.error('❌ Erreur lors du chargement des calculs dynamiques:', e);
            }
        }
    }

    // Sauvegarder les données utilisateur
    saveUserData() {
        if (!this.currentUser) return;

        console.log('💾 Sauvegarde des données pour:', this.currentUser);
        console.log('📝 Questions à sauvegarder:', this.questionsAnswered);

        // Sauvegarder les questions répondues
        this.setCookie(`${this.COOKIE_PREFIX}questionsAnswered_${this.currentUser}`, JSON.stringify(this.questionsAnswered), 365);
        
        // Sauvegarder les calculs dynamiques réussis
        this.setCookie(`${this.COOKIE_PREFIX}dynamicCalcs_${this.currentUser}`, JSON.stringify(this.dynamicCalculationsSuccess), 365);
        
        console.log('✅ Sauvegarde terminée');
    }

    // Ajouter une question répondue
    addQuestionAnswered(questionId) {
        if (!this.currentUser) return;
        
        // Vérifier si la question n'est pas déjà dans la liste
        if (!this.questionsAnswered.includes(questionId)) {
            console.log(`➕ Ajout de la question "${questionId}"`);
            this.questionsAnswered.push(questionId);
            console.log(`📊 Total de questions répondues: ${this.questionsAnswered.length}`);
            this.saveUserData();
        } else {
            console.log(`⚠️ Question "${questionId}" déjà répondue, pas d'ajout`);
        }
    }

    // Obtenir les questions répondues
    getQuestionsAnswered() {
        return this.questionsAnswered || [];
    }

    // Obtenir les questions disponibles (excluant celles déjà répondues)
    getAvailableQuestions(allQuestions) {
        return allQuestions.filter(questionId => !this.questionsAnswered.includes(questionId));
    }

    // Vérifier si un utilisateur existe
    userExists(username) {
        const questionsAnsweredCookie = this.getCookie(`${this.COOKIE_PREFIX}questionsAnswered_${username}`);
        return questionsAnsweredCookie !== null;
    }

    // Obtenir tous les utilisateurs existants
    getAllUsers() {
        const users = [];
        const cookies = document.cookie.split(';');
        
        cookies.forEach(cookie => {
            const trimmed = cookie.trim();
            if (trimmed.startsWith(`${this.COOKIE_PREFIX}questionsAnswered_`)) {
                const username = trimmed.split('=')[0].replace(`${this.COOKIE_PREFIX}questionsAnswered_`, '');
                if (username && !users.includes(username)) {
                    users.push(username);
                }
            }
        });
        
        return users.sort();
    }

    // Obtenir toutes les questions répondues
    getAllQuestionsAnswered() {
        return [...new Set(this.questionsAnswered)]; // Supprime les doublons
    }
    
    // Réinitialiser complètement les données de l'utilisateur (utile pour debug)
    resetAllUserData() {
        if (!this.currentUser) return;
        
        console.log('🗑️ Réinitialisation complète des données pour:', this.currentUser);
        
        this.questionsAnswered = [];
        this.dynamicCalculationsSuccess = [];
        this.saveUserData();
        
        console.log('✅ Toutes les données ont été réinitialisées');
    }
    
    // ===== GESTION DES CALCULS DYNAMIQUES =====
    
    // Ajouter un calcul dynamique réussi (signature)
    addDynamicCalculationSuccess(signature) {
        if (!this.currentUser) return;
        
        if (!this.dynamicCalculationsSuccess.includes(signature)) {
            console.log(`✨ Ajout du calcul réussi: "${signature}"`);
            this.dynamicCalculationsSuccess.push(signature);
            console.log(`📊 Calculs dynamiques réussis: ${this.dynamicCalculationsSuccess.length}/20`);
            this.saveUserData();
        } else {
            console.log(`⚠️ Calcul "${signature}" déjà réussi`);
        }
    }
    
    // Obtenir les calculs dynamiques réussis
    getDynamicCalculationsSuccess() {
        return this.dynamicCalculationsSuccess || [];
    }
    
    // Obtenir le nombre de calculs dynamiques réussis
    getDynamicSuccessCount() {
        return this.dynamicCalculationsSuccess.length;
    }
    
    // Vérifier si un calcul a déjà été réussi
    isDynamicCalculationSuccess(signature) {
        return this.dynamicCalculationsSuccess.includes(signature);
    }
    
    // Vérifier si la catégorie dynamique est complète (20/20)
    isDynamicCategoryComplete() {
        return this.dynamicCalculationsSuccess.length >= 20;
    }

    // Vérifier si un utilisateur est connecté
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Obtenir le nom de l'utilisateur connecté
    getCurrentUser() {
        return this.currentUser;
    }

    // Gestion des cookies
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        const encodedValue = encodeURIComponent(value);
        document.cookie = `${name}=${encodedValue};expires=${expires.toUTCString()};path=/`;
        console.log(`🍪 Cookie enregistré: ${name}`);
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                const encodedValue = c.substring(nameEQ.length, c.length);
                return decodeURIComponent(encodedValue);
            }
        }
        return null;
    }

    // Supprimer un cookie
    deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    // Sauvegarder les préférences utilisateur
    saveUserPreferences(preferences) {
        this.setCookie(`${this.COOKIE_PREFIX}userPreferences`, JSON.stringify(preferences), 365);
    }

    // Charger les préférences utilisateur
    getUserPreferences() {
        const prefsCookie = this.getCookie(`${this.COOKIE_PREFIX}userPreferences`);
        if (prefsCookie) {
            return JSON.parse(prefsCookie);
        }
        return {
            selectedCategory: 'toutes'
        };
    }
}

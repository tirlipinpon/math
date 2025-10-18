// Service de génération d'indices par IA (DeepSeek)
class AIHintService {
  constructor() {
    this.cache = new Map(); // Cache des hints générés
    this.isLoading = false;
  }
  
  // Déterminer le niveau de difficulté d'un calcul
  getDifficultyLevel(operation, a, b) {
    const result = this.calculateResult(operation, a, b);
    
    // Critères de difficulté
    if (operation === 'addition' || operation === 'soustraction') {
      if (result <= 20) return 'facile'; // 7-8 ans
      if (result <= 100) return 'moyen'; // 9-10 ans
      return 'difficile'; // 11-12 ans
    }
    
    if (operation === 'multiplication') {
      if (a <= 5 && b <= 5) return 'facile'; // Tables de 1 à 5
      if (a <= 10 && b <= 10) return 'moyen'; // Tables de 6 à 10
      return 'difficile'; // Au-delà de 10
    }
    
    if (operation === 'division') {
      if (a <= 50) return 'facile';
      if (a <= 100) return 'moyen';
      return 'difficile';
    }
    
    return 'moyen';
  }
  
  // Calculer le résultat d'une opération
  calculateResult(operation, a, b) {
    switch (operation) {
      case 'addition': return a + b;
      case 'soustraction': return a - b;
      case 'multiplication': return a * b;
      case 'division': return a / b;
      default: return 0;
    }
  }
  
  // Obtenir le symbole de l'opération
  getOperationSymbol(operation) {
    const symbols = {
      'addition': '+',
      'soustraction': '-',
      'multiplication': '×',
      'division': '÷'
    };
    return symbols[operation] || '+';
  }
  
  // Obtenir le nom français de l'opération
  getOperationName(operation) {
    const names = {
      'addition': 'addition',
      'soustraction': 'soustraction',
      'multiplication': 'multiplication',
      'division': 'division'
    };
    return names[operation] || operation;
  }
  
  // Créer le prompt pour l'IA selon la difficulté
  createPrompt(operation, a, b, difficulty) {
    const symbol = this.getOperationSymbol(operation);
    const opName = this.getOperationName(operation);
    const calcul = `${a} ${symbol} ${b}`;
    
    const ageRanges = {
      'facile': '7-8 ans',
      'moyen': '9-10 ans',
      'difficile': '11-12 ans'
    };
    
    const age = ageRanges[difficulty] || '9-10 ans';
    
    return `Tu es un assistant pédagogique bienveillant pour enfants.

Un enfant de ${age} doit résoudre ce calcul : ${calcul}

CONSIGNES IMPORTANTES :
- Génère UN SEUL indice court et encourageant (maximum 15 mots)
- NE DONNE JAMAIS la réponse finale
- Commence TOUJOURS par "💡"
- Propose UNE stratégie de calcul adaptée à l'âge
- Utilise un ton amical et positif
- Pas de phrases complexes

Exemples d'indices :
- "💡 Décompose : 25 + 10 = 35, puis ajoute encore 8"
- "💡 Table de 7 : multiplie 7 par 8"
- "💡 Compte à partir de 15 et ajoute 12"

Indice pour ${calcul} :`;
  }
  
  // Générer la clé de cache
  getCacheKey(operation, a, b) {
    const symbol = this.getOperationSymbol(operation);
    return `${a}${symbol}${b}`;
  }
  
  // Appeler l'API DeepSeek
  async callDeepSeekAPI(prompt, retryCount = 0) {
    if (!isApiKeyConfigured()) {
      console.error('❌ Clé API DeepSeek non configurée dans config.js');
      return null;
    }
    
    try {
      console.log('🤖 [AI] Appel à l\'API DeepSeek...');
      
      const response = await fetch(CONFIG.DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CONFIG.DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: CONFIG.DEEPSEEK_MODEL,
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: CONFIG.AI_HINT_CONFIG.temperature,
          max_tokens: CONFIG.AI_HINT_CONFIG.max_tokens,
          top_p: CONFIG.AI_HINT_CONFIG.top_p
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const hint = data.choices[0].message.content.trim();
        console.log('✅ [AI] Hint reçu:', hint);
        return hint;
      }
      
      return null;
    } catch (error) {
      console.error('❌ [AI] Erreur lors de l\'appel API:', error);
      
      // Retry une fois
      if (retryCount === 0) {
        console.log('🔄 [AI] Nouvelle tentative...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Attendre 1 seconde
        return this.callDeepSeekAPI(prompt, retryCount + 1);
      }
      
      return null;
    }
  }
  
  // Générer un hint avec l'IA
  async generateHint(questionData) {
    if (!questionData.isDynamic || !questionData.operands) {
      console.log('⚠️ [AI] Question non dynamique, pas de génération IA');
      return null;
    }
    
    const [a, b] = questionData.operands;
    const operation = questionData.operation;
    const cacheKey = this.getCacheKey(operation, a, b);
    
    // Vérifier le cache
    if (this.cache.has(cacheKey)) {
      console.log(`💾 [AI] Hint trouvé dans le cache pour "${cacheKey}"`);
      return this.cache.get(cacheKey);
    }
    
    // Déterminer la difficulté
    const difficulty = this.getDifficultyLevel(operation, a, b);
    console.log(`🎯 [AI] Difficulté détectée: ${difficulty} pour ${cacheKey}`);
    
    // Créer le prompt
    const prompt = this.createPrompt(operation, a, b, difficulty);
    
    // Appeler l'API
    const hint = await this.callDeepSeekAPI(prompt);
    
    if (hint) {
      // Mettre en cache
      this.cache.set(cacheKey, hint);
      console.log(`💾 [AI] Hint mis en cache pour "${cacheKey}"`);
      return hint;
    }
    
    return null;
  }
  
  // Afficher un loader pendant la génération
  showLoader(container) {
    const loader = document.createElement('div');
    loader.id = 'aiHintLoader';
    loader.className = 'ai-hint-loader';
    loader.innerHTML = `
      <div class="loader-content">
        <div class="loader-emoji">🤔💭💡</div>
        <div class="loader-text">L'assistant réfléchit à une aide...</div>
      </div>
    `;
    
    // Ajouter les styles inline
    loader.style.cssText = `
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      border-radius: 12px;
      margin: 10px 0;
      text-align: center;
      animation: pulse 1.5s ease-in-out infinite;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    container.appendChild(loader);
    
    // Animation des emojis
    const emojiElement = loader.querySelector('.loader-emoji');
    if (emojiElement) {
      emojiElement.style.cssText = `
        font-size: 24px;
        margin-bottom: 8px;
        animation: bounce 1s ease-in-out infinite;
      `;
    }
    
    const textElement = loader.querySelector('.loader-text');
    if (textElement) {
      textElement.style.cssText = `
        font-size: 14px;
        font-weight: 500;
      `;
    }
    
    return loader;
  }
  
  // Masquer le loader
  hideLoader() {
    const loader = document.getElementById('aiHintLoader');
    if (loader) {
      loader.remove();
    }
  }
  
  // Vider le cache (utile pour debug)
  clearCache() {
    this.cache.clear();
    console.log('🗑️ [AI] Cache des hints vidé');
  }
  
  // Obtenir les statistiques du cache
  getCacheStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}


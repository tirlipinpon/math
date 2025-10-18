// Configuration de l'application
// IMPORTANT : Ne jamais commit ce fichier avec une vraie clé API !

const CONFIG = {
  // Clé API DeepSeek
  DEEPSEEK_API_KEY: 'sk-df452afa345c4fb78f0efc6c719ba8ea',
  
  // Endpoint de l'API DeepSeek
  DEEPSEEK_API_URL: 'https://api.deepseek.com/v1/chat/completions',
  
  // Modèle à utiliser
  DEEPSEEK_MODEL: 'deepseek-chat',
  
  // Paramètres de l'IA pour les hints
  AI_HINT_CONFIG: {
    temperature: 0.7,
    max_tokens: 150,
    top_p: 1
  }
};

// Vérifier si la clé API est configurée
function isApiKeyConfigured() {
  return CONFIG.DEEPSEEK_API_KEY && CONFIG.DEEPSEEK_API_KEY !== 'YOUR_DEEPSEEK_API_KEY_HERE';
}


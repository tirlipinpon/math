// Générateur de questions dynamiques pour les opérations de base
// Ce module génère des calculs aléatoires adaptés au niveau

class DynamicQuestionGenerator {
  constructor() {
    this.levels = {
      facile: {
        addition: { min: 1, max: 20, maxResult: 30 },
        soustraction: { min: 1, max: 20, minResult: 0 },
        multiplication: { min: 1, max: 10 },
        division: { min: 1, max: 10, maxDividend: 100 }
      },
      moyen: {
        addition: { min: 10, max: 50, maxResult: 100 },
        soustraction: { min: 10, max: 50, minResult: 0 },
        multiplication: { min: 1, max: 12 },
        division: { min: 1, max: 12, maxDividend: 144 }
      },
      difficile: {
        addition: { min: 50, max: 500, maxResult: 1000 },
        soustraction: { min: 50, max: 500, minResult: 0 },
        multiplication: { min: 10, max: 25 },
        division: { min: 10, max: 25, maxDividend: 500 }
      }
    };
    
    this.currentLevel = 'moyen';
  }
  
  // Définir le niveau de difficulté
  setLevel(level) {
    if (this.levels[level]) {
      this.currentLevel = level;
    }
  }
  
  // Générer un nombre aléatoire entre min et max (inclus)
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Obtenir la signature d'un calcul (pour éviter les doublons)
  getCalculationSignature(operation, a, b) {
    const symbols = {
      'addition': '+',
      'soustraction': '-',
      'multiplication': '×',
      'division': '÷'
    };
    const symbol = symbols[operation] || '+';
    return `${a}${symbol}${b}`;
  }
  
  // Générer une addition
  generateAddition() {
    const config = this.levels[this.currentLevel].addition;
    let a = this.randomInt(config.min, config.max);
    let b = this.randomInt(config.min, config.max);
    
    // S'assurer que le résultat ne dépasse pas maxResult
    if (a + b > config.maxResult) {
      b = config.maxResult - a;
    }
    
    const answer = a + b;
    const signature = this.getCalculationSignature('addition', a, b);
    
    // Générer un hint adapté
    let hint;
    if (b <= 10) {
      hint = `💡 Compte à partir de ${a}, puis ajoute ${b}`;
    } else {
      const dizaines = Math.floor(b / 10) * 10;
      const unites = b % 10;
      if (unites > 0) {
        hint = `💡 Décompose : ${a} + ${dizaines} = ${a + dizaines}, puis ajoute ${unites}`;
      } else {
        hint = `💡 ${a} + ${dizaines} : ajoute les dizaines`;
      }
    }
    
    return {
      question: `Combien font ${a} + ${b} ?`,
      type: "libre",
      answer: answer.toString(),
      hint: hint,
      cat: 1,
      isDynamic: true,
      operation: 'addition',
      operands: [a, b],
      signature: signature
    };
  }
  
  // Générer une soustraction
  generateSoustraction() {
    const config = this.levels[this.currentLevel].soustraction;
    let a = this.randomInt(config.min, config.max);
    let b = this.randomInt(config.min, Math.min(a, config.max));
    
    // S'assurer que le résultat est positif ou nul
    if (a - b < config.minResult) {
      b = a - config.minResult;
    }
    
    const answer = a - b;
    const signature = this.getCalculationSignature('soustraction', a, b);
    
    // Générer un hint adapté
    let hint;
    if (b <= 10) {
      hint = `💡 Pars de ${a} et enlève ${b}`;
    } else {
      const dizaines = Math.floor(b / 10) * 10;
      const unites = b % 10;
      if (unites > 0) {
        hint = `💡 Enlève d'abord ${dizaines}, puis encore ${unites} : ${a} - ${dizaines} - ${unites}`;
      } else {
        hint = `💡 ${a} - ${dizaines} : enlève les dizaines`;
      }
    }
    
    return {
      question: `Combien font ${a} - ${b} ?`,
      type: "libre",
      answer: answer.toString(),
      hint: hint,
      cat: 1,
      isDynamic: true,
      operation: 'soustraction',
      operands: [a, b],
      signature: signature
    };
  }
  
  // Générer une multiplication
  generateMultiplication() {
    const config = this.levels[this.currentLevel].multiplication;
    const a = this.randomInt(config.min, config.max);
    const b = this.randomInt(config.min, config.max);
    const answer = a * b;
    const signature = this.getCalculationSignature('multiplication', a, b);
    
    // Générer un hint adapté
    let hint;
    if (b <= 3) {
      hint = `💡 C'est ${a} + ${a}${b === 3 ? ` + ${a}` : ''}`;
    } else if (a === 10 || b === 10) {
      hint = `💡 Multiplier par 10 : ajoute un zéro !`;
    } else {
      hint = `💡 Table de ${a} : ${a} × ${b} = ?`;
    }
    
    // Générer des options pour QCM
    const options = this.generateMultipleChoiceOptions(answer, 4, answer * 0.5, answer * 1.5);
    
    return {
      question: `Combien font ${a} × ${b} ?`,
      type: "qcm",
      answer: answer.toString(),
      options: options,
      hint: hint,
      cat: 1,
      isDynamic: true,
      operation: 'multiplication',
      operands: [a, b],
      signature: signature
    };
  }
  
  // Générer une division
  generateDivision() {
    const config = this.levels[this.currentLevel].division;
    const diviseur = this.randomInt(config.min, config.max);
    const quotient = this.randomInt(2, Math.floor(config.maxDividend / diviseur));
    const dividende = diviseur * quotient; // S'assurer que la division tombe juste
    const signature = this.getCalculationSignature('division', dividende, diviseur);
    
    // Générer un hint adapté
    const hint = `💡 Combien de fois ${diviseur} dans ${dividende} ? Table de ${diviseur} : ${diviseur} × ? = ${dividende}`;
    
    // Générer des options pour QCM
    const options = this.generateMultipleChoiceOptions(quotient, 4, 1, quotient + 5);
    
    return {
      question: `Combien font ${dividende} ÷ ${diviseur} ?`,
      type: "qcm",
      answer: quotient.toString(),
      options: options,
      hint: hint,
      cat: 1,
      isDynamic: true,
      operation: 'division',
      operands: [dividende, diviseur],
      signature: signature
    };
  }
  
  // Générer un Vrai/Faux
  generateVraiFaux() {
    const operations = ['addition', 'soustraction', 'multiplication'];
    const selectedOp = operations[this.randomInt(0, operations.length - 1)];
    
    let a, b, result, correctResult;
    const config = this.levels[this.currentLevel];
    
    switch (selectedOp) {
      case 'addition':
        a = this.randomInt(config.addition.min, config.addition.max);
        b = this.randomInt(config.addition.min, config.addition.max);
        correctResult = a + b;
        // 50% chance d'être vrai
        result = Math.random() > 0.5 ? correctResult : correctResult + this.randomInt(-5, 5, [0]);
        return {
          question: `${a} + ${b} = ${result}`,
          type: "vrai-faux",
          answer: result === correctResult ? "Vrai" : "Faux",
          options: ["Vrai", "Faux"],
          hint: `💡 Calcule ${a} + ${b} et vérifie si ça fait bien ${result}`,
          cat: 1,
          isDynamic: true,
          operation: 'addition',
          operands: [a, b],
          signature: this.getCalculationSignature('addition', a, b)
        };
        
      case 'soustraction':
        a = this.randomInt(config.soustraction.min, config.soustraction.max);
        b = this.randomInt(config.soustraction.min, Math.min(a, config.soustraction.max));
        correctResult = a - b;
        result = Math.random() > 0.5 ? correctResult : correctResult + this.randomInt(-5, 5, [0]);
        return {
          question: `${a} - ${b} = ${result}`,
          type: "vrai-faux",
          answer: result === correctResult ? "Vrai" : "Faux",
          options: ["Vrai", "Faux"],
          hint: `💡 Calcule ${a} - ${b} et vérifie si ça fait ${result}`,
          cat: 1,
          isDynamic: true,
          operation: 'soustraction',
          operands: [a, b],
          signature: this.getCalculationSignature('soustraction', a, b)
        };
        
      case 'multiplication':
        a = this.randomInt(config.multiplication.min, config.multiplication.max);
        b = this.randomInt(config.multiplication.min, config.multiplication.max);
        correctResult = a * b;
        result = Math.random() > 0.5 ? correctResult : correctResult + this.randomInt(-5, 5, [0]);
        return {
          question: `${a} × ${b} = ${result}`,
          type: "vrai-faux",
          answer: result === correctResult ? "Vrai" : "Faux",
          options: ["Vrai", "Faux"],
          hint: `💡 Table de ${a} : ${a} × ${b}, vérifie le résultat`,
          cat: 1,
          isDynamic: true,
          operation: 'multiplication',
          operands: [a, b],
          signature: this.getCalculationSignature('multiplication', a, b)
        };
    }
  }
  
  // Générer des options de réponses pour QCM (en évitant les doublons)
  generateMultipleChoiceOptions(correctAnswer, count, min, max) {
    const options = new Set([correctAnswer]);
    let attempts = 0;
    const maxAttempts = 100; // Limite pour éviter boucle infinie
    
    while (options.size < count && attempts < maxAttempts) {
      attempts++;
      const offset = this.randomInt(-Math.floor(correctAnswer * 0.3), Math.floor(correctAnswer * 0.3));
      const wrongAnswer = correctAnswer + offset;
      
      if (wrongAnswer !== correctAnswer && wrongAnswer >= min && wrongAnswer <= max && wrongAnswer > 0) {
        options.add(wrongAnswer);
      }
    }
    
    return Array.from(options).map(n => n.toString());
  }
  
  // Générer une question aléatoire selon un type
  generateQuestion(type = null) {
    const types = type ? [type] : ['addition', 'soustraction', 'multiplication', 'division', 'vrai-faux'];
    const selectedType = types[this.randomInt(0, types.length - 1)];
    
    switch (selectedType) {
      case 'addition':
        return this.generateAddition();
      case 'soustraction':
        return this.generateSoustraction();
      case 'multiplication':
        return this.generateMultiplication();
      case 'division':
        return this.generateDivision();
      case 'vrai-faux':
        return this.generateVraiFaux();
      default:
        return this.generateAddition();
    }
  }
  
  // Générer une question dynamique avec un ID unique
  generateQuestionWithId(index) {
    const questionId = `op_dynamic_${String(index).padStart(3, '0')}`;
    const questionData = this.generateQuestion();
    
    return {
      questionId,
      questionData
    };
  }
  
  // Générer un ensemble de questions dynamiques (en évitant les calculs déjà réussis)
  generateQuestionSet(count = 20, excludeSignatures = []) {
    const questions = {};
    const usedSignatures = new Set(excludeSignatures);
    let generatedCount = 0;
    let attempts = 0;
    const maxAttempts = count * 10; // Limité pour éviter le freeze
    
    while (generatedCount < count && attempts < maxAttempts) {
      attempts++;
      
      const { questionId, questionData } = this.generateQuestionWithId(generatedCount + 1);
      
      // Vérifier si cette signature a déjà été utilisée ou réussie
      if (usedSignatures.has(questionData.signature)) {
        continue; // Passer à la tentative suivante
      }
      
      usedSignatures.add(questionData.signature);
      questions[questionId] = questionData;
      generatedCount++;
    }
    
    console.log(`✨ Génération de ${generatedCount}/${count} questions dynamiques pour "Opérations de base"`);
    
    if (excludeSignatures.length > 0) {
      console.log(`   ↳ ${excludeSignatures.length} calculs déjà réussis exclus`);
    }
    
    return questions;
  }
}


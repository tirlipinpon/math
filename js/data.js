// Fichier unique des données - Toutes les questions du jeu de maths
// Format: { question: "...", type: "qcm|vrai-faux|libre", answer: "...", options: [...], cat: ID }
// IDs: 1=Opérations de base, 2=Résolution de problèmes, 3=Manipulation des nombres, 4=Activités logiques

const GAME_DATA = {
    // ============ OPÉRATIONS DE BASE (1) ============
    "op_001": { 
        question: "Combien font 5 + 3 ?", 
        type: "libre", 
        answer: "8", 
        hint: "💡 Compte sur tes doigts : 5... puis ajoute 3 de plus",
        cat: 1 
    },
    "op_002": { 
        question: "Combien font 12 - 7 ?", 
        type: "libre", 
        answer: "5", 
        hint: "💡 Pars de 12 et enlève 7 : 12-7 = ?",
        cat: 1 
    },
    "op_003": { 
        question: "Combien font 6 × 4 ?", 
        type: "qcm", 
        answer: "24", 
        options: ["20", "24", "28", "30"],
        hint: "💡 Table de 6 : 6 × 4 = 6 + 6 + 6 + 6", 
        cat: 1 
    },
    "op_004": { 
        question: "Combien font 20 ÷ 5 ?", 
        type: "qcm", 
        answer: "4", 
        options: ["3", "4", "5", "6"],
        hint: "💡 Combien de fois 5 dans 20 ? 5 × ? = 20", 
        cat: 1 
    },
    "op_005": { 
        question: "8 + 7 = 15", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Calcule 8 + 7 et vérifie si ça fait bien 15", 
        cat: 1 
    },
    "op_006": { 
        question: "15 - 8 = 6", 
        type: "vrai-faux", 
        answer: "Faux", 
        options: ["Vrai", "Faux"],
        hint: "💡 Calcule 15 - 8 : est-ce que ça fait vraiment 6 ?", 
        cat: 1 
    },
    "op_007": { 
        question: "Combien font 25 + 18 ?", 
        type: "libre", 
        answer: "43", 
        hint: "💡 Décompose : 25 + 10 = 35, puis ajoute encore 8",
        cat: 1 
    },
    "op_008": { 
        question: "Combien font 50 - 23 ?", 
        type: "libre", 
        answer: "27", 
        hint: "💡 Enlève d'abord 20, puis encore 3 : 50-20-3 = ?",
        cat: 1 
    },
    "op_009": { 
        question: "Combien font 7 × 8 ?", 
        type: "qcm", 
        answer: "56", 
        options: ["48", "54", "56", "64"],
        hint: "💡 Table de 7 : 7 × 8 = (7 × 4) + (7 × 4) = 28 + 28", 
        cat: 1 
    },
    "op_010": { 
        question: "Combien font 36 ÷ 6 ?", 
        type: "libre", 
        answer: "6", 
        hint: "💡 Combien de fois 6 dans 36 ? Table de 6 : 6×? = 36",
        cat: 1 
    },
    "op_011": { 
        question: "9 × 6 = 54", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Table de 9 : 9 × 6, vérifie le résultat", 
        cat: 1 
    },
    "op_012": { 
        question: "48 ÷ 8 = 7", 
        type: "vrai-faux", 
        answer: "Faux", 
        options: ["Vrai", "Faux"],
        hint: "💡 Table de 8 : 8 × ? = 48. Est-ce 7 ?", 
        cat: 1 
    },
    "op_013": { 
        question: "Combien font 100 - 47 ?", 
        type: "qcm", 
        answer: "53", 
        options: ["47", "53", "57", "63"],
        hint: "💡 100 - 47 : pense à 100 - 50 = 50, puis ajoute 3", 
        cat: 1 
    },
    "op_014": { 
        question: "Combien font 12 × 5 ?", 
        type: "libre", 
        answer: "60", 
        hint: "💡 12×5 = (10×5) + (2×5) = 50 + 10",
        cat: 1 
    },
    "op_015": { 
        question: "Combien font 45 + 38 ?", 
        type: "libre", 
        answer: "83", 
        hint: "💡 45 + 30 = 75, puis ajoute encore 8",
        cat: 1 
    },
    "op_016": { 
        question: "Combien font 72 ÷ 9 ?", 
        type: "qcm", 
        answer: "8", 
        options: ["6", "7", "8", "9"],
        hint: "💡 Table de 9 : 9 × ? = 72", 
        cat: 1 
    },
    "op_017": { 
        question: "125 + 75 = 200", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 125 + 75 : pense à 100 + 100 = 200, vérifie avec 25 + 75", 
        cat: 1 
    },
    "op_018": { 
        question: "200 - 85 = 115", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 200 - 85 : enlève 100 d'abord (= 100), puis enlève encore 15 (car 85 = 100 - 15)", 
        cat: 1 
    },
    "op_019": { 
        question: "Combien font 11 × 11 ?", 
        type: "libre", 
        answer: "121", 
        hint: "💡 11×11 = (10×11) + (1×11) = 110 + 11",
        cat: 1 
    },
    "op_020": { 
        question: "Combien font 144 ÷ 12 ?", 
        type: "libre", 
        answer: "12", 
        hint: "💡 Table de 12 : 12×? = 144. C'est 12×12 !",
        cat: 1 
    },

    // ============ RÉSOLUTION DE PROBLÈMES (2) ============
    "prob_001": { 
        question: "Marie a 12 bonbons. Elle en donne 5 à son ami. Combien lui en reste-t-il ?", 
        type: "libre", 
        answer: "7", 
        hint: "💡 Elle avait 12, elle en donne 5. C'est une soustraction : 12 - 5",
        cat: 2 
    },
    "prob_002": { 
        question: "Dans une classe, il y a 15 filles et 13 garçons. Combien y a-t-il d'élèves en tout ?", 
        type: "qcm", 
        answer: "28", 
        options: ["26", "27", "28", "29"],
        hint: "💡 Pour trouver le total d'élèves, additionne les filles et les garçons", 
        cat: 2 
    },
    "prob_003": { 
        question: "Un paquet contient 8 biscuits. Combien de biscuits y a-t-il dans 5 paquets ?", 
        type: "libre", 
        answer: "40", 
        hint: "💡 5 paquets de 8 biscuits : c'est 8 + 8 + 8 + 8 + 8 ou 8×5",
        cat: 2 
    },
    "prob_004": { 
        question: "Paul a 24 billes qu'il partage équitablement entre 4 amis. Combien chaque ami reçoit-il de billes ?", 
        type: "qcm", 
        answer: "6", 
        options: ["4", "5", "6", "8"],
        hint: "💡 Partager équitablement = division. Divise 24 par 4", 
        cat: 2 
    },
    "prob_005": { 
        question: "Si un livre coûte 15€ et que tu as 50€, peux-tu acheter 3 livres ?", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Calcule le coût de 3 livres (15€ chacun) et compare avec 50€", 
        cat: 2 
    },
    "prob_006": { 
        question: "Sophie a 35€. Elle achète un jeu à 28€. Combien d'argent lui reste-t-il ?", 
        type: "libre", 
        answer: "7", 
        hint: "💡 Elle dépense 28€ de ses 35€ : 35 - 28 = ?",
        cat: 2 
    },
    "prob_007": { 
        question: "Un train peut transporter 120 personnes. S'il y a déjà 75 personnes, combien de places restent-elles ?", 
        type: "qcm", 
        answer: "45", 
        options: ["35", "40", "45", "50"],
        hint: "💡 Places restantes = total - places occupées. Soustrais 75 de 120", 
        cat: 2 
    },
    "prob_008": { 
        question: "Lucas lit 20 pages par jour. En 5 jours, combien de pages aura-t-il lues ?", 
        type: "libre", 
        answer: "100", 
        hint: "💡 20 pages × 5 jours = ? Ou 20+20+20+20+20",
        cat: 2 
    },
    "prob_009": { 
        question: "Un rectangle a une longueur de 8 cm et une largeur de 5 cm. Son périmètre est de 26 cm.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Périmètre d'un rectangle = longueur + largeur + longueur + largeur", 
        cat: 2 
    },
    "prob_010": { 
        question: "Emma a économisé 12€ en janvier, 15€ en février et 18€ en mars. Combien a-t-elle en tout ?", 
        type: "libre", 
        answer: "45", 
        hint: "💡 Additionne les 3 mois : 12 + 15 + 18 = ?",
        cat: 2 
    },
    "prob_011": { 
        question: "Un parking a 3 étages. Chaque étage peut accueillir 45 voitures. Combien de voitures au total ?", 
        type: "qcm", 
        answer: "135", 
        options: ["120", "125", "135", "145"],
        hint: "💡 Multiplie le nombre d'étages par le nombre de voitures par étage", 
        cat: 2 
    },
    "prob_012": { 
        question: "Si 1 kg de pommes coûte 3€, combien coûtent 8 kg de pommes ?", 
        type: "libre", 
        answer: "24", 
        hint: "💡 1 kg = 3€, donc 8 kg = 3×8 euros",
        cat: 2 
    },
    "prob_013": { 
        question: "Un film dure 95 minutes. Il commence à 14h30. Il se termine après 16h00.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Ajoute 95 minutes (= 1h35) à 14h30. Ça donne quelle heure ?", 
        cat: 2 
    },
    "prob_014": { 
        question: "Tom a 48 cartes à partager équitablement entre 6 amis. Combien chacun en reçoit-il ?", 
        type: "qcm", 
        answer: "8", 
        options: ["6", "7", "8", "9"],
        hint: "💡 Partage = division. Divise 48 par 6 amis", 
        cat: 2 
    },
    "prob_015": { 
        question: "Une boîte contient 144 chocolats. Si on les partage entre 12 personnes, combien chacun en reçoit ?", 
        type: "libre", 
        answer: "12", 
        hint: "💡 Partage = division : 144 ÷ 12 = ?",
        cat: 2 
    },

    // ============ MANIPULATION DES NOMBRES (3) ============
    "nb_001": { 
        question: "Quel est le nombre suivant : 10, 20, 30, 40, ... ?", 
        type: "libre", 
        answer: "50", 
        hint: "💡 La suite compte de 10 en 10 : +10 à chaque fois",
        cat: 3 
    },
    "nb_002": { 
        question: "Quel nombre est plus grand : 789 ou 798 ?", 
        type: "qcm", 
        answer: "798", 
        options: ["789", "798"],
        hint: "💡 Compare chiffre par chiffre : centaines, dizaines, puis unités", 
        cat: 3 
    },
    "nb_003": { 
        question: "Dans le nombre 456, le chiffre 5 représente les dizaines.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Dans 456 : quelle est la position du 5 ? Unités, dizaines ou centaines ?", 
        cat: 3 
    },
    "nb_004": { 
        question: "Quel est le double de 25 ?", 
        type: "libre", 
        answer: "50", 
        hint: "💡 Le double = multiplier par 2 : 25 × 2 = ?",
        cat: 3 
    },
    "nb_005": { 
        question: "Quel est le nombre juste avant 100 ?", 
        type: "qcm", 
        answer: "99", 
        options: ["98", "99", "101", "90"],
        hint: "💡 Compte à rebours : 100 - 1 = ?", 
        cat: 3 
    },
    "nb_006": { 
        question: "345 < 354", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 < signifie 'plus petit que'. Compare 345 et 354", 
        cat: 3 
    },
    "nb_007": { 
        question: "Quel nombre vient après 999 ?", 
        type: "libre", 
        answer: "1000", 
        hint: "💡 999 + 1 = ? C'est le premier nombre à 4 chiffres !",
        cat: 3 
    },
    "nb_008": { 
        question: "Dans le nombre 2847, quel chiffre est à la position des centaines ?", 
        type: "qcm", 
        answer: "8", 
        options: ["2", "8", "4", "7"],
        hint: "💡 Dans un nombre : unités, dizaines, centaines, milliers (de droite à gauche)", 
        cat: 3 
    },
    "nb_009": { 
        question: "Le nombre 1000 a 4 chiffres.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Compte les chiffres dans 1000 : combien y en a-t-il ?", 
        cat: 3 
    },
    "nb_010": { 
        question: "Quelle est la moitié de 100 ?", 
        type: "libre", 
        answer: "50", 
        hint: "💡 La moitié = diviser par 2 : 100 ÷ 2 = ?",
        cat: 3 
    },
    "nb_011": { 
        question: "Range ces nombres du plus petit au plus grand : 234, 243, 324. Quel est le plus petit ?", 
        type: "qcm", 
        answer: "234", 
        options: ["234", "243", "324"],
        hint: "💡 Compare les centaines d'abord, puis les dizaines si elles sont égales", 
        cat: 3 
    },
    "nb_012": { 
        question: "5 centaines + 3 dizaines + 7 unités = 537", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 5 centaines = 500, 3 dizaines = 30, 7 unités = 7. Additionne tout", 
        cat: 3 
    },
    "nb_013": { 
        question: "Combien y a-t-il de dizaines dans 350 ?", 
        type: "libre", 
        answer: "35", 
        hint: "💡 350 = 3 centaines + 5 dizaines = 30 dizaines + 5 dizaines",
        cat: 3 
    },
    "nb_014": { 
        question: "Quel nombre est pair : 47, 52, 63, 71 ?", 
        type: "qcm", 
        answer: "52", 
        options: ["47", "52", "63", "71"],
        hint: "💡 Un nombre pair se termine par 0, 2, 4, 6 ou 8", 
        cat: 3 
    },
    "nb_015": { 
        question: "Tous les nombres qui se terminent par 5 sont impairs.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Les nombres pairs se terminent par 0, 2, 4, 6, 8. Et les impairs ?", 
        cat: 3 
    },
    "nb_016": { 
        question: "Quel est le triple de 15 ?", 
        type: "libre", 
        answer: "45", 
        hint: "💡 Le triple = multiplier par 3 : 15 × 3 = ?",
        cat: 3 
    },
    "nb_017": { 
        question: "Combien y a-t-il d'unités dans 4 centaines ?", 
        type: "qcm", 
        answer: "400", 
        options: ["4", "40", "400", "4000"],
        hint: "💡 1 centaine = 100 unités. Donc 4 centaines = ?", 
        cat: 3 
    },
    "nb_018": { 
        question: "2500 > 2050", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 > signifie 'plus grand que'. Compare 2500 et 2050", 
        cat: 3 
    },
    "nb_019": { 
        question: "Quel nombre arrondi à la dizaine supérieure donne 60 : 54 ou 56 ?", 
        type: "qcm", 
        answer: "56", 
        options: ["54", "56"],
        hint: "💡 Arrondir à la dizaine supérieure : si ≥5, on monte à 60. Lequel est ≥55 ?", 
        cat: 3 
    },
    "nb_020": { 
        question: "Combien faut-il ajouter à 75 pour obtenir 100 ?", 
        type: "libre", 
        answer: "25", 
        hint: "💡 75 + ? = 100, donc ? = 100 - 75",
        cat: 3 
    },

    // ============ ACTIVITÉS LOGIQUES (4) ============
    "log_001": { 
        question: "Complète la suite : 2, 4, 6, 8, ... ?", 
        type: "libre", 
        answer: "10", 
        hint: "💡 C'est la suite des nombres pairs : +2 à chaque fois",
        cat: 4 
    },
    "log_002": { 
        question: "Quelle forme vient ensuite : ⭐🔵⭐🔵⭐ ... ?", 
        type: "qcm", 
        answer: "🔵", 
        options: ["⭐", "🔵", "🔺", "⬜"],
        hint: "💡 Regarde le motif qui se répète : quelle forme suit toujours ⭐ ?", 
        cat: 4 
    },
    "log_003": { 
        question: "Si tous les chats sont des animaux, alors Rex qui est un chat est un animal.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Si tous les chats sont des animaux et que Rex est un chat...", 
        cat: 4 
    },
    "log_004": { 
        question: "Complète : 5, 10, 15, 20, ... ?", 
        type: "libre", 
        answer: "25", 
        hint: "💡 C'est la table de 5 : on ajoute 5 à chaque fois",
        cat: 4 
    },
    "log_005": { 
        question: "Dans une suite 1, 4, 9, 16, ... quel est le nombre suivant ?", 
        type: "qcm", 
        answer: "25", 
        options: ["20", "21", "24", "25"],
        hint: "💡 Ce sont les carrés : 1×1=1, 2×2=4, 3×3=9, 4×4=16, 5×5=?", 
        cat: 4 
    },
    "log_006": { 
        question: "Si Pierre est plus grand que Paul, et Paul est plus grand que Jacques, alors Pierre est plus grand que Jacques.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 C'est une chaîne logique : Pierre > Paul > Jacques, donc Pierre > ?", 
        cat: 4 
    },
    "log_007": { 
        question: "Complète : 100, 90, 80, 70, ... ?", 
        type: "libre", 
        answer: "60", 
        hint: "💡 La suite décroît de 10 en 10 : -10 à chaque fois",
        cat: 4 
    },
    "log_008": { 
        question: "Un rectangle a 4 côtés. Un carré est un rectangle particulier. Combien de côtés a un carré ?", 
        type: "qcm", 
        answer: "4", 
        options: ["3", "4", "5", "6"],
        hint: "💡 Si un carré EST un rectangle, il a le même nombre de côtés qu'un rectangle", 
        cat: 4 
    },
    "log_009": { 
        question: "Dans la suite 3, 6, 12, 24, ..., chaque nombre est le double du précédent.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Vérifie : 3×2=6, 6×2=12, 12×2=24. C'est toujours ×2 ?", 
        cat: 4 
    },
    "log_010": { 
        question: "Quel nombre ne va pas avec les autres : 2, 4, 7, 8, 10 ?", 
        type: "libre", 
        answer: "7", 
        hint: "💡 Regarde les nombres pairs et les nombres impairs",
        cat: 4 
    },
    "log_011": { 
        question: "Si A = 1, B = 2, C = 3, quelle est la valeur de D ?", 
        type: "qcm", 
        answer: "4", 
        options: ["3", "4", "5", "6"],
        hint: "💡 Les lettres suivent l'ordre alphabétique avec +1 à chaque fois", 
        cat: 4 
    },
    "log_012": { 
        question: "Un nombre pair + un nombre pair = toujours un nombre pair.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Teste avec des exemples : 2+4=6, 6+8=14. Ça marche toujours ?", 
        cat: 4 
    },
    "log_013": { 
        question: "Complète : 1, 1, 2, 3, 5, 8, ... ? (suite de Fibonacci)", 
        type: "libre", 
        answer: "13", 
        hint: "💡 Chaque nombre = somme des 2 précédents : 5+8=?",
        cat: 4 
    },
    "log_014": { 
        question: "Quel est l'intrus : triangle, carré, cercle, cube ?", 
        type: "qcm", 
        answer: "cube", 
        options: ["triangle", "carré", "cercle", "cube"],
        hint: "💡 Les formes plates (2D) vs les formes avec volume (3D)", 
        cat: 4 
    },
    "log_015": { 
        question: "Si on ajoute un nombre impair à un nombre impair, on obtient toujours un nombre pair.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Teste avec des exemples : 3+5=8, 7+9=16. Que remarques-tu ?", 
        cat: 4 
    },
    "log_016": { 
        question: "Complète la suite : 1, 3, 7, 15, 31, ... ?", 
        type: "libre", 
        answer: "63", 
        hint: "💡 Chaque nombre : (nombre précédent × 2) + 1",
        cat: 4 
    },
    "log_017": { 
        question: "Quel nombre complète cette égalité : 7 + ? = 12 - 2 ?", 
        type: "qcm", 
        answer: "3", 
        options: ["2", "3", "4", "5"],
        hint: "💡 Calcule d'abord 12 - 2, puis trouve ce qu'il faut ajouter à 7", 
        cat: 4 
    },
    "log_018": { 
        question: "Dans un groupe de 5 enfants, si 3 sont des filles, alors 2 sont des garçons.", 
        type: "vrai-faux", 
        answer: "Vrai", 
        options: ["Vrai", "Faux"],
        hint: "💡 Total = 5. Si 3 sont des filles, combien reste-t-il pour les garçons ?", 
        cat: 4 
    },
    "log_019": { 
        question: "Si A > B et B > C, quelle affirmation est vraie ?", 
        type: "qcm", 
        answer: "A > C", 
        options: ["A < C", "A = C", "A > C", "Impossible à dire"],
        hint: "💡 Logique de comparaison : si A est le plus grand et C le plus petit...", 
        cat: 4 
    },
    "log_020": { 
        question: "Quel est le prochain nombre premier après 7 : 8, 9, 10, 11, 12 ?", 
        type: "libre", 
        answer: "11", 
        hint: "💡 Un nombre premier n'est divisible que par 1 et lui-même",
        cat: 4 
    }
};

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_DATA;
}

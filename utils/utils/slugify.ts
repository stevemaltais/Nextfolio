export const slugify = (text: string): string => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-') // Remplace les espaces par des tirets
      .replace(/[^\w\-]+/g, '') // Supprime les caractères spéciaux
      .replace(/\-\-+/g, '-') // Remplace les multiples tirets par un seul
      .replace(/^-+/, '') // Supprime les tirets en début de texte
      .replace(/-+$/, ''); // Supprime les tirets en fin de texte
  };
  
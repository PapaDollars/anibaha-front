import toast from 'react-hot-toast';

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const img = e.target as HTMLImageElement;

  // Vérifier si l'erreur est due à une déconnexion internet
  if (!navigator.onLine) {
    toast.error('Pas de connexion internet. Veuillez vérifier votre connexion.');
  } else {
    toast.error('Erreur lors du chargement de l\'image');
  }

  // Remplacer l'image par une image de secours
  img.src = '/images/placeholder.png';
  img.onerror = null; // Éviter les boucles infinies
};

export const isImageLoading = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = src;
  });
}; 
import PhotoSwipeLightbox from './vendor/photoswipe/photoswipe-lightbox.esm.min.js';

const lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery',
    children: 'a',
    pswpModule: () => import('./vendor/photoswipe/photoswipe.esm.min.js'),
    bgOpacity: 0.92,
    padding: { top: 24, bottom: 24, left: 12, right: 12 },
    showHideAnimationType: 'zoom',
    closeTitle: 'Fermer',
    zoomTitle: 'Zoom',
    arrowPrevTitle: 'Précédente',
    arrowNextTitle: 'Suivante',
    errorMsg: 'Impossible de charger la photo',
});

lightbox.init();

const burgerBtn = document.getElementById('burger')
const mobileMenu = document.getElementById('mobile-menu')
burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('block')
})
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});
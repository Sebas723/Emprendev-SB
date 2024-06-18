const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) => {
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});
const fadeElements = document.querySelectorAll('.fade-in-right');
fadeElements.forEach((el)=> observer.observe(el));

const fadeElements_left = document.querySelectorAll('.fade-in-left');
fadeElements_left.forEach((el)=> observer.observe(el));

const fadeElements_up = document.querySelectorAll('.fade-in-up');
fadeElements_up.forEach((el)=> observer.observe(el));
import { Router } from 'express';
const router = Router();

router.get('*', function(req, res) {
    res.render('index')
});


// router.get('/auth/login', function(req, res) {
//     res.render('page/user/login')
// });

// router.get('/auth/signup', function(req, res) {
//     res.render('page/user/signup')
// });

// router.get('*', function(req, res){
//     res.status(404).render('page/error/404')
// });

export default router;
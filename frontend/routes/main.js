import { Router } from 'express';
const router = Router();

router.get('/', function(req, res) {
    res.render('index')
});


router.get('/auth/login', function(req, res) {
    res.render('user/login')
});

router.get('/auth/signup', function(req, res) {
    res.render('user/signup')
});

export default router;
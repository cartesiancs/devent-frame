import { equal } from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {server} from '../app.js';
import { v4 as uuidv4 } from 'uuid';

let should = chai.should(); 

chai.use(chaiHttp);


const mockuser = {
  user_id: 'testid_'+uuidv4().split('-')[0],
  user_pw: 'testpwss1123',
  user_email: `${uuidv4().split('-')[0]}@aa.aa`
}

console.log(mockuser)


describe('Users', () => {
  describe('POST /api/users', () => {
    it('가입 가능 확인', (done) => {
      let params = {
        user_id: btoa(mockuser.user_id),
        user_email: btoa(mockuser.user_email),
        user_pw: btoa(mockuser.user_pw)
      }


      chai.request(server) 
      .post('/api/users') 
      .send(params)
      .end((err, res) => { 
        res.should.have.status(200); 
        res.body.status.should.equal(1);  
        done();
        //console.log(res.body)      
      });
    });


    it('가입 특수문자 확인', (done) => {
      let params = {
        user_id:  btoa("aa__!*PB**(_"),
        user_email: btoa(mockuser.user_email),
        user_pw: btoa(mockuser.user_pw)
      }

      chai.request(server) 
      .post('/api/users') 
      .send(params)
      .end((err, res) => { 
        res.should.have.status(200); 
        res.body.status.should.equal(0);  
        done();
      });
    });

    it('중복 가입 확인', (done) => {
      let params = {
        user_id: btoa(mockuser.user_id),
        user_email: btoa(mockuser.user_email),
        user_pw: btoa(mockuser.user_pw)
      }

      chai.request(server) 
      .post('/api/users') 
      .send(params)
      .end((err, res) => { 
        res.should.have.status(200); 
        res.body.status.should.equal(0);  
        done();
        //console.log(res.body)      
      });
    });

  });

  describe('/api/auth/login', () => {
    it('로그인 가능 확인', (done) => {
      let params = {
        user_id: btoa(mockuser.user_id),
        user_pw: btoa(mockuser.user_pw)
      }

      chai.request(server) 
      .post('/api/auth/login') 
      .send(params)
      .end((err, res) => { 
        res.should.have.status(200); 
        res.body.status.should.equal(1); 
        done();  
      });
    });

    it('로그인 정보 확인', (done) => {
      let params = {
        user_id: btoa('noneid'), 
        user_pw: btoa('nonepass')
      }

      chai.request(server) 
      .post('/api/auth/login') 
      .send(params)
      .end((err, res) => { 
        res.should.have.status(401); 
        res.body.status.should.equal(0);    
        done();    
      });
    });

    it('로그인 특수문자 검증', (done) => {
      let params = {
        user_id: btoa('a!a__+a'), 
        user_pw: btoa('sdvwes&^*(#')
      }

      chai.request(server) 
      .post('/api/auth/login') 
      .send(params)
      .end((err, res) => { 
        res.should.have.status(401); 
        res.body.status.should.equal(0);
        done();
      });
    });
  });
});
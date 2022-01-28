import { equal } from 'assert';
import { checkAvailableUser } from '../services/users.serv.js';


describe('Users', () => {
  describe('# Login', () => {
    it('정상 로그인', async () => {
      let user_id = 'cow_8n4r8'
      let user_email = 'testnoneduplicate@testnoneduplicate.aa'
      let user = {user_id, user_email}
      let ck = await checkAvailableUser(user)
      equal(ck, 1);
    });
    it('로그인 특수문자', async () => {
      let user_id = 'a!a__+a'
      let user_email = 'aaa@aa.aa'
      let user = {user_id, user_email}
      let ck = await checkAvailableUser(user)
      equal(ck, 0);
    });  
  });
});
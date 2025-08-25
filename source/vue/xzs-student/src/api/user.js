import { post } from '@/utils/request'

export default {
  createUser: query => post('/api/student/user/edit', query),
  // mock getCurrentUser
  getCurrentUser: () => Promise.resolve({
    code: 1,
    message: '成功',
    response: {
      id: 97,
      userUuid: 'd2d29da2-dcb3-4013-b874-727626236f47',
      userName: 'student',
      realName: 'Test',
      age: 18,
      role: 1,
      sex: 1,
      birthDay: '2019-09-01 00:00:00',
      phone: '158800882',
      lastActiveTime: '',
      createTime: '2019-09-07 18:55:02',
      modifyTime: '2021-06-09 17:04:31',
      status: 1,
      userLevel: 1,
      classes: '1班',
      imagePath: ''
    }
  }),
  getUserEvent: () => Promise.resolve({
    "code": 1,
    "message": "成功",
    "response": [
        {
            "id": 1812,  
            "userId": 1,  //用户id
            "userName": "student",  //用户名
            "realName": "Test",  //用户真实姓名
            "content": "student 登录了学之思开源考试系统",  //动态内容
            "createTime": "2021-06-08 17:12:50"  //创建时间
        }
    ]
}),
  update: query => post('/api/student/user/update', query),
  messagePageList: query => post('/api/student/user/message/page', query),
  read: id => post('/api/student/user/message/read/' + id),
  // mock getMessageCount
  getMessageCount: () => Promise.resolve({
    code: 1,
    message: '成功',
    response: 0 //未读消息数量
  })
}

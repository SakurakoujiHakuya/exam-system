
// mock 数据
const mockPageListData = {
  code: 1,
  message: '成功',
  response: {
    total: 2,
    list: [
      {
        id: 6324,
        createTime: '2021-06-01 17:56:38',
        userScore: '0',
        subjectName: '数学',
        subjectId: 129,
        questionCount: 1,
        questionCorrect: 0,
        paperScore: '3',
        doTime: '4 秒',
        paperType: 7,
        systemScore: '0',
        status: 2,
        paperName: '智能训练试卷 - 1845',
        userName: null
      },
        {
        id: 6324,
        createTime: '2021-06-01 17:56:38',
        userScore: '0',
        subjectName: '数学',
        subjectId: 129,
        questionCount: 1,
        questionCorrect: 0,
        paperScore: '3',
        doTime: '4 秒',
        paperType: 7,
        systemScore: '0',
        status: 2,
        paperName: '智能训练试卷 - 1845',
        userName: null
      },
        {
        id: 6325,
        createTime: '2021-06-01 17:56:38',
        userScore: '0',
        subjectName: '语文',
        subjectId: 129,
        questionCount: 1,
        questionCorrect: 0,
        paperScore: '3',
        doTime: '4 秒',
        paperType: 7,
        systemScore: '0',
        status: 2,
        paperName: '智能训练试卷 - 1845',
        userName: null
      },
        {
        id: 6324,
        createTime: '2021-06-01 17:56:38',
        userScore: '0',
        subjectName: '外语',
        subjectId: 129,
        questionCount: 1,
        questionCorrect: 0,
        paperScore: '3',
        doTime: '4 秒',
        paperType: 7,
        systemScore: '0',
        status: 2,
        paperName: '智能训练试卷 - 1845',
        userName: null
      }
    ]
  }
};

// mock post 方法
import { post as realPost } from '@/utils/request'
function post(url, data) {
  if (url === '/api/student/exampaper/answer/pageList') {
    return Promise.resolve(mockPageListData);
  }
  return realPost(url, data);
}

export default {
  pageList: query => post('/api/student/exampaper/answer/pageList', query),
  answerSubmit: form => post('/api/student/exampaper/answer/answerSubmit', form),
  read: id => post('/api/student/exampaper/answer/read/' + id),
  edit: form => post('/api/student/exampaper/answer/edit', form)
}

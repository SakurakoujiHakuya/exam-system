import { post } from '@/utils/request'

export default {
    index: () => Promise.resolve({
    code: 1,
    message: '成功',
    response: {
      fixedPaper: [
        {
          id: 2399,
          name: '语文',
          limitStartTime: null,
          limitEndTime: null
        },
          {
          id: 2400,
          name: '数学',
          limitStartTime: null,
          limitEndTime: null
        },
                {
          id: 2401,
          name: '英语',
          limitStartTime: null,
          limitEndTime: null
        },
      ],
      timeLimitPaper: []
    }
  }),
  // mock task接口
  task: () => Promise.resolve({
    code: 1,
    message: '成功',
    response: [
        {
            "id": 97,  //任务id
            "title": "2021-04-25作业",  //任务标题
            "paperItems": [
                {
                    "examPaperId": 181,   //任务试卷id
                    "examPaperName": "第一次出卷",  //任务试卷名称
                    "examPaperAnswerId": 579,  //答卷id
                    "status": 2  //答卷状态
                }
            ]
        },
        {
            "id": 98,  //任务id
            "title": "2021-04-26作业",  //任务标题
            "paperItems": [
                {
                    "examPaperId": 182,   //任务试卷id
                    "examPaperName": "第二次出卷",  //任务试卷名称
                    "examPaperAnswerId": 580,  //答卷id
                    "status": 1  //答卷状态
                }
            ]
        }
    ]
  })
}

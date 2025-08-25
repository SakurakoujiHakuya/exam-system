import { post } from '@/utils/request'

export default {
  select: id => Promise.resolve({
    "code": 1,
    "message": "成功",
    "response": {
        "id": 97,  //试卷id
        "level": 1,  //年级
        "subjectId": 1,  //学科
        "paperType": 1,  //试卷类型
        "name": "测试一",  //试卷名称
        "suggestTime": 22,  //建议时长
        "limitDateTime": null,  //考试时间限制
        "titleItems": [  
            {
                "name": "一、古诗默写",  //试卷标题
                "questionItems": [
                    {
                        "id": 97,      //题目id
                        "questionType": 5,  //题型
                        "subjectId": 1,  //学科
                        "title": "默写咏鹅",  //标题
                        "gradeLevel": 1,  //年级
                        "items": [],  //选项
                        "analyze": "咏鹅可以带拼音",  //解析
                        "correctArray": null,  //标答
                        "correct": "鹅鹅鹅， 曲项向天歌。 白毛浮绿水， 红掌拨清波。",  //标答
                        "score": "10", //分数
                        "difficult": 3,  //难度
                        "itemOrder": 1  //顺序
                    }
                ]
            }
        ],
        "score": "10"
    }
}),
  pageList: query => Promise.resolve({
    "code": 1,
    "message": "成功",
    "response": {
        "total": 4,
        "list": [
            {
                "id": 2520,
                "name": "月考",
                "questionCount": 1,
                "score": 20,
                "createTime": "2021-05-31 13:34:49",
                "createUser": 2,
                "subjectId": 18,
                "subjectName": "英语",
                "paperType": 1,
                "frameTextContentId": 9016
            },
            {
                "id": 2521,
                "name": "期中考",
                "questionCount": 25,
                "score": 100,
                "createTime": "2022-01-10 09:00:00",
                "createUser": 1,
                "subjectId": 19,
                "subjectName": "数学",
                "paperType": 1,
                "frameTextContentId": 9017
            },
            {
                "id": 2522,
                "name": "期末考",
                "questionCount": 20,
                "score": 100,
                "createTime": "2021-11-15 14:00:00",
                "createUser": 1,
                "subjectId": 21,
                "subjectName": "物理",
                "paperType": 1,
                "frameTextContentId": 9018
            },
            {
                "id": 2523,
                "name": "市统考",
                "questionCount": 15,
                "score": 50,
                "createTime": "2021-10-20 10:30:00",
                "createUser": 3,
                "subjectId": 20,
                "subjectName": "语文",
                "paperType": 2,
                "frameTextContentId": 9019
            }
        ]
    }
})
}

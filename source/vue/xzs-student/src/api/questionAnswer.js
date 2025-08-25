import { post } from '@/utils/request'

export default {
  pageList: query => Promise.resolve({
    "code": 1,
    "message": "成功",
    "response": {
        "total": 4,
        "list": [
            {
                "id": 24928,
                "questionType": 1,
                "createTime": "2021-06-02 16:07:11",
                "subjectName": "语文",
                "shortTitle": "下列哪个成语是形容说话不算数的？"
            },
            {
                "id": 24929,
                "questionType": 2,
                "createTime": "2021-06-03 11:20:45",
                "subjectName": "数学",
                "shortTitle": "以下哪些是偶数？"
            },
            {
                "id": 24930,
                "questionType": 3,
                "createTime": "2021-06-04 09:05:10",
                "subjectName": "英语",
                "shortTitle": "The sun rises in the west."
            },
            {
                "id": 24931,
                "questionType": 4,
                "createTime": "2021-06-05 14:30:00",
                "subjectName": "物理",
                "shortTitle": "万有引力是谁发现的？"
            }
        ]
    }
}),
  select: id => Promise.resolve(
    {
      "code": 1,
      "message": "成功",
      "response": {
          "questionVM": {
              "id": 507,    //题目id
              "questionType": 1,   //题目类型
              "subjectId": 46,  //学科id
              "title": "下列哪个成语是形容说话不算数的？",   //题干
              "gradeLevel": 12,    //年级
              "items": [        //选项
                {
                    "prefix": "A",  //选项
                    "content": "A",  //选项内容
                    "score": null    //选项分数
                }
            ],
            "analyze": "D",     //解析
            "correctArray": null,  //标答
            "correct": "D",   //标答
            "score": "2",  //分数
            "difficult": 3,  //难度
            "itemOrder": null  //排序
        },
        "questionAnswerVM": {   //用户答案
            "id": 25067,  
            "questionId": 507,  //题目id
            "doRight": false,   //是否正确
            "content": "A",   //用户答案
            "itemOrder": 2,   //排序
            "contentArray": null,   //用户答案
            "score": "0",  //得分
            "questionScore": "2"  //题目分数
        }
    }
})
}

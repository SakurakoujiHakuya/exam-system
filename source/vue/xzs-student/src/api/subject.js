import { post } from '@/utils/request'

export default {
  list: query => Promise.resolve({
    "code": 1,
    "message": "成功",
    "response": [
      { "id": "18", "name": "英语" },
      { "id": "19", "name": "数学" },
      { "id": "20", "name": "语文" },
      { "id": "21", "name": "物理" },
      { "id": "22", "name": "化学" }
    ]
  }),
  select: id => post('/api/student/education/subject/select/' + id)
}

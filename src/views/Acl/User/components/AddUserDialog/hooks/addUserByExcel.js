import { addUserBatch } from '@/api/user-manage'
import { keys } from '../../../constant'

export default async function addUserByExcel(excelData, password) {
  // console.log(excelData)
  /**
{
  header: ['姓名', '角色', '开通时间'],
  results: [
    {
      姓名: '刘备',
      角色: '管理员',
      开通时间: 44420
    }
  ]
}
   *
   */
  const dataList = []
  for (const info of excelData.results) {
    const obj = {
      password
    }
    Object.keys(info).forEach((key) => {
      if (keys[key] === 'openTime') {
        obj[keys[key]] = formatDate(info[key])
      } else {
        obj[keys[key]] = info[key]
      }
    })
    dataList.push(obj)
  }
  // console.log(dataList)
  /**
   * [
    {
        "username": "刘备",
        "role": "管理员",
        "openTime": '2021-08-12',
        "password": "9079b6ee1d5ca04ab00e44e877a222ee"
    }
]
   */
  await addUserBatch(dataList)
}

/**
 * 解析 excel 导入的时间格式
 */
export const formatDate = (numb) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}

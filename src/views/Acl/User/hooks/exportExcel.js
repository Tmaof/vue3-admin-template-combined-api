import i18n from '@/i18n'
import { getUserListAll } from '@/api/user-manage'
import { keys } from '../constant.js'
import { dateFilter } from '@/filter'
// eslint-disable-next-line camelcase
import export_json_to_excel from '@/utility/export2Excel.js'
export default async function exportExcel() {
  const { list } = await getUserListAll()
  const data = formatJson(keys, list)
  export_json_to_excel({
    // excel 表头
    header: Object.keys(keys),
    // excel 数据（二维数组结构）
    data,
    // 文件名称
    filename: i18n.$t('hooks.exportExcel.017834-0'),
    // 是否自动列宽
    autoWidth: true,
    // 文件类型
    bookType: 'xlsx'
  })
}

/**
 *  该方法负责将数组转化成二维数组
 * @param {*} headers
 * @param {*} rows
 * @returns
 */
const formatJson = (headers, rows) => {
  // 首先遍历数组
  // [{ username: '张三'},{},{}]  => [['张三'],[],[]]
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        item.role = item.role.map((role) => role.title)
        item.role = item.role.toString()
      }
      // 处理时间格式
      if (headers[key] === 'openTime') {
        item.openTime = dateFilter(item.openTime)
      }
      return item[headers[key]]
    })
  })
}

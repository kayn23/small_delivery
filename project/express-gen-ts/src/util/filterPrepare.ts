export interface IFilter extends Record<string, string | string[]> {}
const filterType: Record<string, string> = {
  eq: '=',
  noteq: '!=',
  gt: '<',
  lt: '>',
  gteq: '<=',
  lteq: '=>',
}
export interface IResFilter {
  sql: string
  values: any[]
}
function filterPrepare(filters: IFilter): IResFilter {
  const res: IResFilter = {
    sql: '',
    values: [],
  }
  const arr = Object.entries(filters)
  if (arr.length === 0) return res
  res.sql += ' '
  const prep = arr.map(([key, values]) => {
    const [k, t] = key.split('_')
    let sql = ''
    let arr: any[] = []
    if (Array.isArray(values)) {
      sql += values.map(() => `${k} ${filterType[t]} ?`).join(' or ') + ' '
      arr.push(...values)
    } else {
      sql += `${k} ${filterType[t]} ? `
      arr.push(values)
    }
    return {
      sql,
      val: arr,
    }
  })
  res.sql += `(${prep.map((item) => item.sql).join(' and ')})`
  res.values.push(...prep.map((item) => item.val).flat(Infinity))
  console.log('prepare filter', res)
  return res
}

export default filterPrepare

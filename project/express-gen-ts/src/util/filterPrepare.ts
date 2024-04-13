export interface IFilter extends Record<string, string | string[]> {}
const filterType: Record<string, string> = {
  eq: '=',
  noteq: '!=',
  gt: '<',
  lt: '>',
  gteq: '<=',
  lteq: '=>',
  like: 'LIKE',
}
export interface IResFilter {
  sql: string
  values: any[]
}
function filterPrepare(filters: IFilter, type: 'and' | 'or' = 'and'): IResFilter {
  const res: IResFilter = {
    sql: '',
    values: [],
  }
  const arr = Object.entries(filters)
  if (arr.length === 0) return res
  res.sql += ' '
  const prep = arr.map(([key, values]) => {
    const sp = key.split('_')
    const t = sp.pop() as string
    const k = sp.join('_')
    let sql = ''
    let arr: any[] = []
    if (Array.isArray(values)) {
      if (t === 'like') {
        sql += values.map((item) => `${k} ${filterType[t]} '%${item}%'`).join(' or ') + ' '
      } else {
        sql += values.map(() => `${k} ${filterType[t]} ?`).join(' or ') + ' '
        arr.push(...values)
      }
    } else {
      if (t === 'like') sql += `${k} ${filterType[t]} '%${values}%' `
      else {
        sql += `${k} ${filterType[t]} ? `
        arr.push(values)
      }
    }
    return {
      sql,
      val: arr,
    }
  })
  res.sql += `(${prep.map((item) => item.sql).join(` ${type} `)})`
  res.values.push(...prep.map((item) => item.val).flat(Infinity))
  console.log('prepare filter', res)
  return res
}

export default filterPrepare

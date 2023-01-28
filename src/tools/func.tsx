import { FluentDate, Language as FDLanguage } from 'fluent-date/lib'
import { DateTime } from 'luxon'

export const timeToUsable = (jsdTime: Date | undefined) => {
  if (jsdTime === undefined) return '-'
  const luxonTime = DateTime.fromISO(jsdTime.toString())
  if ((DateTime.now().diff(luxonTime, 'hours').toObject().hours ?? 0) < 3) {
    const zhFd = new FluentDate(FDLanguage.ZH)
    // e.g. 34 分钟前
    return zhFd.relative(luxonTime.toJSDate().getTime())
  }
  // e.g. 2023/1/24 12:07:37
  return luxonTime.toFormat('D hh:mm:ss')
}

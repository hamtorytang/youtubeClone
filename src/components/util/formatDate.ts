import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'

register('ko',koLocale);

export default function formatDate(date:string) : string {
    return format(date,'ko');
}
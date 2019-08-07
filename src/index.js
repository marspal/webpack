import moment from 'moment';
// 手动引入
import 'moment/locale/zh-cn'
moment.locale('zh-cn');
console.log(moment().endOf('day').fromNow())
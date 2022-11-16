export function validateTelephone(tel: string): boolean {
  return /^1[3456789]\d{9}$/.test(tel);
}
function checkIDCardProvince(code:string) {
  const pattern = /^[1-9][0-9]/;
  const provinces = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    83: '台湾',
  };
  if (pattern.test(code)) {
    if (provinces[(code as any as keyof typeof provinces)]) {
      return true;
    }
  }
  return false;
}

function checkIDCardDate(code:string) {
  const pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
  if (pattern.test(code)) {
    const year = code.substring(0, 4);
    const month = code.substring(4, 6);
    const date = code.substring(6, 8);
    const date2 = new Date(year + '/' + month + '/' + date);
    if (date2 && date2.getMonth() === parseInt(month) - 1) {
      return true;
    }
  }
  return false;
}

function checkIDCardCode(val:string) {
  const p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
  let code = val.substring(17);
  if (p.test(val)) {
    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(val[i]) * factor[i];
    }
    if (`${parity[sum % 11]}` === code.toUpperCase()) {
      return true;
    }
  }
  return false;
}

//验证大陆身份证
export function validateIDCard(IDCard:string) {
  if (!checkIDCardProvince(IDCard.substring(0, 2))) {
    return false;
  }
  //当身份证为15位时的验证出生日期。
  if (IDCard.length === 15) {
    const rep = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d)$/);
    const arrSplit = IDCard.match(rep);
    //检查生日日期是否正确
    const dtmBirth = new Date(arrSplit![2] + '/' + arrSplit![3] + '/' + arrSplit![4]);
    return (
      dtmBirth.getFullYear() === Number(arrSplit![2]) &&
      dtmBirth.getMonth() + 1 === Number(arrSplit![3]) &&
      dtmBirth.getDate() === Number(arrSplit![4])
    );
  }
  //18位身份证
  if (checkIDCardCode(IDCard)) {
    const date = IDCard.substring(6, 14);
    if (checkIDCardDate(date)) {
      return true;
    }
  }
  return false;
}

export function validateEmail(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

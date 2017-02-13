import moment from 'moment';

export function jsToFormData(obj, container, prefix) {
  if (!container) container = {};
  if (!prefix) prefix = '';

  if (obj && obj.push) {
    for (var i = 0; i < obj.length; i++) {
        var newPrefix = prefix + '[' + i + ']';
        jsToFormData(obj[i], container, newPrefix);
    }
  } else if (typeof(obj) === 'object') {
    for (var p in obj) {
      var newPrefix = prefix ? prefix + '.' + p : p;
      jsToFormData(obj[p], container, newPrefix);
    }
  } else {
    container[prefix] = obj;
  }
  return container;
}

export function encodeQueryString(formData) {
  let keyValues = [];
  for (let p in formData) {
    let key = encodeURIComponent(p);
    let value = formData[p] !== undefined ? encodeURIComponent(formData[p]) : '';
    keyValues.push(key + '=' + value);
  }
  return keyValues.join('&');
}

export function convert(form) {
  return encodeQueryString(jsToFormData(form));
}

// 将jeecg生成的一般的表单转为antd 的Form需要的表单
export function initFormValue(entity) {
  const submit = {};
  for (let key in entity) {
    if (entity[key]) {
      submit[key] = { value: entity[key] };
    }
  }
  return submit;
}

export const validateEmail = validate => {
  let errors = []
  if (!validate.$dirty) return errors
  !validate.required && errors.push('メールアドレスを入力してください')
  !validate.email && errors.push('メールアドレスの形式で入力してください')
  return errors
}

export const validatePassword = validate => {
  let errors = []
  if (!validate.$dirty) return errors
  !validate.required && errors.push('パスワードを入力してください')
  if (validate.hasOwnProperty('min')) {
    !validate.min && errors.push('パスワードは8文字以上で入力してください')
  }
  return errors
}

export const validatePasswordConfirm = validate => {
  let errors = []
  if (!validate.$dirty) return errors
  !validate.required && errors.push('パスワードを再入力してください')
  !validate.confirm && errors.push('パスワードが一致しません')
  return errors
}

export const validateUserName = validate => {
  let errors = []
  if (!validate.$dirty) return errors
  !validate.required && errors.push('ユーザー名を入力してください')
  return errors
}

import { showError } from '../../../tools/toaster'

const useValidate = (signup) => {
  const validationErrors = {
    emailError: { isError: false, error: '' },
    passwordError: { isError: false, error: '' },
    groupError: { isError: false, error: '' },
  }
  const validate = (formData) => {
    let isInvalidData = false
    if (!/^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}$/.test(formData.email)) {
      validationErrors.emailError = { isError: true, error: 'Email is not valid' }
      showError(validationErrors.emailError.error)
      isInvalidData = true
    }
    const formPassword = formData.password.replace(/ /g, '')
    if (formPassword === '') {
      validationErrors.passwordError = { isError: true, error: 'Empty password' }
      showError(validationErrors.passwordError.error)
      isInvalidData = true
    }
    if (formPassword.length < 4 && formPassword !== '') {
      validationErrors.passwordError = { isError: true, error: 'Password length must be > 4' }
      showError(validationErrors.passwordError.error)
      isInvalidData = true
    }
    const formGroup = formData.group.replace(/ /g, '')
    if (signup && formGroup === '') {
      validationErrors.groupError = { isError: true, error: 'Group is empty' }
      showError(validationErrors.groupError.error)
      isInvalidData = true
    }
    if (signup && formGroup !== '' && formGroup.length < 2) {
      validationErrors.groupError = { isError: true, error: 'Group length must be > 2' }
      showError(validationErrors.groupError.error)
      isInvalidData = true
    }

    return {
      isInvalidData,
      errorStates: {
        email: validationErrors.emailError.isError,
        password: validationErrors.passwordError.isError,
        group: validationErrors.groupError.isError,
      },
    }
  }

  return validate
}

export default useValidate

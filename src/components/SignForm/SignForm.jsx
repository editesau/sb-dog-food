/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom'
import useForm from './hooks/useForm'
import styles from './SignForm.module.scss'

const SignForm = ({ signup }) => {
  const {
    formData, isError, signAction, formChangeHandler, isSignUpLoading, isSignInLoading,
  } = useForm(signup)

  const renderFormText = () => {
    if (signup) return 'Sign up'
    return 'Login'
  }

  const renderGroupInput = () => {
    if (signup) {
      return (
        <input
          type="text"
          id="signGroup"
          placeholder="Group"
          className={styles.formInput}
          value={formData.group}
          onChange={formChangeHandler}
        />
      )
    }
    return undefined
  }

  const renderFormFooter = () => {
    if (signup) {
      return (
        <>
          <span>Already registered?</span>
          {' '}
          <Link to="/signin">Login!</Link>
        </>
      )
    }
    return (
      <>
        <span>Not registered yet?</span>
        {' '}
        <Link to="/signup">Sign up!</Link>
      </>
    )
  }

  return (
    <div className={styles.signFormWrapper}>
      <form className={styles.signFormContent}>
        <h1>{renderFormText()}</h1>
        <input
          type="email"
          id="signEmail"
          placeholder="Email"
          className={`${styles.formInput} ${isError.email && styles.invalid}`}
          value={formData.email}
          onChange={formChangeHandler}
        />
        <input
          type="password"
          id="signPassword"
          placeholder="Password"
          className={`${styles.formInput} ${isError.password && styles.invalid}`}
          value={formData.password}
          onChange={formChangeHandler}
        />
        {renderGroupInput()}
        <button
          onClick={signAction}
          disabled={isSignInLoading || isSignUpLoading}
          className={styles.formBtn}
          type="submit"
        >
          {renderFormText()}
        </button>
        <hr />
        {renderFormFooter()}
      </form>
    </div>
  )
}

export default SignForm

/* eslint-disable jsx-a11y/label-has-associated-control */
import useForm from './hooks/useForm'
import styles from './SignForm.module.scss'
import SignFormFooter from './components/SignFormFooter'
import SignFormGroupInput from './components/SignFormGroupInput'

const SignForm = ({ signup }) => {
  const {
    formData, isError, signAction, formChangeHandler, isSignUpLoading, isSignInLoading,
  } = useForm(signup)

  const renderFormText = () => {
    if (signup) return 'Sign up'
    return 'Login'
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
        <SignFormGroupInput
          signup={signup}
          styles={`${styles.formInput} ${isError.group && styles.invalid}`}
          group={formData.group}
          formChangeHandler={formChangeHandler}
        />
        <button
          onClick={signAction}
          disabled={isSignInLoading || isSignUpLoading}
          className={styles.formBtn}
          type="submit"
        >
          {renderFormText()}
        </button>
        <hr />
        <SignFormFooter signup={signup} />
      </form>
    </div>
  )
}

export default SignForm

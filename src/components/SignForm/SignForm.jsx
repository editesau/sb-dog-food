/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link } from 'react-router-dom'
import useForm from './hooks/useForm'
import styles from './SignForm.module.scss'

const SignForm = ({ signup }) => {
  const {
    formData, isError, signAction, formChangeHandler, isSignUpLoading, isSignInLoading,
  } = useForm(signup)

  return (
    <div className={styles.signFormWrapper}>
      <form className={styles.signFormContent}>
        <h1>{signup ? 'Sign Up' : 'Login'}</h1>
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
        {signup && (
        <input
          type="text"
          id="signGroup"
          placeholder="Group"
          className={styles.formInput}
          value={formData.group}
          onChange={formChangeHandler}
        />
        )}
        <button
          onClick={signAction}
          disabled={isSignInLoading || isSignUpLoading}
          className={styles.formBtn}
          type="submit"
        >
          {signup ? 'Sign Up' : 'Login'}
        </button>
        <hr />
        {!signup ? (
          <>
            <span>Not registered yet?</span>
            {' '}
            <Link to="/signup">Sign up!</Link>
          </>
        )
          : (
            <>
              <span>Already registered?</span>
              {' '}
              <Link to="/signin">Login!</Link>
            </>
          )}
      </form>
    </div>
  )
}

export default SignForm

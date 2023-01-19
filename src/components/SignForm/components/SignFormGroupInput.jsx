const SignFormGroupInput = ({
  signup, styles, group, formChangeHandler,
}) => {
  if (signup) {
    return (
      <input
        type="text"
        id="signGroup"
        placeholder="Group"
        className={styles}
        value={group}
        onChange={formChangeHandler}
      />
    )
  }
  return undefined
}

export default SignFormGroupInput

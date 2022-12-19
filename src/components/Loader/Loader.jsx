import styles from './loader.module.css'

const Loader = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div className={styles['lds-default']}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}

export default Loader

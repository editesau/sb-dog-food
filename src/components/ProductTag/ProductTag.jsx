import styles from './ProductTag.module.scss'

const ProductTag = ({ tag }) => {
  return (
    <span className={`${styles.tag} ${styles[tag]}`}>{tag}</span>
  )
}

export default ProductTag

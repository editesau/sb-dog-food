import styles from './ItemTag.module.scss'

const ItemTag = ({ tag }) => {
  return (
    <span className={`${styles.tag} ${styles[tag]}`}>{tag}</span>
  )
}

export default ItemTag

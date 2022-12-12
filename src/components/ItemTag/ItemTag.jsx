import itemTagStyles from './itemTag.module.css'

const ItemTag = ({ tag }) => {
  return (
    <span className={`${itemTagStyles.tag} ${itemTagStyles[tag]}`}>{tag}</span>
  )
}

export default ItemTag

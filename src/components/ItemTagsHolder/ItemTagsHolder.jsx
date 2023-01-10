/* eslint-disable react/no-array-index-key */
const ItemTagsHolder = ({ tags }) => {
  return (
    <div>
      {tags && tags.map((tag) => <span>{tag}</span>)}
    </div>
  )
}

export default ItemTagsHolder

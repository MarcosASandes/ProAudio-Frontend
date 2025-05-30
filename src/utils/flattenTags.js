export const flattenTags = (tags, parentId = null) => {
  let flat = [];

  for (const tag of tags) {
    const flatTag = {
      id: tag.tag_id,
      nombre: tag.name,
      descripcion: tag.description,
      estado: tag.status,
      etiquetaPadreId: parentId,
    };
    flat.push(flatTag);

    if (tag.childrenTags?.length) {
      flat = flat.concat(flattenTags(tag.childrenTags, tag.tag_id));
    }
  }

  return flat;
};

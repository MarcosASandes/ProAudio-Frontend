export const selectTags = (state) => state.tags.tags;
export const selectTagsLoading = (state) => state.tags.loading;
export const selectTagsError = (state) => state.tags.error;

/*export const flattenTags = (state) => {
  const result = [];
  tags = state.tags.tags;
  const flatten = (tagList) => {
    tagList.forEach(tag => {
      result.push(tag);
      if (tag.children?.length > 0) {
        flatten(tag.children);
      }
    });
  };

  flatten(tags);
  return result;
};*/

export const flattenTags = (tagList) => {
  const result = [];

  const flatten = (tags) => {
    tags.forEach(tag => {
      result.push(tag);
      if (tag.children?.length > 0) {
        flatten(tag.children);
      }
    });
  };

  flatten(tagList);
  return result;
};
